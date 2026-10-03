"use client";

import { motion, Variants, AnimatePresence } from "motion/react";
import {
  Plus,
  FileText,
  CheckCircle2,
  MoreVertical,
  UploadCloud,
  Search,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useVoices, VoiceDoc } from "@/app/lib/util/hooks/useVoices";
import { format } from "date-fns";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function VoicesPage() {
  const {
    documents,
    totalItems,
    isLoading,
    isUploading,
    fileInputRef,
    handleFileChange, 
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    totalPages,
    handleDelete,
    isDeleting,
  } = useVoices();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-2">
            Brand Voices
          </h1>
          <p className="text-ink-soft text-base">
            Upload past blog posts, newsletters, and articles to train your
            vector identity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint group-focus-within:text-signal transition-colors"
            />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 px-4 py-2 bg-white border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm w-full md:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-black text-paper rounded-xl font-medium text-sm transition-all shadow-md shadow-ink/10 hover:shadow-lg active:scale-95 whitespace-nowrap disabled:opacity-50"
          >
            <Plus size={16} /> Upload Source
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isLoading && !searchQuery && totalItems > 0 && totalItems < 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4 shadow-sm mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-amber-900 mb-1">
                  Vector Identity Quality is Low ({totalItems}/3 sources)
                </h3>
                <p className="text-sm text-amber-700 leading-relaxed max-w-3xl">
                  You have fewer than 3 sources active. To ensure Sociarig
                  accurately mimics your brand voice, formatting habits, and
                  tone, we highly recommend uploading at least 3 high-quality
                  examples of your past work.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Area */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Static Upload Card */}
          <motion.div
            variants={item}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`bg-paper-dim/40 border-2 border-dashed border-ink/15 rounded-[1.5rem] p-6 flex flex-col items-center justify-center text-center transition-all min-h-[220px] ${isUploading ? "opacity-50 cursor-wait" : "hover:bg-paper-dim/60 hover:border-signal/40 cursor-pointer group"}`}
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all relative">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
              ) : (
                <UploadCloud
                  size={24}
                  className="text-ink-soft group-hover:text-signal transition-colors"
                />
              )}
            </div>
            <h3 className="text-[15px] font-bold text-ink mb-1">
              {isUploading ? "Uploading..." : "Upload New File"}
            </h3>
            <p className="text-xs text-ink-faint px-4">
              PDF, DOCX, or TXT up to 10MB
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.pdf,.docx"
              className="hidden"
            />
          </motion.div>

          {/* Document Cards */}
          <AnimatePresence>
            {documents.map((doc: VoiceDoc) => (
              <motion.div
                layout
                variants={item}
                exit={{ opacity: 0, scale: 0.9 }}
                key={doc.id}
                className="bg-white border border-ink/10 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex flex-col justify-between min-h-[220px] group relative overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-paper to-paper-dim border border-ink/5 flex items-center justify-center shadow-inner">
                    <FileText size={20} className="text-ink-soft" />
                  </div>

                  {/* Hover Delete Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(doc.id);
                    }}
                    disabled={isDeleting}
                    className="p-2 text-ink-faint hover:text-ember hover:bg-ember/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-4 relative z-10">
                  <h3
                    className="text-[15px] font-bold text-ink truncate mb-1.5"
                    title={doc.file_name}
                  >
                    {doc.file_name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft bg-paper px-2 py-0.5 rounded-md border border-ink/5">
                      {doc.file_name.split(".").pop()}
                    </span>
                    <span className="text-[11px] font-medium text-ink-faint">
                      {format(new Date(doc.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-ink/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    {doc.status === "completed" ? (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    ) : doc.status === "failed" ? (
                      <div className="w-2 h-2 rounded-full bg-ember" />
                    ) : (
                      <div className="w-3.5 h-3.5 border-2 border-ink/20 border-t-signal rounded-full animate-spin" />
                    )}
                    <span
                      className={`text-[12px] font-bold ${doc.status === "completed" ? "text-emerald-500" : doc.status === "failed" ? "text-ember" : "text-signal"}`}
                    >
                      {doc.status === "completed"
                        ? "Active"
                        : doc.status === "failed"
                          ? "Failed"
                          : "Vectorizing..."}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-ink/10 text-ink-soft hover:bg-paper hover:text-ink disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-ink bg-paper px-4 py-1.5 rounded-lg border border-ink/5">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-ink/10 text-ink-soft hover:bg-paper hover:text-ink disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
