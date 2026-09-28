"use client";

import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

export default function HistoryPage() {
  // Simulating a slightly larger dataset to warrant pagination visuals
  const history = [
    {
      id: "gen_1",
      url: "youtube.com/watch?v=saas-growth",
      type: "Video",
      date: "Today, 10:42 AM",
      status: "completed",
    },
    {
      id: "gen_2",
      url: "blog.buildon.com/engineering-scale",
      type: "Article",
      date: "Yesterday, 2:15 PM",
      status: "completed",
    },
    {
      id: "gen_3",
      url: "youtube.com/watch?v=api-design",
      type: "Video",
      date: "Sep 24, 2026",
      status: "failed",
    },
    {
      id: "gen_4",
      url: "youtube.com/watch?v=startup-metrics",
      type: "Video",
      date: "Sep 21, 2026",
      status: "completed",
    },
    {
      id: "gen_5",
      url: "news.ycombinator.com/item?id=38472",
      type: "Thread",
      date: "Sep 18, 2026",
      status: "completed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight mb-2">
            Generation History
          </h1>
          <p className="text-ink-soft">
            Access and export your previously synthesized content.
          </p>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="text"
            placeholder="Search URLs..."
            className="pl-9 pr-4 py-2.5 bg-white border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal w-full sm:w-64 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl shadow-sm flex flex-col h-full max-h-[700px]">
        {/* Table Content */}
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-white z-10 border-b border-ink/10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <tr className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Source URL</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5 text-sm">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-paper-dim/20 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-ink max-w-[200px] truncate">
                    {item.url}
                  </td>
                  <td className="px-6 py-4 text-ink-soft">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-paper border border-ink/5 text-xs font-medium">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-soft">{item.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest ${
                        item.status === "completed"
                          ? "bg-signal/10 text-signal"
                          : "bg-ember/10 text-ember"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-ink-soft hover:text-signal hover:bg-signal/10 rounded-lg transition-colors border border-transparent hover:border-signal/20"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 text-ink-soft hover:text-ember hover:bg-ember/10 rounded-lg transition-colors border border-transparent hover:border-ember/20"
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Premium Pagination Footer */}
        <div className="px-6 py-4 border-t border-ink/10 bg-paper-dim/20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-2xl">
          <span className="text-xs text-ink-soft font-medium">
            Showing <strong className="text-ink">1</strong> to{" "}
            <strong className="text-ink">5</strong> of{" "}
            <strong className="text-ink">24</strong> entries
          </span>

          <div className="flex items-center gap-1.5">
            <button className="p-1.5 mr-1 rounded-lg text-ink-soft hover:text-ink hover:bg-white border border-transparent hover:border-ink/10 transition-all shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-transparent">
              <ChevronLeft size={16} />
            </button>

            {/* Active Page */}
            <button className="w-8 h-8 rounded-lg bg-signal text-white text-xs font-semibold flex items-center justify-center shadow-md shadow-signal/20">
              1
            </button>

            {/* Inactive Pages */}
            <button className="w-8 h-8 rounded-lg text-ink-soft hover:text-ink hover:bg-white border border-transparent hover:border-ink/10 text-xs font-medium flex items-center justify-center transition-all">
              2
            </button>
            <button className="w-8 h-8 rounded-lg text-ink-soft hover:text-ink hover:bg-white border border-transparent hover:border-ink/10 text-xs font-medium flex items-center justify-center transition-all hidden sm:flex">
              3
            </button>

            <div className="w-8 h-8 flex items-center justify-center text-ink-faint">
              <MoreHorizontal size={14} />
            </div>

            <button className="w-8 h-8 rounded-lg text-ink-soft hover:text-ink hover:bg-white border border-transparent hover:border-ink/10 text-xs font-medium flex items-center justify-center transition-all hidden sm:flex">
              8
            </button>

            <button className="p-1.5 ml-1 rounded-lg text-ink-soft hover:text-ink hover:bg-white border border-transparent hover:border-ink/10 transition-all shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
