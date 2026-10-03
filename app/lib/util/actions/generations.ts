"use server";

import { createClient } from "@/app/lib/util/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteGenerationRecord(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("content_generations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(`Deletion failed: ${error.message}`);

  revalidatePath("/app/history");
  return { success: true };
}