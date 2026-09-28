"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AudioLines, Calendar, Link2 } from "lucide-react";
import ExportWorkflows from "@/components/dashboard/ExportWorkflows";

export default function Page() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // In production, you will fetch the generation data from Supabase using params.id
  // const { data } = await supabase.from('generations').select('*').eq('id', params.id).single();

  useEffect(() => {
    // Simulating a quick network fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Navigation & Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/dashboard/history"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors px-3 py-1.5 -ml-3 rounded-lg hover:bg-paper-dim/50"
        >
          <ArrowLeft size={16} />
          Back to History
        </Link>
      </div>

      {/* Detail Header */}
      <div className="mb-10 bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-md bg-paper-dim/50 border border-ink/5 text-[11px] font-semibold tracking-wide uppercase text-ink-soft">
            <AudioLines size={12} className="text-signal" />
            Saved Generation
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight mb-3">
            Startup Metrics & Scaling
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Link2 size={16} className="text-ink-faint" />
              <a
                href="#"
                className="hover:text-signal hover:underline underline-offset-4 transition-colors"
              >
                youtube.com/watch?v=startup-metrics
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-ink-faint" />
              September 21, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-4 border-ink/10 border-t-signal rounded-full animate-spin" />
          <p className="text-sm font-medium text-ink-soft animate-pulse">
            Retrieving historical data...
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Exported Assets
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              These assets were generated using your 'LinkedIn Pro' brand voice.
            </p>
          </div>

          {/* Reusing the exact same component from the main generator page */}
          <ExportWorkflows
            content={{
              twitter: [
                "Growth isn't about top-of-funnel noise. It's about retention.",
                "1/ Most founders track active users. But if your churn rate is higher than 5%, you are filling a leaky bucket.",
                "2/ Fix your core loop before you spend another dollar on ads.",
              ],
              threads: [
                "Growth isn't about top-of-funnel noise. It's about retention.",
                "If your churn rate is higher than 5%, you are filling a leaky bucket. Fix your core loop before spending on ads.",
              ],
              linkedin:
                "Are you filling a leaky bucket?\n\nMost founders are obsessed with top-of-funnel metrics. They celebrate high sign-up days while quietly bleeding users out the back door.\n\nIf your churn rate is above 5%, stop spending on ads. Focus entirely on your core loop.",
              instagram:
                "Are you filling a leaky bucket? 🪣 \n\nFounders love celebrating sign-ups, but retention is the only metric that matters for long-term survival. Fix your churn before you scale. \n\n#startups #growth #metrics",
              newsletter: {
                subject: "Why Your Growth Strategy is Failing",
                html: "<p>Hey everyone,</p><p>Let's talk about the leaky bucket problem.</p><p>If your churn rate is above 5%, stop spending on ads immediately.</p>",
              },
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
