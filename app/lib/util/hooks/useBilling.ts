import { useQuery, useMutation } from "@tanstack/react-query";
import { createClient } from "@/app/lib/util/supabase/client";
import { toast } from "sonner";

export interface SubscriptionData {
  status: string;
  name: string;
  renews_at: string;
  customer_portal_url: string;
  generations_used: number;
  max_generations: number;
  price_id: string;
}

export function useBilling() {
  const supabase = createClient();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 is "Row not found"
      return data as SubscriptionData | null;
    },
  });

  const getCheckoutURL = useMutation({
    mutationFn: async (variantId: number) => {
      const res = await fetch("/api/v1/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      if (!res.ok) throw new Error("Failed to generate checkout link");
      const { url } = await res.json();
      return url;
    },
    onSuccess: (url) => {
      // Redirect to Lemon Squeezy hosted checkout
      window.location.href = url;
    },
    onError: (err: any) =>
      toast.error("Checkout Error", { description: err.message }),
  });

  const manageSubscription = () => {
    if (subscription?.customer_portal_url) {
      window.location.href = subscription.customer_portal_url;
    } else {
      toast.error("Customer portal not available.");
    }
  };

  return {
    subscription,
    isLoading,
    upgrade: (variantId: number) => getCheckoutURL.mutate(variantId),
    isRedirecting: getCheckoutURL.isPending,
    manageSubscription,
  };
}
