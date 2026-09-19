/**
 * Copy for the light version (/light).
 *
 * Deliberately minimal: one sentence where the dark version has a paragraph.
 * Facts are reused from content.ts so both versions stay in step; keyword
 * highlighting ("AI", "LLM") is applied at render time by <Hi>.
 */
import {
  engine,
  founder,
  industries,
  site,
  solutions,
  stats,
  work,
} from "./content";

export const light = {
  hero: {
    /** First sentence sets in ink; the rest in grey — one idea each. */
    statement: "Maqnah turns enterprise data into AI-driven decisions.",
    rest: "Strategy, LLM systems and automation — built in Saudi Arabia, and kept running until the numbers move.",
    nav: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { label: "LinkedIn", href: site.linkedin },
      { label: "Email", href: `mailto:${site.email}` },
    ],
    based: "Based in Saudi Arabia",
    ctas: [
      { label: "See our work", href: "#work" },
      { label: "Talk to us", href: "#contact" },
    ],
  },

  numbers: { label: "Maqnah in numbers", stats },

  capabilities: {
    heading: ["What", "we do."],
    items: [
      {
        title: "Data & AI",
        line: "Models, pipelines and analytics that turn data into a decision engine.",
        tone: "mist",
        icon: "graph",
      },
      {
        title: "AI Consulting",
        line: "Where AI is worth doing — proven, with a roadmap you can run.",
        tone: "mint",
        icon: "compass",
      },
      {
        title: "Automation",
        line: "Work that shouldn't need a human, handed to software with an LLM in the loop.",
        tone: "sage",
        icon: "loop",
      },
      {
        title: "Digital Transformation",
        line: "Modern platforms and products for the intelligence to live in.",
        tone: "sand",
        icon: "layers",
      },
    ],
  },

  engine: {
    label: "Intelligence engine",
    heading: ["Six moves,", "one loop."],
    line: "Every engagement climbs the same staircase — and the last step feeds the first.",
    steps: engine.steps,
  },

  solutions: {
    heading: ["Nine capabilities.", "One system."],
    items: solutions,
  },

  industries: {
    heading: ["Built for", "your industry."],
    items: industries.map((i) => ({ name: i.name, outcome: i.outcome })),
  },

  work: {
    heading: ["Intelligence", "in action."],
    /* One metric per study, chosen for a short numeral. These come from
       work[].metrics in content.ts and are ILLUSTRATIVE until confirmed. */
    items: [
      {
        ...work[0],
        line: "10,000 meals a day, visible as they happen.",
        metric: work[0].metrics[2],
      },
      {
        ...work[1],
        line: "One clinical screen instead of six.",
        metric: work[1].metrics[0],
      },
      {
        ...work[2],
        line: "Provenance you can prove, at auction speed.",
        metric: work[2].metrics[1],
      },
    ],
  },

  founder,

  contact: {
    heading: "Let's talk.",
    line: "Tell us the number you want to move. We'll show you where AI and data can take it.",
  },
};
