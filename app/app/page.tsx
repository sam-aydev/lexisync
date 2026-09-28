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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* X / Twitter Thread Output */}
              <div className="bg-white border border-ink/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_8px_30px_rgba(18,21,27,0.03)] hover:border-ink/20 transition-colors group">
                <div className="px-5 py-4 border-b border-ink/5 bg-paper/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Native SVG for X since Lucide doesn't have brand icons */}
                    <svg
                      className="w-4 h-4 text-ink"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-sm font-bold text-ink">
                      X Thread{" "}
                      <span className="text-ink-faint font-medium">
                        (8 posts)
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy("twitter")}
                    className="text-xs font-bold text-signal bg-signal/10 hover:bg-signal/20 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copied === "twitter" ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy All
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6 flex-1 max-h-[450px] overflow-y-auto space-y-5 bg-[linear-gradient(to_bottom,transparent_0%,rgba(18,21,27,0.02)_100%)]">
                  {[
                    "I spent 4 years building SaaS products the wrong way.\n\nHere is the exact architecture we use now to scale without crashing on day 1 🧵",
                    "1/ The biggest mistake founders make is putting heavy processing inside Next.js API routes. Serverless functions die after 10 seconds. You need a background worker.",
                    "2/ We use Inngest. It pulls the workload out of Vercel and guarantees execution. Even if an API rate limits you, Inngest retries automatically.",
                  ].map((tweet, i) => (
                    <div
                      key={i}
                      className="bg-white border border-ink/10 p-4 rounded-xl text-[15px] leading-relaxed text-ink shadow-sm relative pl-6"
                    >
                      <div className="absolute top-4 bottom-4 left-2.5 w-0.5 bg-ink/10 rounded-full" />
                      {tweet}
                    </div>
                  ))}
                </div>
              </div>

              {/* LinkedIn Output */}
              <div className="bg-white border border-ink/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_8px_30px_rgba(18,21,27,0.03)] hover:border-ink/20 transition-colors group">
                <div className="px-5 py-4 border-b border-ink/5 bg-[#0077b5]/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <svg
                      className="w-4 h-4 text-[#0077b5]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm font-bold text-ink">
                      LinkedIn Draft
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy("linkedin")}
                    className="text-xs font-bold text-[#0077b5] bg-[#0077b5]/10 hover:bg-[#0077b5]/20 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copied === "linkedin" ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Text
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6 flex-1 max-h-[450px] overflow-y-auto bg-white">
                  <p className="text-[15px] leading-relaxed text-ink whitespace-pre-wrap font-sans">
                    Stop putting heavy AI generation directly in your Next.js
                    API routes. You are setting yourself up for failure.
                    <br />
                    <br />
                    Yesterday, a founder reached out because their new launch
                    was failing. Users were clicking "Generate", waiting 15
                    seconds, and getting a 504 Gateway Timeout.
                    <br />
                    <br />
                    The culprit? Serverless architecture. Vercel kills your
                    function after 10 seconds on the free tier.
                    <br />
                    <br />
                    The fix took 20 minutes to implement:
                    <br />
                    1. Return an immediate 200 OK to the client.
                    <br />
                    2. Fire off an event to a background worker (we use
                    Inngest).
                    <br />
                    3. Let the background worker process the heavy AI task.
                    <br />
                    4. Push the result back to the client via WebSockets or
                    Supabase Realtime.
                    <br />
                    <br />
                    Build for scale on day one.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
