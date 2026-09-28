"use client";

import { motion } from "framer-motion";
import { User, Mail, MapPin, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink tracking-tight mb-2">
          Account Profile
        </h1>
        <p className="text-ink-soft">
          Manage your personal information and security settings.
        </p>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-ink/5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-display text-2xl font-bold shadow-md">
              AS
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-ink/10 rounded-full flex items-center justify-center text-ink-soft hover:text-ink shadow-sm">
              <User size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">Adetunji Samuel</h2>
            <p className="text-sm text-ink-soft">Fullstack Developer</p>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <input
                  type="text"
                  defaultValue="Adetunji Samuel"
                  className="w-full pl-9 pr-4 py-2.5 bg-paper-dim/30 border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                Location
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <input
                  type="text"
                  defaultValue="Lagos, Nigeria"
                  className="w-full pl-9 pr-4 py-2.5 bg-paper-dim/30 border border-ink/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="email"
                defaultValue="samuel@buildon.com"
                readOnly
                className="w-full pl-9 pr-4 py-2.5 bg-paper border border-ink/5 rounded-xl text-sm text-ink-soft cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] text-ink-faint mt-1">
              Email cannot be changed directly. Contact support.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-ink/5 flex items-center justify-between">
            <button
              type="button"
              className="text-sm font-medium text-ember hover:text-ember/80 transition-colors flex items-center gap-2"
            >
              <Shield size={16} />
              Reset Password
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-ink text-paper rounded-xl font-medium text-sm transition-all hover:bg-ink-soft active:scale-95 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
