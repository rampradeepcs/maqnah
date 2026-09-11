# Maqnah — Turn Data Into Intelligence

A complete redesign of [maqnah.com](https://www.maqnah.com), repositioning Maqnah
from a UX/app agency into an **AI, data and digital-transformation consulting
partner**.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build
npx eslint src
```

## The idea

The site is one continuous argument rather than a stack of sections:

```
Hero → Big idea → Capabilities → Intelligence engine → Data ecosystem
→ AI consulting → Solutions → Industries → Work → Impact → Why Maqnah
→ Method → Insights → Founder → Final CTA
```

Three moments carry the positioning, and all three are built in code rather
than shipped as video or images:

| Moment | Component | What it does |
| --- | --- | --- |
| **Intelligence Core** | `visuals/IntelligenceCore.tsx` | ~1,000 data particles spiral into a central node on a 2D canvas. The cursor bends trajectories — near the pointer particles gain angular velocity and stall, so the stream swirls around attention. Used in the hero and again, calmer, behind the closing CTA. |
| **Data ecosystem** | `visuals/DataEcosystem.tsx` | Nine source systems converge on one intelligence core, which emits four things a business can act on. Curves and packets on canvas; labels in real DOM so they stay crisp and accessible. |
| **Consulting transformation** | `sections/Consulting.tsx` | Five business problems convert, one by one as you scroll, into five AI-powered outcomes. |

## Design system

Everything lives in `src/app/globals.css` under Tailwind v4's `@theme`.

- **Ground** — near-black `#07090C`, surfaces `#0B0F14` / `#10151C`
- **Signal** — electric lime `#B8FF4A`, with cool cyan `#5CE1E6` as a secondary
- Accent colour is treated as *data*: it marks where intelligence is active
  (live states, metrics, active nodes, CTAs) and is never decoration
- **Type** — Instrument Sans (display), Inter (body), JetBrains Mono
  (technical labels and metadata)
- The Maqnah mark in `ui/Logo.tsx` is traced from the brand's own logo
  artwork, one `<path>` per blade so they can stagger in independently

## Motion

Scroll-linked storytelling via `ui/scroll.ts` (`useScrollProgress`) and
entrance work via `ui/Reveal.tsx` (`useInView`, `MaskLines`).

Every animated surface honours `prefers-reduced-motion`: Lenis and the custom
cursor don't mount, the preloader is skipped, counters jump to their final
value, and both canvases render a single static frame.

## Content

All copy lives in `src/lib/content.ts`. Facts carried over from maqnah.com are
marked `VERIFIED`.

> **Before launch:** the case-study metrics in `work[]` are marked
> `ILLUSTRATIVE`. They read as real figures and must be confirmed or replaced
> by Maqnah.

## Contact form

`POST /api/contact` sends through Resend's REST API. Set:

```
RESEND_API_KEY=...
CONTACT_TO=mohsin@maqnah.com      # optional, this is the default
CONTACT_FROM="Maqnah Website <hello@maqnah.com>"
```

Without `RESEND_API_KEY` the route returns 503 and the form points the visitor
at the mailbox directly — enquiries are never silently swallowed.

## Imagery

Every image in `public/img/` was generated for this build (Pixelcut ·
Nano Banana Pro) to one art direction: a pitch-black void, a single sculptural
form, light carried by electric lime with one cyan thread. Total weight is
under 2 MB.
