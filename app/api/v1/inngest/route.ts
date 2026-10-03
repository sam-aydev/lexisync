import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import { generateContent } from "@/app/inngest/functions";
import { processVoiceDocument } from "@/app/inngest/voice-functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateContent,
    processVoiceDocument
  ],
});