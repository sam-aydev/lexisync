"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative bg-paper text-ink overflow-hidden py-3 md:py-40 px-10">
      {/* Ambient background glow optimized for light mode */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,_var(--color-signal)_0%,_transparent_70%)] opacity-10 pointer-events-none blur-[80px]" />

      {/* Structural grid lines overlay - changed to dark ink lines with low opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,21,27,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,21,27,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-ink/10 bg-white/60 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-ink-soft shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
            </span>
            Ready for Omnipresence
          </div>

          <h2 className="font-display text-balance text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] mb-6">
            Your next idea is already <br className="hidden md:block" />
            <span className="text-signal italic font-serif">
              three platforms
            </span>{" "}
            ahead.
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-lg text-ink-soft text-balance mb-12">
            Paste a link. Lock in your unique brand voice. Stop letting content
            creation hold back your growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/auth/signup"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-black px-9 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(54,84,255,0.5)]"
            >
              <span>Start writing in your voice</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-faint font-mono tracking-wide">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-signal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-signal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Affordable Pricing Plans
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-signal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Sociarig AI Engine
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
