"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Mic2,
  History,
  CreditCard,
  LogOut,
  Settings,
  Menu,
  X,
  Zap,
  User,
  Bell,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Generator", href: "/app", icon: LayoutDashboard },
    { name: "Brand Voices", href: "/app/voices", icon: Mic2 },
    { name: "History", href: "/app/history", icon: History },
    { name: "Billing", href: "/app/billing", icon: CreditCard },
  ];

  // Dummy notifications for the XL Activity Hub
  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Thread generation completed.",
      time: "2m ago",
    },
    {
      id: 2,
      type: "alert",
      message: "Voice model training finished.",
      time: "1hr ago",
    },
    {
      id: 3,
      type: "success",
      message: "LinkedIn carousel exported.",
      time: "3hr ago",
    },
  ];

  return (
    <div className="h-[100dvh] w-full flex bg-paper text-ink font-sans overflow-hidden">
      {/* 1. Left Sidebar (Fixed) */}
      <aside className="hidden rounded-lg md:flex flex-col w-64 h-full shrink-0 border-r border-ink/10 bg-white shadow-[4px_0_24px_rgba(18,21,27,0.02)] z-20 relative">
        <div className="h-20 shrink-0 flex items-center px-6 gap-3 border-b border-ink/5">
          <div className="w-8 h-8 rounded-lg bg-signal flex items-center justify-center shadow-lg shadow-signal/20">
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path
                d="M2 13C2 13 6 5 13 5C20 5 24 13 24 13"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-ink">
            Fractal
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-semibold text-ink-faint uppercase tracking-widest px-3 mb-4">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative block group"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-paper-dim/50 rounded-xl border border-ink/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-signal"
                        : "text-ink-faint group-hover:text-ink-soft transition-colors"
                    }
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.name}
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 p-4 space-y-4 border-t border-ink/5 bg-paper-dim/10">
          <div className="bg-white border border-ink/10 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={40} />
            </div>
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-2">
              Monthly Usage
            </p>
            <div className="flex items-end justify-between mb-3 relative z-10">
              <span className="text-2xl font-bold text-ink leading-none">
                4{" "}
                <span className="text-sm font-medium text-ink-soft">/ 10</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-paper rounded-full overflow-hidden relative z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full bg-signal rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </div>

          <div className="group relative bg-white border border-ink/10 rounded-2xl p-2 transition-all hover:border-ink/20 hover:shadow-md h-[60px]">
            <div className="absolute inset-0 flex items-center gap-3 px-4 py-2 transition-opacity duration-200 opacity-100 group-hover:opacity-0 pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-bold text-sm shadow-inner shrink-0">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ink truncate">
                  Adetunji Samuel
                </p>
                <p className="text-[11px] text-ink-soft truncate font-medium">
                  Pro Plan
                </p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1">
              <Link
                href="/app/profile"
                className="flex-1 h-[calc(100%-8px)] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-ink hover:bg-paper-dim/50 transition-colors"
              >
                <Settings size={14} /> Profile
              </Link>
              <div className="w-px h-6 bg-ink/10 shrink-0" />
              <button className="flex-1 h-[calc(100%-8px)] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-ember hover:bg-ember/5 transition-colors">
                <LogOut size={14} /> Exit
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Header (Fixed) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-ink/10 bg-white/80 backdrop-blur-xl z-50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-signal flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 26 26" fill="none">
              <path
                d="M2 13C2 13 6 5 13 5C20 5 24 13 24 13"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-ink tracking-tight">
            Fractal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/app/profile"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer"
          >
            AS
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-ink-soft hover:text-ink transition-colors bg-paper rounded-lg"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-16 bg-paper border-b border-ink/10 z-40 p-4 shadow-xl rounded-b-xl"
          >
            <nav className="space-y-1.5 mb-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-paper border border-ink/5 text-ink" : "text-ink-soft hover:bg-paper-dim/30"}`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-signal" : "text-ink-faint"}
                    />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/app/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${pathname === "/app/profile" ? "bg-paper border border-ink/5 text-ink" : "text-ink-soft hover:bg-paper-dim/30"}`}
              >
                <User
                  size={18}
                  className={
                    pathname === "/app/profile"
                      ? "text-signal"
                      : "text-ink-faint"
                  }
                />
                Profile Settings
              </Link>
            </nav>
            <div className="pt-4 border-t border-ink/10">
              <button className="flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-paper text-ember font-medium text-sm transition-colors hover:bg-ember/10">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Content Area (Scrollable) */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--color-signal)_0%,_transparent_50%)] bg-no-repeat bg-[length:600px_600px] bg-[position:100%_-200px] opacity-90">
        <div className="pt-20 md:pt-0 max-w-5xl mx-auto p-5 sm:p-8 xl:p-12 min-h-full">
          {children}
        </div>
      </main>

      {/* 4. XL Right Sidebar: Activity Hub */}
      <aside className="hidden xl:flex flex-col w-72 h-full shrink-0 border-l border-ink/10 bg-white/40 backdrop-blur-md shadow-[-4px_0_24px_rgba(18,21,27,0.01)] z-10 relative">
        <div className="h-20 shrink-0 flex items-center justify-between px-6 border-b border-ink/5">
          <span className="text-sm font-semibold text-ink">Activity Hub</span>
          <div className="relative">
            <Bell size={16} className="text-ink-soft" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-signal border-2 border-white" />
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          {/* Notifications Stream */}
          <div>
            <h4 className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-4">
              Recent Events
            </h4>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-white border border-ink/5 rounded-xl p-3 shadow-sm flex gap-3 group hover:border-ink/10 transition-colors"
                >
                  <div className="shrink-0 mt-0.5">
                    {notif.type === "success" ? (
                      <CheckCircle2 size={14} className="text-signal" />
                    ) : (
                      <AlertCircle size={14} className="text-ember" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-ink-faint mt-1">
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="pt-6 border-t border-ink/5">
            <h4 className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-4">
              System Status
            </h4>
            <div className="bg-white border border-ink/5 rounded-xl p-4 shadow-sm space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-ink-soft font-medium">
                    Inngest Worker
                  </span>
                  <span className="text-[10px] font-bold text-signal bg-signal/10 px-2 py-0.5 rounded uppercase">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-ink-faint">Latency: 24ms</p>
              </div>
              <div className="w-full h-px bg-ink/5" />
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-ink-soft font-medium">
                    API Tokens
                  </span>
                  <span className="text-xs font-bold text-ink">Healthy</span>
                </div>
                <p className="text-[10px] text-ink-faint">3,402 / min used</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
