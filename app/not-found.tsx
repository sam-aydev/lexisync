"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/landing/Nav"; // Adjust import path as needed

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col bg-paper text-ink font-sans relative overflow-hidden">
      {/* 1. Global Navigation */}
      <div className="z-50 shrink-0">
        <Nav />
      </div>

      {/* 2. Ambient Background Effects (Safe for Mobile/Tablet) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Subtle animated glowing orbs - Using Ember for the error state */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80%] max-w-[500px] aspect-square bg-ember blur-[100px] md:blur-[150px] rounded-full opacity-10 translate-x-1/4 -translate-y-1/4"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-[70%] max-w-[400px] aspect-square bg-ink blur-[100px] md:blur-[120px] rounded-full opacity-5 -translate-x-1/3 translate-y-1/3"
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,21,27,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_20%,transparent_100%)]" />
      </div>

      {/* 3. Main Content Container */}
      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-2 px-5 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-2 rounded-full border border-ember/20 bg-ember/5 text-[10px] md:text-xs font-semibold tracking-wide uppercase text-ember">
            <span className="flex h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
            System Error 404
          </div>

          {/* Abstract 404 Typography */}
          <div className="relative mb-2">
            <motion.h1
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none text-ink drop-shadow-sm"
            >
              404
            </motion.h1>
            {/* Decorative strike-through line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "110%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 md:h-2 bg-ember/90 rounded-full mix-blend-multiply -rotate-3 origin-center"
            />
          </div>

          <h2 className="font-display text-2xl md:text-4xl font-semibold text-ink mb-4">
            Page not found.
          </h2>

          <p className="text-sm md:text-lg text-ink-soft max-w-md mx-auto mb-4 leading-relaxed px-4">
            The node you are looking for doesn't exist in the network. It might
            have been moved, deleted, or you typed the URL incorrectly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-ink text-paper rounded-xl font-medium text-[13px] md:text-sm transition-all hover:bg-ink-soft hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Return Home
            </Link>

            <Link
              href="/auth"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-ink/10 text-ink rounded-xl font-medium text-[13px] md:text-sm transition-all hover:bg-paper-dim active:scale-[0.98] flex items-center justify-center"
            >
              Go to Workspace
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
