# Maqnah — Data & AI · Saudi Arabia & GCC

A redesign of [maqnah.com](https://www.maqnah.com), repositioning Maqnah as an
**AI-native data and intelligence partner** for enterprises and startups across
Saudi Arabia and the GCC.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Three.js and
Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build
npx eslint src
```

## Sources

- **Copy** is taken verbatim from the content wireframe ("Maqnah Website
  Wireframe" v1). It all lives in `src/lib/content.ts`; the wireframe's yellow
  creative notes are design direction, so they appear there as comments, not
  on the page.
- **Visual direction** comes from the brief's Figma feedback board
  (`Maqnah_Website_Brief_Oct10`, node 11-2): reference screenshots per section
  with "What I like?" notes.

```
Nav → Hero → Agentic expertise → About → What we do → Industries
→ Our work → Clients → Contact → Footer
```

## How the board's notes are carried

| Section | Note | Where |
| --- | --- | --- |
| Nav | Official lock-up top left, simple navigation | `components/Nav.tsx`, `ui/Logo.tsx` |
| Hero | Keep the cube-wall texture; detailed 3D lens on top; two tiny icons in the title; opacity overlay | `sections/Hero.tsx`, `visuals/WaveGrid.tsx` |
| Metrics | Metrics in one horizontal row, large light numerals | `sections/Agentic.tsx` |
| About | Gradient line strokes; strengths in soft icon circles | `sections/About.tsx`, `visuals/GradientLines.tsx` |
| What we do | 160px racing-car collage strip after the copy; abstract line-art cards | `sections/Services.tsx`, `visuals/PillarArt.tsx` |
| Industries | Photo cards, 3 × 2 | `sections/Industries.tsx` |
| Our work | 3D render with a white panel set into it, 3 × 2 | `sections/Work.tsx` |
| Clients | Greyscale logo strip; ruled testimonial grid | `sections/Clients.tsx` |
| Contact | Two columns: frosted invitation over a night sky, white form card | `sections/Contact.tsx` |
| Footer | Plain solid brand green, thin line icons, copyright, policies | `components/Footer.tsx` |
| Generic | Geometric title face (Urbanist); mobile landing with a pinned CTA bar | `lib/fonts.ts`, `sections/Hero.tsx` |

The hero backdrop, `visuals/WaveGrid.tsx`, is a 40×40 wall of instanced cubes
seen from above, rippling wherever the cursor has been. Three.js loads lazily
on the client and the loop pauses when the hero scrolls away. The lens render
is multiplied onto it with feathered edges (`.hero-visual` in `globals.css`).

The old `/light` URL permanently redirects to `/` (`next.config.ts`).

## Design system

Everything lives in `src/app/globals.css`: tokens under Tailwind v4's `@theme`,
element styles in `@layer base`, and component classes (type scale, buttons,
pills, surfaces, reveals) in `@layer components`, so utilities always win.

- **Ground** — light grey `#F3F4F1`, white surfaces, mint `#DFEFE5`
- **Signal** — Saudi-flag green `#006C35`; the accent marks where
  intelligence is active (metrics, icons, CTAs) and is never decoration
- **Night** — `#040A07`, the contact section's sky
- **Type** — Urbanist (titles), Inter (body), JetBrains Mono (cursor label)
- **Logo** — the official lock-up from the brief, in `public/brand/`, used as
  supplied and reversed to white in the footer with a CSS filter

## Motion

Entrance work via `ui/Reveal.tsx` (`useInView`, `MaskLines`), a word-by-word
rise on the hero headline, smooth scroll via Lenis (`ui/SmoothScroll.tsx`,
which honours `scroll-padding-top` to clear the fixed nav) and a custom cursor
(`ui/Cursor.tsx`).

Every animated surface honours `prefers-reduced-motion`: Lenis and the custom
cursor don't mount, counters jump to their final value, the gradient lines
appear drawn, and the wave grid renders a single settled frame.

## Before launch

Marked in `src/lib/content.ts`:

- `ILLUSTRATIVE` — the three "up to" metrics need Maqnah's own results behind
  them; the work stories need confirming with the project leads.
- `PLACEHOLDER` — client logos (with permission), the team photo, the
  testimonials and their portraits, the phone number and mailbox, and the X
  account URL. "Privacy Policy" and "Cookie Policy" need real pages, and the
  Arabic (RTL) version is still to be built.

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

The images in `public/img/` were generated for this build (Pixelcut · Nano
Banana Pro and Nano Banana 2.1) to one art direction: light grey and white,
silver materials and Saudi-green accents, no text or logos. They are stand-ins
until real photography and project visuals are available.
