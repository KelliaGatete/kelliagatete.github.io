const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  Tab, TabStopType,
} = require("docx");
const fs = require("fs");

const SITE = "kelliagatete.github.io";
const EMAIL = "kg5133@alumni.princeton.edu";
const PHONE = "(609) 375-7945";
// Fill this in when your LinkedIn is ready — it appears in the header of both
// résumés automatically. Left empty, it is skipped and nothing else shifts.
const LINKEDIN = "";

const F = "Calibri";
const sz = (pt) => pt * 2;

const name = (t) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 20 },
    children: [new TextRun({ text: t, font: F, size: sz(15.5), bold: true })],
  });

const tagline = (t) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 10 },
    children: [new TextRun({ text: t, font: F, size: sz(8.8) })],
  });

const contact = () =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 70 },
    children: [
      new TextRun({
        text: [EMAIL, PHONE, SITE, LINKEDIN].filter(Boolean).join("  |  "),
        font: F,
        size: sz(8.8),
      }),
    ],
  });

// Section header with a rule underneath
const section = (t) =>
  new Paragraph({
    spacing: { before: 62, after: 30 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 } },
    children: [
      new TextRun({ text: t.toUpperCase(), font: F, size: sz(9.2), bold: true, characterSpacing: 16 }),
    ],
  });

// Left-bold heading with right-aligned date on the same line
const role = (left, right, italicLeft) =>
  new Paragraph({
    spacing: { before: 30, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: 11040 }],
    children: [
      new TextRun({ text: left, font: F, size: sz(9.4), bold: !italicLeft, italics: !!italicLeft }),
      new TextRun({ children: [new Tab()], font: F, size: sz(9.4) }),
      new TextRun({ text: right, font: F, size: sz(9.4), bold: !italicLeft, italics: !!italicLeft }),
    ],
  });

const sub = (t) =>
  new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text: t, font: F, size: sz(8.4), italics: true })],
  });

const bullet = (runs) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 10 },
    children: (Array.isArray(runs) ? runs : [{ t: runs }]).map(
      (r) => new TextRun({ text: r.t, font: F, size: sz(8.8), bold: !!r.b })
    ),
  });

const line = (label, rest) =>
  new Paragraph({
    spacing: { after: 10 },
    children: [
      new TextRun({ text: label + ": ", font: F, size: sz(8.8), bold: true }),
      new TextRun({ text: rest, font: F, size: sz(8.8) }),
    ],
  });

const plain = (t, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 10 },
    children: [new TextRun({ text: t, font: F, size: sz(opts.size ?? 8.8) })],
  });

/* ---------------- shared blocks ---------------- */

const education = (coursework) => [
  section("Education"),
  role("Princeton University, Princeton, NJ", "May 2026"),
  plain(
    "B.S.E., Mechanical & Aerospace Engineering | Minor in Robotics — ABET-accredited programs in Mechanical and Aerospace Engineering."
  ),
  new Paragraph({
    spacing: { after: 30 },
    children: [
      new TextRun({ text: "Relevant Coursework: ", font: F, size: sz(8.8), italics: true }),
      new TextRun({ text: coursework, font: F, size: sz(8.8) }),
    ],
  }),
];

const marskin = (framing) => [
  role("Senior Thesis Researcher — OSCAR MARSKIN, Princeton MAE", "Sep 2025 – Apr 2026"),
  sub(framing),
  bullet(
    "Co-designed and fabricated MARSKIN, a six-material flexible environmental skin for an origami crawler, combining TPU, EcoFlex, aerogel, PETG-PTFE, aluminium and a superhydrophobic coating; balanced insulation, structural support, adhesion, dust and abrasion protection, and compliant motion while moving from a circular test article to an OSCAR-specific panelized geometry compatible with folding."
  ),
  bullet(
    "Validated MARSKIN against 2 controls using conductive/radiant heating, 30-min cold exposure, 3 hot–cold cycles, dust and abrasion: across 3 heat-lamp distances, maintained ~24–27 °C peak through-thickness ΔT versus 4.6 °C for controls; at 75 °C conductive heating, improved peak/mean ΔT by ~85% with no visible delamination."
  ),
  bullet(
    "Built the onboard sensing and data pipeline on a Raspberry Pi Zero 2 W, synchronising contact TMP117 and non-contact MLX90614 measurements at 1 Hz with 1080p day/night imaging every 10 s."
  ),
];

const acee = [
  role("ACEE Summer Research Intern — Ju Lab, Princeton", "Summer 2025"),
  sub("Combustion & Low Carbon Energy Conversion Laboratory | Prof. Yiguang Ju"),
  bullet(
    "Investigated design-stage dielectric-barrier-discharge plasma conversion of CO₂ to graphene at ~400 °C and evaluated 2 optical diagnostics — laser absorption spectroscopy and laser-induced fluorescence — for real-time CO/CO₂ monitoring and reactor optimisation."
  ),
];

const aegis = [
  role("Research & Gender Intern — Aegis Trust, Kigali, Rwanda", "Summers 2023 & 2024"),
  sub("Two-year gender-norms programme with the University of Rwanda Centre for Gender Studies | Funded 2× by the Summer Social Impact Internship Fund"),
  bullet(
    "Analysed a 612-participant baseline study in SPSS across 5 districts and triangulated the quantitative results against document review, semi-structured interviews and a reflection workshop; the programme reached 3,753 stakeholders against a 2,600 target."
  ),
  bullet(
    "Built assessment criteria for programme outcomes and co-developed an awards scheme with the Centre for Gender Studies, selecting 50 recipients through district committees — the deliverables that outlasted the funding cycle."
  ),
];

const lurexShort = [
  role("LUREX Lunar Mission — Operations/Payload & CCD", "Spring 2026"),
  bullet(
    "Rebuilt a spacecraft onboard-computer budget after design-review feedback, replacing a percentage-based allocation with a throughput-driven method: sized workload in KIPS by software function across 5 operating modes and closed the governing case at 14.29 MHz against 1,000 MHz available; separately owned the mission risk matrix and cost compliance across 8 subsystems against a $175M cap."
  ),
];

const lurex = [
  role("LUREX Lunar Mission — Operations/Payload & CCD", "Spring 2026"),
  sub("Lunar Radiation Environment Explorer | MAE 342 Space System Design"),
  bullet([
    { t: "Rebuilt the onboard-computer budget after PDR review", b: true },
    {
      t: ", replacing a percentage-based allocation with a throughput-driven method: sized supervisory workload in KIPS by software function across 5 operating modes, converted to required clock speed, and closed the governing case (relay operations) at 14.29 MHz against 1,000 MHz available — every figure traceable to a measured data rate.",
    },
  ]),
  bullet(
    "Sized memory, storage and interfaces against the same rates: 63.5 MiB RAM of 512 available; recorder requirements of 1,040.7 MB and 332.6 MB from a 71.3-min worst-case blackout, verified against a 32 GB recorder at >30× margin; confirmed SpaceWire and CAN throughput under peak concurrent recorder, payload and framing traffic."
  ),
  bullet(
    "Owned the mission risk matrix and cost compliance analysis across 8 subsystems, reconciling estimates against a $175M SMEX cap plus $5M launch services; moved near-real-time downlink and onboard data storage out of the high-risk region through architecture and recorder changes."
  ),
];

const railway = [
  role("Automated Railway Control System — MAE 412", "Spring 2025"),
  bullet(
    "Built a hands-free unload/sort/reload platform using 3 Hall-effect sensors, 2 rail switches, 2 servos, 1 relay and 3D-printed mechanisms to handle 4 stainless-steel balls across 2 sizes; achieved all objectives plus the stretch reloading goal with repeatable class-demonstration operation."
  ),
  bullet(
    "Implemented Arduino↔ACIA serial and assembly sequencing with host control, coordinating sensor-triggered routing, speed transitions, track-power stops, unloading and parity-based payload reloading."
  ),
];

const railwayShort = [
  role("Automated Railway Control System — MAE 412", "Spring 2025"),
  bullet(
    "Built a hands-free unload/sort/reload platform using 3 Hall-effect sensors, 2 rail switches, 2 servos, 1 relay and 3D-printed mechanisms to handle 4 stainless-steel balls across 2 sizes, sequenced in assembly over an Arduino↔ACIA serial link; achieved all objectives plus the stretch reloading goal with repeatable class-demonstration operation."
  ),
];

const honours = [
  section("Honours, Fellowships & Funding"),
  plain(
    "John Marshall II Memorial Senior Thesis Fund — 2026 | Competitive proposal funding for OSCAR MARSKIN."
  ),
  plain(
    "ACEE Summer Internship Program / Peter B. Lewis Fund — Summer 2025 | Competitive funded energy and environment research internship."
  ),
  plain("Summer Social Impact Internship (SSII) Fund — Recipient, 2×"),
  plain(
    "Academic Excellence (Rwanda) — First Lady Academic Excellence Award, 2018 & 2022; Rwanda Education Board Award, 2021 (2nd nationwide, A-Level, Gashora Girls Academy of Science & Technology); AIMS Outstanding Achievement Award, 2019 (4th nationally, Mathematics)."
  ),
  plain("Languages — English, French, Kinyarwanda, Kirundi, Kiswahili, Spanish, German"),
];

const doc = (children) =>
  new Document({
    styles: {
      default: { document: { run: { font: F, size: sz(8.8) } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{ level: 0, format: "bullet", text: "\u25CF", alignment: AlignmentType.LEFT }],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 430, right: 600, bottom: 360, left: 600 },
          },
        },
        children,
      },
    ],
  });

/* ---------------- MECHANICAL / R&D ---------------- */

const mech = doc([
  name("Kéllia Umuhuza Gatete"),
  tagline(
    "Mechanical & Aerospace Engineer | Mechanical Design • Robotics Hardware • Test & Validation • R&D"
  ),
  contact(),

  ...education(
    "Engineering Design; Microprocessors for Measurement & Control; Autonomous Fabrication & Robotics; Materials Science; Fluid Dynamics; Rocket & Air-Breathing Propulsion"
  ),

  section("Technical Skills"),
  line(
    "Design & Manufacturing",
    "Fusion 360, Rhino 8, Simplify3D/G-code, CAD/CAM, FEA, 3D printing, manual machining, materials selection, rapid prototyping"
  ),
  line(
    "Testing & Instrumentation",
    "MTS SENB/compression testing, rheometry, data acquisition, calibration and error analysis, thermal-resistance modelling, thermal cycling, dust/abrasion testing, pressure transducers, oscilloscopes"
  ),
  line(
    "Robotics & Controls",
    "Arduino/ATmega328P, Teensy, Raspberry Pi, ABB RobotStudio/RAPID/FlexPendant, SCARA, Hall-effect and temperature sensors, servos/relays, assembly programming, PID control"
  ),
  line("Software", "Python, MATLAB/Simulink, C++, JavaScript, LabVIEW, Ansys STK/Astrogator, SPSS"),

  section("Engineering & Research Experience"),
  ...marskin(
    "Multimaterial soft-robotics protection and sensing system for Mars-inspired environments; co-authored 130-page thesis"
  ),
  ...acee,
  ...aegis,

  section("Selected Engineering Projects"),
  ...lurexShort,
  role("Robotic Additive Manufacturing — CEE 374", "Fall 2025"),
  bullet(
    "Ran SCARA and ABB IRB-6400/6700 6-DOF robotic AM workflows with G-code, RobotStudio/RAPID/FlexPendant, real-time height adjustment, and 1K/2K concrete extrusion; fabricated 20×23×75 mm architected cement beams at 65% infill for 7-day MTS SENB fracture testing and evaluated 14-day topological columns under 2 mm/min compression."
  ),
  bullet(
    "Characterised 3 cement pastes on a rheometer and selected the mix on buildability rather than extrudability (static yield 258 Pa, 20.7 mm maximum layer height against 10.8 mm), then printed 20×23×75 mm Bouligand beams at 65% infill with 9° inter-layer rotation."
  ),
  bullet(
    "Fracture-tested printed and cast beams in single-edge notch bending on an MTS Criterion at 0.05 mm/min: cast led on crack initiation (260 kN/m^1.5) but printed architectures inverted the ranking on energy-equivalent toughness (Bouligand 915 against cast 730), absorbing ~70% more energy per unit mass; traced the large Bouligand scatter to filament width, voids and interlayer bonding rather than to the architecture."
  ),
  ...railway,
  role("Hydrogen-Electric Hybrid Aircraft Concept — MAE 426", "Spring 2025"),
  bullet(
    "Co-developed a parallel hydrogen-electric concept benchmarked against the 210-passenger Boeing 737-8; combined direct-injection H₂ ICE, SOFC and PMSM power paths in a 30/70 split to estimate 53.5% idealized peak system efficiency, exceeding the project's 50% target."
  ),

  ...honours,
]);

/* ---------------- SPACE / ROBOTICS ---------------- */

const space = doc([
  name("Kéllia Umuhuza Gatete"),
  tagline(
    "Mechanical & Aerospace Engineer | Space Systems • Planetary Robotics • Mechatronics • R&D"
  ),
  contact(),

  ...education(
    "Space System Design; Space Flight; Autonomous Fabrication & Robotics; Microprocessors for Measurement & Control; Rocket & Air-Breathing Propulsion; Materials Science"
  ),

  section("Technical Skills"),
  line(
    "Space & Systems",
    "Ansys STK/Astrogator, spacecraft C&DH architecture, processing/storage/data budgets, orbital and trajectory analysis, link-budget analysis, requirements and traceability, ConOps, trade studies, risk matrices, verification & validation"
  ),
  line(
    "Robotics & Embedded",
    "Arduino/ATmega328P, Teensy, Raspberry Pi, micro:bit, Hall-effect and temperature sensors, relays, servos, serial communication, assembly programming, PID/feedback control, data acquisition"
  ),
  line(
    "Design, Test & Fabrication",
    "Fusion 360, Rhino 8, Simplify3D/G-code, CAD/CAM, FEA, 3D printing, manual machining, ABB RobotStudio/RAPID/FlexPendant, MTS testing, thermal/dust/abrasion testing"
  ),
  line("Programming & Data", "Python, MATLAB/Simulink, C++, JavaScript, LabVIEW, SPSS, Overleaf"),

  section("Engineering & Research Experience"),
  ...marskin(
    "Planetary soft-robotics protection and sensing system; co-authored 130-page thesis"
  ),
  ...acee,
  ...aegis,

  section("Selected Space & Robotics Projects"),
  ...lurex,
  role("Spaceflight & Mission Analysis — Ansys STK/Astrogator, MAE 341", "Fall 2025"),
  bullet(
    "Built an Artemis-class cislunar trajectory in Astrogator and a single-station downlink study: identified 18 Kennedy Space Center contact windows totalling 166.65 h (42.8% of scenario), ~440,000 km worst-case slant range and ~19.75 dB worst-case Eb/N₀, showing the modelled link was access-limited rather than power-limited."
  ),
  bullet(
    "Validated the orbital analysis against 3 nights of ISS observations, estimating a 93.334 ± 0.088 min period within ~0.5% of the 92.903 min mean-motion reference, and identified which of 3 reduction methods fails and why (repeat-pass timing ran 5.6% high on viewing geometry and horizon threshold)."
  ),
  ...railwayShort,

  ...honours,
]);

Packer.toBuffer(mech).then((b) =>
  fs.writeFileSync("Kellia_Gatete_Mechanical_RnD_Resume.docx", b)
);
Packer.toBuffer(space).then((b) =>
  fs.writeFileSync("Kellia_Gatete_Space_Robotics_Resume.docx", b)
);
