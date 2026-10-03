import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/app/lib/util/supabase/client";
import { deleteGenerationRecord } from "@/app/lib/util/actions/generations";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export interface GenerationRecord {
  id: string;
  source_url: string | null;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
  metadata: {
    input_mode: "url" | "idea";
    topic: string | null;
    platforms: string[];
  };
  result_data?: any;
}

export function useHistoryList() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 8;

  const updateUrl = (newPage: number, newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newQuery) params.set("q", newQuery);
    else params.delete("q");

    if (newPage > 1) params.set("page", newPage.toString());
    else params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const fetchHistory = async (p: number, q: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    let query = supabase
      .from("content_generations")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (q) {
      query = query.or(`source_url.ilike.%${q}%,metadata->>topic.ilike.%${q}%`);
    }

    const from = (p - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    const { data: records, count, error } = await query.range(from, to);

    if (error) throw error;
    return { records: records as GenerationRecord[], total: count || 0 };
  };

  const queryKey = ["generations-history", page, searchQuery];

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey,
    queryFn: () => fetchHistory(page, searchQuery),
    placeholderData: (previousData) => previousData, 
    staleTime: 1000 * 60, // 1 minute freshness
  });

  const totalPages = data?.total ? Math.ceil(data.total / itemsPerPage) : 1;

  // Modern Prefetching API
  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["generations-history", page + 1, searchQuery],
        queryFn: () => fetchHistory(page + 1, searchQuery),
      });
    }
  }, [page, totalPages, searchQuery, queryClient]);

  // Optimistic Deletion
  const deleteMutation = useMutation({
    mutationFn: deleteGenerationRecord,
    onMutate: async (deletedId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<{ records: GenerationRecord[], total: number }>(queryKey);

      // Optimistically update to the new value
      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          records: previousData.records.filter((rec) => rec.id !== deletedId),
          total: Math.max(0, previousData.total - 1),
        });
      }

      // Return context containing the snapshotted value
      return { previousData };
    },
    onError: (err: any, newTodo, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error("Failed to delete", { description: err.message });
    },
    onSettled: () => {
      // Sync with server after success OR failure
      queryClient.invalidateQueries({ queryKey: ["generations-history"] });
    },
    onSuccess: () => {
      toast.success("Record deleted");
    }
  });

  return {
    records: data?.records || [],
    totalItems: data?.total || 0,
    itemsPerPage,
    isLoading,
    isFetchingNewPage: isPlaceholderData,
    searchQuery,
    setSearchQuery: (q: string) => updateUrl(1, q),
    page,
    setPage: (p: number) => updateUrl(p, searchQuery),
    totalPages,
    handleDelete: (id: string) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending
  };
}

export function useGenerationDetail(id: string) {
  const supabase = createClient();
  
  return useQuery({
    queryKey: ["generation-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_generations")
        .select("*")
        .eq("id", id)
        .single();
        
      if (error) throw error;
      return data as GenerationRecord;
    },
    enabled: !!id,
  });
}