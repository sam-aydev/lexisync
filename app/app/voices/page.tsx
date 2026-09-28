"use client";

import { motion } from "framer-motion";
import { Mic2, Plus, FileText, CheckCircle2, MoreVertical, UploadCloud } from "lucide-react";

export default function VoicesPage() {
  const voices = [
    { id: 1, name: "newsletter-march-drop.txt", type: "Newsletter", status: "Active", date: "Sep 22, 2026" },
    { id: 2, name: "linkedin-viral-thread.pdf", type: "LinkedIn", status: "Active", date: "Sep 20, 2026" },
    { id: 3, name: "clinical-rehab-notes.docx", type: "Academic", status: "Training", date: "Sep 27, 2026" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight mb-2">Brand Voices</h1>
          <p className="text-ink-soft">Manage the source files used to train your personal writing style.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-xl font-medium text-sm transition-all hover:bg-ink-soft active:scale-95 shadow-sm">
          <Plus size={16} />
          Upload Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Upload Card */}
        <div className="bg-paper-dim/30 border-2 border-dashed border-ink/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-paper-dim/50 hover:border-signal/50 transition-colors cursor-pointer min-h-[220px] group">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud size={20} className="text-ink-soft group-hover:text-signal transition-colors" />
          </div>
          <h3 className="text-sm font-semibold text-ink mb-1">Upload New File</h3>
          <p className="text-xs text-ink-faint px-4">PDF, DOCX, or TXT up to 10MB</p>
        </div>

        {/* Voice Cards */}
        {voices.map((voice, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={voice.id} 
            className="bg-white border border-ink/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-paper-dim/50 border border-ink/5 flex items-center justify-center">
                <FileText size={18} className="text-ink-soft" />
              </div>
              <button className="p-1.5 text-ink-faint hover:text-ink hover:bg-paper rounded-md transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-ink truncate mb-1" title={voice.name}>{voice.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-ink-soft bg-paper px-2 py-0.5 rounded-md border border-ink/5">
                  {voice.type}
                </span>
                <span className="text-[11px] text-ink-faint">{voice.date}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-ink/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {voice.status === "Active" ? (
                  <CheckCircle2 size={14} className="text-signal" />
                ) : (
                  <div className="w-3 h-3 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
                )}
                <span className={`text-xs font-semibold ${voice.status === "Active" ? "text-signal" : "text-ink-soft"}`}>
                  {voice.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}