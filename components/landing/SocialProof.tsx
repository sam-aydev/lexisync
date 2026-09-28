'use client'

import { motion } from 'framer-motion'

// The platforms your engine ingests from or outputs to
const PLATFORMS = [
  'YouTube', 'Substack', 'Ghost', 'Medium', 'Spotify Podcasts', 'Apple Podcasts', 'Vimeo', 'Notion', 'Google Docs'
]

// Duplicate the array to ensure a seamless infinite scroll loop
const MARQUEE_ITEMS = [...PLATFORMS, ...PLATFORMS]

export default function SocialProof() {
  return (
    <section className="py-5   backdrop-blur-sm overflow-hidden">
      
      {/* Ecosystem Marquee Section */}
      <div className="mb-24">
        <div className="max-w-[var(--container-content)] mx-auto px-6 mb-8 text-center md:text-left">
          <p className="text-sm font-medium text-ink-faint uppercase tracking-widest">
            Engineered for the modern content stack
          </p>
        </div>
        
        {/* Infinite Scroll Container */}
        <div className="relative flex overflow-hidden group">
          {/* Fading edges for a premium polished look */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-4 md:gap-8 items-center whitespace-nowrap pl-4 md:pl-8 w-max"
            animate={{ x: ["0%", "-50%"] }} // Scrolls exactly one half (one full set), then seamlessly resets
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {MARQUEE_ITEMS.map((platform, idx) => (
              <div 
                key={idx}
                className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-ink/10 bg-white text-ink text-base md:text-lg font-display hover:border-signal hover:text-signal transition-colors duration-300 select-none flex-shrink-0 cursor-default"
              >
                {platform}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Engine Metrics / Capability Proof */}
      <div className="max-w-[var(--container-content)] mx-auto px-6">
        {/* The gap-px trick creates perfect hairline borders between the brutalist cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[var(--radius-xl)] overflow-hidden">
          
          {/* Metric 1 */}
          <div className="bg-white p-10 md:p-12 flex flex-col items-center text-center group hover:bg-night hover:text-paper transition-colors duration-500">
            <div className="text-5xl md:text-6xl font-display font-bold mb-4 group-hover:text-signal transition-colors">4.2s</div>
            <div className="text-lg font-bold mb-2">Average Latency</div>
            <div className="text-sm text-ink-soft group-hover:text-paper-dim transition-colors max-w-[250px]">
              From a raw YouTube URL to three fully formatted, distinct assets.
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-10 md:p-12 flex flex-col items-center text-center group hover:bg-night hover:text-paper transition-colors duration-500">
            <div className="text-5xl md:text-6xl font-display font-bold mb-4 group-hover:text-signal transition-colors">100%</div>
            <div className="text-lg font-bold mb-2">Deterministic Match</div>
            <div className="text-sm text-ink-soft group-hover:text-paper-dim transition-colors max-w-[250px]">
              Zero hallucinated jargon. Enforces your exact stylistic constraints.
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-10 md:p-12 flex flex-col items-center text-center group hover:bg-night hover:text-paper transition-colors duration-500">
            <div className="text-5xl md:text-6xl font-display font-bold mb-4 group-hover:text-signal transition-colors">3x</div>
            <div className="text-lg font-bold mb-2">Format Multiplier</div>
            <div className="text-sm text-ink-soft group-hover:text-paper-dim transition-colors max-w-[250px]">
              Thread, Carousel, and Email natively formatted in a single click.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}