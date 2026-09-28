"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    title: "100% Brand Voice Fidelity",
    description:
      "Generic LLM outputs destroy brand trust. We train Claude Opus 5.5 dynamically on your specific past writing—matching your exact tone, pacing, and vocabulary.",
    colSpan: "lg:col-span-2",
    visual: (
      <div className="absolute right-0 bottom-0 w-[90%] md:w-[80%] h-[75%] md:h-[80%] translate-x-6 translate-y-6 md:translate-x-8 md:translate-y-8 rounded-tl-2xl border-t border-l border-ink/10 bg-white p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(18,21,27,0.1)] flex flex-col gap-3 md:gap-4">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-signal flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white shrink-0">
            YOU
          </div>
          <div className="text-[10px] md:text-xs text-ink-soft font-mono truncate">
            system_prompt.ts
          </div>
        </div>
        <div className="space-y-1.5 md:space-y-2 w-full">
          <div className="h-1.5 md:h-2 w-3/4 bg-ink/10 rounded-full" />
          <div className="h-1.5 md:h-2 w-full bg-ink/5 rounded-full" />
          <div className="h-1.5 md:h-2 w-5/6 bg-ink/5 rounded-full" />
        </div>
        <div className="mt-2 md:mt-4 p-2 md:p-3 rounded-lg border border-signal/20 bg-signal/5 text-[10px] md:text-xs text-signal font-semibold">
          "Zero corporate jargon detected. Exact stylistic match."
        </div>
      </div>
    ),
  },
  {
    title: "Zero API Timeouts",
    description:
      "Long podcasts crash standard serverless functions. Our background engine processes 2-hour audio files seamlessly.",
    colSpan: "lg:col-span-1",
    visual: (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg
          viewBox="0 0 24 24"
          className="w-40 h-40 md:w-48 md:h-48 text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>
    ),
  },
  {
    title: "Multi-Platform Export",
    description:
      "Get a properly threaded X post, a structured LinkedIn carousel, and HTML-ready newsletter copy in one click.",
    colSpan: "lg:col-span-1",
    visual: (
      <div className="absolute -right-2 -bottom-2 md:-right-4 md:-bottom-4 flex gap-2 md:gap-3 rotate-12 opacity-90">
        <div className="w-20 h-28 md:w-24 md:h-32 rounded-xl bg-white border border-[#1DA1F2]/20 shadow-lg shadow-[#1DA1F2]/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-[#1DA1F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </div>
        <div className="w-20 h-28 md:w-24 md:h-32 rounded-xl bg-white border border-[#0077b5]/20 shadow-lg shadow-[#0077b5]/10 flex items-center justify-center -translate-y-6 md:-translate-y-8">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-[#0077b5]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Developer-Grade Architecture",
    description:
      "Built on Next.js, PostgreSQL, and Supabase. No low-code wrappers, just scalable infrastructure built to handle mass traffic.",
    colSpan: "lg:col-span-2",
    visual: (
      <div className="absolute right-4 bottom-0 md:right-8 w-48 h-36 md:w-64 md:h-48 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-signal)_0%,_transparent_70%)] blur-2xl opacity-30" />
        <div className="absolute inset-0 flex flex-col gap-1.5 md:gap-2 justify-end pb-4 md:pb-8">
          <div className="h-4 md:h-6 w-full border border-ink/10 rounded bg-white shadow-sm" />
          <div className="h-4 md:h-6 w-5/6 border border-ink/10 rounded bg-white shadow-sm" />
          <div className="h-4 md:h-6 w-4/6 border border-ink/10 rounded bg-white shadow-sm" />
        </div>
      </div>
    ),
  },
];

// Animation variants for the stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function Features() {
  return (
    <section className="py-16 md:py-32 px-5 lg:px-24 bg-paper text-ink relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-signal/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />

      <div className="max-w-[var(--container-content)] mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance mb-4 md:mb-6"
          >
            No more robotic AI garbage.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-ink-soft text-balance"
          >
            The difference between going viral and being ignored is
            authenticity. We built an engine that understands the nuances of how
            you actually speak.
          </motion.p>
        </div>

        {/* Bento Grid with Stacked Animation Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-auto-rows-[minmax(300px,auto)] md:auto-rows-[320px]"
        >
          {features.map((feature, i) => (
            <BentoCard key={i} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({ feature }: { feature: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[var(--radius-xl)] bg-white border border-ink/10 shadow-sm overflow-hidden ${feature.colSpan} min-h-[300px] md:min-h-full`}
    >
      {/* Interactive Radial Gradient on Hover (Hidden on strict mobile to avoid sticky tap states) */}
      <div
        className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--color-signal-dim) 0%, transparent 60%)`,
          opacity: isHovered ? 0.03 : 0,
        }}
      />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col pointer-events-none">
        <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-ink">
          {feature.title}
        </h3>
        <p className="text-ink-soft text-sm md:text-base leading-relaxed max-w-sm">
          {feature.description}
        </p>
      </div>

      {/* Unique Visual per Card */}
      {feature.visual}
    </motion.div>
  );
}
