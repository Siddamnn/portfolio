# Sid's Starlit Stage

A neon-noir / cinematic portfolio — frontend, AI, blockchain, and the occasional poem written under late-night fluorescents.

Live at **[siddamn.dev](https://siddamn.dev)**.

## Sections

- **Hero** — Anton display title with italic Fraunces accent, full-bleed sky gradient, drifting stars, and an SVG city skyline with lit windows.
- **Marquee** — scrolling cinematic strip under the hero.
- **About** — split layout with a corner-bracketed portrait card.
- **Projects** — filterable grid (All / AI / Frontend) with a featured-first layout. Each card has its own bespoke CSS+SVG visual: a live Pomodoro clock, an audio-bar visualizer, falling rain, a node-graph, a glowing mic, and an AI orb.
- **Poems** — three card teasers that open into a focused modal with the full verse. `Esc` to close.
- **Contact** — CTA and socials.

## Tech stack

- **Next.js 16** (App Router) with Turbopack
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** for the bridge tokens; the rest is hand-rolled CSS in `globals.css` (~1000 lines, scoped to the design's class names)
- **Google Fonts** via `next/font/google`: **Anton** (display), **Fraunces** (italic accent + body serif), **Inter Tight** (body sans), **JetBrains Mono** (eyebrow / mono detail)
- **Lucide React** for icons (Menu, Play, Pause)

No theme provider, no dark/light toggle — the design is dark-only by intent. No Radix primitives, no framer-motion: every animation is CSS keyframes.

## Project structure

```
portfolio/
├── public/
│   ├── background-music.mp3
│   └── me.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx        # font setup + background music
│   │   ├── page.tsx          # project + poem data, section composition
│   │   └── globals.css       # design system + section styles
│   └── components/
│       ├── header.tsx        # mix-blend-difference nav + mobile menu
│       ├── hero.tsx          # sky/stars/skyline + display title
│       ├── marquee.tsx       # scrolling strip
│       ├── about.tsx         # split layout + portrait card
│       ├── projects.tsx      # filterable grid + per-project CSS visuals
│       ├── poems.tsx         # cards + Esc-dismissible modal
│       ├── contact.tsx       # CTA + socials
│       ├── footer.tsx
│       ├── background-music.tsx
│       └── ui/hover-button.tsx
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Setup

Requires **Node 20+** (Next 16 minimum).

```bash
git clone https://github.com/Siddamnn/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

## Scripts

```bash
npm run dev         # turbopack dev server on :9002
npm run build       # production build
npm start           # serve production build
npm run typecheck   # tsc --noEmit
```

## Background music

`<BackgroundMusic />` in `src/app/layout.tsx` loops `public/background-music.mp3` at 30% volume with a play/pause control fixed bottom-right. Auto-play attempts to start; if the browser blocks it, the user clicks the button to start.

To change the track: replace `public/background-music.mp3`. To change the volume: edit `audio.volume` in `src/components/background-music.tsx`.

## Design tokens

CSS custom properties in `globals.css`:

| Token | Value | Where it shows |
|---|---|---|
| `--neon` | `#ff2d8b` | hero accent, brand dot, project glow A |
| `--neon-2` | `#00e5ff` | about italic accent, contact h2, project glow B |
| `--neon-3` | `#ffb84d` | sodium-lamp amber (mic, lit windows, Pomodoro clock) |
| `--neon-violet` | `#9b5cff` | poems accent, flow diagram nodes |
| `--ink` | `#07060d` | page background |
| `--paper` | `#f5efe6` | foreground text |
| `--paper-dim` | `#cdc6bb` | secondary text |
| `--maxw` | `1440px` | content section max-width |

Font stacks live on `body` (so they share the scope where `next/font` injects its `--font-*` vars):

```css
--ff-display: var(--font-anton), "Bebas Neue", Impact, sans-serif;
--ff-serif:   var(--font-fraunces), "Times New Roman", serif;
--ff-mono:    var(--font-jetbrains-mono), ui-monospace, monospace;
--ff-sans:    var(--font-inter-tight), "Inter", system-ui, sans-serif;
```

## Deployment

Optimized for **Vercel**: push to GitHub, connect the repo, ship. No env vars required.

## Contact

**Sid** — [siddamn.dev](https://siddamn.dev) · [GitHub @Siddamnn](https://github.com/Siddamnn) · [LinkedIn](https://www.linkedin.com/in/siddharth-bhardwaj-tug/)
