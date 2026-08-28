/**
 * Nachi Tekneka — site content
 * Sourced from the official company profile (ISO 9001:2015 certified).
 */

import { asset } from "./asset";

export const company = {
  name: "Nachi Tekneka",
  brandLine: "A Solution Provider for the Spinning Industry",
  tagline: "Not just parts — parts for solutions.",
  cert: "ISO 9001:2015 Certified",
  phone: "+91 422 267 0091",
  mobile: "+91 96003 09378",
  email: "info@nachitekneka.com",
  website: "www.nachitekneka.com",
};

export const nav = [
  { label: "SpinLyfeX", href: "#spinlyfex" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 500, suffix: "+", label: "Trusted happy customers" },
  { value: 8, suffix: "", label: "Spinning departments served" },
  { value: 3, suffix: "", label: "Continents, one network" },
  { value: 20, suffix: "%", label: "Lower maintenance cost*" },
];

/* Hero carousel — the four brochure pillars + flagship retrofits */
export const heroSlides = [
  {
    id: "maxx",
    kicker: "Nachi SpinLyfeX™ Retrofits",
    title: "Servo Upgrade MAXX",
    fit: "RSB D30 · D35 · D40 · D45 · D22 · D24",
    body: "Eliminates the differential gearbox entirely — G90 AC Servo + Motion Controller, high-torque M90 servomotor and E-Draft on the HMI, in one plug-and-play system.",
    img: asset("/spinlyfex/maxx.jpg"),
    href: "/spinlyfex",
    cta: "Explore retrofits",
    accent: "#ed3237",
  },
  {
    id: "inverter",
    kicker: "Nachi SpinLyfeX™ Retrofits",
    title: "Inverter Upgrade",
    fit: "Blowroom · Carding · Lap Former · Spinning",
    body: "Legacy KEB, Commander & Vectron drives converted to robust Yaskawa V1000 / A1000 / GA700 platforms — with the machine's originality preserved.",
    img: asset("/spinlyfex/inverter.jpg"),
    href: "/spinlyfex",
    cta: "See conversion matrix",
    accent: "#f5a623",
  },
  {
    id: "leveler",
    kicker: "Nachi SpinLyfeX™ Retrofits",
    title: "Carding Auto Leveler",
    fit: "DK 715 · 740 · 760 · 780 · 800 · 803 · 903",
    body: "Closed-loop feedback control for even sliver — hank variation held within ±0.04, 5 m CV under 2.5% and about 20% lower electrical maintenance cost.",
    img: asset("/spinlyfex/leveler.jpg"),
    href: "/spinlyfex",
    cta: "Explore retrofits",
    accent: "#2ec4a6",
  },
  {
    id: "parts",
    kicker: "Premium Parts",
    title: "OEM-Quality Spare Parts",
    fit: "Blowroom → Comber → Draw Frame → Ring Frame",
    body: "Electrical, electronic, pneumatic and precision mechanical parts — equal & equivalent raw materials, dimensional accuracy and assembly-tested quality.",
    img: asset("/hero/parts-ringframe-v2.jpg"),
    href: "/products",
    cta: "Browse the catalog",
    accent: "#5b8def",
  },
  {
    id: "services",
    kicker: "Technical Services",
    title: "Onsite & Laboratory Audits",
    fit: "Draw Frame · Comber · Ring & Compact Frame",
    body: "Spectrogram-driven technical audits, auto-leveler calibration and top-arm rebuilds — delivered onsite by an experienced service team.",
    img: asset("/hero/audit-charts-v2.jpg"),
    href: "/services",
    cta: "View services",
    accent: "#ed3237",
  },
];

/* Flagship retrofit brand — Nachi SpinLyfeX */
export const spinlyfex = [
  {
    id: "servo",
    name: "SpinLyfeX Servo Upgrade",
    fit: "RSB 1 · 51 · 851 · 951",
    summary:
      "Drop-in servo modernization for classic Rieter draw frames — restoring precision without a full rebuild.",
    accent: "#ed3237",
    img: asset("/spinlyfex/servo.jpg"),
  },
  {
    id: "servo-pro",
    name: "SpinLyfeX Servo Upgrade Pro",
    fit: "RSB D30 · D35 · D40 · D45 · D22 · D24",
    summary:
      "Next-generation servo package for the D-series, delivering higher torque and tighter control loops.",
    accent: "#5b8def",
    img: asset("/spinlyfex/servo-pro-v2.jpg"),
  },
  {
    id: "maxx",
    name: "SpinLyfeX Servo Upgrade MAXX",
    fit: "RSB D30 · D35 · D40 · D45 · D22 · D24",
    summary:
      "Eliminates the differential gearbox altogether. G90 controller, M90 servomotor and HMI E-Draft in one plug-and-play system.",
    accent: "#ed3237",
    featured: true,
    img: asset("/spinlyfex/maxx.jpg"),
  },
  {
    id: "inverter",
    name: "SpinLyfeX Inverter Upgrade",
    fit: "Blowroom · Carding · Lap Former · Spinning",
    summary:
      "Nachi PROTOcon converts legacy KEB, Commander & Vectron drives to robust Yaskawa AC platforms — originality preserved.",
    accent: "#f5a623",
    img: asset("/spinlyfex/inverter.jpg"),
  },
  {
    id: "leveler",
    name: "SpinLyfeX Carding Auto Leveler",
    fit: "DK 715 · 740 · 760 · 780 · 800 · 803 · 903",
    summary:
      "Closed-loop autoleveling for even sliver. Hank variation held within ±0.04 and 5 m CV under 2.5%.",
    accent: "#2ec4a6",
    img: asset("/spinlyfex/leveler.jpg"),
  },
];

export const maxxFeatures = [
  "Eliminates the complex differential gearbox — no oil changes, gear swaps, bearings or brake pads.",
  "Replaces the G90 servo drive & M90 servomotor with a high-performance G90 AC Servo + Motion Controller and high-torque M90 AC servomotor.",
  "E-Draft adjustments through the HMI display — no NW1 / NW2 gear changes.",
  "Plug-and-play design for seamless setup by mill technicians.",
  "Preserves the originality of the machine.",
];

/* OEM-level quality pillars */
export const qualityPillars = [
  { title: "Equal & Equivalent Raw Materials", icon: "materials" },
  { title: "Precision Dimensional Accuracy", icon: "precision" },
  { title: "Assembly-Tested Components", icon: "tested" },
  { title: "Prototype Verified Before Launch", icon: "prototype" },
  { title: "Engineered for Reliable Performance", icon: "engineered" },
  { title: "Deep Understanding of Part Function", icon: "function" },
];

/* Product catalog categories */
export const categories = [
  {
    id: "electrical",
    name: "Electrical & Electronics",
    count: "120+ parts",
    blurb:
      "PCBs, measuring units, impulse generators, sensors, encoders, controllers and displays.",
    examples: ["Power Supply PCB", "Measuring Unit", "Impulse Generator", "DSP Control Board"],
    icon: "electronics",
  },
  {
    id: "pneumatics",
    name: "Pneumatics",
    count: "60+ parts",
    blurb:
      "Valve blocks, solenoid & magnet valves, cylinders, regulators and pressure switches.",
    examples: ["Valve Block", "Solenoid Valve", "Pneumatic Cylinder", "Pressure Regulator"],
    icon: "pneumatics",
  },
  {
    id: "blowroom",
    name: "Blow Room & Carding",
    count: "80+ parts",
    blurb:
      "Rollers, sprockets, toothed belt discs, bearings, brushes and precision mechanicals.",
    examples: ["Take-off Roller", "Grooved Roller Top", "Planetary Gear", "Cleaning Brush"],
    icon: "carding",
  },
  {
    id: "comber",
    name: "Comber",
    count: "90+ parts",
    blurb:
      "Nippers, circular & top combs, detaching rollers, brushes and ratchet assemblies.",
    examples: ["Nipper Complete", "Circular Comb", "Detaching Cylinder", "Combing Brush"],
    icon: "comber",
  },
  {
    id: "drawframe",
    name: "Draw Frame",
    count: "140+ parts",
    blurb:
      "Sensing rollers, differential gearing, coilers, calender assemblies and fluted rollers.",
    examples: ["Sensing Roller", "Differential Gearing", "Coiler", "Calender Assembly"],
    icon: "drawframe",
  },
  {
    id: "ringframe",
    name: "Ring & Lap Former",
    count: "100+ parts",
    blurb:
      "Grippers, carriers, spindle brakes, guiding rolls, belts and top rollers for ring & lap.",
    examples: ["Gripper Complete", "Spindle Brake", "Guiding Roll", "Top Roller"],
    icon: "ringframe",
  },
];

/* Departments across the spinning line */
export const solutions = [
  { name: "Blowroom", detail: "Uniclean · Uniflex — contifeed & electrical conversion." },
  { name: "Carding", detail: "C50 · C51 · DK series — full conversion with auto leveler." },
  { name: "Lap Former", detail: "Unilap E30 · E32 — drive & mechanical retrofits." },
  { name: "Comber", detail: "E6X–E90 — nipper, detaching & drafting audits." },
  { name: "Draw Frame", detail: "RSB / SB series — servo & inverter modernization." },
  { name: "Ring & Compact", detail: "G33 · K44 — top-arm rebuild & auto-doffer kits." },
];

/* On-site technical services */
export const services = [
  {
    name: "Draw Frame Technical Audit",
    points: [
      "Comprehensive mechanical condition assessment",
      "Auto-leveler audit & precision calibration",
      "Quality monitoring verification & validation",
      "Process optimization for sliver uniformity",
    ],
  },
  {
    name: "Comber Technical Audit",
    points: [
      "Nipper, detaching & drafting performance analysis",
      "Noil extraction & combing quality verification",
      "Sliver evenness evaluation",
      "Optimization for cleaning efficiency & stability",
    ],
  },
  {
    name: "Ring & Compact Frame Audit",
    points: [
      "Expert onsite top-arm rebuild & maintenance",
      "Auto-doffer maintenance kit installation",
      "Reduction of end breakage & downtime",
      "Machine condition assessment for reliable output",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Nice engineers with the scope of huge technical knowledge to overcome the customer expectation. Very good team.",
    author: "Manivannan Ayyasamy",
    role: "Textile Spinning Auditor, PT. Kahatex, Indonesia",
  },
  {
    quote: "Products are reliable and cost effective compared with OEM.",
    author: "Thirumurugan SV",
    role: "PT. Gokak Indonesia",
  },
  {
    quote: "Very good service and they have very good technical knowledge.",
    author: "Gole Vinay",
    role: "CKL Spinning Mills, Bangladesh",
  },
  {
    quote: "Excellent service.",
    author: "Ramar",
    role: "Shri Govindaraja Mills Private Limited, India",
  },
  {
    quote:
      "Some of the best spare parts providers for the spinning mills. Professional attention and always available. Highly recommended — keep up the good work.",
    author: "Israel Gonzalez",
    role: "Kaltex S.A. De C.V., Mexico",
  },
];

/* x/y are percentages projected onto /world-dots.svg (same projection). */
export const offices = [
  {
    city: "Coimbatore",
    country: "India",
    role: "Headquarters",
    flag: "🇮🇳",
    x: 67.7,
    y: 49.2,
    address: [
      "129A, Thotta Salai East, Power House Road,",
      "Perur Village, Coimbatore – 641 010,",
      "Tamil Nadu, INDIA",
    ],
  },
  {
    city: "Wyoming",
    country: "USA",
    role: "Nachi Tekneka USA LLC",
    flag: "🇺🇸",
    x: 19.7,
    y: 33.1,
    address: ["30 N Gould St STE R,", "Sheridan 82801 WY, USA"],
  },
  {
    city: "Mexico City",
    country: "Mexico",
    role: "Indmex Technology S.A DE C.V.",
    flag: "🇲🇽",
    x: 21.2,
    y: 44.7,
    address: [
      "Astros 4, Valle De La Hacienda,",
      "Cuautitlan Izcalli, Edo. De Mex,",
      "CP 54715",
    ],
  },
];

/* Inverter Upgrade conversion matrix — brochure p.04 */
export const inverterMatrix = [
  { dept: "Blowroom", machine: "Uniclean", model: "B11", cat: "N1", from: "KEB F4 / F5", to: "Yaskawa V1000" },
  { dept: "Blowroom", machine: "Uniflex", model: "B60", cat: "N1 and N2", from: "KEB F4 / F5", to: "Yaskawa V1000" },
  { dept: "Blowroom", machine: "Uniflex", model: "B70", cat: "N1 and N2", from: "KEB F4 / F5", to: "Yaskawa V1000" },
  { dept: "Carding", machine: "Carding", model: "C50", cat: "N10 and N11", from: "Commander SK", to: "Yaskawa V1000" },
  { dept: "Carding", machine: "Carding", model: "C50", cat: "N10 and N11", from: "KEB F4 / F5", to: "Yaskawa V1000" },
  { dept: "Carding", machine: "Carding", model: "C51", cat: "N1, N10, N11 and N43", from: "KEB F4 / F5", to: "Yaskawa V1000" },
  { dept: "Lap Former", machine: "Unilap", model: "E30", cat: "U1", from: "Commander SK", to: "Yaskawa A1000" },
  { dept: "Lap Former", machine: "Unilap", model: "E32", cat: "U1", from: "KEB F4 / F5", to: "Yaskawa A1000" },
  { dept: "Spinning", machine: "Ring Spinning", model: "G33", cat: "U1, U60, U80 and U90", from: "KEB F4 / F5", to: "Yaskawa A1000 / GA700" },
  { dept: "Spinning", machine: "Compact Spinning", model: "K44", cat: "U1, U60, U80 and U90", from: "KEB F4 / F5", to: "Yaskawa A1000 / GA700" },
  { dept: "Spinning", machine: "Ring Spinning", model: "RM 350", cat: "A25 & A27", from: "VECTRON", to: "Yaskawa A1000 / GA700" },
];

/* Retrofit systems for various machines — brochure p.05 */
export const retrofitSystems = [
  { dept: "Blowroom", make: "Rieter", model: "All", mod: "Contifeed system — complete electrical conversion system" },
  { dept: "Blowroom", make: "Truetzschler", model: "All", mod: "Contifeed system — complete electrical conversion system" },
  { dept: "Carding", make: "Rieter", model: "C50 · C51", mod: "Complete electrical conversion system with auto leveler" },
  { dept: "Carding", make: "Truetzschler", model: "DK 715 · 740 · 760 · 780 · 803 · 903", mod: "Complete electrical conversion system with auto leveler" },
  { dept: "Carding", make: "Crosrol", model: "MK5A · MK5B · MK6", mod: "Complete electrical conversion system with auto leveler" },
  { dept: "Spinning", make: "Rieter", model: "G5/1 · G5/2", mod: "Complete electrical conversion system with VFD drive" },
];

/* Machine models covered by the parts program — brochure p.07–09 */
export const modelCoverage = [
  { family: "Blow Room & Carding", models: ["C50", "C51", "C60", "C61", "C70", "C72", "C77", "C80"] },
  { family: "Lap Former", models: ["E30", "E32", "E35", "E36", "E25", "E26"] },
  { family: "Comber", models: ["E60", "E60H", "E62", "E65", "E66", "E70", "E70R", "E72", "E75", "E76", "E80", "E86", "E90"] },
  { family: "Draw Frame — Finisher", models: ["D30", "D35", "D40", "D45", "D50", "D22", "D221", "D24", "D26"] },
  { family: "Draw Frame — Breaker", models: ["D10", "D15", "D40", "D45", "D50", "D22", "D221", "D24", "D26"] },
  { family: "Ring & Compact Frame", models: ["G30", "G32", "G33", "G35", "G36", "G37", "G38", "K42", "K44", "K45", "K46", "K47", "K48"] },
  { family: "Top Rollers", models: ["Lap Former", "Comber", "Draw Frame"] },
];

/* Open positions — careers page */
export const openRoles = [
  {
    id: "service-engineer",
    title: "Service Engineer — Onsite Audits",
    dept: "Technical Services",
    location: "Coimbatore · Field",
    type: "Full-time",
    blurb:
      "Deliver draw frame, comber and ring frame technical audits at customer mills — calibration, top-arm rebuilds and condition assessments.",
  },
  {
    id: "electronics-engineer",
    title: "Electrical & Electronics Engineer",
    dept: "SpinLyfeX R&D",
    location: "Coimbatore",
    type: "Full-time",
    blurb:
      "Design and commission servo, inverter and auto-leveler retrofit systems — from panel wiring and drives to HMI logic.",
  },
  {
    id: "stores-executive",
    title: "Stores & Dispatch Executive",
    dept: "Operations",
    location: "Coimbatore",
    type: "Full-time",
    blurb:
      "Own inventory accuracy and on-time global dispatch for 600+ catalogued parts across three regions.",
  },
];

export const downloads = [
  {
    title: "Company Profile",
    desc: "Full 51-page catalog — products, retrofits & services.",
    meta: "PDF · 5.8 MB",
    kind: "brochure",
    href: asset("/brochure.pdf"),
  },
  {
    title: "SpinLyfeX Retrofit Guide",
    desc: "Servo, inverter & auto-leveler upgrade specifications.",
    meta: "PDF · Technical",
    kind: "spec",
  },
  {
    title: "Top Roller Compatibility Chart",
    desc: "Cot sizes across Draw Frame, Comber & Lap Former.",
    meta: "PDF · Reference",
    kind: "chart",
  },
];
