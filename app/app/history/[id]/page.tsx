"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AudioLines, Calendar, Link2, Lightbulb } from "lucide-react";
import ExportWorkflows from "@/components/dashboard/ExportWorkflows";
import { useGenerationDetail } from "@/app/lib/util/hooks/useHistory";
import { format } from "date-fns";

export default function GenerationDetailPage() {
  const params = useParams();
  const generationId = params.id as string;
  
  const { data, isLoading, error } = useGenerationDetail(generationId);

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto py-20 text-center">
        <h2 className="text-xl font-bold text-ink mb-2">Record Not Found</h2>
        <p className="text-ink-soft mb-6">This generation may have been deleted or does not exist.</p>
        <Link href="/app/history" className="text-signal hover:underline">Return to History</Link>
      </div>
    );
  }

  const isIdea = data?.metadata?.input_mode === "idea";
  const displayTitle = isIdea ? data?.metadata?.topic : data?.source_url;

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/app/history" className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink transition-colors px-3 py-1.5 -ml-3 rounded-lg hover:bg-white hover:shadow-sm">
          <ArrowLeft size={16} /> Back to History
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-8 h-8 border-4 border-ink/10 border-t-signal rounded-full animate-spin" />
          <p className="text-sm font-bold text-ink-soft animate-pulse uppercase tracking-widest">Retrieving Assets...</p>
        </div>
      ) : data ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          {/* Detail Header */}
          <div className="mb-10 bg-white border border-ink/10 rounded-[1.5rem] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
               {isIdea ? <Lightbulb size={120} /> : <Link2 size={120} />}
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-5 rounded-md bg-signal/10 border border-signal/20 text-[11px] font-extrabold tracking-widest uppercase text-signal">
                <AudioLines size={12} /> Synthesized Asset
              </div>
              
              <h1 className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight mb-4 max-w-2xl leading-snug">
                {displayTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-ink-soft font-medium">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-paper rounded-lg border border-ink/5">
                  <Calendar size={14} className="text-ink-faint" />
                  {format(new Date(data.created_at), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-paper rounded-lg border border-ink/5">
                  {isIdea ? <Lightbulb size={14} className="text-ink-faint"/> : <Link2 size={14} className="text-ink-faint" />}
                  {isIdea ? "Generated from Raw Idea" : "Generated from URL"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-ink">Exported Assets</h2>
            <p className="text-sm font-medium text-ink-soft mt-1">
              Generated using your active vector brand voice.
            </p>
          </div>

          {/* Render the unified workflows component using the JSON data from the database */}
          <ExportWorkflows content={data.result_data} />
          
        </motion.div>
      ) : null}
    </div>
  );
}