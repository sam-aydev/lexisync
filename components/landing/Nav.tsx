"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname

// Base links array
const allLinks = [
  { href: "/#how-it-works", label: "How it works", hash: true },
  { href: "/blog", label: "Blog", hash: false },
  { href: "/#features", label: "Features", hash: true },
  { href: "/#pricing", label: "Pricing", hash: true },
  { href: "/about", label: "About Us", hash: false },
  
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 2. Get the current pathname
  const pathname = usePathname();

  // Detect scroll position to elevate the nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MotionLink = motion.create(Link);

  // 3. Conditionally filter links based on the route
  // If the user is on the home page ("/"), show all links.
  // If they are on any other page (like /blog or /auth), hide the hash sections.
  const isHomePage = pathname === "/";
  const activeLinks = allLinks.filter((link) => {
    if (isHomePage) return true;
    return !link.hash; // Hide hash links on non-home pages
  });

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 transition-all duration-300 pointer-events-none md:pt-5">
      <motion.div
        layout
        className={`pointer-events-auto w-full max-w-[var(--container-content)] rounded-2xl transition-all duration-300 ${
          scrolled
            ? "border border-ink/10 bg-paper/85 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl"
            : "border border-transparent bg-paper/40 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-7 md:py-3.5">
          {/* Logo with micro-hover spring */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative flex items-center justify-center"
            >
              <div className="size-9 md:size-12 rounded-full bg-linear-to-tr from-green-700 to-signal flex items-center justify-center shadow-lg shadow-signal/20">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 17C4 17 8 7 16 7"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity="0.4"
                  ></path>
                  <path
                    d="M8 21C8 21 12 11 20 11"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  ></path>
                  <circle cx="20" cy="11" r="2" fill="#FFFFFF"></circle>
                </svg>
              </div>
            </motion.div>
            <span className="font-display text-lg md:text-sm lg:text-lg font-bold tracking-tight text-ink transition-colors ">
              Sociarig
            </span>
          </Link>

          {/* Desktop Nav with Sliding Pill Hover */}
          <nav
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden items-center gap-1 rounded-full border border-ink/5 bg-ink/[0.03] p-1.5 md:flex"
          >
            {activeLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="relative px-4 py-1.5 text-sm md:text-xs lg:text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {hoveredIdx === idx && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-ink/10 -z-10"
                  />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Auth Area */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/login"
              className="px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Log in
            </Link>

            <MotionLink
              href="/auth/signup"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-all hover:bg-green-700 hover:shadow-[0_4px_20px_rgba(54,84,255,0.35)]"
            >
              <span>Start free</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </MotionLink>
          </div>

          {/* Mobile Morphing Hamburger Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="relative flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-ink/10 bg-white/70 p-2 text-ink md:hidden active:scale-95 transition"
            aria-label="Toggle Navigation Menu"
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-[2px] w-5 rounded-full bg-ink transition-transform"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="my-1 h-[2px] w-5 rounded-full bg-ink transition-opacity"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-[2px] w-5 rounded-full bg-ink transition-transform"
            />
          </button>
        </div>

        {/* Animated Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-ink/10 px-6 pb-6 pt-3 md:hidden"
            >
              <nav className="flex flex-col space-y-2">
                {activeLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <span>{link.label}</span>
                    <span className="text-ink-faint text-sm">→</span>
                  </motion.a>
                ))}

                <div className="my-2 border-t border-ink/10 pt-3 flex flex-col gap-2.5">
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl border border-ink/10 bg-white/60 py-2.5 text-center text-sm md:text-xs lg:text-sm font-medium text-ink"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/#pricing"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-center text-sm md:text-xs lg:text-sm font-medium text-paper hover:bg-signal transition"
                  >
                    Start free
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
