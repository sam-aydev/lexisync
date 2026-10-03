"use server";

import { createClient } from "@/app/lib/util/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteVoiceDocument(documentId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // RLS will ensure they only delete their own documents
  const { error } = await supabase
    .from("voice_documents")
    .delete()
    .eq("id", documentId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/app/voices");
  return { success: true };
}