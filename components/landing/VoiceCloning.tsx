"use client";

import { motion } from "framer-motion";

export default function VoiceCloning() {
  const wipeTransition: object = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  return (
    <section
      id="voice"
      className="relative bg-paper text-ink overflow-hidden py-16 md:py-32"
    >
      {/* Background Abstract Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(18,21,27,0.04)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto grid max-w-[var(--container-content)] gap-12 px-5 md:gap-16 md:px-10 lg:grid-cols-2 lg:gap-20 relative z-10">
        {/* Left Column: Copy & "Bad AI" Wipe */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-ink/10 bg-white/50 backdrop-blur-sm text-[10px] md:text-xs font-semibold tracking-wide uppercase text-signal">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12 2.1 7.1" />
              </svg>
              The Secret Sauce
            </div>

            <h2 className="font-display text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-5 md:mb-6">
              It writes like <span className="text-ink-faint italic">you</span>{" "}
              did the writing.
            </h2>

            <p className="max-w-md text-base md:text-lg leading-relaxed text-ink-soft mb-8 md:mb-10">
              Upload five pieces you've written — old newsletters, LinkedIn
              posts, whatever's lying around. The engine maps your syntax,
              cadence, and vocabulary. Every draft after that sounds exactly
              like you on a good day.
            </p>

            {/* The "Fixing AI" Animation Block */}
            <div className="relative rounded-2xl border border-ink/10 bg-white p-5 md:p-6 shadow-sm overflow-hidden group w-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal to-transparent opacity-30" />

              <div className="mb-4 flex items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-mono text-ink-faint uppercase tracking-widest">
                  Input Analysis
                </span>
                <span className="flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-signal/10 text-[9px] md:text-[10px] text-signal font-bold">
                  !
                </span>
              </div>

              <div className="relative">
                {/* Bad AI Text */}
                <p className="text-[13px] md:text-base text-ink-faint font-serif italic line-through decoration-ember/80 decoration-2 transition-all duration-500">
                  "In today's fast-paced digital landscape, staying ahead of the
                  competitive curve is more crucial than ever before..."
                </p>

                {/* Scan line effect */}
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  whileInView={{ top: "100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute left-[-5%] right-[-5%] h-[2px] bg-signal/40 blur-[1px] z-20 pointer-events-none"
                />

                <div className="my-4 h-px w-full bg-ink/5" />

                {/* Corrected Text */}
                <div className="relative overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={wipeTransition}
                    className="absolute inset-0 bg-white z-10 origin-right"
                  />
                  <p className="text-[14px] md:text-lg font-medium text-ink flex gap-2 md:gap-3">
                    <span className="text-signal">↳</span>
                    <span>
                      Look, I'll be honest — I almost didn't post this one.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Upload UI Simulation */}
        <div className="flex flex-col justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl md:rounded-3xl border border-ink/10 bg-white p-5 md:p-8 shadow-xl shadow-ink/[0.03] w-full"
          >
            <div className="mb-5 md:mb-6 flex items-center justify-between">
              <h3 className="text-xs md:text-sm font-semibold tracking-wide text-ink">
                Voice Model Training
              </h3>
              <span className="rounded-full bg-paper px-2 py-1 text-[10px] md:text-xs font-medium text-ink-soft border border-ink/5">
                3 files active
              </span>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-3">
              {[
                {
                  file: "newsletter-march-drop.txt",
                  status: "Learned",
                  progress: 100,
                },
                {
                  file: "linkedin-viral-thread.pdf",
                  status: "Learned",
                  progress: 100,
                },
                {
                  file: "old-blog-voice-and-tone.docx",
                  status: "Analyzing...",
                  progress: 65,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.file}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden rounded-xl border border-ink/10 bg-paper-dim/30 px-3 py-3 md:px-4 md:py-4 transition-colors hover:bg-paper w-full"
                >
                  {/* Progress Bar Background */}
                  {item.progress < 100 && (
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="absolute inset-y-0 left-0 bg-signal/5 z-0"
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <div className="flex shrink-0 h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-white border border-ink/5 text-ink-soft shadow-sm">
                        <svg
                          width="14"
                          height="14"
                          className="md:w-4 md:h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                      </div>
                      <span className="text-xs md:text-sm font-medium text-ink font-mono truncate max-w-[120px] sm:max-w-[200px] lg:max-w-[160px]">
                        {item.file}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      {item.progress === 100 ? (
                        <>
                          <span className="hidden sm:inline text-[10px] md:text-xs font-semibold text-signal uppercase tracking-wider">
                            Learned
                          </span>
                          <svg
                            className="text-signal w-3 h-3 md:w-3.5 md:h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="hidden sm:inline text-[10px] md:text-xs text-ink-soft font-medium animate-pulse">
                            {item.status}
                          </span>
                          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full border-2 border-ink/20 border-t-signal animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 md:mt-6 flex items-start gap-2.5 md:gap-3 rounded-lg bg-paper-dim/50 p-3 md:p-4 border border-ink/5">
              <svg
                className="mt-0.5 text-ink-soft shrink-0 w-3.5 h-3.5 md:w-4 md:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-[10px] md:text-xs text-ink-soft leading-relaxed font-medium">
                Privacy guaranteed. Your writing data is siloed to your account
                and is never used to train the base model.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
