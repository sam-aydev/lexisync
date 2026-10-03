"use client";

import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function PlatformShowcase() {
  return (
    <section className="relative mx-auto max-w-[var(--container-content)] px-6 lg:px-24 py-8 md:px-10 md:py-32 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-signal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl text-center mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-6xl">
            Native to every feed it lands in.
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink-soft max-w-xl mx-auto">
            Not one draft copy-pasted three times. Each output is structurally
            engineered for how people actually consume content on that platform.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
      >
        {/* Thread mock (X / Twitter) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group relative rounded-[var(--radius-xl)] border border-ink/10 bg-white/80 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(54,84,255,0.1)] hover:border-signal/30 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-signal to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <div>
                <p className="text-[14px] font-bold text-ink leading-none">
                  Adetunji Samuel
                </p>
                <p className="text-[13px] text-ink-faint mt-1">@adetunji_s</p>
              </div>
            </div>
            {/* X Logo */}
            <svg
              className="w-5 h-5 text-ink/20 group-hover:text-ink/60 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <p className="text-[15px] leading-relaxed text-ink flex-1">
            Nobody tells you the real reason cold outreach dies in the first
            line. It reads like a template, not a person.
            <br />
            <br />
            Here is the exact framework I changed 🧵
          </p>
          <div className="mt-6 flex items-center gap-6 text-ink-faint text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>{" "}
              247
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>{" "}
              1.2k
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>{" "}
              4.8k
            </span>
          </div>
        </motion.div>

        {/* Carousel mock (LinkedIn) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group relative rounded-[var(--radius-xl)] border border-ink/10 bg-ink p-6 text-paper shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(15,17,22,0.4)] flex flex-col justify-between overflow-hidden"
        >
          {/* Decorative shine effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <p className="text-xs font-semibold tracking-wider text-paper/60 uppercase">
                LinkedIn Carousel
              </p>
              <svg
                className="w-5 h-5 text-paper/40 group-hover:text-[#0A66C2] transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>

            <div className="relative z-10 bg-white/5 border border-white/10 rounded-lg p-6 flex items-center justify-center aspect-[4/3] mb-6">
              <p className="font-display text-2xl md:text-3xl leading-tight text-center text-balance">
                The line that kills your open rate.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center text-[11px] text-paper/40 mb-2 font-medium">
              <span>Swipe</span>
              <span>1 of 6</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  className={`h-1.5 flex-1 rounded-full ${i === 0 ? "bg-signal shadow-[0_0_8px_rgba(54,84,255,0.8)]" : "bg-paper/20"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Email mock (Newsletter) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group relative rounded-[var(--radius-xl)] border border-ink/10 bg-white/80 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(54,84,255,0.1)] hover:border-signal/30 flex flex-col md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <svg
              className="w-5 h-5 text-ink/20 group-hover:text-ink/60 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
          </div>

          <div className="rule-full mb-4 group-hover:bg-signal/20 transition-colors" />

          <div className="mb-4">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-xs font-semibold text-ink-faint w-12">
                Subject
              </span>
              <span className="text-[14px] font-bold text-ink">
                The line I stopped using
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-semibold text-ink-faint w-12">
                From
              </span>
              <span className="text-[13px] text-ink-soft bg-paper-dim px-2 py-0.5 rounded-md">
                samuel@engine.co
              </span>
            </div>
          </div>

          <div className="bg-paper/50 rounded-lg p-4 flex-1 border border-ink/5">
            <p className="text-[14px] leading-relaxed text-ink-soft">
              Hey — quick one today.
              <br />
              <br />
              Last week a reader asked me why their cold emails go straight to
              the archive. I looked at their script, and the problem was obvious
              within 3 seconds.
            </p>
            <div className="mt-5 inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2 text-xs font-medium text-paper w-full group-hover:bg-signal transition-colors duration-300">
              Read the full breakdown
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
