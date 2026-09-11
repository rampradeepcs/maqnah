/**
 * MAQNAH — single source of truth for all site copy.
 *
 * Facts marked VERIFIED come from maqnah.com / the brand's own material.
 * Facts marked ILLUSTRATIVE are design placeholders that read as real numbers;
 * they must be confirmed (or replaced) by Maqnah before the site goes live.
 */

export const site = {
  name: "Maqnah",
  tagline: "AI • Data • Consulting",
  positioning: "AI · DATA · CONSULTING · DIGITAL TRANSFORMATION",
  statement: "Turning complexity into intelligence.",
  email: "mohsin@maqnah.com", // VERIFIED
  location: "Saudi Arabia", // VERIFIED
  linkedin: "https://www.linkedin.com/company/maqnah",
  url: "https://www.maqnah.com",
} as const;

export const nav = [
  { label: "AI & Data", href: "#capabilities" },
  { label: "Consulting", href: "#consulting" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
] as const;

export const hero = {
  headline: ["Turn Data Into", "Intelligence."],
  sub: "AI-powered strategy, data intelligence and digital transformation for businesses ready to move ahead.",
  primaryCta: { label: "Explore our capabilities", href: "#capabilities" },
  secondaryCta: { label: "Talk to an AI strategist", href: "#contact" },
  systemLabel: "Maqnah Intelligence System",
  pipeline: ["Data", "Insight", "Decision", "Impact"],
  floatingLabels: [
    "DATA",
    "AI",
    "INSIGHTS",
    "AUTOMATION",
    "STRATEGY",
    "GROWTH",
  ],
} as const;

/** VERIFIED — published by Maqnah. */
export const stats = [
  { value: 120, suffix: "+", label: "Clients" },
  { value: 10, suffix: "+", label: "Countries" },
  { value: 200, suffix: "+", label: "Projects" },
  { value: 100, suffix: "+", label: "Experts" },
] as const;

export const bigIdea = {
  lines: [
    "Your business already",
    "has the data.",
    "We help you turn it",
    "into decisions.",
  ],
  // Words in `lines` that illuminate on scroll.
  highlight: ["data.", "decisions."],
  ladder: ["Data", "Intelligence", "Decisions", "Growth"],
} as const;

export type Capability = {
  num: string;
  title: string;
  lede: string;
  items: string[];
  image: string;
  alt: string;
};

export const capabilities: Capability[] = [
  {
    num: "01",
    title: "Data & AI",
    lede: "We build the intelligence layer — the models, pipelines and analytics that turn scattered information into a decision engine.",
    items: [
      "Data Strategy",
      "AI Strategy",
      "Machine Learning",
      "Predictive Analytics",
      "Generative AI",
      "Data Engineering",
    ],
    image: "/img/cap-data-ai.jpg",
    alt: "Data resolving out of noise into an ordered crystalline lattice",
  },
  {
    num: "02",
    title: "AI Consulting",
    lede: "We find where AI is genuinely worth doing, prove it, and give your organisation a roadmap it can actually execute.",
    items: [
      "AI Readiness",
      "AI Transformation",
      "AI Roadmaps",
      "Use Case Discovery",
      "AI Governance",
      "Enterprise AI Strategy",
    ],
    image: "/img/cap-consulting.jpg",
    alt: "A branching decision map with one route lit brighter than the rest",
  },
  {
    num: "03",
    title: "Automation",
    lede: "We take the work that shouldn't need a human and give it to software that never gets tired — with intelligence in the loop.",
    items: [
      "Process Automation",
      "Intelligent Workflows",
      "AI Agents",
      "System Integration",
      "Operational Intelligence",
    ],
    image: "/img/cap-automation.jpg",
    alt: "A luminous mechanism routing particles along precise tracks",
  },
  {
    num: "04",
    title: "Digital Transformation",
    lede: "We modernise the platforms, products and experiences underneath the business so the intelligence has somewhere to live.",
    items: [
      "Digital Strategy",
      "Product Engineering",
      "Cloud Transformation",
      "UX & Product Design",
      "Modernization",
    ],
    image: "/img/cap-transformation.jpg",
    alt: "A rigid monolith dissolving into particles and reassembling as modular architecture",
  },
];

export const engine = {
  heading: "Intelligence is a system.",
  lede: "Not a model. Not a dashboard. A sequence that takes a business from raw signal to compounding advantage — and keeps running after we leave.",
  steps: [
    {
      key: "Discover",
      desc: "We map how the business actually runs — the decisions, the friction, the numbers that matter.",
      example: "Decision audit across operations, finance and customer teams.",
      outcome: "A ranked list of where intelligence pays.",
    },
    {
      key: "Connect",
      desc: "We unify fragmented systems into one trustworthy data foundation.",
      example: "ERP, CRM, IoT and cloud sources joined into a governed platform.",
      outcome: "One version of the truth.",
    },
    {
      key: "Understand",
      desc: "We make the data explain itself — patterns, drivers, anomalies, cause.",
      example: "Analytics and BI that answer why, not just what.",
      outcome: "Decisions stop being opinions.",
    },
    {
      key: "Predict",
      desc: "We model what happens next and attach confidence to it.",
      example: "Demand, risk, churn and maintenance forecasting.",
      outcome: "The organisation moves before the event.",
    },
    {
      key: "Automate",
      desc: "We put the decision into the workflow so it executes itself.",
      example: "AI agents and intelligent workflows inside live operations.",
      outcome: "Capacity released, cycle times collapse.",
    },
    {
      key: "Optimize",
      desc: "We measure, retrain and tune — the system gets better with use.",
      example: "Continuous evaluation, model monitoring and governance.",
      outcome: "Advantage that compounds.",
    },
  ],
} as const;

export const dataFlow = {
  heading: "Make complexity visible.",
  lede: "Every enterprise is already generating more signal than it can read. We take all of it — and give back four things a business can act on.",
  inputs: [
    "ERP",
    "CRM",
    "IoT",
    "Cloud",
    "Web",
    "Mobile",
    "Finance",
    "Customer",
    "Operations",
  ],
  core: "Maqnah Intelligence",
  outputs: ["Insights", "Predictions", "Automation", "Decisions"],
} as const;

export const consulting = {
  heading: ["AI isn't the strategy.", "Impact is."],
  lede: "We have never opened an engagement with a model. We open it with a number the business wants to move.",
  problem: {
    label: "Business problem",
    items: [
      "Manual processes",
      "Disconnected data",
      "Slow decisions",
      "Operational inefficiency",
      "Poor forecasting",
    ],
  },
  outcome: {
    label: "AI-powered outcome",
    items: [
      "Automation",
      "Prediction",
      "Intelligence",
      "Optimization",
      "Growth",
    ],
  },
} as const;

/** Ecosystem nodes — `links` are indices of related solutions. */
export const solutions = [
  { name: "AI Strategy", group: "Strategy", links: [1, 5, 2] },
  { name: "Generative AI", group: "Build", links: [0, 5, 7] },
  { name: "Predictive Analytics", group: "Intelligence", links: [0, 3, 4] },
  { name: "Data Platforms", group: "Foundation", links: [2, 4, 8] },
  { name: "Business Intelligence", group: "Intelligence", links: [2, 3] },
  { name: "AI Agents", group: "Build", links: [1, 6, 0] },
  { name: "Intelligent Automation", group: "Operate", links: [5, 8, 3] },
  { name: "Digital Products", group: "Build", links: [1, 8] },
  { name: "Enterprise Modernization", group: "Foundation", links: [3, 6, 7] },
] as const;

export type Industry = {
  num: string;
  name: string;
  lede: string;
  useCases: string[];
  dataOps: string[];
  outcome: string;
  image: string;
  alt: string;
};

export const industries: Industry[] = [
  {
    num: "01",
    name: "Manufacturing",
    lede: "AI-powered analytics optimise production, reduce downtime and enforce quality — leaner lines, fewer surprises.",
    useCases: [
      "Predictive maintenance",
      "Production optimization",
      "Quality intelligence",
      "Demand forecasting",
    ],
    dataOps: ["Machine telemetry", "MES & ERP records", "Vision inspection"],
    outcome: "Unplanned downtime becomes a scheduled event.",
    image: "/img/ind-manufacturing.jpg",
    alt: "Abstract industrial telemetry streams resolving into a rhythmic production signal",
  },
  {
    num: "02",
    name: "Finance",
    lede: "Intelligence that reads risk, exposure and customer behaviour faster than a reporting cycle can.",
    useCases: [
      "Risk & fraud modelling",
      "Credit intelligence",
      "Automated reconciliation",
      "Scenario forecasting",
    ],
    dataOps: ["Transaction streams", "Core banking systems", "Market signals"],
    outcome: "Decisions priced on evidence, not on lag.",
    image: "/img/ind-finance.jpg",
    alt: "Abstract volumetric risk surface built from luminous transaction particles",
  },
  {
    num: "03",
    name: "Healthcare",
    lede: "Clinical and operational data brought together so care teams spend their attention on patients.",
    useCases: [
      "Patient data consolidation",
      "Clinical decision support",
      "Capacity & flow prediction",
      "Administrative automation",
    ],
    dataOps: ["EHR records", "Imaging & diagnostics", "Scheduling systems"],
    outcome: "Faster diagnosis, lighter administration.",
    image: "/img/ind-healthcare.jpg",
    alt: "Abstract biological lattice of luminous nodes forming a diagnostic pattern",
  },
  {
    num: "04",
    name: "Retail & E-commerce",
    lede: "Demand, inventory and customer intent modelled as one system instead of three arguments.",
    useCases: [
      "Demand forecasting",
      "Personalisation engines",
      "Inventory intelligence",
      "Pricing optimization",
    ],
    dataOps: ["Transaction history", "Behavioural data", "Supply signals"],
    outcome: "The right stock, the right price, the right moment.",
    image: "/img/ind-retail.jpg",
    alt: "Abstract lattice of demand curves and luminous consumer signal paths",
  },
  {
    num: "05",
    name: "Energy & Utilities",
    lede: "Grid, asset and consumption intelligence for infrastructure that cannot afford to guess.",
    useCases: [
      "Asset health monitoring",
      "Load & demand prediction",
      "Loss detection",
      "Field operations automation",
    ],
    dataOps: ["Sensor networks", "SCADA telemetry", "Consumption meters"],
    outcome: "Infrastructure that reports its own future.",
    image: "/img/ind-energy.jpg",
    alt: "Abstract luminous grid network carrying pulses of energy across dark terrain",
  },
  {
    num: "06",
    name: "Education",
    lede: "Learning and institutional data turned into intervention — early, specific and human.",
    useCases: [
      "Learner analytics",
      "Retention prediction",
      "Content personalisation",
      "Operations automation",
    ],
    dataOps: ["Learning platforms", "Assessment data", "Student records"],
    outcome: "Support arrives before the student falls behind.",
    image: "/img/ind-education.jpg",
    alt: "Abstract branching knowledge structure of luminous connected nodes",
  },
];

export type CaseStudy = {
  num: string;
  client: string;
  industry: string;
  title: string;
  problem: string;
  approach: string;
  solution: string;
  /** ILLUSTRATIVE — indicative outcome figures, to be confirmed by Maqnah. */
  metrics: { value: string; label: string }[];
  image: string;
  alt: string;
};

export const work: CaseStudy[] = [
  {
    num: "01",
    client: "Enterprise Meal Management Platform",
    industry: "SaaS · Enterprise mobility",
    title: "Feeding 10,000 people without a paper trail",
    problem:
      "A large enterprise ran its dining operation on manual counts and end-of-month reconciliation. Nobody knew real consumption until it was too late to act on it.",
    approach:
      "We instrumented the moment of truth — the meal itself — with a QR check-in employees actually use, then built the administrative view on top of the live stream.",
    solution:
      "A mobility app for employees and a real-time operations console for administrators, with consumption analytics and forecasting behind both.",
    metrics: [
      { value: "Real-time", label: "Meal visibility" },
      { value: "-31%", label: "Reconciliation effort" },
      { value: "3.4×", label: "Faster reporting" },
    ],
    image: "/img/work-meal.jpg",
    alt: "Abstract luminous flow of thousands of individual check-in events converging into a live operational signal",
  },
  {
    num: "02",
    client: "Clinical EHR Platform",
    industry: "Healthcare",
    title: "Everything the clinician needs, on one screen",
    problem:
      "Clinic-based practitioners were assembling a patient's story from several disconnected systems during the consultation itself — slow, and risky.",
    approach:
      "We ran the design against real consultation workflows, then consolidated vital patient information into a single diagnostic surface with hierarchy that matches how clinicians actually read.",
    solution:
      "An Electronic Health Record dashboard that puts history, vitals, medication and diagnostics in one continuous view.",
    metrics: [
      { value: "+42%", label: "Faster chart review" },
      { value: "1", label: "Screen, not six" },
      { value: "-27%", label: "Admin time per visit" },
    ],
    image: "/img/work-health.jpg",
    alt: "Abstract luminous constellation of patient data points assembling into one coherent diagnostic surface",
  },
  {
    num: "03",
    client: "Hefty Art",
    industry: "NFT · Digital collectibles",
    title: "Provenance you can prove, at auction speed",
    problem:
      "Premium artists and galleries needed a sales platform collectors would trust — verifiable ownership, transparent bidding, no ambiguity about what was actually being bought.",
    approach:
      "We designed for the collector's confidence first: visible provenance, live bid state, and wallet authentication that never breaks the sense of a curated gallery.",
    solution:
      "A secure, scalable auction and sales platform with Phygital drops, real-time bidding and integrated wallet authentication.",
    metrics: [
      { value: "Live", label: "Real-time bidding" },
      { value: "100%", label: "Verifiable provenance" },
      { value: "Phygital", label: "Drop mechanics" },
    ],
    image: "/img/work-nft.jpg",
    alt: "Abstract luminous gallery of suspended geometric panels connected by verification threads",
  },
];

export const impact = {
  heading: "Technology is only valuable when it moves the numbers.",
  lede: "Founded in Saudi Arabia, Maqnah has spent years building transformative digital solutions for organisations that needed to scale, modernise and think faster.",
  mission:
    "To empower businesses with innovative technology solutions that streamline operations, enhance productivity and drive sustainable growth.", // VERIFIED
  vision:
    "To innovate and create impactful digital experiences that empower brands to succeed and connect with their audiences in a dynamic digital landscape.", // VERIFIED
} as const;

export const principles = [
  {
    num: "01",
    title: "Business first",
    desc: "We start with the problem, not the technology.",
    detail:
      "Every engagement opens on a number the business is trying to move. The architecture comes after — never before.",
  },
  {
    num: "02",
    title: "Data before hype",
    desc: "We turn fragmented information into usable intelligence.",
    detail:
      "Most AI projects fail on the data, not the model. We fix the foundation first, even when it is the unglamorous half of the work.",
  },
  {
    num: "03",
    title: "AI with purpose",
    desc: "We identify where AI creates measurable value.",
    detail:
      "We will tell you which use cases are not worth building. That judgement is the most valuable thing a consulting partner brings.",
  },
  {
    num: "04",
    title: "Built to scale",
    desc: "We engineer solutions designed for real enterprise environments.",
    detail:
      "Governance, security, integration and operations are designed in from the first sprint — because pilots that cannot scale are just expensive demos.",
  },
] as const;

export const method = [
  { step: "Discover", desc: "Understand the business." },
  { step: "Define", desc: "Identify high-value opportunities." },
  { step: "Design", desc: "Create the intelligence architecture." },
  { step: "Build", desc: "Engineer the solution." },
  { step: "Deploy", desc: "Launch into the real world." },
  { step: "Optimize", desc: "Continuously improve performance." },
] as const;

export const insights = [
  {
    topic: "AI Strategy",
    title: "The use case you should not build",
    lede: "Most AI roadmaps are a list of what is possible. The useful ones are a list of what is worth it.",
    image: "/img/ins-strategy.jpg",
  },
  {
    topic: "Data Intelligence",
    title: "Your data isn't messy. It's unowned.",
    lede: "Fragmentation is rarely a technical problem. It is an accountability problem wearing a technical costume.",
    image: "/img/ins-data.jpg",
  },
  {
    topic: "Enterprise AI",
    title: "Why pilots stall at 80%",
    lede: "The last twenty percent is governance, integration and trust — the parts nobody demos.",
    image: "/img/ins-enterprise.jpg",
  },
  {
    topic: "Digital Transformation",
    title: "Modernisation is a decision, not a migration",
    lede: "Moving a broken process to the cloud gives you a faster broken process.",
    image: "/img/ins-transformation.jpg",
  },
  {
    topic: "Automation",
    title: "Agents need judgement, not just access",
    lede: "An autonomous workflow is only as safe as the decision boundary you drew around it.",
    image: "/img/ins-automation.jpg",
  },
  {
    topic: "Future of Work",
    title: "The org chart after automation",
    lede: "When routine work leaves, what remains is judgement — and most organisations are not structured for it.",
    image: "/img/ins-work.jpg",
  },
] as const;

export const founder = {
  quote:
    "We find what to automate, who your users are, and how AI can optimize your workflow. Then we build and launch the solution.", // VERIFIED (lightly punctuated)
  name: "Mohsin Khan", // VERIFIED
  role: "Founder & VP, Global Sales", // VERIFIED
  avatar: "/img/mohsin-khan.png",
} as const;

export const finalCta = {
  heading: ["Ready to turn", "intelligence into impact?"],
  lede: "Tell us where your business is today. We'll help you discover where AI and data can take it next.",
  primary: { label: "Start a conversation", href: "#contact-form" },
  secondary: { label: "Explore our work", href: "#work" },
} as const;
