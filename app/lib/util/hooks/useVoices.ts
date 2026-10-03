import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/app/lib/util/supabase/client";
import { deleteVoiceDocument } from "@/app/lib/util/actions/voices";
import { toast } from "sonner";

export interface VoiceDoc {
  id: string;
  file_name: string;
  status: "processing" | "completed" | "failed";
  created_at: string;
  error_message?: string;
}

export function useVoices() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const queryKey = ["voice-documents", page, searchQuery];

  const { data, isLoading } = useQuery({
    queryKey,
    staleTime: 1000 * 60,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get user subscription to calculate max voice profiles
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("name, status")
        .eq("user_id", user.id)
        .maybeSingle();

      const planName =
        sub?.status === "active" ? sub?.name?.toLowerCase() || "free" : "free";

      let maxVoices = 3; // Free
      if (planName.includes("starter")) maxVoices = 5;
      if (planName.includes("premium")) maxVoices = 15;

      const { data: voice } = await supabase
        .from("brand_voices")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!voice)
        return {
          voiceId: null,
          documents: [],
          total: 0,
          maxVoices,
          currentPlan: planName,
        };

      let query = supabase
        .from("voice_documents")
        .select("*", { count: "exact" })
        .eq("voice_id", voice.id)
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("file_name", `%${searchQuery}%`);
      }

      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      const { data: documents, count, error } = await query.range(from, to);

      if (error) throw error;
      return {
        voiceId: voice.id,
        documents: documents as VoiceDoc[],
        total: count || 0,
        maxVoices,
        currentPlan: planName,
      };
    },
  });

  const totalPages = data?.total ? Math.ceil(data.total / itemsPerPage) : 1;

  // Real-time Subscription for Processing Status
  useEffect(() => {
    if (!data?.voiceId) return;

    const channel = supabase
      .channel("voice-processing")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "voice_documents",
          filter: `voice_id=eq.${data.voiceId}`,
        },
        (payload) => {
          const doc = payload.new;
          if (doc.status === "completed") {
            toast.success(`${doc.file_name} processing complete!`);
            queryClient.invalidateQueries({ queryKey: ["voice-documents"] });
          } else if (doc.status === "failed") {
            toast.error(`${doc.file_name} failed`, {
              description: doc.error_message,
            });
            queryClient.invalidateQueries({ queryKey: ["voice-documents"] });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [data?.voiceId, supabase, queryClient]);

  // Upload Mutation with Enforcement Lock
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // FRONTEND LOCK: Prevent upload if they exceed plan limits
      if (data && data.total >= data.maxVoices) {
        throw new Error(
          `Voice profile limit reached. Your ${data.currentPlan} plan allows a maximum of ${data.maxVoices} profiles.`,
        );
      }

      if (!data?.voiceId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data: newVoice } = await supabase
          .from("brand_voices")
          .insert({ user_id: user?.id, name: "Default Voice" })
          .select("id")
          .single();

        if (!newVoice) throw new Error("Could not initialize voice profile.");
        return processUpload(file, newVoice.id);
      }
      return processUpload(file, data.voiceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voice-documents"] });
      toast.info("Upload started", {
        description: "Vectorizing in background...",
      });
    },
    onError: (err: any) => {
      toast.error("Upload failed", { description: err.message });
    },
  });

  const processUpload = async (file: File, voiceId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("voiceId", voiceId);

    const res = await fetch("/api/v1/voices", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Upload failed");
    }
    return res.json();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteVoiceDocument,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<any>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          documents: previousData.documents.filter(
            (doc: VoiceDoc) => doc.id !== deletedId,
          ),
          total: Math.max(0, previousData.total - 1),
        });
      }

      return { previousData };
    },
    onError: (err: any, newTodo, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error("Deletion failed", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["voice-documents"] });
    },
    onSuccess: () => {
      toast.success("Document removed");
    },
  });

  return {
    documents: data?.documents || [],
    isLoading,
    totalItems: data?.total || 0,
    maxVoices: data?.maxVoices || 3,
    isUploading: uploadMutation.isPending,
    fileInputRef,
    handleFileChange,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    totalPages,
    handleDelete: (id: string) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending,
  };
}
