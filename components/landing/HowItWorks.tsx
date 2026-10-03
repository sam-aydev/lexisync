"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Upload Your Voice",
    description:
      "Paste your best past writing. The engine learns your specific tone, pacing, and vocabulary.",
    visual: () => (
      <div className="flex items-end justify-center gap-1.5 h-full w-full pb-4">
        {[1, 2, 3, 2, 1].map((h, i) => (
          <motion.div
            key={i}
            variants={{
              rest: { height: `${h * 16}px`, opacity: 0.5 },
              hover: {
                height: [`${h * 16}px`, `${(4 - h) * 24}px`, `${h * 20}px`],
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                  delay: i * 0.1,
                },
              },
            }}
            className="w-3 bg-signal rounded-full"
          />
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "Feed The Engine",
    description:
      "Drop in a YouTube URL or long-form blog post. We extract the core insights in seconds.",
    visual: () => (
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <motion.div
          variants={{
            rest: { width: "60%" },
            hover: { width: "90%", transition: { duration: 0.5 } },
          }}
          className="h-8 bg-white/80 rounded-md border border-ink/10 flex items-center px-3 w-[60%] overflow-hidden relative shadow-sm"
        >
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ink-faint" />
            <span className="w-1.5 h-1.5 rounded-full bg-ink-faint" />
            <span className="w-1.5 h-1.5 rounded-full bg-ink-faint" />
          </div>
          <motion.div
            variants={{
              rest: { x: "-100%", opacity: 0 },
              hover: {
                x: "200%",
                opacity: [0, 1, 0],
                transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
              },
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-signal/20 to-transparent skew-x-[-20deg]"
          />
        </motion.div>
        <motion.div
          variants={{
            rest: { rotate: 0, opacity: 0.5 },
            hover: {
              rotate: 360,
              opacity: 1,
              transition: { repeat: Infinity, duration: 2, ease: "linear" },
            },
          }}
          className="w-10 h-10 border-2 border-dashed border-signal rounded-full"
        />
      </div>
    ),
  },
  {
    number: "03",
    title: "Instant Syndication",
    description:
      "Watch as perfectly formatted threads, carousels, and emails populate on your screen.",
    visual: () => (
      <div className="relative flex items-center justify-center w-full h-full">
        {[-1, 0, 1].map((offset, i) => (
          <motion.div
            key={i}
            variants={{
              rest: { x: 0, y: 0, rotate: 0, opacity: 0.8 },
              hover: {
                x: offset * 40,
                y: Math.abs(offset) * 10,
                rotate: offset * 8,
                opacity: 1,
                transition: { type: "spring", stiffness: 200, damping: 15 },
              },
            }}
            className="absolute w-20 h-24 bg-white border border-ink/10 rounded-lg shadow-lg flex flex-col p-2 gap-2"
          >
            <div className="w-1/3 h-2 bg-signal/20 rounded" />
            <div className="w-full h-1.5 bg-ink/5 rounded" />
            <div className="w-4/5 h-1.5 bg-ink/5 rounded" />
            <div className="w-full h-1.5 bg-ink/5 rounded" />
          </motion.div>
        ))}
      </div>
    ),
  },
];

// Extracted Card Component to handle individual scroll tracking
const StackCard = ({ step, i, progress, total }: any) => {
  // As the user scrolls past this card, it scales down and dims to create depth
  const targetScale = 1 - (total - i) * 0.05;
  const scale = useTransform(progress, [0, 1], [1, targetScale]);
  const opacity = useTransform(progress, [0, 1], [1, 0.5]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        top: `calc(10vh + ${i * 24}px)`, // The sticky offset layers them slightly lower than the one before
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="sticky md:static group flex flex-col bg-white rounded-[var(--radius-xl)] border border-ink/10 shadow-lg md:shadow-sm md:hover:shadow-[0_20px_40px_-15px_rgba(54,84,255,0.15)] md:hover:border-signal/30 transition-shadow duration-500 overflow-hidden w-full origin-top"
    >
      <div className="h-48 md:h-60 w-full bg-[#f8f9fa] border-b border-ink/5 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTgsIDIxLCAyNywgMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
          <step.visual />
        </div>
        <div className="absolute top-4 left-6 text-5xl md:text-6xl font-display font-bold text-ink/5 select-none pointer-events-none md:group-hover:text-signal/5 transition-colors duration-500">
          {step.number}
        </div>
      </div>

      <div className="p-6 md:p-10 flex flex-col flex-1 bg-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-xs font-bold text-ink md:group-hover:bg-signal md:group-hover:text-white transition-colors duration-500">
            {step.number}
          </div>
          <h3 className="text-lg md:text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-sm md:text-base text-ink-soft leading-relaxed">
          {step.description}
        </p>
      </div>

      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } },
        }}
        className="hidden md:block absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-signal-dim to-signal"
      />
    </motion.div>
  );
};

export default function HowItWorks() {
  const containerRef = useRef(null);

  // Track scroll progress through the entire section to drive the mobile stacking animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="how-it-works"
      className="relative py-8 md:py-32 px-6 lg:px-24"
      ref={containerRef}
    >
      <div className="max-w-[var(--container-content)] mx-auto relative">
        {/* Header */}
        <div className="mb-16 md:mb-32 flex flex-col items-center md:items-start text-center md:text-left sticky md:static top-0 pt-4 z-0 bg-paper/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none pb-4 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-6xl mb-4 md:mb-6">
              How It Works.
            </h2>
            <div className="rule w-24 md:mx-0 mx-auto" />
            <p className="mt-4 md:mt-6 text-base md:text-lg text-ink-soft max-w-lg hidden md:block">
              A sophisticated AI pipeline working seamlessly in the background.
              From raw video to omnichannel presence in under 10 seconds.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Card Grid (Desktop) / Sticky Stack (Mobile) */}
        {/* On mobile, we add extra padding-bottom to allow scrolling space for the sticky effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 relative pb-0">
          {/* Desktop Connection Line */}
          <div className="hidden md:block absolute top-[120px] left-10 right-10 h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent z-0" />

          {steps.map((step, i) => (
            <StackCard
              key={step.number}
              step={step}
              i={i}
              progress={scrollYProgress}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
