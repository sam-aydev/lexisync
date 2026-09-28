"use client";

import { motion } from "framer-motion";
import { CreditCard, Zap, CheckCircle2, Download } from "lucide-react";

export default function BillingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink tracking-tight mb-2">Billing & Usage</h1>
        <p className="text-ink-soft">Manage your subscription, credits, and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Plan Overview */}
        <div className="md:col-span-2 bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full bg-signal/10 text-[10px] font-bold tracking-widest uppercase text-signal">
                Current Plan
              </div>
              <h2 className="text-2xl font-bold text-ink">Creator Pack</h2>
              <p className="text-sm text-ink-soft mt-1">$15.00 USD / month</p>
            </div>
            <button className="px-4 py-2 bg-paper text-ink rounded-lg font-medium text-xs transition-all hover:bg-paper-dim border border-ink/5">
              Cancel Plan
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">Monthly Generations</span>
              <span className="font-bold text-ink">4 / 10 <span className="font-normal text-ink-soft">used</span></span>
            </div>
            <div className="w-full h-2 bg-paper rounded-full overflow-hidden">
              <div className="h-full bg-signal w-[40%] rounded-full" />
            </div>
            <p className="text-xs text-ink-faint">Credits reset on October 22, 2026</p>
          </div>
        </div>

        {/* Upgrade / Top Up Card */}
        <div className="bg-ink text-paper rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-signal/20 blur-[40px] rounded-full" />
          <div className="relative z-10">
            <Zap size={24} className="text-signal mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Need more power?</h3>
            <p className="text-sm text-paper-dim/70 mb-6">Upgrade to the Agency tier for unlimited generations and custom API access.</p>
          </div>
          <button className="w-full py-2.5 bg-signal text-white rounded-lg font-medium text-sm transition-all hover:bg-signal/90 active:scale-[0.98] relative z-10">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-ink mb-4">Invoice History</h3>
        <div className="space-y-4">
          {[
            { date: "Sep 22, 2026", amount: "$15.00", status: "Paid" },
            { date: "Aug 22, 2026", amount: "$15.00", status: "Paid" },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-ink/5 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-signal">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{invoice.date}</p>
                  <p className="text-xs text-ink-soft">Creator Pack</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-ink">{invoice.amount}</span>
                <button className="text-ink-faint hover:text-signal transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}