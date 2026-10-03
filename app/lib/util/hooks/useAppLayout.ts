import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/app/lib/util/supabase/client";

export interface ActivityEvent {
  id: string;
  type: "success" | "alert" | "processing";
  message: string;
  time: string;
}

export function useAppLayout() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["layout-data"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      // 1. Fetch Profile Data
      const fullName = user.user_metadata?.full_name || "John Doe";
      const initials = fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      // 2. Fetch Active Subscription / Usage Data
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("name, generations_used, max_generations, status")
        .eq("user_id", user.id)
        .maybeSingle();

      // 3. Fetch Real-time Activity (Last 5 Generations)
      const { data: recentGenerations } = await supabase
        .from("content_generations")
        .select("id, status, created_at, source_url, metadata")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      const activities: ActivityEvent[] = (recentGenerations || []).map(
        (gen) => {
          const isIdea = gen.metadata?.input_mode === "idea";
          const topic = isIdea ? gen.metadata?.topic : gen.source_url;
          const shortName = topic
            ? topic.length > 25
              ? topic.substring(0, 25) + "..."
              : topic
            : "Asset";

          let type: ActivityEvent["type"] = "processing";
          if (gen.status === "completed") type = "success";
          if (gen.status === "failed") type = "alert";

          return {
            id: gen.id,
            type,
            message: `${type === "success" ? "Synthesized" : type === "alert" ? "Failed" : "Processing"}: ${shortName}`,
            time: gen.created_at,
          };
        },
      );

      return {
        userId: user.id,
        fullName,
        initials,
        planName: sub?.status === "active" ? sub?.name || "Free" : "Free",
        used: sub?.generations_used || 0,
        // Free tier defaults to 5 generations
        limit: sub?.status === "active" ? sub?.max_generations || 5 : 5,
        status: sub?.status || "inactive",
        activities,
      };
    },
    staleTime: 1000 * 60 * 1,
  });

  // REAL-TIME LISTENER: Watch for BOTH generation updates and subscription updates
  useEffect(() => {
    if (!data?.userId) return;

    const genChannel = supabase
      .channel("layout-activity-feed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "content_generations",
          filter: `user_id=eq.${data.userId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["layout-data"] });
        },
      )
      .subscribe();

    const subChannel = supabase
      .channel("layout-subscription-feed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "subscriptions",
          filter: `user_id=eq.${data.userId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["layout-data"] });
          queryClient.invalidateQueries({ queryKey: ["user-subscription"] });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(genChannel);
      supabase.removeChannel(subChannel);
    };
  }, [data?.userId, supabase, queryClient]);

  return {
    userData: data,
    isLoading,
  };
}
