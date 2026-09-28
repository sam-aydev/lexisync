"use client";

import { motion, Variants } from "motion/react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for testing the engine.",
    features: [
      "3 repurposes / month",
      "Thread + carousel + email",
      "Voice profile (1 slot)",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Creator",
    price: "$29",
    period: "/ month",
    description: "For founders scaling their voice.",
    features: [
      "Unlimited repurposes",
      "Up to 5 voice profiles",
      "Custom carousel branding",
      "Priority processing",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$89",
    period: "/ month",
    description: "For agencies and marketing teams.",
    features: [
      "Everything in Creator",
      "5 seats included",
      "Shared voice library",
      "Approval workflow",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative mx-auto max-w-[var(--container-content)] px-6 lg:px-24 py-24 md:py-32 overflow-hidden"
    >
      {/* Background abstract element */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_var(--color-signal)_0%,_transparent_60%)] opacity-[0.03] pointer-events-none" />

      <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-ink mb-4">
            Simple pricing.{" "}
            <span className="text-ink-faint">No surprises.</span>
          </h2>
          <p className="text-lg text-ink-soft text-balance">
            Start for free to test the engine. Upgrade when you are ready to
            automate your entire month's content calendar.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 grid gap-6 md:gap-8 lg:grid-cols-3 items-center"
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={cardVariants}
            className={`relative flex flex-col rounded-[var(--radius-xl)] p-8 transition-all duration-300 ${
              tier.highlighted
                ? "border-signal bg-night text-paper shadow-[0_0_40px_-15px_var(--color-signal)] lg:-translate-y-4 lg:scale-[1.02] z-10"
                : "border border-ink/10 bg-white text-ink hover:border-ink/20 shadow-sm"
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <p
                className={`text-sm font-medium uppercase tracking-wider mb-2 ${tier.highlighted ? "text-paper/70" : "text-ink-soft"}`}
              >
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-display text-5xl font-medium">
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-medium ${tier.highlighted ? "text-paper/50" : "text-ink-faint"}`}
                >
                  {tier.period}
                </span>
              </div>
              <p
                className={`text-sm ${tier.highlighted ? "text-paper-dim" : "text-ink-soft"}`}
              >
                {tier.description}
              </p>
            </div>

            <div
              className={`h-px w-full mb-6 ${tier.highlighted ? "bg-white/10" : "bg-ink/5"}`}
            />

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg
                    className={`w-5 h-5 shrink-0 ${tier.highlighted ? "text-signal" : "text-ink-faint"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span
                    className={`text-[15px] leading-tight ${tier.highlighted ? "text-paper/90" : "text-ink"}`}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-full py-4 text-[15px] font-medium transition-all duration-300 ${
                tier.highlighted
                  ? "bg-signal text-white hover:bg-signal-dim shadow-[0_4px_14px_0_rgba(54,84,255,0.39)] hover:shadow-[0_6px_20px_rgba(54,84,255,0.23)] hover:-translate-y-0.5"
                  : "bg-white text-ink border border-ink/10 hover:bg-paper hover:border-ink/20"
              }`}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
