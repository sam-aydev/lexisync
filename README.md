# Sociarig 🚀

**The AI Content Synthesis Engine for Founders and Creators.**

Turn a single URL, document, or raw idea into a month's worth of highly-aligned social media content across Twitter, LinkedIn, Instagram, Threads, and email newsletters.

---

## 🌟 Features

- **Omnichannel Formatting**: Generate platform-specific content for Twitter (threads), LinkedIn (narratives), and Newsletters simultaneously.
- **Brand Voice Cloning**: Upload past writing (TXT, PDF, DOCX) to train the engine on your exact tone, vocabulary, and formatting vectors.
- **Asynchronous Processing**: Reliable, long-running AI generation pipelines powered by Inngest.
- **Real-Time Dashboard**: Instantly see activity feeds, generation statuses, and credit usage via Supabase Realtime subscriptions.
- **"Double Lock" Security**: Strict usage limits enforced on both the client UI (Framer Motion visual locks) and the backend API (Supabase Service Role verification).
- **Automated Billing**: Fully integrated with Lemon Squeezy for seamless upgrades, prorations, webhooks, and usage resets.

## 🛠️ Tech Stack

### Core

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

### Data & Backend

- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime `postgres_changes`, RLS)
- **State Management:** [TanStack Query](https://tanstack.com/query) (React Query)
- **Background Jobs:** [Inngest](https://www.inngest.com/) (Serverless queues, idempotency, retries)
- **Payments:** [Lemon Squeezy](https://www.lemonsqueezy.com/) (Checkout URLs, HMAC Webhooks)

### AI & Data Parsing

- **LLM Engine:** Grok / OpenAI
- **File Parsing:** `mammoth` (DOCX), `pdf2json` (PDF)

---

## 🔒 Security & Architecture

Sociarig utilizes a production-grade architecture designed for robust SaaS operations:

1. **The Double Lock System**: Premium features (like Newsletter generation) and tier limits (5, 150, or 500 generations) are validated in the UI and cryptographically enforced in the `/api/v1/generations` route before AI compute is triggered.
2. **HMAC Webhook Verification**: The `/api/v1/webhooks/lemonsqueezy` route uses Node's native `crypto` library to verify Lemon Squeezy payload signatures, preventing spoofed billing updates.
3. **Idempotent Background Jobs**: Inngest workers are triggered with unique `generationId` keys, ensuring that network retries never result in duplicate AI generations or double-charged credits.
4. **Realtime Hydration**: Supabase channels watch for database changes (e.g., when a webhook resets monthly credits) and instantly invalidate TanStack Query caches to update the UI without a page reload.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Supabase account and project
- A Lemon Squeezy account
- An Inngest account (or local dev server)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sociarig.git
cd sociarig

```

### 2. Install dependencies

```bash
npm install

```

### 3. Environment Variables

Create a `.env.local` file in the root directory and populate it with the following keys:

```env
# Next.js App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Auth & DB)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key # KEEP SECRET!

# Lemon Squeezy (Billing)
LEMON_SQUEEZY_API_KEY=your_ls_api_key
LEMON_SQUEEZY_STORE_ID=your_ls_store_id
LEMON_SQUEEZY_WEBHOOK_SECRET=your_custom_webhook_secret

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=local
INNGEST_SIGNING_KEY=local

# AI Provider
AI_API_KEY=your_llm_api_key

```

### 4. Database Setup

Run the included SQL schemas in your Supabase SQL Editor to set up the required tables:

- `subscriptions`
- `brand_voices`
- `voice_documents`
- `content_generations`

_Note: Ensure Row Level Security (RLS) is enabled on all tables so users can only access their own data via `user_id`._

### 5. Running Local Development

To run the full stack locally, you need three terminal instances:

**Terminal 1: Next.js Frontend/API**

```bash
npm run dev

```

**Terminal 2: Inngest Dev Server**

```bash
npx inngest-cli@latest dev

```

_(This starts the local worker environment at `http://localhost:8288`)_

**Terminal 3: Ngrok (For Lemon Squeezy Webhooks)**

```bash
ngrok http 3000

```

Copy the `https` URL from ngrok and paste it into your Lemon Squeezy Webhook settings (e.g., `[https://your-ngrok-url.app/api/v1/webhooks/lemonsqueezy](https://your-ngrok-url.app/api/v1/webhooks/lemonsqueezy)`). Ensure you select the events for `subscription_created`, `subscription_updated`, `subscription_payment_success`, and `order_refunded`.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── (auth)/             # Login & Signup flows
│   ├── app/                # Protected SaaS Dashboard (Sidebar, Activity Hub)
│   ├── api/
│   │   └── v1/             # API Routes (Generations, Billing, Webhooks, Voices)
│   ├── privacy/            # Static Legal Pages
│   ├── terms/              # Static Legal Pages
│   └── layout.tsx          # Global HTML/SEO wrapper
├── components/
│   ├── landing/            # Public marketing components (Nav, Footer, Pricing)
│   └── dashboard/          # Internal UI components
├── lib/
│   ├── inngest/            # Background worker definitions and client
│   └── util/
│       ├── actions/        # Server actions
│       ├── hooks/          # Custom React Query hooks (useBilling, useAppLayout)
│       └── supabase/       # Supabase client configurations (browser/server)
└── sanity/                 # Sanity CMS integration for the blog

```

---

## 📄 License

Copyright © 2026 Sociarig Inc. All rights reserved.
