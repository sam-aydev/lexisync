"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Sparkles,
  Copy,
  Check,
  RefreshCcw,
  AudioLines,
  Settings2,
} from "lucide-react";
import ExportWorkflows from "@/components/dashboard/ExportWorkflows";

type EngineState = "idle" | "processing" | "completed";

export default function GeneratorPage() {
  const [url, setUrl] = useState("");
  const [engineState, setEngineState] = useState<EngineState>("idle");
  const [copied, setCopied] = useState<string | null>(null);

  // Simulated Generation Process
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setEngineState("processing");
    // Simulate pipeline delay
    setTimeout(() => {
      setEngineState("completed");
    }, 4000);
  };

  const handleCopy = (id: string) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-md bg-white border border-ink/10 text-[11px] font-semibold tracking-wide uppercase text-ink-soft shadow-sm">
          <AudioLines size={12} className="text-signal" />
          Claude Opus 5.5 Pipeline
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-3">
          Synthesize new content.
        </h1>
        <p className="text-base md:text-lg text-ink-soft leading-relaxed">
          Paste a YouTube or blog URL below. The engine will extract the
          transcript, inject your brand voice parameters, and format it for your
          chosen platforms.
        </p>
      </div>

      {/* The Input Engine */}
      <motion.div
        layout
        className="bg-white border border-ink/10 rounded-[1.5rem] p-2 shadow-sm mb-10 relative overflow-hidden"
      >
        <form
          onSubmit={handleGenerate}
          className="relative z-10 bg-paper-dim/20 rounded-2xl border border-white p-4 md:p-6 shadow-inner"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-ink-faint transition-colors group-focus-within:text-signal">
                <Link2 size={20} strokeWidth={2.5} />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                disabled={engineState !== "idle"}
                required
                className="w-full pl-14 pr-5 py-4 bg-white border border-ink/10 rounded-xl text-base focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal transition-all placeholder:text-ink-faint disabled:opacity-50 font-mono shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={engineState !== "idle"}
              className="px-8 py-4 bg-ink text-paper rounded-xl font-medium text-base transition-all hover:bg-ink-soft hover:shadow-xl hover:shadow-ink/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 whitespace-nowrap group"
            >
              <Sparkles
                size={18}
                className="text-paper transition-transform group-hover:scale-110 group-hover:rotate-12"
              />
              Synthesize Now
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 px-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Settings2 size={14} className="text-ink-faint" />
              Target:{" "}
              <span className="text-ink">Thread, Carousel, Newsletter</span>
            </span>
          </div>
        </form>

        {/* Processing State Overlay */}
        <AnimatePresence>
          {engineState === "processing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-[1.5rem]"
            >
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-xl shadow-ink/5 border border-ink/10">
                <div className="relative flex items-center justify-center w-6 h-6">
                  <div className="absolute inset-0 border-2 border-ink/10 rounded-full" />
                  <div className="absolute inset-0 border-2 border-transparent border-t-signal rounded-full animate-spin" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-ink">
                    Engine is working...
                  </span>
                  <span className="text-[11px] font-medium text-ink-soft animate-pulse">
                    Aligning voice vectors & formatting outputs
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The Output Area */}
      <AnimatePresence>
        {engineState === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink">
                Generated Assets
              </h2>
              <button
                onClick={() => {
                  setEngineState("idle");
                  setUrl("");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-ink/10 text-sm font-medium text-ink-soft hover:text-ink hover:bg-paper transition-colors shadow-sm"
              >
                <RefreshCcw size={14} />
                Start Over
              </button>
            </div>

            {/* THIS IS WHERE THE EXPORT CARDS APPEAR */}
            <ExportWorkflows
              content={{
                twitter: [
                  "I spent 4 years building SaaS products...",
                  "1/ The biggest mistake...",
                ],
                threads: [
                  "I spent 4 years building SaaS products...",
                  "The biggest mistake...",
                ],
                linkedin:
                  "Stop putting heavy AI generation directly in your Next.js API routes...",
                instagram:
                  "Serverless architecture is a trap... \n\n#buildinpublic",
                newsletter: {
                  subject: "The Serverless Trap",
                  html: "<p>Hey everyone,</p>",
                },
              }}
            />
            {/* END OF EXPORT CARDS */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
