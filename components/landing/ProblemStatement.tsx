'use client'

import { motion } from 'framer-motion'

export default function ProblemStatement() {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-24 overflow-hidden bg-white/40 backdrop-blur-md border-y border-ink/10">
      {/* Structural background accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[var(--container-content)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: The Hook & Tag */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-ember/20 bg-ember/5 text-xs font-bold uppercase tracking-wider text-ember">
              The Content Bottleneck
            </div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight text-balance">
              Omnipresence shouldn't feel like a second job.
            </h2>
          </motion.div>

          {/* Right Column: The Agitation Statement with Staggered Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="font-display text-xl md:text-3xl text-balance font-normal leading-snug text-ink">
              Every marketer knows they should be everywhere — <span className="text-signal font-semibold">X, LinkedIn, the inbox.</span>
            </p>

            <div className="rule-full my-2" />

            <p className="text-base md:text-lg text-ink-soft leading-relaxed text-balance">
              Almost none of them are. Because rewriting one hero idea three times, matching tone, resizing carousels, and tweaking hashtags takes the entire afternoon. 
            </p>

            <div className="p-4 rounded-xl bg-paper border border-ink/10 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-ember shrink-0 animate-pulse" />
              <p className="text-sm font-mono text-ink-soft">
                Result: You post once a week, burn out, and leave millions of impressions on the table.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}