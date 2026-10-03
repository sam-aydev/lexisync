import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/app/lib/util/supabase/client";
import { toast } from "sonner";

export type EngineState = "idle" | "processing" | "completed" | "error";
export type InputMode = "url" | "idea";

export function useGenerator() {
  const [inputMode, setInputMode] = useState<InputMode>("url");
  const [inputValue, setInputValue] = useState("");
  const [engineState, setEngineState] = useState<EngineState>("idle");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<any>(null);

  const [platforms, setPlatforms] = useState({
    twitter: true,
    linkedin: true,
    instagram: false,
    newsletter: false,
    threads: false,
  });

  const [platformCounts, setPlatformCounts] = useState({
    twitter: 1,
    threads: 1,
    linkedin: 1,
    instagram: 1,
    newsletter: 1,
  });

  const setPlatformCount = (
    platform: keyof typeof platformCounts,
    count: number,
  ) => {
    setPlatformCounts((prev) => ({ ...prev, [platform]: count }));
  };

  const supabase = createClient();
  const queryClient = useQueryClient();

  const togglePlatform = (key: keyof typeof platforms) => {
    setPlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(platforms).filter(Boolean).length;

  const generateMutation = useMutation({
    mutationFn: async () => {
      if (selectedCount === 0)
        throw new Error("Select at least one target platform.");

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Unauthorized");

      const { data: voice, error: voiceError } = await supabase
        .from("brand_voices")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (voiceError || !voice)
        throw new Error("Please complete voice training first.");

      const selectedPlatformsArray = Object.entries(platforms)
        .filter(([_, isSelected]) => isSelected)
        .map(([key]) => key);

      // Build activeCounts to pass explicitly to the API
      const activeCounts: Record<string, number> = {};
      selectedPlatformsArray.forEach((p) => {
        activeCounts[p] = platformCounts[p as keyof typeof platformCounts] || 1;
      });

      const { data: record, error: insertError } = await supabase
        .from("content_generations")
        .insert({
          user_id: user.id,
          voice_id: voice.id,
          source_url: inputMode === "url" ? inputValue : "",
          status: "pending",
          metadata: {
            input_mode: inputMode,
            topic: inputMode === "idea" ? inputValue : "",
            platforms: selectedPlatformsArray,
            platform_counts: activeCounts, // Saved in DB for history reference
          },
        })
        .select("id")
        .single();

      if (insertError) {
        console.error(
          "Detailed Supabase Insert Error:",
          JSON.stringify(insertError, null, 2),
        );
        throw new Error(`Database Error: ${insertError.message}`);
      }

      const res = await fetch("/api/v1/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationId: record.id,
          inputMode,
          inputValue,
          voiceId: voice.id,
          platforms: selectedPlatformsArray,
          platformCounts: activeCounts, // Send precise counts to the API
        }),
      });

      if (!res.ok) throw new Error("Failed to start processing engine.");

      return record.id;
    },
    onSuccess: (id) => {
      setGenerationId(id);
      setEngineState("processing");
      toast.info("Pipeline started", {
        description: "Analyzing input and aligning voice vectors...",
      });
    },
    onError: (error: Error) => {
      setEngineState("error");
      toast.error("Generation Failed", { description: error.message });
    },
  });

  useEffect(() => {
    if (engineState !== "processing" || !generationId) return;

    const channel = supabase
      .channel(`generation-${generationId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "content_generations",
          filter: `id=eq.${generationId}`,
        },
        (payload) => {
          const { status, result_data, error_message } = payload.new;

          if (status === "completed") {
            setGeneratedData(result_data);
            setEngineState("completed");
            toast.success("Content Synthesized!", {
              description: "Your assets are ready for export.",
            });
            queryClient.invalidateQueries({
              queryKey: ["generations-history"],
            });
          } else if (status === "failed") {
            setEngineState("error");
            toast.error("Processing Failed", {
              description: error_message || "Grok encountered an error.",
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [engineState, generationId, supabase, queryClient]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (inputMode === "url" && !inputValue.startsWith("http")) {
      toast.error("Invalid URL", {
        description: "Please enter a valid website link.",
      });
      return;
    }

    if (selectedCount === 0) {
      toast.error("No outputs selected", {
        description: "Please select at least one platform to generate.",
      });
      return;
    }

    generateMutation.mutate();
  };

  const handleReset = () => {
    setEngineState("idle");
    setInputValue("");
    setGenerationId(null);
    setGeneratedData(null);
  };

  return {
    inputMode,
    setInputMode,
    inputValue,
    setInputValue,
    engineState,
    generatedData,
    platforms,
    togglePlatform,
    selectedCount,
    handleGenerate,
    handleReset,
    platformCounts,
    setPlatformCount,
  };
}
