# Omnipresence — landing page

A Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Motion
landing page for "Omnipresence," a brand-voice content-repurposing SaaS:
paste a YouTube link or a blog post, get a tweet thread, a LinkedIn carousel,
and a newsletter — written in the user's own voice.

Stack versions, current as of this build:

| Package | Version |
|---|---|
| next | 16.3.0 |
| react / react-dom | ^19.2.0 |
| tailwindcss / @tailwindcss/postcss | ^4.3.3 |
| motion (formerly framer-motion) | ^12.29.2 |
| typescript | ^5.9.3 |

Tailwind v4 is CSS-first here — there's no `tailwind.config.ts`. All tokens
(colors, fonts, the `max-w-content` container, radii) are declared in
`app/globals.css` under `@theme`, and Tailwind generates the matching
utilities (`bg-signal`, `font-display`, `rounded-lg`, etc.) automatically.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx      — fonts (Fraunces + Space Grotesk), metadata
  page.tsx         — assembles all sections
  globals.css      — Tailwind v4 @theme tokens, base styles, focus states, reduced-motion handling
components/
  Nav.tsx
  Hero.tsx              — the "one source → three outputs" demo, animates in once on load
  ProblemStatement.tsx
  HowItWorks.tsx
  VoiceCloning.tsx      — dark section: upload-your-writing feature + anti-cliché callout
  PlatformShowcase.tsx  — thread / carousel / email mockups
  Testimonials.tsx
  Pricing.tsx
  FinalCTA.tsx
  Footer.tsx
```

## Design notes

- **Palette**: cool paper (`#EDF0F1`) and near-black ink (`#12151B`) for the
  light sections, a night-navy (`#0F1116`) inversion for two sections to give
  the page rhythm, and a single accent — signal blue (`#3654FF`) — used for
  every interactive/highlight moment. Ember (`#FF5B39`) appears exactly once,
  on the crossed-out cliché line in the voice section.
- **Type**: Fraunces (serif, editorial, a little wonky) carries headlines and
  personality; Space Grotesk handles UI text and body copy, echoing the
  "engine/platform" side of the product.
- **Motion**: the hero's source-to-three-outputs sequence is the one
  orchestrated moment on the page and only plays once, on load. Everything
  below uses a single lightweight `whileInView` (once) rather than stacking
  fade-ups on every section, and hover states are reserved for things that
  are actually interactive.
- Swap the placeholder testimonial names/quotes and pricing figures for real
  ones before shipping.
