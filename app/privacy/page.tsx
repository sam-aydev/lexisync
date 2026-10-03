"use client";

import { motion } from "framer-motion";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { Shield } from "lucide-react";

const SECTIONS = [
  { id: "collection", title: "1. Information We Collect" },
  { id: "usage", title: "2. How We Use Information" },
  { id: "ai", title: "3. AI Processing & Third Parties" },
  { id: "data-rights", title: "4. Your Data Rights" },
];

export default function PrivacyPolicy() {
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
      <section className="relative pt-34 pb-10  overflow-hidden  border-ink/5">
        <div className="absolute top-0 right-0 size-200 bg-linear-to-br from-signal/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-ink/10 shadow-sm mb-6 text-xs font-bold uppercase tracking-widest text-ink-soft">
              <Shield size={14} className="text-signal" /> Privacy Center
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Effective Date: October 2, 2026. We believe your data is your own.
              Here is exactly how we handle, process, and protect your
              information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-12 md:gap-24 relative">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-32 bg-white rounded-2xl p-6 border border-ink/10 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">
              Contents
            </h4>
            <nav className="space-y-3">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="block cursor-pointer text-left text-sm font-semibold text-ink-soft hover:text-signal transition-colors"
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
          <div id="collection" className="scroll-mt-32 mb-16">
            <h2>1. Information We Collect</h2>
            <p>
              When you use Sociarig, we collect specific types of information to
              ensure the engine functions perfectly for your brand:
            </p>
            <ul>
              <li>
                <strong>Account Data:</strong> Email address, name, and billing
                information (processed securely via Lemon Squeezy).
              </li>
              <li>
                <strong>Input Data:</strong> URLs, raw text, and documents you
                upload to train your Brand Voice profile.
              </li>
              <li>
                <strong>Usage Data:</strong> Application telemetry, features
                utilized, and API request volumes to manage billing quotas.
              </li>
            </ul>
          </div>

          <div id="usage" className="scroll-mt-32 mb-16">
            <h2>2. How We Use Information</h2>
            <p>
              Your data is used strictly to provide and improve the Sociarig
              service. We use your uploaded documents and text exclusively to
              map stylistic voice vectors for your account.{" "}
              <strong>
                We never use your private data or brand voices to train our
                foundational models.
              </strong>
            </p>
          </div>

          <div id="ai" className="scroll-mt-32 mb-16">
            <h2>3. AI Processing & Third Parties</h2>
            <p>
              Sociarig relies on external Large Language Models (such as OpenAI
              and XAI) to synthesize content. By using our service, you agree
              that your input text is transmitted to these providers via API. We
              have opted out of data-sharing agreements with these API
              providers, meaning your data is deleted from their servers after
              30 days and is not used for their model training.
            </p>
          </div>

          <div id="data-rights" className="scroll-mt-32 mb-16">
            <h2>4. Your Data Rights</h2>
            <p>
              You have the right to access, export, or delete your data at any
              time. If you delete a Brand Voice or close your account, all
              associated vector data, uploaded documents, and generation history
              are permanently purged from our primary databases within 7 days.
            </p>
            <p>
              If you have any questions about this policy, contact us at{" "}
              <strong>privacy@sociarig.com</strong>.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
