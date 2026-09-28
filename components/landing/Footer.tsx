"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-paper text-ink-soft relative overflow-hidden pt-20 pb-12 border-t border-ink/10">
      {/* Ambient footer glow - slightly lower opacity for light background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-[radial-gradient(ellipse_at_bottom,_var(--color-signal)_0%,_transparent_70%)] opacity-[0.05] pointer-events-none" />

      <div className="max-w-[var(--container-content)] mx-auto px-6 md:px-10 relative z-10">
        {/* Top Grid Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ink/10"
        >
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 26 26"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 13C2 13 6 5 13 5C20 5 24 13 24 13"
                  stroke="#3654FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2 13C2 13 6 21 13 21C20 21 24 13 24 13"
                  stroke="#12151B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-lg text-ink font-medium tracking-wide">
                Lexisync 
              </span>
            </div>
            <p className="text-sm text-ink-soft max-w-sm leading-relaxed">
              The automated AI content syndication pipeline that transforms a
              single video into a month of authentic, voice-matched social
              assets.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-signal transition-colors font-medium"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-signal transition-colors font-medium"
                >
                  Pricing Plans
                </a>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="hover:text-signal transition-colors font-medium"
                >
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Socials Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Connect & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-signal transition-colors flex items-center gap-1.5 font-medium"
                >
                  Twitter / X <span className="text-xs text-signal">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-signal transition-colors font-medium"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-signal transition-colors font-medium"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <p>
            © {new Date().getFullYear()} Lexisync Engine. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            <span>Systems fully operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
