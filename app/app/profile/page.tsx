"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Shield,
  Briefcase,
  AtSign,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { useProfile, UserProfile } from "@/app/lib/util/hooks/useProfile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function ProfilePage() {
  const { profile, isLoading, updateProfile, isSaving, logout, isLoggingOut } =
    useProfile();

  // Local state to manage form inputs
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    fullName: "",
    title: "",
    location: "",
    socialName: "",
  });

  // Sync server data to local state when loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        title: profile.title,
        location: profile.location,
        socialName: profile.socialName,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-8 h-8 border-4 border-ink/10 border-t-signal rounded-full animate-spin" />
        <span className="text-sm font-bold text-ink-soft animate-pulse tracking-widest uppercase">
          Loading Profile...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full max-w-3xl mx-auto space-y-8 pb-12"
    >
      <motion.div variants={item}>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-ink-soft text-base">
          Manage your personal information, generation preferences, and
          security.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info Card */}
        <motion.div
          variants={item}
          className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-ink/5"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-ink/5">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-display text-2xl font-bold shadow-md group-hover:shadow-lg transition-all">
                {getInitials(formData.fullName)}
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-ink/10 rounded-full flex items-center justify-center text-ink-soft group-hover:text-signal shadow-sm transition-colors">
                <User size={14} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">
                {formData.fullName || "Your Name"}
              </h2>
              <p className="text-sm text-ink-soft">
                {formData.title || "Your Role"}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint group-focus-within:text-signal transition-colors"
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Adetunji Samuel"
                    className="w-full pl-10 pr-4 py-3 bg-paper-dim/30 border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                  Professional Title
                </label>
                <div className="relative group">
                  <Briefcase
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint group-focus-within:text-signal transition-colors"
                  />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Fullstack Developer"
                    className="w-full pl-10 pr-4 py-3 bg-paper-dim/30 border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                  Location
                </label>
                <div className="relative group">
                  <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint group-focus-within:text-signal transition-colors"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Lagos, Nigeria"
                    className="w-full pl-10 pr-4 py-3 bg-paper-dim/30 border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                  />
                  <input
                    type="email"
                    value={profile?.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-paper border border-ink/5 rounded-xl text-sm text-ink-faint cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Generation Preferences Card */}
        <motion.div
          variants={item}
          className="bg-gradient-to-br from-white to-paper-dim/30 border border-ink/10 rounded-[2rem] p-6 md:p-8 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-ink">Generation Identity</h3>
            <p className="text-sm text-ink-soft mt-1">
              Customize how your name appears on exported social media assets
              (Twitter, LinkedIn, etc).
            </p>
          </div>

          <div className="space-y-2 max-w-md">
            <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
              Social Display Name
            </label>
            <div className="relative group">
              <AtSign
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint group-focus-within:text-signal transition-colors"
              />
              <input
                type="text"
                name="socialName"
                value={formData.socialName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-3 bg-white border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm font-medium"
              />
            </div>
            <p className="text-[11px] text-ink-faint mt-1.5 ml-1">
              Leave as "John Doe" to use a generic persona, or set to your real
              name.
            </p>
          </div>
        </motion.div>

        {/* Save Action Bar */}
        <motion.div variants={item} className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-black text-paper rounded-xl font-bold text-sm transition-all shadow-lg shadow-ink/20 hover:shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isSaving && (
              <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </motion.div>
      </form>

      {/* Security & Danger Zone */}
      <motion.div
        variants={item}
        className="bg-white border border-ember/10 rounded-[2rem] p-6 md:p-8 shadow-sm mt-12"
      >
        <div className="mb-6 flex items-center gap-2 text-ember">
          <AlertTriangle size={20} />
          <h3 className="text-lg font-bold">Security & Access</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
          <div>
            <p className="text-sm font-bold text-ink">Sign Out</p>
            <p className="text-xs text-ink-soft mt-0.5">
              Securely end your current session on this device.
            </p>
          </div>
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="px-5 py-2.5 bg-paper border border-ink/10 text-ink-soft hover:text-ink hover:bg-white rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoggingOut ? (
              <div className="w-4 h-4 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
            ) : (
              <LogOut size={16} />
            )}
            {isLoggingOut ? "Signing out..." : "Log Out"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 mt-6 border-t border-ink/5">
          <div>
            <p className="text-sm font-bold text-ink">Reset Password</p>
            <p className="text-xs text-ink-soft mt-0.5">
              Receive an email link to update your account password.
            </p>
          </div>
          <button
            type="button"
            className="px-5 py-2.5 bg-white border border-ember/20 text-ember hover:bg-ember/5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Shield size={16} /> Request Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
