import { NextResponse } from "next/server";
import { inngest } from "@/app/inngest/client";
import { createClient } from "@/app/lib/util/supabase/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const voiceId = formData.get("voiceId") as string;

    if (!file || !voiceId) {
      return NextResponse.json(
        { error: "File and Voice ID are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawContent = "";
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (fileExtension === "txt") {
      rawContent = buffer.toString("utf-8");
    } else if (fileExtension === "pdf") {
      // PROMISE WRAPPER WITH CORRECT TYPES AND SAFE DECODING
      rawContent = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser(null, true);

        pdfParser.on("pdfParser_dataError", (errData) => {
          const errorMessage =
            (errData as any).parserError?.message || "PDF parsing failed";
          reject(new Error(errorMessage));
        });

        pdfParser.on("pdfParser_dataReady", () => {
          const extractedText = pdfParser.getRawTextContent();

          try {
            // Safely attempt to decode
            resolve(decodeURIComponent(extractedText));
          } catch (e) {
            // Safe Fallback
            resolve(extractedText);
          }
        });

        pdfParser.parseBuffer(buffer);
      });
    } else if (fileExtension === "docx") {
      const docxData = await mammoth.extractRawText({ buffer });
      rawContent = docxData.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use TXT, PDF, or DOCX." },
        { status: 400 },
      );
    }

    rawContent = rawContent.replace(/\s+/g, " ").trim();

    if (!rawContent || rawContent.length < 50) {
      return NextResponse.json(
        { error: "Could not extract enough text from this file." },
        { status: 400 },
      );
    }

    const { data: record, error: dbError } = await supabase
      .from("voice_documents")
      .insert({
        user_id: user.id,
        voice_id: voiceId,
        file_name: fileName,
        raw_content: rawContent,
        status: "processing",
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    await inngest.send({
      name: "app/voice.process",
      data: {
        documentId: record.id,
        rawContent: rawContent,
      },
    });

    return NextResponse.json({ success: true, documentId: record.id });
  } catch (error) {
    console.error("Voice Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process the document" },
      { status: 500 },
    );
  }
}
