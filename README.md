# Maqnah — Turn Data Into Intelligence

A complete redesign of [maqnah.com](https://www.maqnah.com), repositioning Maqnah
from a UX/app agency into an **AI, data and digital-transformation consulting
partner**.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Three.js and
Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build
npx eslint src
```

## The idea

Light-grey ground, Saudi-flag green `#006C35`, grainy green-gradient
highlights, Instrument Serif headlines and minimal copy — one sentence per
idea. The keywords "AI" / "LLM" carry the gradient wherever they appear
(`components/light/Keyword.tsx`).

```
Hero → Numbers → Capabilities → Intelligence engine → Solutions
→ Industries → Work → Founder → Contact
```

The hero backdrop is `components/light/WaveGrid.tsx`: a 40×40 wall of
instanced cubes seen from above, rippling wherever the cursor has been. Each
pointer move drops a point into a 128-texel trail texture; the vertex shader
sums Gaussian-windowed cosine rings expanding from every live point, and the
crests tint green. Three.js loads lazily on the client and the loop pauses
when the hero scrolls away.

The old `/light` URL permanently redirects to `/` (`next.config.ts`).

## Design system

Everything lives in `src/app/globals.css` under Tailwind v4's `@theme`.

- **Ground** — light grey `#F3F4F1`, white surfaces, soft tiles
  (mist, mint, sage, sand)
- **Signal** — Saudi-flag green `#006C35`, with a four-stop green gradient
  (`--ksa-1` … `--ksa-4`) for highlights and the grainy `grad-ksa` block
- Accent colour is treated as *data*: it marks where intelligence is active
  (live states, metrics, keywords, CTAs) and is never decoration
- **Type** — Instrument Serif (headlines), Instrument Sans (display), Inter
  (body), JetBrains Mono (cursor label)
- The Maqnah mark in `ui/Logo.tsx` is traced from the brand's own logo
  artwork, one `<path>` per blade so they can stagger in independently

## Motion

Entrance work via `ui/Reveal.tsx` (`useInView`, `MaskLines`), smooth scroll
via Lenis (`ui/SmoothScroll.tsx`) and a custom cursor (`ui/Cursor.tsx`).

Every animated surface honours `prefers-reduced-motion`: Lenis and the custom
cursor don't mount, counters jump to their final value, and the wave grid
renders a single settled frame.

## Content

Page copy lives in `src/lib/content-light.ts`; the facts it draws on live in
`src/lib/content.ts`. Facts carried over from maqnah.com are marked
`VERIFIED`.

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

The images in `public/img/` were generated for this build (Pixelcut ·
Nano Banana Pro).
