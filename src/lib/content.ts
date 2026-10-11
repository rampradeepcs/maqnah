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

/** VERIFIED — published by Maqnah. */
export const stats = [
  { value: 120, suffix: "+", label: "Clients" },
  { value: 10, suffix: "+", label: "Countries" },
  { value: 200, suffix: "+", label: "Projects" },
  { value: 100, suffix: "+", label: "Experts" },
] as const;

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

export const founder = {
  quote:
    "We find what to automate, who your users are, and how AI can optimize your workflow. Then we build and launch the solution.", // VERIFIED (lightly punctuated)
  name: "Mohsin Khan", // VERIFIED
  role: "Founder & VP, Global Sales", // VERIFIED
  avatar: "/img/mohsin-khan.png",
} as const;
