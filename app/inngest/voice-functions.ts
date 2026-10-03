import { inngest } from "./client";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Simple utility to chunk text by paragraphs to preserve context
function chunkText(text: string, maxChunkLength: number = 1000): string[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += paragraph + "\n\n";
  }
  if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
  return chunks;
}

export const processVoiceDocument = inngest.createFunction(
  { 
    id: "process-voice-document", 
    name: "Chunk and Embed Voice Source", 
    retries: 2,
    // 🔥 INNGEST V4 SYNTAX: Move the trigger inside the config object
    triggers: [{ event: "app/voice.process" }] 
  },
  // 🔥 The handler is now the 2nd argument
  async ({ event, step }) => {
    const { documentId, rawContent } = event.data;

    try {
      // Step 1: Chunk the raw text
      const chunks = await step.run("chunk-text", async () => chunkText(rawContent));

      // Step 2: Get Embeddings from OpenAI for all chunks in one batch
      const embeddings = await step.run("generate-embeddings", async () => {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunks,
        });
        return response.data;
      });

      // Step 3: Save chunks and vectors to Supabase
      await step.run("save-embeddings", async () => {
        const insertData = chunks.map((chunk, i) => ({
          document_id: documentId,
          content: chunk,
          embedding: embeddings[i].embedding,
        }));

        const { error } = await supabase.from("voice_embeddings").insert(insertData);
        if (error) throw new Error(`Failed to insert embeddings: ${error.message}`);
      });

      // Step 4: Mark document as completed
      await step.run("update-document-status", async () => {
        await supabase.from("voice_documents").update({ status: "completed" }).eq("id", documentId);
      });

      return { success: true, chunksProcessed: chunks.length };

    } catch (error) {
      await supabase.from("voice_documents").update({ status: "failed" }).eq("id", documentId);
      throw error;
    }
  }
);