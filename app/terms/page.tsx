"use client";

import { motion } from "framer-motion";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { CheckCircle2 } from "lucide-react";

const SECTIONS = [
  { id: "agreement", title: "1. Acceptance of Terms" },
  { id: "subscriptions", title: "2. Subscriptions & Billing" },
  { id: "usage", title: "3. Acceptable Use" },
  { id: "ownership", title: "4. Intellectual Property" },
];

export default function TermsOfService() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-signal/20">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-10 overflow-hidden  border-ink/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-signal/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-ink/10 shadow-sm mb-6 text-xs font-bold uppercase tracking-widest text-ink-soft">
              <CheckCircle2 size={14} className="text-signal" /> Legal Terms
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Effective Date: October 2, 2026. Please read these terms carefully before accessing or using the Sociarig platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-12 md:gap-24 relative">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-32 bg-white rounded-2xl p-6 border border-ink/10 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">Contents</h4>
            <nav className="space-y-3">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="cursor-pointer block text-left text-sm font-semibold text-ink-soft hover:text-signal transition-colors"
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Legal Text */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="flex-1 max-w-3xl prose prose-lg prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-p:text-ink/80 prose-a:text-signal prose-li:text-ink/80"
        >
          <div id="agreement" className="scroll-mt-32 mb-16">
            <h2>1. Acceptance of Terms</h2>
            <p>By registering for and using Sociarig, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our service.</p>
          </div>

          <div id="subscriptions" className="scroll-mt-32 mb-16">
            <h2>2. Subscriptions & Billing</h2>
            <p>Sociarig offers Free, Starter, and Premium tiers. By purchasing a paid tier, you agree to recurring monthly billing handled by our merchant of record, Lemon Squeezy.</p>
            <ul>
              <li>Generation limits reset on your monthly billing date. Unused generations do not roll over.</li>
              <li>You may cancel at any time, but we do not provide prorated refunds for mid-month cancellations unless required by law.</li>
              <li>In the event of a chargeback or payment failure, your account will be immediately downgraded to the Free tier limits.</li>
            </ul>
          </div>

          <div id="usage" className="scroll-mt-32 mb-16">
            <h2>3. Acceptable Use</h2>
            <p>Our platform uses advanced AI to generate content. You agree not to use Sociarig to generate:</p>
            <ul>
              <li>Hate speech, harassment, or defamatory content.</li>
              <li>Spam, automated disinformation networks, or malicious phishing templates.</li>
              <li>Content that violates the copyright or intellectual property of third parties.</li>
            </ul>
            <p>Violation of these rules will result in immediate, non-refundable termination of your account.</p>
          </div>

          <div id="ownership" className="scroll-mt-32 mb-16">
            <h2>4. Intellectual Property</h2>
            <p><strong>Your Inputs:</strong> You retain full ownership of the URLs, documents, and ideas you input into the system.</p>
            <p><strong>Your Outputs:</strong> You own the final generated social posts and newsletters. Sociarig claims no copyright over the content you synthesize using our engine.</p>
            <p><strong>Our Platform:</strong> Sociarig retains all rights, title, and interest in the platform's code, UI, branding, and proprietary synthesis prompt architectures.</p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}