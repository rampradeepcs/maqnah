/**
 * Nachi Tekneka — full parts catalog.
 * Product names, machine compatibility and images are sourced directly from the
 * official company profile. Images live in /public/catalog (cropped from the profile).
 */

import { asset } from "./asset";

export type Product = {
  id: string;
  name: string;
  fit: string;
  img: string;
  category: string; // category id
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  blurb: string;
  department: string;
  icon: string;
  products: Product[];
  /** Display override for the parts count (e.g. "1000+") — the full range is
   *  larger than what's photographed in the online catalog. */
  count?: string;
  /** Official group-collage photo shown on category cards. */
  groupImg?: string;
};

/** Displayed parts count for a category ("1000+" override or actual length). */
export function categoryCount(c: Category): string {
  return c.count ?? String(c.products.length);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Build products from a page's row-major [name, fit] list. */
function fromPage(page: number, cat: string, rows: [string, string][]): Product[] {
  return rows.map(([name, fit], i) => {
    const r = Math.floor(i / 4);
    const c = i % 4;
    return {
      id: `${slugify(name)}-${page}${r}${c}`,
      name,
      fit,
      img: asset(`/catalog/pg${page}_${r}${c}.png`),
      category: cat,
    };
  });
}

/* ---------------- Electrical & Electronics ---------------- */
/* Product photography: official part images (public/catalog/ee). */
const electrical: Product[] = [
  { id: "b195-measuring-system-1100", name: "B195 Measuring System", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/ee/b195-measuring-system-1100.png"), category: "electrical" },
  { id: "b2-rpm-transmitter-kpl-1101", name: "B2 RPM Transmitter KPL", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/ee/b2-rpm-transmitter-kpl-1101.png"), category: "electrical" },
  { id: "b2-rpm-transmitter-kpl-1102", name: "B2 RPM Transmitter KPL", fit: "RSB D22 · D24", img: asset("/catalog/ee/b2-rpm-transmitter-kpl-1102.png"), category: "electrical" },
  { id: "b91-impulse-generator-1103", name: "B91 Impulse Generator", fit: "RSB D30", img: asset("/catalog/ee/b91-impulse-generator-1103.png"), category: "electrical" },
  { id: "b91-impulse-generator-1110", name: "B91 Impulse Generator", fit: "RSB D35", img: asset("/catalog/ee/b91-impulse-generator-1110.png"), category: "electrical" },
  { id: "b91-impulse-generator-1111", name: "B91 Impulse Generator", fit: "RSB D40 · D45", img: asset("/catalog/ee/b91-impulse-generator-1111.png"), category: "electrical" },
  { id: "b91-impulse-generator-1112", name: "B91 Impulse Generator", fit: "RSB D22 · D24", img: asset("/catalog/ee/b91-impulse-generator-1112.png"), category: "electrical" },
  { id: "b92-impulse-generator-1113", name: "B92 Impulse Generator", fit: "RSB D40", img: asset("/catalog/ee/b92-impulse-generator-1113.png"), category: "electrical" },
  { id: "b92-impulse-generator-1120", name: "B92 Impulse Generator", fit: "RSB D24 · D45", img: asset("/catalog/ee/b92-impulse-generator-1120.png"), category: "electrical" },
  { id: "b92-impulse-generator-1121", name: "B92 Impulse Generator", fit: "RSB D22 Right", img: asset("/catalog/ee/b92-impulse-generator-1121.png"), category: "electrical" },
  { id: "b92-impulse-generator-1122", name: "B92 Impulse Generator", fit: "RSB D22 Left", img: asset("/catalog/ee/b92-impulse-generator-1122.png"), category: "electrical" },
  { id: "b91-impulse-generator-1123", name: "B91 Impulse Generator", fit: "RSB D26 · D50", img: asset("/catalog/ee/b91-impulse-generator-1123.png"), category: "electrical" },
  { id: "b12-impulse-generator-1130", name: "B12 Impulse Generator", fit: "RSB D30 · D35", img: asset("/catalog/ee/b12-impulse-generator-1130.png"), category: "electrical" },
  { id: "b1-b90-impulse-1131", name: "B1 / B90 Impulse", fit: "G33 · K44", img: asset("/catalog/ee/b1-b90-impulse-1131.png"), category: "electrical" },
  { id: "b29-impulse-generator-1132", name: "B29 Impulse Generator", fit: "RSB D50 · D55", img: asset("/catalog/ee/b29-impulse-generator-1132.png"), category: "electrical" },
  { id: "b2-impulse-generator-1133", name: "B2 Impulse Generator", fit: "B2 D50 · D55", img: asset("/catalog/ee/b2-impulse-generator-1133.png"), category: "electrical" },
  { id: "cable-dx95-x3-b91-b92-1200", name: "Cable DX95:X3 (B91, B92)", fit: "RSB D45", img: asset("/catalog/ee/cable-dx95-x3-b91-b92-1200.png"), category: "electrical" },
  { id: "magnetic-sensor-rotor-1201", name: "Magnetic Sensor & Rotor", fit: "G33 · K44", img: asset("/catalog/ee/magnetic-sensor-rotor-1201.png"), category: "electrical" },
  { id: "b3-b4-b40-b41-b43-1202", name: "B3 · B4 · B40 · B41 · B43", fit: "RSB D40 · D45", img: asset("/catalog/ee/b3-b4-b40-b41-b43-1202.png"), category: "electrical" },
  { id: "b4-initiator-1203", name: "B4 Initiator", fit: "RSB D40 · D45", img: asset("/catalog/ee/b4-initiator-1203.png"), category: "electrical" },
  { id: "b24-light-scanner-1210", name: "B24 Light Scanner", fit: "RSB D35 · D40 · D45", img: asset("/catalog/ee/b24-light-scanner-1210.png"), category: "electrical" },
  { id: "b24-light-scanner-1211", name: "B24 Light Scanner", fit: "RSB D45 · D24", img: asset("/catalog/ee/b24-light-scanner-1211.png"), category: "electrical" },
  { id: "servo-motor-encoder-1212", name: "Servo Motor Encoder", fit: "RSB D45", img: asset("/catalog/ee/servo-motor-encoder-1212.png"), category: "electrical" },
  { id: "servomotor-encoder-1213", name: "Servomotor Encoder", fit: "RSB D35 · D40", img: asset("/catalog/ee/servomotor-encoder-1213.png"), category: "electrical" },
  { id: "b2-sensor-1220", name: "B2 Sensor", fit: "RSB 851 · 951", img: asset("/catalog/ee/b2-sensor-1220.png"), category: "electrical" },
  { id: "b10-photo-sensor-unit-1221", name: "B10 Photo Sensor Unit", fit: "RSB 851 · 951", img: asset("/catalog/ee/b10-photo-sensor-unit-1221.png"), category: "electrical" },
  { id: "b91-tacho-generator-1222", name: "B91 Tacho Generator", fit: "RSB 851 · 951", img: asset("/catalog/ee/b91-tacho-generator-1222.png"), category: "electrical" },
  { id: "b93-tacho-generator-1223", name: "B93 Tacho Generator", fit: "RSB 851 · 951", img: asset("/catalog/ee/b93-tacho-generator-1223.png"), category: "electrical" },
  { id: "measuring-unit-1230", name: "Measuring Unit", fit: "Carding C60", img: asset("/catalog/ee/measuring-unit-1230.png"), category: "electrical" },
  { id: "ultrasonic-sensor-1231", name: "Ultrasonic Sensor", fit: "Unilap E35", img: asset("/catalog/ee/ultrasonic-sensor-1231.png"), category: "electrical" },
  { id: "ultrasonic-sensor-1232", name: "Ultrasonic Sensor", fit: "Unifloc A11", img: asset("/catalog/ee/ultrasonic-sensor-1232.png"), category: "electrical" },
  { id: "measuring-unit-1233", name: "Measuring Unit", fit: "Carding C60", img: asset("/catalog/ee/measuring-unit-1233.png"), category: "electrical" },
  { id: "a10-sensor-module-ee00", name: "A10 Sensor Module", fit: "RSB D22", img: asset("/catalog/ee/a10-sensor-module-ee00.png"), category: "electrical" },
  { id: "b50-measuring-unit-ee01", name: "B50 Measuring Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/b50-measuring-unit-ee01.png"), category: "electrical" },
  { id: "b50-output-cable-ee02", name: "B50 Output Cable", fit: "RSB D30 · D35", img: asset("/catalog/ee/b50-output-cable-ee02.png"), category: "electrical" },
  { id: "b90-measuring-unit-ee03", name: "B90 Measuring Unit", fit: "RSB 851 · 951", img: asset("/catalog/ee/b90-measuring-unit-ee03.png"), category: "electrical" },
  { id: "b90-measuring-unit-ee04", name: "B90 Measuring Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/b90-measuring-unit-ee04.png"), category: "electrical" },
  { id: "b90-output-cable-ee05", name: "B90 Output Cable", fit: "RSB D30 · D35", img: asset("/catalog/ee/b90-output-cable-ee05.png"), category: "electrical" },
  { id: "cable-kpl-gm-ee06", name: "Cable KPL GM", fit: "D95 · X3", img: asset("/catalog/ee/cable-kpl-gm-ee06.png"), category: "electrical" },
  { id: "can-bus-controller-ee07", name: "Can Bus Controller", fit: "Unilap & Comber", img: asset("/catalog/ee/can-bus-controller-ee07.png"), category: "electrical" },
  { id: "circulating-pump-ee08", name: "Circulating Pump", fit: "K44 Machine", img: asset("/catalog/ee/circulating-pump-ee08.png"), category: "electrical" },
  { id: "clutch-24vdc-200nm-ee09", name: "Clutch 24VDC 200NM", fit: "Unilap E32", img: asset("/catalog/ee/clutch-24vdc-200nm-ee09.png"), category: "electrical" },
  { id: "creel-sensor-cable-ee10", name: "Creel Sensor Cable", fit: "Omega Lap E35", img: asset("/catalog/ee/creel-sensor-cable-ee10.png"), category: "electrical" },
  { id: "d295-control-dsp-board-ee11", name: "D295 Control DSP Board", fit: "RSB D30 · D35", img: asset("/catalog/ee/d295-control-dsp-board-ee11.png"), category: "electrical" },
  { id: "d90-mother-board-ee12", name: "D90 Mother Board", fit: "RSB D30 · D35", img: asset("/catalog/ee/d90-mother-board-ee12.png"), category: "electrical" },
  { id: "digital-input-module-ee13", name: "Digital Input Module", fit: "Comber Machine", img: asset("/catalog/ee/digital-input-module-ee13.png"), category: "electrical" },
  { id: "distance-sensor-on-ee14", name: "Distance Sensor ON", fit: "RSB D30 · D35", img: asset("/catalog/ee/distance-sensor-on-ee14.png"), category: "electrical" },
  { id: "electromagnetic-clutch-ee15", name: "Electromagnetic Clutch", fit: "RSB D45", img: asset("/catalog/ee/electromagnetic-clutch-ee15.png"), category: "electrical" },
  { id: "encoder-24-v-100-imp-ee16", name: "Encoder 24 V = 100 IMP", fit: "G33 · K44", img: asset("/catalog/ee/encoder-24-v-100-imp-ee16.png"), category: "electrical" },
  { id: "h40-flashing-light-ee17", name: "H40 Flashing Light", fit: "RSB D22 · D24", img: asset("/catalog/ee/h40-flashing-light-ee17.png"), category: "electrical" },
  { id: "h41-flashing-light-ee18", name: "H41 Flashing Light", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/h41-flashing-light-ee18.png"), category: "electrical" },
  { id: "initiator-pnp-ee19", name: "Initiator PNP", fit: "Carding C70", img: asset("/catalog/ee/initiator-pnp-ee19.png"), category: "electrical" },
  { id: "initiator-pnp-ee20", name: "Initiator PNP", fit: "Comber E65 · E86", img: asset("/catalog/ee/initiator-pnp-ee20.png"), category: "electrical" },
  { id: "initiator-pnp-ee21", name: "Initiator PNP", fit: "Unilap E35", img: asset("/catalog/ee/initiator-pnp-ee21.png"), category: "electrical" },
  { id: "initiator-pnp-with-cable-ee22", name: "Initiator PNP with Cable", fit: "Unilap E32", img: asset("/catalog/ee/initiator-pnp-with-cable-ee22.png"), category: "electrical" },
  { id: "interface-can-open-ee23", name: "Interface Can Open", fit: "RSB D24 · D45", img: asset("/catalog/ee/interface-can-open-ee23.png"), category: "electrical" },
  { id: "k4-timer-ee24", name: "K4 Timer", fit: "RSB 851 · 951", img: asset("/catalog/ee/k4-timer-ee24.png"), category: "electrical" },
  { id: "lcd-display-ee25", name: "LCD Display", fit: "RSB D40 · D45", img: asset("/catalog/ee/lcd-display-ee25.png"), category: "electrical" },
  { id: "light-barrier-rlk-ee26", name: "Light Barrier RLK", fit: "RSB D22", img: asset("/catalog/ee/light-barrier-rlk-ee26.png"), category: "electrical" },
  { id: "light-scanner-pnp-ee27", name: "Light Scanner PNP", fit: "Comber Machine", img: asset("/catalog/ee/light-scanner-pnp-ee27.png"), category: "electrical" },
  { id: "light-scanner-pnp-ee28", name: "Light Scanner PNP", fit: "Uniflex B60", img: asset("/catalog/ee/light-scanner-pnp-ee28.png"), category: "electrical" },
  { id: "light-transmitter-pnp-ee29", name: "Light Transmitter PNP", fit: "Comber Machine", img: asset("/catalog/ee/light-transmitter-pnp-ee29.png"), category: "electrical" },
  { id: "limit-switch-ee30", name: "Limit Switch", fit: "RSB D30 · D35", img: asset("/catalog/ee/limit-switch-ee30.png"), category: "electrical" },
  { id: "limit-switch-20e-ee31", name: "Limit Switch 20E", fit: "RSB D50", img: asset("/catalog/ee/limit-switch-20e-ee31.png"), category: "electrical" },
  { id: "magnet-ee32", name: "Magnet", fit: "Unifloc A11", img: asset("/catalog/ee/magnet-ee32.png"), category: "electrical" },
  { id: "magnetic-switch-reed-ee33", name: "Magnetic Switch Reed", fit: "Comber · Unilap", img: asset("/catalog/ee/magnetic-switch-reed-ee33.png"), category: "electrical" },
  { id: "module-16-eingaenge-ee35", name: "Module 16 Eingaenge", fit: "RSB D35 · D40 · D45 · D24", img: asset("/catalog/ee/module-16-eingaenge-ee35.png"), category: "electrical" },
  { id: "motor-1-5-kw-220-420-ee36", name: "Motor 1.5 KW 220-420", fit: "RSB D22", img: asset("/catalog/ee/motor-1-5-kw-220-420-ee36.png"), category: "electrical" },
  { id: "n1-n2-stop-motion-unit-ee37", name: "N1 N2 Stop Motion Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/n1-n2-stop-motion-unit-ee37.png"), category: "electrical" },
  { id: "n3-sensor-module-ee38", name: "N3 Sensor Module", fit: "RSB D30", img: asset("/catalog/ee/n3-sensor-module-ee38.png"), category: "electrical" },
  { id: "n3-n4-n5-stop-motion-ee39", name: "N3 N4 N5 Stop Motion", fit: "RSB 851 · 951", img: asset("/catalog/ee/n3-n4-n5-stop-motion-ee39.png"), category: "electrical" },
  { id: "p3-power-supply-pcb-ee40", name: "P3 Power Supply PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p3-power-supply-pcb-ee40.png"), category: "electrical" },
  { id: "p44-data-storage-pcb-ee41", name: "P44 Data Storage PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p44-data-storage-pcb-ee41.png"), category: "electrical" },
  { id: "p53-sollwert-pcb-ee42", name: "P53 Sollwert PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p53-sollwert-pcb-ee42.png"), category: "electrical" },
  { id: "photocell-pnp-24vdc-ee43", name: "Photocell PNP 24VDC", fit: "Comber Machine", img: asset("/catalog/ee/photocell-pnp-24vdc-ee43.png"), category: "electrical" },
  { id: "pillar-lamp-ee44", name: "Pillar Lamp", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/pillar-lamp-ee44.png"), category: "electrical" },
  { id: "power-supply-unit-ee45", name: "Power Supply Unit", fit: "A79 · C60 · E35", img: asset("/catalog/ee/power-supply-unit-ee45.png"), category: "electrical" },
  { id: "proximity-switch-ee46", name: "Proximity Switch", fit: "E32 · E65", img: asset("/catalog/ee/proximity-switch-ee46.png"), category: "electrical" },
  { id: "proximity-switch-ee47", name: "Proximity Switch", fit: "Unilap E32", img: asset("/catalog/ee/proximity-switch-ee47.png"), category: "electrical" },
  { id: "rectifier-275vac-2a-ee49", name: "Rectifier 275VAC 2A", fit: "Comber Machine", img: asset("/catalog/ee/rectifier-275vac-2a-ee49.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee50", name: "Reflecting Light Barrier", fit: "Carding C60", img: asset("/catalog/ee/reflecting-light-barrier-ee50.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee51", name: "Reflecting Light Barrier", fit: "Comber Machine", img: asset("/catalog/ee/reflecting-light-barrier-ee51.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee52", name: "Reflecting Light Barrier", fit: "G33 · K44", img: asset("/catalog/ee/reflecting-light-barrier-ee52.png"), category: "electrical" },
  { id: "relay-combi-3t-ee53", name: "Relay Combi - 3T", fit: "RSB 851 · 951", img: asset("/catalog/ee/relay-combi-3t-ee53.png"), category: "electrical" },
  { id: "s20-limit-switch-ee54", name: "S20 Limit Switch", fit: "RSB D24", img: asset("/catalog/ee/s20-limit-switch-ee54.png"), category: "electrical" },
  { id: "s25-limit-switch-ee55", name: "S25 Limit Switch", fit: "RSB 851 · 951 · SB 2", img: asset("/catalog/ee/s25-limit-switch-v2.png"), category: "electrical" },
  { id: "s42-limit-switch-ee56", name: "S42 Limit Switch", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/s42-limit-switch-ee56.png"), category: "electrical" },
  { id: "s42-safety-limit-switch-ee57", name: "S42 Safety Limit Switch", fit: "Unilap · Comber", img: asset("/catalog/ee/s42-safety-limit-switch-ee57.png"), category: "electrical" },
  { id: "s44-limit-switch-ee58", name: "S44 Limit Switch", fit: "RSB 851 · 951 · SB 2", img: asset("/catalog/ee/s44-limit-switch-ee58.png"), category: "electrical" },
  { id: "scu-cpu-386ex-module-ee59", name: "SCU-CPU 386EX Module", fit: "Carding C60", img: asset("/catalog/ee/scu-cpu-386ex-module-ee59.png"), category: "electrical" },
  { id: "signal-lamp-dc-24v-ee60", name: "Signal Lamp DC 24V", fit: "RSB D40 · D45", img: asset("/catalog/ee/signal-lamp-dc-24v-ee60.png"), category: "electrical" },
  { id: "single-head-monitoring-ee61", name: "Single Head Monitoring", fit: "Comber Machine", img: asset("/catalog/ee/single-head-monitoring-ee61.png"), category: "electrical" },
  { id: "sliver-monitoring-ee62", name: "Sliver Monitoring", fit: "RSB D30 · D35", img: asset("/catalog/ee/sliver-monitoring-ee62.png"), category: "electrical" },
  { id: "veeder-root-keypad-ee63", name: "Veeder Root Keypad", fit: "RSB 851 · 951", img: asset("/catalog/ee/veeder-root-keypad-ee63.png"), category: "electrical" },
  { id: "vfd-display-ee64", name: "VFD Display", fit: "RSB D30", img: asset("/catalog/ee/vfd-display-ee64.png"), category: "electrical" },
  { id: "x94-connector-m-f-ee65", name: "X94 Connector M F", fit: "RSB 51 · 851 · 951", img: asset("/catalog/ee/x94-connector-m-f-ee65.png"), category: "electrical" },
  { id: "y90-brake-coil-ee66", name: "Y90 Brake Coil", fit: "RSB D35", img: asset("/catalog/ee/y90-brake-coil-ee66.png"), category: "electrical" },
];

/* ---------------- Pneumatics ---------------- */
/* Product photography: official part images (public/catalog/pneu). */
const pneumatics: Product[] = [
  { id: "3-2-way-solenoid-valve-1800", name: "3/2 Way Solenoid Valve", fit: "RSB D30 · D35", img: asset("/catalog/pneu/3-2-way-solenoid-valve-1800.png"), category: "pneumatics" },
  { id: "3-2-way-solenoid-valve-1801", name: "3/2 Way Solenoid Valve", fit: "Comber Machine", img: asset("/catalog/pneu/3-2-way-solenoid-valve-1801.png"), category: "pneumatics" },
  { id: "5-3-way-valve-nw5-g1-4-1802", name: "5/3 Way Valve NW5-G1/4", fit: "Unilap Machine", img: asset("/catalog/pneu/5-3-way-valve-nw5-g1-4-1802.png"), category: "pneumatics" },
  { id: "3-2-way-solenoid-valve-1803", name: "3/2 Way Solenoid Valve", fit: "RSB D30 · D35", img: asset("/catalog/pneu/3-2-way-solenoid-valve-1803.png"), category: "pneumatics" },
  { id: "5-3-way-magnet-valve-1810", name: "5/3 Way Magnet Valve", fit: "Unilap Machine", img: asset("/catalog/pneu/5-3-way-magnet-valve-1810.png"), category: "pneumatics" },
  { id: "3-2-way-solenoid-valve-1811", name: "3/2 Way Solenoid Valve", fit: "RSB D30 · D35", img: asset("/catalog/pneu/3-2-way-solenoid-valve-1811.png"), category: "pneumatics" },
  { id: "5-2-way-valve-nw4-g1-8-1812", name: "5/2 Way Valve NW4 G1/8", fit: "Unilap Machine", img: asset("/catalog/pneu/5-2-way-valve-nw4-g1-8-1812.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-25-125-1813", name: "Pneumatic Cylinder 25/125", fit: "Comber Machine", img: asset("/catalog/pneu/pneumatic-cylinder-25-125-1813.png"), category: "pneumatics" },
  { id: "linear-cylinder-1820", name: "Linear Cylinder", fit: "RSB D30 · D35", img: asset("/catalog/pneu/linear-cylinder-1820.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-20-50-1821", name: "Pneumatic Cylinder 20/50", fit: "Unilap E32", img: asset("/catalog/pneu/pneumatic-cylinder-20-50-1821.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-40-160-1822", name: "Pneumatic Cylinder 40/160", fit: "K43 · K44", img: asset("/catalog/pneu/pneumatic-cylinder-40-160-1822.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-80-550-1823", name: "Pneumatic Cylinder 80/550", fit: "Carding C60", img: asset("/catalog/pneu/pneumatic-cylinder-80-550-1823.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-25-50-1830", name: "Pneumatic Cylinder 25/50", fit: "Omega Lap E35", img: asset("/catalog/pneu/pneumatic-cylinder-25-50-1830.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-40-80-1831", name: "Pneumatic Cylinder 40/80", fit: "G32 Machine", img: asset("/catalog/pneu/pneumatic-cylinder-40-80-1831.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-50-400-1832", name: "Pneumatic Cylinder 50/400", fit: "Unilap E36", img: asset("/catalog/pneu/pneumatic-cylinder-50-400-1832.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-d32-h80-1833", name: "Pneumatic Cylinder D32 H80", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/pneu/pneumatic-cylinder-d32-h80-1833.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-80-550-1900", name: "Pneumatic Cylinder 80/550", fit: "Carding C60", img: asset("/catalog/pneu/pneumatic-cylinder-80-550-1900.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-25-200-1901", name: "Pneumatic Cylinder 25/200", fit: "Unilap Machine", img: asset("/catalog/pneu/pneumatic-cylinder-25-200-1901.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-25-200-1902", name: "Pneumatic Cylinder 25/200", fit: "Unilap Machine", img: asset("/catalog/pneu/pneumatic-cylinder-25-200-1902.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-abst-1903", name: "Pneumatic Cylinder Abst", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/pneu/pneumatic-cylinder-abst-1903.png"), category: "pneumatics" },
  { id: "pneumatic-cylinder-50-400-1910", name: "Pneumatic Cylinder 50/400", fit: "Unilap E32", img: asset("/catalog/pneu/pneumatic-cylinder-50-400-1910.png"), category: "pneumatics" },
  { id: "loading-element-1911", name: "Loading Element", fit: "Unilap Machine", img: asset("/catalog/pneu/loading-element-1911.png"), category: "pneumatics" },
  { id: "loading-element-1912", name: "Loading Element", fit: "Unilap Machine", img: asset("/catalog/pneu/loading-element-1912.png"), category: "pneumatics" },
  { id: "loading-element-1913", name: "Loading Element", fit: "Unilap Machine", img: asset("/catalog/pneu/loading-element-1913.png"), category: "pneumatics" },
  { id: "filter-regulator-complete-1920", name: "Filter Regulator Complete", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/pneu/filter-regulator-complete-1920.png"), category: "pneumatics" },
  { id: "compressed-air-regulator-1921", name: "Compressed Air Regulator", fit: "E35 Machine", img: asset("/catalog/pneu/compressed-air-regulator-1921.png"), category: "pneumatics" },
  { id: "fine-adjusting-valve-1922", name: "Fine Adjusting Valve", fit: "Unilap Machine", img: asset("/catalog/pneu/fine-adjusting-valve-1922.png"), category: "pneumatics" },
  { id: "filter-regulator-1923", name: "Filter Regulator", fit: "RSB D30 · D35", img: asset("/catalog/pneu/filter-regulator-1923.png"), category: "pneumatics" },
  { id: "filter-regulator-1930", name: "Filter Regulator", fit: "Comber Machine", img: asset("/catalog/pneu/filter-regulator-1930.png"), category: "pneumatics" },
  { id: "pressure-regulator-1931", name: "Pressure Regulator", fit: "Comber Machine", img: asset("/catalog/pneu/pressure-regulator-1931.png"), category: "pneumatics" },
  { id: "pressure-regulator-1932", name: "Pressure Regulator", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/pneu/pressure-regulator-1932.png"), category: "pneumatics" },
  { id: "pressure-regulator-kpl-1933", name: "Pressure Regulator KPL", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/pneu/pressure-regulator-kpl-1933.png"), category: "pneumatics" },
  { id: "3-2-5-2-solenoid-valve-pn00", name: "3/2 – 5/2 Solenoid Valve", fit: "RSB D30 · D35", img: asset("/catalog/pneu/3-2-5-2-solenoid-valve-pn00.png"), category: "pneumatics" },
  { id: "3-2-way-magnet-valve-pn01", name: "3/2-Way Magnet Valve", fit: "Unilap E30", img: asset("/catalog/pneu/3-2-way-magnet-valve-pn01.png"), category: "pneumatics" },
  { id: "5-2-way-valve-nw5-g1-4-pn02", name: "5/2 Way Valve NW5-G1/4", fit: "Unilap E32", img: asset("/catalog/pneu/5-2-way-valve-nw5-g1-4-pn02.png"), category: "pneumatics" },
  { id: "all-type-of-o-rings-pn03", name: "All Type of O-Rings", fit: "", img: asset("/catalog/pneu/all-type-of-o-rings-pn03.png"), category: "pneumatics" },
  { id: "b23-pressure-transmitter-pn04", name: "B23 Pressure Transmitter", fit: "RSB D50 · D55", img: asset("/catalog/pneu/b23-pressure-transmitter-pn04.png"), category: "pneumatics" },
  { id: "differential-pressure-switch-pn05", name: "Differential Pressure Switch", fit: "Unilap E35", img: asset("/catalog/pneu/differential-pressure-switch-pn05.png"), category: "pneumatics" },
  { id: "differential-pressure-switch-pn06", name: "Differential Pressure Switch", fit: "Unimix B71", img: asset("/catalog/pneu/differential-pressure-switch-pn06.png"), category: "pneumatics" },
  { id: "magnetic-field-sensor-dc100v-pn07", name: "Magnetic Field Sensor DC100V", fit: "RSB D30", img: asset("/catalog/pneu/magnetic-field-sensor-dc100v-pn07.png"), category: "pneumatics" },
  { id: "magnetic-field-sensor-s22-pn08", name: "Magnetic Field Sensor S22", fit: "RSB D35", img: asset("/catalog/pneu/magnetic-field-sensor-s22-pn08.png"), category: "pneumatics" },
  { id: "magnetic-field-sensor-s22-pn09", name: "Magnetic Field Sensor S22", fit: "RSB D40 · D45", img: asset("/catalog/pneu/magnetic-field-sensor-s22-pn09.png"), category: "pneumatics" },
  { id: "magnetic-switch-reed-pn10", name: "Magnetic Switch Reed", fit: "E34 · E35 · G36 · E66", img: asset("/catalog/pneu/magnetic-switch-reed-pn10.png"), category: "pneumatics" },
  { id: "pneumatic-connector-pn11", name: "Pneumatic Connector", fit: "", img: asset("/catalog/pneu/pneumatic-connector-pn11.png"), category: "pneumatics" },
  { id: "pressure-switch-pn12", name: "Pressure Switch", fit: "G33 · K44", img: asset("/catalog/pneu/pressure-switch-pn12.png"), category: "pneumatics" },
  { id: "pressure-switch-1-10-mbar-pn13", name: "Pressure Switch 1–10 Mbar", fit: "", img: asset("/catalog/pneu/pressure-switch-1-10-mbar-pn13.png"), category: "pneumatics" },
  { id: "pressure-switch-100-kpa-pn14", name: "Pressure Switch 100 KPA", fit: "G33 · K44", img: asset("/catalog/pneu/pressure-switch-100-kpa-pn14.png"), category: "pneumatics" },
  { id: "pressure-switch-200-kpa-pn15", name: "Pressure Switch 200 KPA", fit: "G33 · K44", img: asset("/catalog/pneu/pressure-switch-200-kpa-pn15.png"), category: "pneumatics" },
  { id: "pressure-switch-b5-pn16", name: "Pressure Switch B5", fit: "RSB D40 · D45", img: asset("/catalog/pneu/pressure-switch-b5-pn16.png"), category: "pneumatics" },
  { id: "pressure-switch-g1-4-pn17", name: "Pressure Switch G1/4", fit: "RSB D40 · D45", img: asset("/catalog/pneu/pressure-switch-g1-4-pn17.png"), category: "pneumatics" },
  { id: "pressure-transmitter-pn18", name: "Pressure Transmitter", fit: "A6 Machine", img: asset("/catalog/pneu/pressure-transmitter-pn18.png"), category: "pneumatics" },
  { id: "seal-kit-pn19", name: "Seal Kit", fit: "RSB D40 · D45", img: asset("/catalog/pneu/seal-kit-pn19.png"), category: "pneumatics" },
  { id: "set-of-seals-pn20", name: "Set of Seals", fit: "Unilap E32", img: asset("/catalog/pneu/set-of-seals-pn20.png"), category: "pneumatics" },
  { id: "shut-off-valve-pn21", name: "Shut Off Valve", fit: "", img: asset("/catalog/pneu/shut-off-valve-pn21.png"), category: "pneumatics" },
  { id: "valve-block-pn22", name: "Valve Block", fit: "RSB D22 · D24", img: asset("/catalog/pneu/valve-block-pn22.png"), category: "pneumatics" },
  { id: "valve-block-pn23", name: "Valve Block", fit: "RSB D40 · D45", img: asset("/catalog/pneu/valve-block-pn23.png"), category: "pneumatics" },
  { id: "valve-block-10-pn24", name: "Valve Block 10", fit: "Unilap E32", img: asset("/catalog/pneu/valve-block-10-pn24.png"), category: "pneumatics" },
  { id: "valve-block-8-pn25", name: "Valve Block 8", fit: "Unilap E32", img: asset("/catalog/pneu/valve-block-8-pn25.png"), category: "pneumatics" },
  { id: "ventilation-filter-g3-8-pn26", name: "Ventilation Filter G3/8", fit: "RSB D30 · D35", img: asset("/catalog/pneu/ventilation-filter-g3-8-pn26.png"), category: "pneumatics" },
];

/* ---------------- Blow Room & Carding ---------------- */
/* Product photography: official part images (public/catalog/br). */
const blowroom: Product[] = [
  { id: "axle-2300", name: "Axle", fit: "Blow Room", img: asset("/catalog/br/axle-2300.png"), category: "blowroom" },
  { id: "bolt-complete-d20x114-4-2301", name: "Bolt Complete D20X114.4", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/br/bolt-complete-d20x114-4-2301.png"), category: "blowroom" },
  { id: "calender-roller-d15-x-124-2302", name: "Calender Roller D15 X 124", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/br/calender-roller-d15-x-124-2302.png"), category: "blowroom" },
  { id: "grooved-roller-top-2303", name: "Grooved Roller Top", fit: "Carding C51", img: asset("/catalog/br/grooved-roller-top-2303.png"), category: "blowroom" },
  { id: "toothed-belt-disc-2310", name: "Toothed-Belt-Disc", fit: "Unifloc A21", img: asset("/catalog/br/toothed-belt-disc-2310.png"), category: "blowroom" },
  { id: "intermediate-ring-2311", name: "Intermediate Ring", fit: "Unifloc A11", img: asset("/catalog/br/intermediate-ring-2311.png"), category: "blowroom" },
  { id: "cape-hood-behind-2312", name: "Cape Hood Behind", fit: "Unifloc A11", img: asset("/catalog/br/cape-hood-behind-2312.png"), category: "blowroom" },
  { id: "flange-2313", name: "Flange", fit: "Unifloc A11", img: asset("/catalog/br/flange-2313.png"), category: "blowroom" },
  { id: "fixing-device-2320", name: "Fixing Device", fit: "Unifloc A11", img: asset("/catalog/br/fixing-device-2320.png"), category: "blowroom" },
  { id: "deviating-unit-complete-2321", name: "Deviating Unit Complete", fit: "Unifloc A11", img: asset("/catalog/br/deviating-unit-complete-2321.png"), category: "blowroom" },
  { id: "bracket-for-covertape-2322", name: "Bracket for Covertape", fit: "Carding", img: asset("/catalog/br/bracket-for-covertape-2322.png"), category: "blowroom" },
  { id: "wiper-2323", name: "Wiper", fit: "Unifloc A21", img: asset("/catalog/br/wiper-2323.png"), category: "blowroom" },
  { id: "sliding-rail-50-m-2330", name: "Sliding Rail 50 M", fit: "Unifloc A11", img: asset("/catalog/br/sliding-rail-50-m-2330.png"), category: "blowroom" },
  { id: "slide-rail-2331", name: "Slide-Rail", fit: "Unifloc A11", img: asset("/catalog/br/slide-rail-2331.png"), category: "blowroom" },
  { id: "cover-tape-l-101650-2332", name: "Cover Tape L-101650", fit: "Unifloc A11", img: asset("/catalog/br/cover-tape-l-101650-2332.png"), category: "blowroom" },
  { id: "feeding-tape-2333", name: "Feeding Tape", fit: "Unimix B71", img: asset("/catalog/br/feeding-tape-2333.png"), category: "blowroom" },
  { id: "differential-pressure-switch-2400", name: "Differential Pressure Switch", fit: "DK Series", img: asset("/catalog/br/differential-pressure-switch-2400.png"), category: "blowroom" },
  { id: "sealing-rings-2401", name: "Sealing Rings", fit: "Blow Room · Carding", img: asset("/catalog/br/sealing-rings-2401.png"), category: "blowroom" },
  { id: "sprocket-t-21-17-2402", name: "Sprocket T=21-17", fit: "Unifloc A11", img: asset("/catalog/br/sprocket-t-21-17-2402.png"), category: "blowroom" },
  { id: "sprocket-t17-2403", name: "Sprocket T17", fit: "Unifloc A11", img: asset("/catalog/br/sprocket-t17-2403.png"), category: "blowroom" },
  { id: "sprocket-t32-2410", name: "Sprocket T32", fit: "Unifloc A11", img: asset("/catalog/br/sprocket-t32-2410.png"), category: "blowroom" },
  { id: "calender-housing-2411", name: "Calender Housing", fit: "Carding C51", img: asset("/catalog/br/calender-housing-2411.png"), category: "blowroom" },
  { id: "bearing-bracket-2412", name: "Bearing Bracket", fit: "Carding C51", img: asset("/catalog/br/bearing-bracket-2412.png"), category: "blowroom" },
  { id: "bevel-gearing-complete-2413", name: "Bevel Gearing Complete", fit: "E62 · E65", img: asset("/catalog/br/bevel-gearing-complete-2413.png"), category: "blowroom" },
  { id: "planetary-gear-2420", name: "Planetary Gear", fit: "Carding C60", img: asset("/catalog/br/planetary-gear-2420.png"), category: "blowroom" },
  { id: "cleaning-brush-new-type-2421", name: "Cleaning Brush New Type", fit: "Carding C51", img: asset("/catalog/br/cleaning-brush-new-type-2421.png"), category: "blowroom" },
  { id: "brush-round-2422", name: "Brush Round", fit: "Carding C51", img: asset("/catalog/br/brush-round-2422.png"), category: "blowroom" },
  { id: "suction-tube-2423", name: "Suction Tube", fit: "Carding C60", img: asset("/catalog/br/suction-tube-2423.png"), category: "blowroom" },
  { id: "spindle-2430", name: "Spindle", fit: "Carding C60 · C70", img: asset("/catalog/br/spindle-2430.png"), category: "blowroom" },
  { id: "suction-tube-2431", name: "Suction Tube", fit: "Carding C60", img: asset("/catalog/br/suction-tube-2431.png"), category: "blowroom" },
  { id: "power-grip-43sf-2432", name: "Power Grip 43SF", fit: "Carding C51", img: asset("/catalog/br/power-grip-43sf-2432.png"), category: "blowroom" },
  { id: "cross-band-roll-2433", name: "Cross Band Roll", fit: "Carding C60", img: asset("/catalog/br/cross-band-roll-2433.png"), category: "blowroom" },
  { id: "advance-unit-1000mm-br00", name: "Advance Unit 1000mm", fit: "Carding C51", img: asset("/catalog/br/advance-unit-1000mm-br00.png"), category: "blowroom" },
  { id: "bush-br01", name: "Bush", fit: "Carding C51", img: asset("/catalog/br/bush-br01.png"), category: "blowroom" },
  { id: "chain-wheel-special-br02", name: "Chain-Wheel-Special", fit: "Unifloc A11", img: asset("/catalog/br/chain-wheel-special-br02.png"), category: "blowroom" },
  { id: "clamping-roller-mit-271-5-br03", name: "Clamping Roller Mit 271-5", fit: "Open End R60", img: asset("/catalog/br/clamping-roller-mit-271-5-br03.png"), category: "blowroom" },
  { id: "gas-pressure-spring-br04", name: "Gas Pressure Spring", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/br/gas-pressure-spring-br04.png"), category: "blowroom" },
  { id: "gas-pressure-spring-br05", name: "Gas Pressure Spring", fit: "SB 20", img: asset("/catalog/br/gas-pressure-spring-br05.png"), category: "blowroom" },
  { id: "gas-pressure-spring-br06", name: "Gas Pressure Spring", fit: "Unifloc A11", img: asset("/catalog/br/gas-pressure-spring-br06.png"), category: "blowroom" },
  { id: "gauge-complete-400-br07", name: "Gauge Complete 400", fit: "Carding C70", img: asset("/catalog/br/gauge-complete-400-br07.png"), category: "blowroom" },
  { id: "grinding-stone-igs-br08", name: "Grinding Stone IGS", fit: "Carding C51", img: asset("/catalog/br/grinding-stone-igs-br08.png"), category: "blowroom" },
  { id: "needle-roll-br09", name: "Needle Roll", fit: "", img: asset("/catalog/br/needle-roll-br09.png"), category: "blowroom" },
  { id: "pressure-tubing-igs-br10", name: "Pressure Tubing IGS", fit: "Carding C51", img: asset("/catalog/br/pressure-tubing-igs-br10.png"), category: "blowroom" },
  { id: "running-roller-br11", name: "Running-Roller", fit: "Unifloc A11", img: asset("/catalog/br/running-roller-br11.png"), category: "blowroom" },
  { id: "sealing-ring-22x30x4-br12", name: "Sealing Ring 22X30X4", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/br/sealing-ring-22x30x4-br12.png"), category: "blowroom" },
  { id: "sealing-ring-a65x100x10-br13", name: "Sealing Ring A65X100X10", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/br/sealing-ring-a65x100x10-br13.png"), category: "blowroom" },
  { id: "shearing-pin-br14", name: "Shearing Pin", fit: "Carding C60 · C70", img: asset("/catalog/br/shearing-pin-br14.png"), category: "blowroom" },
  { id: "slide-shoe-4b-br15", name: "Slide Shoe 4B", fit: "Carding C60", img: asset("/catalog/br/slide-shoe-4b-br15.png"), category: "blowroom" },
  { id: "take-off-roller-2300-br16", name: "Take Off Roller 2300", fit: "Unifloc A12", img: asset("/catalog/br/take-off-roller-2300-br16.png"), category: "blowroom" },
  { id: "toothed-belt-disc-br17", name: "Toothed Belt Disc", fit: "Unifloc A11", img: asset("/catalog/br/toothed-belt-disc-br17.png"), category: "blowroom" },
];

/* ---------------- Lap Former ---------------- */
/* Product photography: official part images (public/catalog/lap). */
const lapformer: Product[] = [
  { id: "toothed-segment-2700", name: "Toothed Segment", fit: "E30 · E32", img: asset("/catalog/lap/toothed-segment-2700.png"), category: "lapformer" },
  { id: "spur-toothed-wheel-2701", name: "Spur Toothed Wheel", fit: "E30 · E32", img: asset("/catalog/lap/spur-toothed-wheel-2701.png"), category: "lapformer" },
  { id: "tooth-type-chain-hdl-118-2702", name: "Tooth Type Chain HDL 118", fit: "E30 · E32", img: asset("/catalog/lap/tooth-type-chain-hdl-118-2702.png"), category: "lapformer" },
  { id: "tooth-type-chain-hdl-150-2703", name: "Tooth Type Chain HDL 150", fit: "E30 · E32", img: asset("/catalog/lap/tooth-type-chain-hdl-150-2703.png"), category: "lapformer" },
  { id: "tooth-chain-hdl-200-2710", name: "Tooth Chain HDL 200", fit: "E30 · E32", img: asset("/catalog/lap/tooth-chain-hdl-200-2710.png"), category: "lapformer" },
  { id: "tooth-type-chains-2711", name: "Tooth Type Chains", fit: "E30 · E32", img: asset("/catalog/lap/tooth-type-chains-2711.png"), category: "lapformer" },
  { id: "universal-shaft-left-2712", name: "Universal Shaft Left", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/universal-shaft-left-2712.png"), category: "lapformer" },
  { id: "universal-shaft-right-2713", name: "Universal Shaft Right", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/universal-shaft-right-2713.png"), category: "lapformer" },
  { id: "connecting-ring-mit-2720", name: "Connecting Ring MIT", fit: "E30 · E32", img: asset("/catalog/lap/connecting-ring-mit-2720.png"), category: "lapformer" },
  { id: "guiding-track-2721", name: "Guiding Track", fit: "E30 · E32", img: asset("/catalog/lap/guiding-track-2721.png"), category: "lapformer" },
  { id: "pressure-hose-2722", name: "Pressure Hose", fit: "E30 · E32", img: asset("/catalog/lap/pressure-hose-2722.png"), category: "lapformer" },
  { id: "bearing-saddle-v3-2723", name: "Bearing Saddle V3", fit: "E30 · E32", img: asset("/catalog/lap/bearing-saddle-v3-2723.png"), category: "lapformer" },
  { id: "bearing-saddle-h3-2730", name: "Bearing Saddle H3", fit: "E30 · E32", img: asset("/catalog/lap/bearing-saddle-h3-2730.png"), category: "lapformer" },
  { id: "bearing-saddle-m3-2731", name: "Bearing Saddle M3", fit: "E30 · E32", img: asset("/catalog/lap/bearing-saddle-m3-2731.png"), category: "lapformer" },
  { id: "loading-element-e-2732", name: "Loading Element E", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/loading-element-e-2732.png"), category: "lapformer" },
  { id: "loading-element-m-2733", name: "Loading Element M", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/loading-element-m-2733.png"), category: "lapformer" },
  { id: "loading-element-a-2800", name: "Loading Element A", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/loading-element-a-2800.png"), category: "lapformer" },
  { id: "cylinder-and-guide-2801", name: "Cylinder and Guide", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/cylinder-and-guide-2801.png"), category: "lapformer" },
  { id: "pressure-booster-2802", name: "Pressure Booster", fit: "E35 · E36", img: asset("/catalog/lap/pressure-booster-2802.png"), category: "lapformer" },
  { id: "pressure-spring-4x21-2803", name: "Pressure Spring 4X21", fit: "E30 · E32", img: asset("/catalog/lap/pressure-spring-4x21-2803.png"), category: "lapformer" },
  { id: "pressure-spring-2x13-2810", name: "Pressure Spring 2X13", fit: "E30 · E32", img: asset("/catalog/lap/pressure-spring-2x13-2810.png"), category: "lapformer" },
  { id: "pressure-spring-2x28-2811", name: "Pressure Spring 2X28", fit: "E30 · E32", img: asset("/catalog/lap/pressure-spring-2x28-2811.png"), category: "lapformer" },
  { id: "sealing-ring-25x47x7-2812", name: "Sealing Ring 25X47X7", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/sealing-ring-25x47x7-2812.png"), category: "lapformer" },
  { id: "sealing-ring-25x47x8-2813", name: "Sealing Ring 25X47X8", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/sealing-ring-25x47x8-2813.png"), category: "lapformer" },
  { id: "washer-2820", name: "Washer", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/washer-2820.png"), category: "lapformer" },
  { id: "sealing-ring-as-28x40-2821", name: "Sealing Ring AS 28X40", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/sealing-ring-as-28x40-2821.png"), category: "lapformer" },
  { id: "gas-pressure-spring-2822", name: "Gas Pressure Spring", fit: "E30 · E32", img: asset("/catalog/lap/gas-pressure-spring-2822.png"), category: "lapformer" },
  { id: "gas-pressure-spring-2823", name: "Gas Pressure Spring", fit: "E35 · E36", img: asset("/catalog/lap/gas-pressure-spring-2823.png"), category: "lapformer" },
  { id: "gas-pressure-spring-2830", name: "Gas Pressure Spring", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/gas-pressure-spring-2830.png"), category: "lapformer" },
  { id: "calender-roll-lf00", name: "Calender Roll", fit: "E35 · E36", img: asset("/catalog/lap/calender-roll-lf00.png"), category: "lapformer" },
  { id: "flat-belt-b298-lf01", name: "Flat Belt B298", fit: "E35 · E36", img: asset("/catalog/lap/flat-belt-b298-lf01.png"), category: "lapformer" },
  { id: "flat-belt-feed-lf02", name: "Flat Belt Feed", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/flat-belt-feed-lf02.png"), category: "lapformer" },
  { id: "guiding-roll-left-lf03", name: "Guiding Roll Left", fit: "E30 · E32", img: asset("/catalog/lap/guiding-roll-left-lf03.png"), category: "lapformer" },
  { id: "guiding-roll-right-lf04", name: "Guiding Roll Right", fit: "E30 · E32", img: asset("/catalog/lap/guiding-roll-right-lf04.png"), category: "lapformer" },
  { id: "lap-spool-200x301-lf05", name: "Lap Spool 200X301", fit: "E30 · E32 · E35 · E36", img: asset("/catalog/lap/lap-spool-200x301-lf05.png"), category: "lapformer" },
  { id: "sleeve-carrier-lf06", name: "Sleeve Carrier", fit: "E30 · E32", img: asset("/catalog/lap/sleeve-carrier-lf06.png"), category: "lapformer" },
  { id: "top-roller-lf07", name: "Top Roller", fit: "RSB 851 · 951", img: asset("/catalog/lap/top-roller-lf07.png"), category: "lapformer" },
];

/* ---------------- Comber ---------------- */
/* Product photography: official part images (public/catalog/comb). */
const comber: Product[] = [
  { id: "feed-cylinder-complete-3000", name: "Feed Cylinder Complete", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/feed-cylinder-complete-3000.png"), category: "comber" },
  { id: "detaching-cylinder-3001", name: "Detaching Cylinder", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/detaching-cylinder-3001.png"), category: "comber" },
  { id: "detaching-roller-drive-3002", name: "Detaching Roller Drive", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/detaching-roller-drive-3002.png"), category: "comber" },
  { id: "detaching-roller-end-3003", name: "Detaching Roller End", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/detaching-roller-end-3003.png"), category: "comber" },
  { id: "lap-feed-3010", name: "Lap Feed", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/lap-feed-3010.png"), category: "comber" },
  { id: "lap-feed-cover-3011", name: "Lap Feed Cover", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/lap-feed-cover-3011.png"), category: "comber" },
  { id: "lap-feeding-open-3012", name: "Lap Feeding Open", fit: "E6X · E7X", img: asset("/catalog/comb/lap-feeding-open-3012.png"), category: "comber" },
  { id: "lap-feed-back-3013", name: "Lap Feed Back", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/lap-feed-back-3013.png"), category: "comber" },
  { id: "combing-brush-3020", name: "Combing Brush", fit: "E8X · E90", img: asset("/catalog/comb/combing-brush-3020.png"), category: "comber" },
  { id: "combing-brush-3021", name: "Combing Brush", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/combing-brush-3021.png"), category: "comber" },
  { id: "combing-brush-3022", name: "Combing Brush", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/combing-brush-3022.png"), category: "comber" },
  { id: "combing-brush-wood-3023", name: "Combing Brush - Wood", fit: "E6X · E7X", img: asset("/catalog/comb/combing-brush-wood-3023.png"), category: "comber" },
  { id: "cleaning-spiral-brush-3030", name: "Cleaning Spiral Brush", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/cleaning-spiral-brush-3030.png"), category: "comber" },
  { id: "bellow-3031", name: "Bellow", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/bellow-3031.png"), category: "comber" },
  { id: "front-support-left-right-3032", name: "Front Support Left & Right", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/front-support-left-right-3032.png"), category: "comber" },
  { id: "ratchet-wheel-right-t20-3033", name: "Ratchet Wheel Right T20", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/ratchet-wheel-right-t20-3033.png"), category: "comber" },
  { id: "ratchet-wheel-left-3100", name: "Ratchet Wheel Left", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/ratchet-wheel-left-3100.png"), category: "comber" },
  { id: "ratchet-wheel-right-3101", name: "Ratchet Wheel Right", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/ratchet-wheel-right-3101.png"), category: "comber" },
  { id: "pressure-saddle-3102", name: "Pressure Saddle", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/pressure-saddle-3102.png"), category: "comber" },
  { id: "hinge-3103", name: "Hinge", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/hinge-3103.png"), category: "comber" },
  { id: "spur-toothed-wheel-z25-3110", name: "Spur Toothed Wheel Z25", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/spur-toothed-wheel-z25-3110.png"), category: "comber" },
  { id: "ratchet-rh-backward-3111", name: "Ratchet RH Backward", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/ratchet-rh-backward-3111.png"), category: "comber" },
  { id: "ratchet-lh-forward-feed-3112", name: "Ratchet LH Forward Feed", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_12.png"), category: "comber" },
  { id: "ratchet-rh-backward-3113", name: "Ratchet RH Backward", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_13.png"), category: "comber" },
  { id: "ratchet-rh-lh-forward-3120", name: "Ratchet RH / LH Forward", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_20.png"), category: "comber" },
  { id: "pressure-aggregat-3121", name: "Pressure Aggregat", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_21.png"), category: "comber" },
  { id: "pressure-cylinder-3122", name: "Pressure Cylinder", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_22.png"), category: "comber" },
  { id: "top-comb-bed-mil-3123", name: "Top Comb Bed Mil", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/top-comb-bed-mil-3123.png"), category: "comber" },
  { id: "holder-3130", name: "Holder", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_30.png"), category: "comber" },
  { id: "holder-3131", name: "Holder", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_31.png"), category: "comber" },
  { id: "cover-3132", name: "Cover", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_32.png"), category: "comber" },
  { id: "cover-3133", name: "Cover", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/pg31_33.png"), category: "comber" },
  { id: "bevel-gearing-complete-cb00", name: "Bevel Gearing Complete", fit: "E6X · E7X", img: asset("/catalog/comb/bevel-gearing-complete-cb00.png"), category: "comber" },
  { id: "circular-comb-cb01", name: "Circular Comb", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/circular-comb-cb01.png"), category: "comber" },
  { id: "differential-gear-cb02", name: "Differential Gear", fit: "E6X · E7X · E8X", img: asset("/catalog/comb/differential-gear-cb02.png"), category: "comber" },
  { id: "lap-feeding-chute-cb03", name: "Lap Feeding Chute", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/lap-feeding-chute-cb03.png"), category: "comber" },
  { id: "nipper-complete-cb04", name: "Nipper Complete", fit: "E6X · E7X · E8X · E90", img: asset("/catalog/comb/nipper-complete-cb04.png"), category: "comber" },
];

/* ---------------- Draw Frame ---------------- */
/* Product photography: official part images (public/catalog/df). */
const drawframe: Product[] = [
  { id: "side-part-oben-unten-3600", name: "Side Part Oben / Unten", fit: "RSB D30 · D35", img: asset("/catalog/df/side-part-oben-unten-3600.png"), category: "drawframe" },
  { id: "side-part-oben-unten-3601", name: "Side Part Oben / Unten", fit: "RSB D30 · D35", img: asset("/catalog/df/side-part-oben-unten-3601.png"), category: "drawframe" },
  { id: "feeding-hub-b9-0-cpl-3602", name: "Feeding Hub B9.0 CPL", fit: "RSB D30 · D35", img: asset("/catalog/df/feeding-hub-b9-0-cpl-3602.png"), category: "drawframe" },
  { id: "deflector-b6-f-tastrolle-3603", name: "Deflector B6 F.Tastrolle", fit: "RSB D30 · D35", img: asset("/catalog/df/deflector-b6-f-tastrolle-3603.png"), category: "drawframe" },
  { id: "tension-spring-10394714-3610", name: "Tension Spring 10394714", fit: "RSB D40 · D45 · D50", img: asset("/catalog/df/tension-spring-10394714-3610.png"), category: "drawframe" },
  { id: "diaphragm-bfa-80-70x45-3611", name: "Diaphragm BFA 80/70X45", fit: "RSB D30 · D35", img: asset("/catalog/df/diaphragm-bfa-80-70x45-3611.png"), category: "drawframe" },
  { id: "spiral-bevel-gear-51-22t-3612", name: "Spiral Bevel Gear 51/22T", fit: "RSB 851 · 951", img: asset("/catalog/df/spiral-bevel-gear-51-22t-3612.png"), category: "drawframe" },
  { id: "shock-absorber-3613", name: "Shock Absorber", fit: "RSB 851 · 951", img: asset("/catalog/df/shock-absorber-3613.png"), category: "drawframe" },
  { id: "bearing-dr1625-3620", name: "Bearing DR1625", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/df/bearing-dr1625-3620.png"), category: "drawframe" },
  { id: "cogged-belt-wheel-z22-3621", name: "Cogged Belt Wheel Z22", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/df/cogged-belt-wheel-z22-3621.png"), category: "drawframe" },
  { id: "contact-disk-3622", name: "Contact Disk", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/df/contact-disk-3622.png"), category: "drawframe" },
  { id: "sliver-funnel-d13-wzf-3623", name: "Sliver Funnel D13 WZF", fit: "RSB D45 · D50 · D24", img: asset("/catalog/df/sliver-funnel-d13-wzf-3623.png"), category: "drawframe" },
  { id: "loading-lever-3630", name: "Loading Lever", fit: "RSB D45 · D50 · D24", img: asset("/catalog/df/loading-lever-3630.png"), category: "drawframe" },
  { id: "sliver-guide-d26-3631", name: "Sliver Guide D26", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/df/sliver-guide-d26-3631.png"), category: "drawframe" },
  { id: "pulley-d210-ballig-3632", name: "Pulley D210 Ballig", fit: "SB D15", img: asset("/catalog/df/pulley-d210-ballig-3632.png"), category: "drawframe" },
  { id: "accessories-3633", name: "Accessories", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/df/accessories-3633.png"), category: "drawframe" },
  { id: "differential-gearing-cpl-3700", name: "Differential Gearing Cpl", fit: "RSB D35", img: asset("/catalog/df/differential-gearing-cpl-3700.png"), category: "drawframe" },
  { id: "differential-gearing-cpl-3701", name: "Differential Gearing Cpl", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/df/differential-gearing-cpl-3701.png"), category: "drawframe" },
  { id: "differential-gearing-cpl-3702", name: "Differential Gearing Cpl", fit: "RSB D30", img: asset("/catalog/df/differential-gearing-cpl-3702.png"), category: "drawframe" },
  { id: "pinion-cage-3703", name: "Pinion Cage", fit: "RSB D35 · D4X · D2X", img: asset("/catalog/df/pinion-cage-3703.png"), category: "drawframe" },
  { id: "drive-mit-bremse-3710", name: "Drive Mit Bremse", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/df/drive-mit-bremse-3710.png"), category: "drawframe" },
  { id: "pulley-d-185-pj-10-3711", name: "Pulley D.185 PJ 10", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/df/pulley-d-185-pj-10-3711.png"), category: "drawframe" },
  { id: "clutch-mit-nabe-3712", name: "Clutch Mit Nabe", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/pg37_12.png"), category: "drawframe" },
  { id: "pinion-cage-3713", name: "Pinion Cage", fit: "RSB D30", img: asset("/catalog/pg37_13.png"), category: "drawframe" },
  { id: "spur-gear-3720", name: "Spur Gear", fit: "RSB D30 · D35", img: asset("/catalog/pg37_20.png"), category: "drawframe" },
  { id: "shaft-3721", name: "Shaft", fit: "RSB D30 · D35", img: asset("/catalog/pg37_21.png"), category: "drawframe" },
  { id: "brake-disk-vdb-1580-3722", name: "Brake Disk VDB 1580", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/pg37_22.png"), category: "drawframe" },
  { id: "brake-plate-3723", name: "Brake Plate", fit: "RSB D30 · D35", img: asset("/catalog/pg37_23.png"), category: "drawframe" },
  { id: "coupling-3730", name: "Coupling", fit: "RSB D30 · D35", img: asset("/catalog/pg37_30.png"), category: "drawframe" },
  { id: "set-of-tension-element-3731", name: "Set Of Tension Element", fit: "RSB D40 · D45 · D22 · D24", img: asset("/catalog/pg37_31.png"), category: "drawframe" },
  { id: "loading-arm-complete-3732", name: "Loading-Arm-Complete", fit: "RSB D40 · D45", img: asset("/catalog/pg37_32.png"), category: "drawframe" },
  { id: "tappet-3733", name: "Tappet", fit: "RSB D40 · D45 · D50", img: asset("/catalog/pg37_33.png"), category: "drawframe" },
  { id: "bearing-housing-df00", name: "Bearing Housing", fit: "RSB D30 · D35", img: asset("/catalog/df/bearing-housing-df00.png"), category: "drawframe" },
  { id: "piston-df01", name: "Piston", fit: "RSB D30 · D35", img: asset("/catalog/df/piston-df01.png"), category: "drawframe" },
  { id: "scanning-gear-box-df02", name: "Scanning Gear Box", fit: "RSB D30 · D35", img: asset("/catalog/df/scanning-gear-box-df02.png"), category: "drawframe" },
  { id: "sensing-roller-df03", name: "Sensing Roller", fit: "RSB D30 · D35", img: asset("/catalog/df/sensing-roller-df03.png"), category: "drawframe" },
  { id: "sensing-roller-df04", name: "Sensing Roller", fit: "RSB D40 · D45", img: asset("/catalog/df/sensing-roller-df04.png"), category: "drawframe" },
  { id: "sensing-roller-d-60-b6-9-df05", name: "Sensing Roller D60 B6.9", fit: "RSB D40 · D45", img: asset("/catalog/df/sensing-roller-d-60-b6-9-df05.png"), category: "drawframe" },
  { id: "shaft-sensing-roller-df06", name: "Shaft Sensing Roller", fit: "RSB D40 · D22", img: asset("/catalog/df/shaft-sensing-roller-df06.png"), category: "drawframe" },
];

/* ---------------- Ring & Compact Frame ---------------- */
/* Product photography: official part images (public/catalog/rf). */
const ringframe: Product[] = [
  { id: "nipper-complete-4500", name: "Nipper Complete", fit: "G32 · G38 · K42 · K48", img: asset("/catalog/rf/nipper-complete-4500.png"), category: "ringframe" },
  { id: "balloon-compress-ring-4501", name: "Balloon Compress Ring", fit: "G32 · G38 · K42 · K48", img: asset("/catalog/rf/balloon-compress-ring-4501.png"), category: "ringframe" },
  { id: "spur-gear-drive-mz-4502", name: "Spur Gear Drive MZ", fit: "G33 · K44", img: asset("/catalog/rf/spur-gear-drive-mz-4502.png"), category: "ringframe" },
  { id: "drive-tape-4503", name: "Drive Tape", fit: "G3X · K4X", img: asset("/catalog/pg45_03.png"), category: "ringframe" },
  { id: "loading-pit-complete-4510", name: "Loading-Pit-Complete", fit: "G32 · G38 · K42 · K48", img: asset("/catalog/rf/loading-pit-complete-4510.png"), category: "ringframe" },
  { id: "clutch-ring-hps-4511", name: "Clutch Ring HPS", fit: "G33 · K44", img: asset("/catalog/rf/clutch-ring-hps-4511.png"), category: "ringframe" },
  { id: "tape-tension-roller-4512", name: "Tape Tension Roller", fit: "G33 · K44", img: asset("/catalog/rf/tape-tension-roller-4512.png"), category: "ringframe" },
  { id: "spindle-brake-hps-4513", name: "Spindle Brake HPS", fit: "G33 · K44", img: asset("/catalog/rf/spindle-brake-hps-4513.png"), category: "ringframe" },
  { id: "gripper-complete-4520", name: "Gripper Complete", fit: "G33 · K44", img: asset("/catalog/rf/gripper-complete-4520.png"), category: "ringframe" },
  { id: "gripper-complete-new-4521", name: "Gripper Complete New", fit: "G33 · K44", img: asset("/catalog/rf/gripper-complete-new-4521.png"), category: "ringframe" },
  { id: "gripper-ring-small-4522", name: "Gripper Ring Small", fit: "G33 · K44", img: asset("/catalog/rf/gripper-ring-small-4522.png"), category: "ringframe" },
  { id: "gripper-membrane-4523", name: "Gripper Membrane", fit: "G33 · K44", img: asset("/catalog/rf/gripper-membrane-4523.png"), category: "ringframe" },
  { id: "compression-hose-4530", name: "Compression Hose", fit: "G33 · K44", img: asset("/catalog/rf/compression-hose-4530.png"), category: "ringframe" },
  { id: "connection-piece-g-l-4531", name: "Connection Piece G-L", fit: "G3X · K4X", img: asset("/catalog/rf/connection-piece-g-l-4531.png"), category: "ringframe" },
  { id: "support-for-suction-pipe-4532", name: "Support for Suction Pipe", fit: "K4X", img: asset("/catalog/rf/support-for-suction-pipe-4532.png"), category: "ringframe" },
  { id: "steel-strip-roboload-4533", name: "Steel Strip Roboload", fit: "G33 · K44 · G35 · K45", img: asset("/catalog/rf/steel-strip-roboload-4533.png"), category: "ringframe" },
  { id: "steel-strip-4600", name: "Steel Strip", fit: "G33 · K44 · G35 · K45", img: asset("/catalog/rf/steel-strip-4600.png"), category: "ringframe" },
  { id: "wheel-complete-4601", name: "Wheel Complete", fit: "G3X · K4X", img: asset("/catalog/rf/wheel-complete-4601.png"), category: "ringframe" },
  { id: "carrier-bottom-4602", name: "Carrier Bottom", fit: "G33 · K44", img: asset("/catalog/rf/carrier-bottom-4602.png"), category: "ringframe" },
  { id: "carrier-ut-4603", name: "Carrier UT", fit: "G33 · K44", img: asset("/catalog/rf/carrier-ut-4603.png"), category: "ringframe" },
  { id: "carrier-ot-t70-guz-4610", name: "Carrier OT T70-GUZ", fit: "G3X · K4X", img: asset("/catalog/rf/carrier-ot-t70-guz-4610.png"), category: "ringframe" },
  { id: "carrier-ot-t70-guz-4611", name: "Carrier OT T70-GUZ", fit: "G3X · K4X", img: asset("/catalog/rf/carrier-ot-t70-guz-4611.png"), category: "ringframe" },
  { id: "carrier-ot-t70-guz-4612", name: "Carrier OT T70-GUZ", fit: "G3X · K4X", img: asset("/catalog/pg46_12.png"), category: "ringframe" },
  { id: "carrier-ot-t70-guz-4613", name: "Carrier OT T70-GUZ", fit: "G3X · K4X", img: asset("/catalog/pg46_13.png"), category: "ringframe" },
  { id: "carrier-top-70-uz-dia18-4620", name: "Carrier Top 70-UZ DIA18", fit: "G3X · K4X", img: asset("/catalog/pg46_20.png"), category: "ringframe" },
  { id: "carrier-ot-without-stud-4621", name: "Carrier OT - Without Stud", fit: "G3X · K4X", img: asset("/catalog/pg46_21.png"), category: "ringframe" },
  { id: "carrier-ot-4622", name: "Carrier OT", fit: "G3X · K4X", img: asset("/catalog/pg46_22.png"), category: "ringframe" },
  { id: "tappet-dui-18-20-4623", name: "Tappet DUI 18 & 20", fit: "G3X · K4X", img: asset("/catalog/pg46_23.png"), category: "ringframe" },
  { id: "4072-4630", name: "4072", fit: "G3X · K4X", img: asset("/catalog/pg46_30.png"), category: "ringframe" },
  { id: "peg-tray-4631", name: "Peg Tray", fit: "G3X · K4X", img: asset("/catalog/pg46_31.png"), category: "ringframe" },
  { id: "tube-complete-4632", name: "Tube Complete", fit: "G3X · K4X", img: asset("/catalog/pg46_32.png"), category: "ringframe" },
  { id: "bearing-pivot-complete-4633", name: "Bearing-Pivot-Complete", fit: "G33 · K44", img: asset("/catalog/pg46_33.png"), category: "ringframe" },
  { id: "clamping-crown-rf00", name: "Clamping Crown", fit: "G3X · K4X", img: asset("/catalog/rf/clamping-crown-rf00.png"), category: "ringframe" },
  { id: "cover-rf01", name: "Cover", fit: "G33 · K44", img: asset("/catalog/rf/cover-rf01.png"), category: "ringframe" },
  { id: "fluted-roller-rf02", name: "Fluted Roller", fit: "G3X · K4X", img: asset("/catalog/rf/fluted-roller-rf02.png"), category: "ringframe" },
  { id: "gliding-ring-rf03", name: "Gliding Ring", fit: "G3X · K4X", img: asset("/catalog/rf/gliding-ring-rf03.png"), category: "ringframe" },
  { id: "guide-arm-cpl-k-fs160-rf04", name: "Guide Arm CPL K FS160", fit: "G3X · K4X", img: asset("/catalog/rf/guide-arm-cpl-k-fs160-rf04.png"), category: "ringframe" },
  { id: "lever-rf05", name: "Lever", fit: "K44", img: asset("/catalog/rf/lever-rf05.png"), category: "ringframe" },
  { id: "pin-spacer-pink-rf06", name: "Pin Spacer Pink", fit: "G3X · K4X", img: asset("/catalog/rf/pin-spacer-pink-rf06.png"), category: "ringframe" },
];

/* ---------------- Top Roller ---------------- */
/* Product photography: official part images (public/catalog/tr).
   Machine fits sourced from the official image set. */
const toproller: Product[] = [
  { id: "top-roller-tr0", name: "Top Roller", fit: "RSB 851 · 951", img: asset("/catalog/tr/top-roller-tr0.png"), category: "toproller" },
  { id: "top-roller-tr1", name: "Top Roller", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/tr/top-roller-tr1.png"), category: "toproller" },
  { id: "top-roller-tr2", name: "Top Roller", fit: "RSB D50 · D26", img: asset("/catalog/tr/top-roller-tr2.png"), category: "toproller" },
  { id: "unilap-top-roller-tr3", name: "Unilap Top Roller", fit: "E30 · E32 · E34 · E35 · E36", img: asset("/catalog/tr/unilap-top-roller-tr3.png"), category: "toproller" },
  { id: "comber-drafting-top-roller-tr4", name: "Comber Drafting Top Roller", fit: "E6X · E7X · E8X", img: asset("/catalog/tr/comber-drafting-top-roller-tr4.png"), category: "toproller" },
  { id: "detaching-top-roller-tr5", name: "Detaching Top Roller", fit: "E6X · E7X · E8X", img: asset("/catalog/tr/detaching-top-roller-tr5.png"), category: "toproller" },
];

export const categories: Category[] = [
  {
    id: "electrical",
    name: "Electrical & Electronics",
    slug: "electrical-electronics",
    department: "All departments",
    icon: "electronics",
    blurb:
      "PCBs, measuring systems, impulse generators, encoders, sensors, tacho generators and control boards — the electronic backbone of the spinning line.",
    products: electrical,
    groupImg: asset("/catalog/groups/electrical.jpg"),
  },
  {
    id: "pneumatics",
    name: "Pneumatics",
    slug: "pneumatics",
    department: "Comber · Lap Former · Draw Frame",
    icon: "pneumatics",
    blurb:
      "Solenoid & magnet valves, valve blocks, pneumatic cylinders, regulators, filters and pressure switches for reliable air control.",
    products: pneumatics,
    groupImg: asset("/catalog/groups/pneumatics.jpg"),
    count: "1000+",
  },
  {
    id: "blowroom",
    name: "Blow Room & Carding",
    slug: "blow-room-carding",
    department: "Blow Room · Carding",
    icon: "carding",
    blurb:
      "Rollers, sprockets, toothed-belt discs, brushes, bearings, gearing and precision mechanicals for blowroom and carding machines.",
    products: blowroom,
    groupImg: asset("/catalog/groups/blowroom-v2.jpg"),
  },
  {
    id: "lapformer",
    name: "Lap Former",
    slug: "lap-former",
    department: "Unilap · Omega Lap",
    icon: "ringframe",
    blurb:
      "Toothed segments, chains, shafts, bearing saddles, loading elements, springs and seals for lap-former machines.",
    products: lapformer,
    groupImg: asset("/catalog/groups/lapformer.jpg"),
  },
  {
    id: "comber",
    name: "Comber",
    slug: "comber",
    department: "Comber E6X–E90",
    icon: "comber",
    blurb:
      "Feed & detaching cylinders, combing brushes, ratchet assemblies, lap-feed components, holders and covers for combers.",
    products: comber,
    groupImg: asset("/catalog/groups/comber-v2.jpg"),
  },
  {
    id: "drawframe",
    name: "Draw Frame",
    slug: "draw-frame",
    department: "RSB · SB series",
    icon: "drawframe",
    blurb:
      "Sensing rollers, differential gearing, coilers, calender assemblies, bearings and drive components for draw frames.",
    products: drawframe,
    groupImg: asset("/catalog/groups/drawframe-v2.jpg"),
  },
  {
    id: "ringframe",
    name: "Ring & Compact Frame",
    slug: "ring-compact-frame",
    department: "G3X · K4X",
    icon: "ringframe",
    blurb:
      "Grippers, carriers, spindle brakes, nippers, steel strips, tapes and precision plastics for ring and compact spinning frames.",
    products: ringframe,
    groupImg: asset("/catalog/groups/ringframe.jpg"),
  },
  {
    id: "toproller",
    name: "Top Roller",
    slug: "top-roller",
    department: "Draw Frame · Comber · Lap Former",
    icon: "drawframe",
    blurb:
      "Precision cots and top rollers for draw frame, comber drafting and detaching — available across a wide range of cot sizes.",
    products: toproller,
  },
];

export const allProducts: Product[] = categories.flatMap((c) => c.products);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(catSlug: string, productId: string) {
  const cat = getCategory(catSlug);
  if (!cat) return undefined;
  const product = cat.products.find((p) => p.id === productId);
  if (!product) return undefined;
  const related = cat.products.filter((p) => p.id !== productId).slice(0, 4);
  return { cat, product, related };
}

export const catalogStats = {
  categories: categories.length,
  products: allProducts.length,
};
