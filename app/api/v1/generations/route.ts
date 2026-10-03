import { NextResponse } from "next/server";
import { inngest } from "@/app/inngest/client";
import { createClient } from "@/app/lib/util/supabase/server";

export async function POST(req: Request) {
  try {
    const {
      generationId,
      inputMode,
      inputValue,
      voiceId,
      platforms,
      platformCounts,
    } = await req.json();

    const supabase = await createClient();

    // Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch Subscription Limits
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("name, generations_used, max_generations, status")
      .eq("user_id", user.id)
      .maybeSingle();

    const planName =
      sub?.status === "active" ? sub?.name?.toLowerCase() || "free" : "free";
    const used = sub?.generations_used || 0;
    const max = sub?.status === "active" ? sub?.max_generations || 5 : 5; // Default 5 for Free

    // Security: Prevent Free users from generating Newsletters
    if (platforms.includes("newsletter") && planName.includes("free")) {
      return NextResponse.json(
        { error: "Newsletter generation requires the Starter plan or higher." },
        { status: 403 },
      );
    }

    // Calculate total requested volume
    let requestedCount = 0;
    for (const p of platforms) {
      requestedCount += platformCounts[p] || 1;
    }

    // Security: Enforce Generation Limits
    if (used + requestedCount > max) {
      return NextResponse.json(
        {
          error: `Limit exceeded. You requested ${requestedCount} items, but only have ${max - used} left.`,
        },
        { status: 403 },
      );
    }

    // Deduct Credits
    const { error: usageError } = await supabase
      .from("subscriptions")
      .update({ generations_used: used + requestedCount })
      .eq("user_id", user.id);

    if (usageError) throw new Error("Failed to update usage limits.");

    // Trigger Background Worker with Idempotency
    await inngest.send({
      name: "app/generate.content",
      id: `generation-${generationId}`,
      data: {
        generationId,
        inputMode,
        inputValue,
        voiceId,
        platforms,
        platformCounts,
      },
    });

    return NextResponse.json({ success: true, generationId });
  } catch (error) {
    console.error("Generation API Error:", error);
    return NextResponse.json(
      { error: "Failed to initiate generation" },
      { status: 500 },
    );
  }
}
