import { site } from "../site";
import type { Dictionary } from "./types";

/**
 * English — the source copy, verbatim from the content wireframe
 * ("Maqnah Website Wireframe", v1). Its yellow creative notes are design
 * direction, not live copy, so they live in comments here.
 *
 * Markers:
 *   ILLUSTRATIVE — reads as a real figure; must be backed by Maqnah's own
 *                  project results before launch.
 *   PLACEHOLDER  — bracketed or sample copy from the wireframe that must be
 *                  replaced with real details before launch.
 */
export const en = {
  locale: "en",
  dir: "ltr",
  lang: "en",

  meta: {
    title: "Maqnah — Data & AI · Saudi Arabia & GCC",
    description:
      "Maqnah builds AI-native data platforms that let enterprises and startups across Saudi Arabia and the GCC sense, decide and act at the speed of change.",
    ogLocale: "en_US",
    ogImage: "/img/og.jpg",
    ogAlt:
      "Maqnah — Data & AI · Saudi Arabia & GCC: Engineering the intelligence that powers the Kingdom's next era. Beside it, a silver lens etched with an Islamic geometric pattern, turning streams of data into live dashboards.",
    path: "/",
  },

  ui: {
    skipToContent: "Skip to content",
    backToTop: "Maqnah, back to top",
    mainNav: "Main",
    footerNav: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cursor: { talk: "LET'S TALK", view: "VIEW", send: "SEND" },
    clientPhotoToCome: "Client photo to come",
    quotes: ["\u201c", "\u201d"],
    linkToCome: "(link to come)",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company name",
      phone: "Phone number",
      countryCode: "Country code",
      message: "What would you like to achieve?",
      sending: "Sending…",
      successTitle: "Message received.",
      successBody:
        "We read every one of these ourselves. Expect a reply from the team within two working days.",
      genericError: "Something went wrong.",
      emailUs: "Email us directly",
    },
    api: {
      invalid: "Invalid request.",
      tooLong: "One of the fields is too long.",
      required: "Name, work email, phone number and your goal are required.",
      badEmail: "That email address doesn't look right.",
      consent: "Please agree to be contacted about your enquiry.",
      notConnected: "The contact form isn't connected yet.",
      sendFailed: "We couldn't send that just now.",
      failTitle: "We couldn't send that.",
      emailDirect: "Email us directly:",
      backToForm: "Back to the form",
      backToSite: "Back to Maqnah",
    },
  },

  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Industries", href: "#industries" },
      { label: "Our work", href: "#work" },
      { label: "Clients", href: "#clients" },
      { label: "Contact", href: "#contact" },
    ],
    language: { label: "العربية", href: "/ar", lang: "ar", hint: "Arabic version" },
    cta: { label: "Talk to us", href: "#contact" },
  },

  hero: {
    tag: "Data & AI · Saudi Arabia & GCC",
    headline: "Engineering the intelligence that powers the Kingdom's next era.",
    headlineIcons: { 0: "layers", 2: "spark" },
    lead: "Maqnah builds AI-native data platforms that let enterprises and startups across Saudi Arabia and the GCC sense, decide and act at the speed of change.",
    ctas: [
      { label: "Start a conversation", href: "#contact" },
      { label: "See our work", href: "#work" },
    ],
    visual: {
      src: "/img/hero-lens.jpg",
      alt: "A silver lens etched with an Islamic geometric pattern, turning streams of data into live dashboards",
    },
  },

  /** Sits directly under the banner and backs it up with outcomes. */
  agentic: {
    pill: "Agentic expertise",
    heading: "AI agents built for enterprise-scale transformation",
    line: "We engineer specialized AI agents that learn, adapt and perform at scale, creating lasting value across your enterprise.",
    /** ILLUSTRATIVE — every "up to" figure needs Maqnah's own results behind it. */
    metrics: [
      { prefix: "Up to", value: 55, suffix: "%", label: "Lower operational costs" },
      { prefix: "Up to", value: 75, suffix: "%", label: "Team time freed for high-value work" },
      { prefix: "Up to", value: 3, suffix: "x", label: "Faster insight and decision-making" },
    ],
  },

  about: {
    tag: "About Maqnah",
    heading: ["Nearly two decades of proven delivery.", "Built for what comes next."],
    blocks: [
      {
        title: "A proven track record",
        body: "For nearly two decades, our team has designed and delivered data and technology programs for global clients across energy, finance, manufacturing and healthcare. For the past six years, we have brought that experience to Saudi Arabia, delivering complex, multi-stakeholder projects at scale for some of the Kingdom's most ambitious organizations.",
      },
      {
        title: "A team that evolves with technology",
        body: "Technology has reinvented itself many times in that span, from big data and cloud to machine learning, generative AI and autonomous agents. We have evolved with every shift, and we bring that same vision to our clients today, helping them adopt what's next with confidence.",
      },
    ],
    /** PLACEHOLDER — real team photography only, never stock. */
    photo: { label: "Team photo", note: "Real team in a workshop or office setting" },
    strengthsHeading: "What we bring to the table",
    strengths: [
      {
        icon: "domain",
        title: "Deep domain knowledge",
        body: "Hands-on experience in energy, fintech, automotive, healthcare and agritech.",
      },
      {
        icon: "scale",
        title: "Delivery at enterprise scale",
        body: "Proven governance for complex, multi-stakeholder programs.",
      },
      {
        icon: "integration",
        title: "Seamless integration",
        body: "We connect with the systems you already run, from ERP to legacy platforms.",
      },
      {
        icon: "design",
        title: "Design-led engineering",
        body: "Data products people adopt, because they are designed around them.",
      },
      {
        // Confirm the team's language capabilities before launch.
        icon: "local",
        title: "Local presence",
        body: "A team on the ground in the Kingdom, working in Arabic and English.",
      },
    ],
  },

  /** Nine services in three pillars, from data foundations up to daily operations. */
  services: {
    tag: "What we do",
    heading: "Intelligence, engineered end to end.",
    lead: "From the first data pipeline to autonomous AI agents, we build every layer, designed around the people who use it.",
    strip: {
      src: "/img/services-strip.jpg",
      alt: "Collage of a racing car and its pit crew working in perfect sync",
    },
    pillars: [
      {
        icon: "foundations",
        title: "Data Foundations",
        sub: "Make your data AI-ready",
        items: [
          { title: "Data & AI Strategy", body: "Roadmaps, readiness assessments and use cases with clear ROI." },
          { title: "Modern Data Platforms", body: "Cloud lakehouses and real-time pipelines that scale with you." },
          { title: "Data Governance & Sovereignty", body: "Quality, security, PDPL-ready compliance and in-Kingdom data residency." },
        ],
      },
      {
        icon: "intelligence",
        title: "Applied Intelligence",
        sub: "Turn data into foresight",
        items: [
          { title: "Generative AI & Arabic LLMs", body: "Enterprise copilots and knowledge assistants, fluent in Arabic and English." },
          { title: "Predictive Analytics & ML", body: "Forecasting, predictive maintenance and anomaly detection." },
          { title: "Computer Vision & IoT", body: "Real-time insight from cameras, sensors and field assets." },
        ],
      },
      {
        icon: "operations",
        title: "Intelligent Operations",
        sub: "Put intelligence to work",
        items: [
          { title: "Agentic AI & Automation", body: "AI agents and RPA that run complex workflows end to end." },
          { title: "Decision Intelligence", body: "Live command centres and dashboards, designed for how leaders work." },
          { title: "MLOps & Responsible AI", body: "Models deployed, monitored and governed for trust at scale." },
        ],
      },
    ],
  },

  /** Ordered by priority: Oil & Gas, Fintech and Startups first. */
  industries: {
    tag: "Industries",
    heading: "Whatever your sector, we speak your language",
    items: [
      {
        name: "Oil, Gas & Energy",
        line: "Operational visibility, asset analytics and program automation.",
        image: "/img/industry-oil-gas.jpg",
        alt: "A gas processing facility in the Saudi desert at golden hour",
      },
      {
        name: "Financial Services & Fintech",
        line: "Automation, risk insight and smarter customer journeys.",
        image: "/img/industry-fintech.jpg",
        alt: "Glass towers of a financial district at dusk, with a light-rail line curving below",
      },
      {
        name: "Startups & Scale-ups",
        line: "Data and AI foundations that grow with you.",
        image: "/img/industry-startups.jpg",
        alt: "A young founding team working around a laptop in a bright co-working space",
      },
      {
        name: "Automotive & Manufacturing",
        line: "Connected production, quality and sales insight.",
        image: "/img/industry-automotive.jpg",
        alt: "Robotic arms working on car body shells along a clean assembly line",
      },
      {
        name: "Healthcare",
        line: "Better patient journeys and operational clarity.",
        image: "/img/industry-healthcare.jpg",
        alt: "A clinician reviewing patient information on a tablet in a sunlit hospital corridor",
      },
      {
        name: "Agritech",
        line: "Field data turned into better yields and planning.",
        image: "/img/industry-agritech.jpg",
        alt: "Circular irrigated crop fields in the desert, seen from above",
      },
    ],
  },

  /**
   * No detail pages and no client names; cards are the showcase.
   * Project copy is indicative: confirm each story (and add one real result)
   * with the project leads before launch.
   */
  work: {
    tag: "Our work",
    heading: "Real results across the region's key industries",
    items: [
      {
        chip: "Oil & Gas",
        title: "Automating a national energy program, end to end",
        body: "Replaced manual tracking with one automated platform. Every stakeholder now sees live progress. Decisions are faster and fully transparent.",
        image: "/img/work-energy.jpg",
      },
      {
        chip: "Automotive",
        title: "Turning production data into live decisions",
        body: "Connected plant and sales data in one view. Teams spot bottlenecks before they slow the line. Leaders plan with confidence.",
        image: "/img/work-automotive.jpg",
      },
      {
        chip: "Fintech",
        title: "Building an RPA product for a fintech innovator",
        body: "Designed and engineered a robotic process automation platform. Customers automate repetitive finance work. Launched faster with a product users enjoy.",
        image: "/img/work-fintech.jpg",
      },
      {
        chip: "Agritech",
        title: "Smarter farming through field data",
        body: "Brought crop, weather and field data together. Growers get clear, timely recommendations. Better planning from seed to harvest.",
        image: "/img/work-agritech.jpg",
      },
      {
        chip: "Healthcare",
        title: "Clearer care with connected data",
        body: "Unified patient and operational data. Care teams see what matters at a glance. Less admin, more time for patients.",
        image: "/img/work-healthcare.jpg",
      },
      {
        chip: "Analytics",
        title: "Enterprise dashboards leaders actually use",
        body: "Designed analytics products for data-heavy teams. Complex data made simple and visual. Adoption that lasts beyond launch.",
        image: "/img/work-analytics.jpg",
      },
    ],
    cta: {
      line: "Want to see how we could do this for you?",
      label: "Let's talk",
      href: "#contact",
    },
  },

  clients: {
    tag: "Clients",
    heading: "Trusted by leaders across the GCC and beyond",
    /** PLACEHOLDER — logos only with client permission; otherwise sector names. */
    logos: Array.from({ length: 6 }, () => "Client logo"),
    /** PLACEHOLDER — samples showing length and tone; use real, approved quotes. */
    testimonials: [
      {
        quote:
          "Maqnah brought deep expertise and disciplined processes to a program of real scale. They worked seamlessly across our stakeholders and existing systems, backed by clear, proven capability at every stage.",
        name: "[Client name]",
        role: "[Role], [Energy company], KSA",
      },
      {
        quote:
          "From day one, Maqnah put clear governance in place for how our project would be run. They brought multiple teams and legacy platforms together without friction, and have held that standard at every phase since.",
        name: "[Client name]",
        role: "[Role], [Fintech company]",
      },
      {
        quote:
          "Their early analysis gave us a clear roadmap for a project of this size and complexity. Stakeholders stayed aligned, systems came together smoothly, and the results speak for themselves.",
        name: "[Client name]",
        role: "[Role], [Industry], [Country]",
      },
    ],
  },

  contact: {
    pill: "Contact us",
    heading: "Ready to turn your ambition into intelligence?",
    body: "Whether you're modernizing your data platform, putting AI agents to work across your operations, or giving leaders real-time decision intelligence, Maqnah helps you move faster and scale with confidence.",
    listHeading: "Speak with our specialists to:",
    list: [
      "Uncover where data and AI can create the most value",
      "Map a clear, practical roadmap to AI at scale",
      "Take your first step with a team that has done it before",
    ],
    /** PLACEHOLDER — real phone number and mailbox to come. */
    cards: [
      { label: "Call us", value: "[+966 XX XXX XXXX]" },
      { label: "Email us", value: "[hello@maqnahit.com]" },
    ],
    form: {
      heading: "Book a discovery session",
      /** Saudi Arabia first, then the rest of the GCC. */
      countryCodes: ["🇸🇦 +966", "🇦🇪 +971", "🇶🇦 +974", "🇰🇼 +965", "🇧🇭 +973", "🇴🇲 +968", "Other"],
      // "Privacy Policy" should link to a real policy page once one exists.
      consent:
        "By submitting this form, you agree that Maqnah may contact you about your enquiry and use your details as described in our Privacy Policy.",
      submit: "Request a call",
    },
  },

  footer: {
    copyright: "© 2026 Maqnah. All rights reserved.",
    /** PLACEHOLDER — the X account URL is still to come. */
    social: [
      { icon: "linkedin", label: "LinkedIn", href: site.linkedin },
      { icon: "x", label: "X", href: null },
    ],
    /** From the brief's footer note; these pages don't exist yet. */
    legal: ["Privacy Policy", "Cookie Policy"],
  },
} satisfies Dictionary;
