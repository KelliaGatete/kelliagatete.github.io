// All portfolio content lives here. Edit this file, re-run `node _build.js`, redeploy.

const profile = {
  name: "Kéllia Umuhuza Gatete",
  role: "Mechanical & Aerospace Engineer",
  focus: "Planetary robotics · Thermal & mechanical test · Spacecraft systems",
  email: "kg5133@alumni.princeton.edu",
  phone: "(609) 375-7945",
  resumeMech: "assets/docs/Kellia_Gatete_Mechanical_RnD_Resume.pdf",
  resumeSpace: "assets/docs/Kellia_Gatete_Space_Robotics_Resume.pdf",

  // Drop a headshot at assets/docs/portrait.jpg (or any path) and it fills the
  // about panel. Left empty, that panel renders as an abstract graphic instead.
  portrait: "",

  // Add your URLs and they appear in the footer of every page.
  // Rows with an empty url are skipped, so nothing breaks if you fill in only one.
  // Empty rows are skipped, so the footer just omits LinkedIn until you add it.
  links: [
    { label: "GitHub", url: "https://github.com/kelliagatete" },
    { label: "LinkedIn", url: "" },
  ],

  blurb:
    "I build things that have to survive somewhere difficult, then test them until the data says whether they do.",

  about: [
    "2026 B.S.E. from Princeton in Mechanical & Aerospace Engineering, minor in Robotics.",
    "My work sits where design meets measurement. The part I like best is when a prototype stops being a CAD model and starts producing numbers — build the rig, instrument it, run it, find out which of your decisions actually held up. Some don't. That's the useful part.",
    "For my senior thesis I co-designed MARSKIN, a six-layer environmental skin for OSCAR, an origami crawler built for Mars-like conditions. I owned the layup, the onboard sensing, and the campaign that put it against two control stacks under heat, cold, cycling, dust, and abrasion.",
    "Alongside that: spacecraft command & data handling for a dual-orbiter lunar concept, robotic additive manufacturing on 6-DOF arms, embedded mechatronics, and plasma carbon conversion in Princeton's Combustion & Low Carbon Energy Conversion Lab. Before all of it, two summers at Aegis Trust in Rwanda — where I learned that a finding nobody can act on isn't finished.",
    "I grew up in Rwanda and speak seven languages. I write — I got my start filing articles for my secondary school's publication at Gashora, covering everything from national commemorations to campus life — and I've spent a season assistant stage managing at Princeton's Lewis Center, which is stranger training for spacecraft operations than it sounds: cues, sequencing, and eight people who all need the same timeline. Outside that I'm taking photographs, or reading about somewhere I'd like to go.",
  ],

  // The "at a glance" panel on the about page. Rows render in order.
  facts: [
    ["Degree", "B.S.E. Mechanical & Aerospace Engineering, Princeton University, 2026"],
    ["Minor", "Robotics"],
    ["Accreditation", "ABET-accredited programs in Mechanical and Aerospace Engineering"],
    ["Focus", "Thermal & mechanical test · Planetary robotics · Spacecraft systems"],
    [
      "Tools",
      "Fusion 360 · Rhino · CAD/CAM · FEA · Ansys STK/Astrogator · MATLAB/Simulink · Python · C++ · LabVIEW",
    ],
    [
      "Hardware",
      "Arduino/ATmega328P · Teensy · Raspberry Pi · ABB RobotStudio/RAPID · MTS test frames · 3D printing · manual machining",
    ],
    [
      "Funding",
      "John Marshall II Memorial Thesis Fund, 2026 · ACEE Summer Internship / Peter B. Lewis Fund, 2025 · Summer Social Impact Internship Fund, 2×",
    ],
    [
      "Honours",
      "First Lady Academic Excellence Award, Rwanda, 2018 & 2022 · Rwanda Education Board Award, 2nd nationwide at A-Level, 2021 · AIMS Outstanding Achievement, 4th nationally in mathematics, 2019",
    ],
    ["Languages", "English · French · Kinyarwanda · Kirundi · Kiswahili · Spanish · German"],
    [
      "Beyond engineering",
      "Writing and photography · Assistant stage manager, Safe Harbor, Lewis Center for the Arts, 2025",
    ],
  ],

  readout: [
    { label: "MARSKIN peak ΔT, heat lamp", value: "26.5", unit: "°C", foot: "best control: 4.6 °C" },
    { label: "Thermal cycles, response intact", value: "3", unit: "hot–cold" },
    { label: "LUREX recorder margin", value: ">30", unit: "×" },
    { label: "LUREX OBC clock margin", value: "70", unit: "×", foot: "14.29 MHz of 1,000 available" },
    { label: "Downlink availability, one site", value: "42.8", unit: "%", foot: "18 windows, 166.65 h" },
    { label: "ISS period, measured by eye", value: "93.334", unit: "min" },
  ],
};

const projects = [
  {
    slug: "marskin",
    groups: ["robotics","materials"],
    lede: "Six layers, three test regimes",
    outcome: "26.5 °C ΔT against 4.6 °C for the best control",
    title: "MARSKIN",
    subtitle: "Six layers of armour for a robot that has to keep folding",
    kind: "Senior thesis · Princeton MAE",
    date: "Sep 2025 – May 2026",
    tags: ["Soft robotics", "Thermal test", "Materials", "Fabrication"],
    tracks: ["mech", "space"],
    aside:
      "Co-authored with Susan Zhang '26. Advisor: Prof. Andrej Košmrlj. Reader: Prof. Mikko Haataja.",
    summary:
      "OSCAR folds down to fit through gaps — which is exactly what makes it hard to protect. MARSKIN is the six-layer skin that insulates, sheds dust, resists abrasion, and still bends at the creases, plus the campaign that found where it works and where it doesn't.",
    specs: [
      ["Layers", "6 — TPU, EcoFlex, aerogel, PETG-PTFE, aluminium, coating"],
      ["Controls", "TPU-only · TPU + EcoFlex"],
      ["Heat lamp", "3 standoffs — 22.3, 19.8, 17.4 cm"],
      ["Heat plate", "50 °C and 75 °C"],
      ["Cold soak", "30 min"],
      ["Thermal cycles", "3 hot–cold"],
      ["Sensing", "Raspberry Pi Zero 2 W · TMP117 · MLX90614"],
      ["Sample rate", "1 Hz thermal · 0.1 Hz imaging"],
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "OSCAR's whole value proposition is that it collapses. A rigid enclosure would protect it beautifully and defeat the point. The skin had to survive Mars-like thermal and abrasive conditions, tolerate repeated folding at the creases, and be buildable by two undergraduates in a university lab.",
        ],
      },
      {
        h: "Approach",
        p: [
          "A layup, not a material. Each layer does one job: TPU and EcoFlex for compliance and a bondable base, aerogel for insulation, PETG-PTFE and aluminium for radiant load and durability, superhydrophobic coating for dust.",
          "Circular test articles first — fast to make, easy to instrument, directly comparable against controls. Once the layup settled, an OSCAR-specific panelized geometry that puts seams away from the fold lines.",
        ],
      },
      {
        h: "What I built",
        p: [
          "The layup and the fixturing to reproduce it. The onboard sensing — a Pi Zero 2 W syncing a contact TMP117 and non-contact MLX90614 at 1 Hz with 1080p day/night stills every 10 s. And the rigs, so MARSKIN and both controls saw identical conditions every run.",
        ],
      },
      {
        h: "What the data said",
        p: [
          "Under the heat lamp it isn't subtle. At 19.8 cm the full stack held a peak through-thickness ΔT of 26.5 °C against 4.6 °C for the better control. Across all three standoffs: ~595% higher peak ΔT, ~650% higher mean.",
          "Conduction was more interesting. At 75 °C the stack led clearly — 23.7 °C peak against 12.8 °C for the better control. At 50 °C the two came in 0.9 °C apart, 4.5 against 5.4 °C, and I don't report that as a result. That was one of the first runs, before the protocol had settled: we were moving the same sensors between test articles rather than instrumenting each one independently, so placement and contact varied from run to run, and the rig was still a bench setup rather than a controlled environment. A 0.9 °C margin is smaller than that arrangement could resolve. It needs repeating before anything is claimed from it in either direction. What the conductive data does support is the mechanism — the aerogel earns its place once the gradient is steep enough, and 75 °C is steep enough.",
          "Three hot–cold cycles with response intact, no visible delamination, still foldable — which was the constraint that made the problem worth doing.",
        ],
        note:
          "Percentages compare against the best-performing control at each condition. Absolute values are the honest version, and both are plotted below. The 50 °C plate run is excluded from every percentage claim here, for the reason above.",
      },
      {
        h: "What I'd do differently",
        p: [
          "The real limitation is the environment, not the skin. Everything here was measured in a lab: room air, room pressure, a heat lamp standing in for solar flux. Mars is 6 mbar of CO₂, −60 °C on average, and abrasive dust driven by wind. A thermal-vacuum chamber with a CO₂ atmosphere and regolith simulant would tell you whether the layup actually holds, and nothing short of that moves this past a low TRL.",
          "The test methods need the same tightening: more replicates, controlled emissivity, calibrated flux instead of lamp distance, and a defined cycling protocol \u2014 enough statistical power to state a result with error bars rather than a single comparison per condition.",
          "Two specifics I'd chase inside that: a clean re-run of the conductive case with dedicated sensors per article and controlled contact, swept between 50 and 75 °C so the gradient dependence becomes a design rule instead of two disconnected points; and fold endurance \u2014 three cycles proves nothing, dozens would start to.",
        ],
      },
    ],
    media: [
      { file: "instrumented.jpg", caption: "Instrumented test article, reading through the stack." },
      { file: "layers.jpg", caption: "Cross-section: PTFE films, low-infill TPU, AS40 silicone, aluminium, insulator, polyurethane adhesive." },
      { file: "skin-structure.jpg", caption: "Panelized skin on rectangular OSCAR, with per-face layer structure." },
      { file: "panel-folded.jpg", caption: "A panel with its creases — seams placed away from the hinge lines." },
      { file: "oscar-cad.jpg", caption: "OSCAR: Kresling towers, ratcheting feet, servo drive." },
      { file: "fabrication.jpg", caption: "Curing under clamps. A great deal of the thesis looked like this." },
      { file: "heat-flow.jpg", caption: "Conduction and radiation model through the rectangular skin." },
      { file: "test-setups.jpg", caption: "The test matrix: heat plate, lamp at three standoffs, cold soak, abrasion." },
      { file: "chart-lamp-max.png", caption: "Heat lamp, peak |ΔT| — full stack against both controls." },
      { file: "chart-lamp-mean.png", caption: "Heat lamp, mean ΔT across the exposure window." },
      { file: "chart-plate-max.png", caption: "Heat plate, peak |ΔT|. The 50 °C pair sits inside the fixture's resolution — see the note above." },
      { file: "chart-plate-mean.png", caption: "Heat plate, mean ΔT. Same condition, same caveat." },
      { file: "chart-lamp-outer.png", caption: "Outer-surface peak temperature — running hotter outside is the mechanism working." },
      { file: "dust-chamber.jpg", caption: "Dust chamber, all three stacks exposed together." },
    ],
  },

  {
    slug: "lurex",
    groups: ["space"],
    lede: "Spacecraft command & data handling",
    outcome: "Rebuilt the OBC budget from data rates up",
    title: "LUREX",
    subtitle: "Where does the data go when nobody's listening?",
    kind: "MAE 342 Space System Design",
    date: "Spring 2026",
    tags: ["Spacecraft systems", "C&DH", "Operations", "Requirements"],
    tracks: ["space"],
    aside:
      "Team mission report, taken through Final Design Review. I sat on the Operations/Payload and CCD team and worked primarily on C&DH. My contributions are named per-analysis below.",
    summary:
      "A dual-orbiter lunar radiation mission. On C&DH the governing question is unglamorous: the payload produces data continuously, the link to Earth exists only sometimes, and every processor, memory and bus number downstream is really an answer to that gap.",
    specs: [
      ["Spacecraft", "2 — MiLO, 8,000 km · LiLO, low lunar"],
      ["Mission life", "4 years"],
      ["Supervisory ingress", "412.5 / 20.75 kbps"],
      ["Governing case", "MiLO relay mode"],
      ["Peak supervisory load", "3,572 KIPS → 14.29 MHz"],
      ["Clock margin", "70× against 1,000 MHz"],
      ["RAM", "63.5 of 512 MiB — 12.4%"],
      ["Recorder", "1,040.7 of 32,000 MB — 30.7×"],
      ["Worst blackout", "71.3 min · 781 h/year total"],
      ["Bus", "Dual SpaceWire + CAN 2.0b"],
      ["OBC", "Sirius QuadCore LEON4FT + TCM"],
      ["Review gate", "FDR"],
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "LUREX flies two spacecraft — MiLO in an 8,000 km medium lunar orbit, LiLO in low lunar orbit — to monitor the radiation environment continuously for four years. Both carry direct-to-Earth links, with an S-band crosslink as backup relay when one is occulted.",
          "A radiation payload does not stop producing data because Earth went behind the Moon. Across a year the mission loses 781 hours of Earth contact, and the worst single gap runs 71.3 minutes. Storage has to cover that gap. The processor has to keep up in the busiest mode rather than the average one. The buses have to carry payload, recorder and housekeeping traffic concurrently without contention.",
          "I was on the Operations/Payload and CCD team — sixteen of us across eight subsystems, so the work ran wider than one box. Within CCD my primary responsibility was C&DH: what happens to command, telemetry and science data once it is onboard. A teammate owned the communications link design. On the operations side I carried the risk matrix and the mission cost compliance analysis, both of which meant working across every other subsystem to get numbers that agreed.",
        ],
      },
      {
        h: "What changed after PDR",
        p: [
          "At PDR we sized the onboard computer with a percentage-based allocation — a single utilization figure per subsystem. The review feedback was that this was not substantiated, and it wasn't: nothing in it traced back to a data rate.",
          "I replaced it with a throughput-driven budget. Supervisory data rates give KIPS by software function and operating mode; KIPS gives required clock speed; clock gives margin against hardware. RAM, recorder capacity and bus throughput were sized independently against the same rates, then integrated into a single closure table. Every number on this page traces back to a measured or specified rate rather than an assumed percentage.",
          "The methodology follows SMAD's computer resource estimation approach, which sizes processors on throughput, execution frequency and memory demand rather than on one abstract utilization figure.",
        ],
      },
      {
        h: "Sizing the processor",
        p: [
          "The semi-centralized architecture matters here. The primary OBC handles supervisory traffic only — raw IMU and star tracker streams stay on local controllers and never reach it. That distinction is what makes the budget honest: at PDR the OBC was being charged for sensor data it never actually sees. Supervisory ingress is 412.5 kbps on MiLO and 20.75 kbps on LiLO.",
          "I split the software into rate-driven and event-driven functions. Packetization, telemetry handling, recorder activity and comms framing scale with the data they move, so I sized them from the rates. cFS core services, routing logic and FDIR are triggered by events, so they got fixed engineering reserves.",
          "Five modes were budgeted per spacecraft. MiLO relay governs at 3,572 KIPS, dominated by SSR/file management and comms support, because in relay the OBC is simultaneously running local payload management, concurrent recorder read/write, routing, and outbound framing. Converting at CPI = 4 per SMAD, the governing case needs 14.29 MHz against the Sirius QuadCore LEON4FT's 1,000 MHz aggregate.",
        ],
        note:
          "The subsystem budget still carries a much larger engineering allocation. That is a different quantity and deliberately so — it covers software overhead, cFS messaging, multicore contention, file-system complexity and future growth, none of which the KIPS model captures. The KIPS result proves the hardware closes; the allocation is how we manage risk on top of that.",
      },
      {
        h: "Memory, recorder, buses",
        p: [
          "RAM is a fixed software allocation plus a transient flow-through buffer. Fixed comes to 47 MiB — cFS/RTOS runtime and app code, command and telemetry queues, FDIR logs, SSR working cache, routing scheduler state. The buffer holds 10 seconds of peak relay traffic at 1.5× margin; on MiLO that is own data plus crosslink ingest plus DTE replay, 2,024.8 kbps in total. With a further 25% design margin: 63.5 MiB against 512 MiB available.",
          "The recorder is sized on the worst blackout rather than the average one, with a combined coding-and-design margin of 1.69, a 71.30-minute critical interval, and a 2× allowance for a missed contact on top of the blackout. MiLO needs 1,040.7 MB of 32,000 MB. LiLO needs 332.6 MB.",
          "SpaceWire was checked against peak payload, recorder and framing traffic; CAN against peak housekeeping and control. The binding SpaceWire case is concurrent recorder read/write during relay at roughly 2.0 Mbps against 300 Mbps per port. I budgeted the local controllers separately using the same KIPS logic, to confirm that pushing low-level processing off the OBC was real rather than bookkeeping — the ADCS controller governs there at 1,500 KIPS.",
        ],
      },
      {
        h: "Closure",
        p: [
          "The Sirius QuadCore LEON4FT and Sirius TCM close against every governing case: clock at 70×, RAM at 8.1×, recorder at 30.8× on MiLO and 96.2× on LiLO, SpaceWire above 150×, CAN at 80×.",
          "Two trends hold across the whole analysis. MiLO governs C&DH sizing on both spacecraft, and relay is the governing mode. The load concentrates in comms framing and SSR/file management, and among local controllers, in ADCS. The percentage distribution that appears in the final report is a summary of this work, not the method that produced it — which was the specific ambiguity flagged at PDR.",
        ],
      },
      {
        h: "The operations side",
        p: [
          "I owned the FDR risk matrix — coordinating with every subsystem on mitigation and documenting what moved since PDR. Near-real-time downlink dropped out of the red region after the medium orbit altitude went from 3,000 to 8,000 km and the architecture moved to dual direct-to-Earth with opportunistic crosslink. Data storage came off the primary risk list on the back of the recorder analysis above. Attitude control instruments and solar array and antenna failures were added, having not been broken out before — the IMU sits at higher likelihood than its neighbours because it is the one attitude component with no redundancy, which LRO heritage supports.",
          "I also gathered cost estimates across all subsystems and built the mission cost compliance analysis against the $175M SMEX cap plus $5M launch services, and refined the operations requirements, constraints and drivers for FDR. All subsystems closed within allocation with reserve remaining.",
          "Both of those jobs are really the same job: getting eight subsystems to hand you numbers that agree with each other. That turned out to be the part of the project I was best at, and it is not a thing you can do from inside one subsystem.",
        ],
      },
      {
        h: "What I'd do differently",
        p: [
          "The fixed reserves for cFS core, routing and FDIR are engineering allocations, not measurements. So are the 10-second buffer depth and the 1.5× factor on it. They are reasonable first-order numbers for FDR and the margins are large enough that being wrong by 2× changes nothing — but they are the weakest links in the chain, and I'd rather have profiled a real cFS build than reasoned about one.",
          "The margins themselves are worth questioning. 70× on clock and 30× on the recorder are not signs of a well-tuned design; they are signs that the hardware was selected for radiation tolerance and heritage, and the computational demands of a supervisory OBC are simply small next to what a rad-hard quad-core provides. The useful conclusion is not that we have margin but that processing was never the binding constraint on this mission, and we should stop treating it as a design driver.",
        ],
      },
    ],
    media: [
      { file: "data-flow.jpg", caption: "OBC routing: direct-to-Earth when visible, crosslink when occulted, recorder when neither." },
      { file: "cpu-budget.jpg", caption: "Supervisory OBC load by software function and mode. Relay governs; framing and recorder management dominate it." },
      { file: "comm-gaps.jpg", caption: "Communication gap statistics. The 71.3-minute worst case is what sizes the recorder." },
    ],
  },

  {
    slug: "railway",
    groups: ["robotics"],
    lede: "Sensing, sequencing, mechanism design",
    outcome: "Stretch reloading goal achieved",
    title: "Automated railway",
    subtitle: "A machine that unloads a train, sorts what it finds, and loads the next one",
    kind: "MAE 412 Microprocessors for Measurement & Control",
    date: "Spring 2025",
    tags: ["Mechatronics", "Embedded", "Sensing", "3D printing"],
    tracks: ["mech", "space"],
    aside: "Bench 8, with Maya Sessions and Susan Zhang. Prof. Michael Littman.",
    summary:
      "The assignment was a controlled railway. The stretch goal — reloading, not just unloading — turned it into a sequencing problem, because the machine has to remember what it took off to put the right thing back.",
    specs: [
      ["Controller", "ATmega328P on a vector board"],
      ["Sensing", "3 × Hall effect"],
      ["Actuation", "2 servos · 1 relay · 2 track switches"],
      ["Payload", "4 steel balls, 5/16″ and ⅛″"],
      ["Comms", "Arduino ↔ ACIA serial"],
      ["Logic", "Assembly + GAL · Eagle CAD schematic"],
      ["Constraint", "Block control, 3 trains concurrent"],
      ["Outcome", "All objectives, plus the stretch goal"],
    ],
    sections: [
      {
        h: "Approach",
        p: [
          "Hall-effect sensors produce position events; everything downstream is a state machine reacting to them. Sensor one throws the switches into the inner loop, sensor two kills track power for unloading, sensor three stops the train for reloading and sends the switches back to straight.",
          "Sorting runs on coin-sorter geometry and a parity scheme rather than extra sensing — fewer parts, countable failure modes. Block control meant tolerating three trains on the board at once, with no magnets or markings to tell them apart.",
        ],
      },
      {
        h: "What we built",
        p: [
          "3D-printed unloading, sorting, and loading mechanisms; a modified trailer that tips to 60° along a curved cam as it passes a fixed structure; relay and trickle-charge daughterboards; the sequencing in assembly; and an ACIA serial link so a host can command the board mid-run.",
        ],
      },
      {
        h: "Result",
        p: [
          "Four balls across two sizes, handled hands-free: unloaded, sorted, reloaded, repeatably, in the class demonstration. For a mechanism with this many independent moving parts, repeatable is the actual test.",
        ],
      },
    ],
    media: [
      { file: "board.jpg", caption: "The full board: track, switches, sensors, loader, sorter." },
      { file: "switch-servos.jpg", caption: "Servo-actuated track switch and 3D-printed sorting chute." },
      { file: "wagon.jpg", caption: "The wagon, mid-modification." },
      { file: "track-layout.png", caption: "Track layout with switch and sensor placement." },
      { file: "schematic.png", caption: "Vector board schematic — ATmega, ACIA, GAL, drivers." },
      { file: "bench.jpg", caption: "Bench 8, demonstration day." },
    ],
  },

  {
    slug: "stk-mission-analysis",
    groups: ["space"],
    lede: "Trajectory & link analysis",
    outcome: "166.65 h of contact across 18 windows",
    title: "Cislunar mission analysis",
    subtitle: "Model an Artemis downlink, then go outside and check the model",
    kind: "MAE 341 Space Flight",
    date: "Fall 2025",
    tags: ["Orbital mechanics", "Link budgets", "STK", "Measurement"],
    tracks: ["space"],
    aside:
      "Three assignments that build on each other: ISS observation, an STK exercise set across orbital regimes, then an Artemis I replication extended with a downlink study. Prof. Edgar Choueiri.",
    summary:
      "Replicate a flown lunar mission in STK/Astrogator and ask an operational question of it — then spend three nights measuring the ISS by eye to find out whether orbital analysis predicts the sky above New Jersey.",
    specs: [
      ["Software", "Ansys STK / Astrogator"],
      ["Regimes modeled", "LEO · MEO · GEO · HEO · cislunar"],
      ["Mission replicated", "Artemis I, Nov–Dec 2022"],
      ["Downlink", "X-band 8.425 GHz · QPSK · 200 kbps"],
      ["Tx / Rx", "43 dBW EIRP · G/T 25 dB/K · 10° mask"],
      ["Contact windows", "18, Kennedy Space Center"],
      ["Window duration", "7.45 min – 15.04 h · 9.26 h mean"],
      ["Total contact", "166.65 h — 42.8% of scenario"],
      ["Worst-case range", "~440,000 km"],
      ["Worst-case Eb/No", "~19.75 dB"],
      ["ISS period measured", "93.334 ± 0.088 min"],
      ["Mean-motion reference", "92.903 min at 15.5 rev/day"],
    ],
    sections: [
      {
        h: "Modeling Artemis I",
        p: [
          "One Astrogator Mission Control Sequence for Orion, blocked by flight phase instead of run as a single propagation — so every leg is debuggable on its own.",
          "First guess establishes a feasible translunar departure, with B-plane targeting through the differential corrector and stops on encounter and lunar periapsis. Lunar orbit insertion moves propagation into the Moon-centred frame; Hohmann-style apsis-to-apsis transfers raise Orion from low lunar orbit into a distant retrograde orbit. Propagators matched to regime: Earth high-precision, cislunar, then lunar.",
        ],
      },
      {
        h: "The downlink question",
        p: [
          "Add an X-band transmitter on Orion and a receiver at Kennedy — and deliberately exclude the Deep Space Network, so the question becomes what one ground site can actually do.",
          "Eighteen windows, 166.65 hours, 42.8% of the scenario. The spread matters more than the total: passes run from 7.45 minutes to just over 15 hours, so a scheduler can't assume a typical one. Worst-case geometry is ~440,000 km at low elevation, and Eb/No there is still about 19.75 dB.",
          "So the link is access-limited, not power-limited — a scheduling problem, not an antenna problem. That converts straight into onboard requirements: storage sized to the worst gap, buffering, prioritized downlink. The same argument I'd later make from the other side on LUREX.",
        ],
      },
      {
        h: "Checking it against the sky",
        p: [
          "Three nights of ISS passes, cross-checked across two apps and a web ephemeris, reduced three ways. The angular method gave 93.334 ± 0.088 min against 92.903 min from mean motion — inside about 0.5%.",
          "The third method, timing between successive rises, came out at 98.08 min: 5.6% high. That's the useful result. Repeat-pass timing is sensitive to viewing geometry and the horizon threshold, both of which stretch the interval. Knowing which method fails, and why, beats the one that happened to land close.",
        ],
      },
      {
        h: "Secondary products",
        p: [
          "The lighting report doubles as a geometry check: sparse shadows in cruise, then regular penumbra and umbra once Orion is cycling behind the Moon, clustering exactly where selenocentric radius is smallest.",
          "SEET dose arrives almost entirely during Van Allen transit, then flattens — near 44 rad under the lightest shielding, a few rad under heavier. The trajectory isn't the driver here; the shielding assumption is. Worth knowing before quoting a dose number.",
        ],
      },
      {
        h: "Where the model breaks",
        p: [
          "The return leg is the honest failure. Orion wasn't captured by Earth's sphere of influence, so propagation ends December 2 instead of the actual December 11 splashdown. Outbound and lunar phases hold up; the corridor home doesn't.",
          "The rest is idealized in flattering ways. Impulsive burns, so no finite-burn pointing or gravity losses. Free-space propagation and ideal pointing, which is why modeled BER sits at zero — a real budget with coding, atmospheric loss, and pointing error wouldn't.",
          "Next pass: fix the return corridor and propagate through entry, add a ΔV-by-event timeline, and put a DSN access case beside the KSC-only one so the single-station conclusion has something to be measured against.",
        ],
        note:
          "Correction: an earlier write-up quoted the mean-motion period as 92.03 min. The correct value at 15.5 rev/day is 92.903 min. The ~0.5% agreement is unaffected.",
      },
    ],
    media: [
      { file: "mcs-tree.png", caption: "The Mission Control Sequence, blocked by flight phase rather than run as one propagation." },
      { file: "trajectory-earth.png", caption: "Earth-centred view: departure asymptote and B-plane targeting geometry." },
      { file: "trajectory-moon.png", caption: "Moon-centred view of lunar operations and the orbit-raising arcs toward DRO." },
      { file: "radius-earth.png", caption: "Geocentric radius — a climb to roughly 440,000 km, then lunar-distance operations." },
      { file: "radius-moon.png", caption: "Selenocentric radius falling to near zero at capture, then stepping up through the transfers." },
      { file: "lighting.png", caption: "Lighting times. The eclipse clusters mark the low lunar orbit phase." },
      { file: "radiation-dose.png", caption: "SEET accumulated dose under three shielding cases. Nearly all of it arrives during Van Allen transit." },
      { file: "comms-objects.png", caption: "The comms extension: Downlink_Tx on Orion, Downlink_Rx at Kennedy." },
      { file: "access-times.png", caption: "Eighteen access windows across the scenario — roughly daily, and far from uniform." },
      { file: "access-durations.png", caption: "Durations by window. The small wedge is the 7.45-minute pass; the largest runs 15.04 h." },
      { file: "dwell-vs-gap.png", caption: "Cumulative dwell against gap: 42.8% contact, 57.2% blackout, from one ground site." },
      { file: "aer.png", caption: "Azimuth, elevation and range through access — the geometry that sizes the link." },
      { file: "ebno.png", caption: "Eb/No settling near 20 dB at lunar range. Access-limited, not power-limited." },
      { file: "orbit-regimes.png", caption: "The exercise set: LEO, MEO, HEO and GEO with their ground tracks." },
      { file: "leo-decay.png", caption: "LEO radius under HPOP with drag — decay accelerating as perigee drops into denser air." },
      { file: "heo-molniya.png", caption: "Modified Molniya orbit; apsidal precession migrates the dwell region off high latitudes." },
      { file: "iss-elevation.png", caption: "Observed ISS elevation across three days of passes — the raw material." },
      { file: "iss-mean-anomaly.png", caption: "Mean anomaly against time. Consistent slopes are what confirm a stable period." },
    ],
  },

  {
    slug: "hydrogen-aircraft",
    groups: ["space"],
    lede: "Propulsion architecture trade",
    outcome: "53.5% peak system efficiency",
    title: "Hydrogen-electric hybrid aircraft",
    subtitle: "Which combination of converters moves 210 people without the mass eating the benefit?",
    kind: "MAE 426 Rocket & Air-Breathing Propulsion",
    date: "Spring 2025",
    tags: ["Propulsion", "Systems trade", "Energy"],
    tracks: ["mech"],
    summary:
      "Hydrogen can fly an airliner. The question is which architecture gets you there, and what you give up in temperature, mass, and complexity to beat a turbofan.",
    specs: [
      ["Benchmark", "Boeing 737 MAX-8, 210 pax"],
      ["Architecture", "Parallel hybrid"],
      ["Power split", "30 / 70"],
      ["Converters", "Direct-injection H₂ ICE · SOFC · PMSM"],
      ["Hybrid-mode efficiency", "30.4 – 69.8%"],
      ["Electric-mode efficiency", "40.5 – 87.2%"],
      ["System-level", ">50% vs. <40% baseline"],
      ["Peak, idealized", "53.5%"],
    ],
    sections: [
      {
        h: "Approach",
        p: [
          "Series against parallel on conversion efficiency, weight, fault tolerance, and high-power flight phases — then SOFC against PEM, and liquid, 700-bar compressed, and cryo-compressed storage.",
        ],
      },
      {
        h: "Results",
        p: [
          "Parallel, combining a direct-injection hydrogen ICE, an SOFC, and a PMSM in a 30/70 split: 53.5% idealized peak system efficiency, clearing the >50% target against a baseline below 40%.",
          "What that costs is the real content. SOFCs run hot, and it's the efficiency–temperature–mass–complexity trade that would decide this in practice, not the headline number.",
        ],
      },
    ],
    media: [
      { file: "architectures.png", caption: "Parallel-hybrid variants against serial-hybrid, as evaluated." },
      { file: "comparison.png", caption: "Hybrid concept against the 737 MAX-8 baseline." },
      { file: "efficiency.png", caption: "Thermal, propulsive, and overall efficiency formulation." },
    ],
  },

  {
    slug: "kanthagen",
    groups: ["research"],
    lede: "Computational design tool",
    outcome: "52 tests · runs live in your browser",
    title: "KanthaGen",
    subtitle: "A drawing tool that composes inside a tradition instead of approximating it",
    kind: "ARC 374 Computational Thinking for Design",
    date: "Spring 2026",
    tags: ["Computational design", "JavaScript", "SVG", "Testing"],
    tracks: ["mech"],
    aside:
      "With Elinald Desroches and Saba Maheen. The tool below is the real thing — it runs in your browser.",
    summary:
      "A browser tool that turns a hand-drawn region into an editable Nakshi Kantha composition, built on a curated archive of real motifs rather than invented ornament.",
    links: [{ label: "Try KanthaGen →", url: "../demo/kanthagen/index.html", primary: true }],
    specs: [
      ["Stack", "HTML · CSS · JavaScript · SVG/Canvas"],
      ["Canvas formats", "3 — pillow 1:1, runner 1:5, tapestry 4:5"],
      ["Region types", "4 — polygon, circle, rectangle, freehand"],
      ["Motif categories", "5 — human, decorative, animal, running stitch, floral"],
      ["Motif variants", "15, procedural"],
      ["Archive curated", "107 images"],
      ["Unit tests", "52 across 11 suites"],
      ["User evaluation", "4 users, unmoderated"],
    ],
    sections: [
      {
        h: "Approach",
        p: [
          "Generative ornament is easy to make arbitrary. So the archive came first: 107 images of motifs, borders, and stitch types, catalogued, with every procedural variant built out of that documented vocabulary. The tool composes within a tradition rather than gesturing at its surface.",
        ],
      },
      {
        h: "What I built",
        p: [
          "Region drawing across four input types, 15 procedural motif variants, grouping and radial symmetry, layers, undo/redo, alignment and distribution, print-ready export. Plus a parameterized Hive Hotel generator that reports room count, footprint, open and green area, and density — so generated layouts can be compared, not just admired.",
        ],
      },
      {
        h: "Testing",
        p: [
          "52 unit tests across 11 suites, against the geometry utilities, state management, and UI gating.",
          "Radial-symmetry duplication was the hard one: rotation about a canvas centroid, where floating-point drift forces tolerance-based assertions instead of equality. Undo/redo needed its own care, since history snapshots go through JSON serialization — state immutability is an assumption worth testing rather than trusting. The edge cases held the useful findings: a degenerate single-point polygon falls back to a stitch radius of 50, and zero-length line normalization is what stops a divide-by-zero.",
        ],
      },
      {
        h: "What users found",
        p: [
          "Four people, no instructions. Drawing and motif generation landed. Export did not — one user couldn't find the download and screenshotted the canvas instead, losing quality. Another never discovered resize. A third fought the double-click on the freehand boundary.",
          "Both feature requests were about range, not bugs: a colour picker scoped to one motif or several, and an example library showing what a finished composition looks like. Discoverability was the finding, and that's a design problem.",
        ],
      },
      {
        h: "What I'd do differently",
        p: [
          "We started with a VLLM generating motifs from annotated references. Getting from annotations to images the interface could actually consume didn't come together, so we moved to procedural SVG — a deliberate trade of novelty for control and crispness.",
          "The next version revives that pipeline properly: generate from annotated references, vectorize to editable SVG, feed it into the same interface. Then direct SVG/PDF export, adjustable stitch parameters, and coverage and repetition metrics so a composition can be measured.",
        ],
      },
    ],
    media: [
      { file: "demo.mp4", type: "video", caption: "The tool in use: draw a region, generate motifs, compose, export." },
      { file: "ui-composition.png", caption: "The interface with a composition in progress." },
      { file: "motif-categories.png", caption: "Generated motifs per category — human, decorative, animal, running stitch, floral." },
      { file: "landing.png", caption: "Landing page." },
      { file: "info-page.png", caption: "The info page: nakshi kantha, stitch types, motif vocabulary." },
      { file: "pillow-mandala.png", caption: "1:1 pillow — radially symmetric layout using each motif type in a mandala." },
      { file: "runner-freehand.png", caption: "1:5 runner — freehand pen tool for hearts, combined with provided decorative motifs." },
      { file: "tapestry-lotus.png", caption: "4:5 tapestry — a floral lotus with a smiling human motif, built with the symmetry tools." },
      { file: "tapestry-border.png", caption: "4:5 tapestry — large central motif, smaller motifs around it, triple-layered running stitch border." },
      { file: "poster.png", caption: "Final project poster." },
    ],
  },

  {
    slug: "robotic-am",
    groups: ["robotics","materials"],
    lede: "Print it, then break it",
    outcome: "70% more energy absorbed per kg than cast",
    title: "Robotic additive manufacturing",
    subtitle: "Print concrete in a helix, then break it on purpose",
    kind: "CEE 374 Autonomous Fabrication & Robotics",
    date: "Fall 2025",
    tags: ["Robotics", "Fabrication", "Mechanical test", "Materials"],
    tracks: ["mech", "space"],
    aside:
      "Group 3, assigned the Bouligand architecture. Prof. Reza Moini. Rheology, printing, and fracture testing across four labs; ABB arm programming alongside.",
    summary:
      "Cement paste is a material you have to earn: too stiff and it clogs, too loose and it slumps. I printed a bio-inspired helical beam out of it, then loaded it to failure to find out whether the architecture was worth the trouble. It was \u2014 but not in the way the peak load suggests.",
    specs: [
      ["Architectures", "Bouligand \u00b7 honeycomb \u00b7 cast control"],
      ["Beam", "20 \u00d7 23 \u00d7 75 mm at 65% infill"],
      ["Bouligand rotation", "9\u00b0 per layer, 90\u00b0 \u2192 270\u00b0"],
      ["Filament", "1.63 mm wide \u00b7 1.00 mm tall"],
      ["Mix", "w/c 0.265 \u00b7 HRWRA + VMA \u00b7 vacuum mixed"],
      ["Print speed", "750 mm/min deposition"],
      ["Cure", "7 days at 95\u201399% RH"],
      ["Test", "SENB, 69 mm span, 0.05 mm/min"],
      ["Robotics", "ABB IRB1200 \u00b7 RobotStudio \u00b7 RAPID \u00b7 FlexPendant"],
    ],
    sections: [
      {
        h: "Getting the paste printable",
        p: [
          "Before printing anything, we characterized three mixes on a rheometer. Static yield stress \u2014 what holds a layer up \u2014 came out at 258, 147, and 135 Pa; dynamic yield stress and viscosity, which govern whether it extrudes at all, ran the other way.",
          "That trade is the whole problem. P1 had nearly twice the buildability (20.7 mm maximum layer height against 10.8 mm) and was the stiffest to push through a nozzle. I recommended P1 anyway: shape retention is harder to recover from than extrusion pressure.",
        ],
      },
      {
        h: "Printing it",
        p: [
          "Cement sifted to 150 \u00b5m, vacuum-mixed in two stages to pull the air out, loaded into a 90 ml syringe on a stepper-driven extruder. Two solid layers at the base for notching, then 21 layers rotating 9\u00b0 each.",
          "The helix fights you. Each rotation reduces the support the layer beneath offers, and the middle of the beam slumped. I raised extrusion to 102% at layer 14 and 103% at layer 19 to close the gaps opening up \u2014 which helped, and did not fix the air voids. That variability shows up later in the data, which is the honest link between process and property.",
        ],
      },
      {
        h: "Breaking it",
        p: [
          "Single-edge notch bending on an MTS Criterion, 69 mm span, displacement-controlled at 0.05 mm/min \u2014 slow enough that the crack has time to interact with the architecture rather than outrun it.",
          "For crack initiation, cast wins: mean K\u1d35\u1d9c of 260 kN/m^1.5 against 124 for honeycomb and 86 for Bouligand. Dense uniform material resists a crack starting. But energy-equivalent toughness inverts the order \u2014 Bouligand 915, honeycomb 891, cast 730 kN/m^1.5 \u2014 because the printed beams keep carrying load long after the peak.",
          "Normalize by density and the printed beams pull further ahead: they are 25\u201330% lighter than cast. The fracture surfaces show why. The crack doesn't run straight through a Bouligand beam; it twists along the rotated filament interfaces, and every twist costs energy.",
        ],
      },
      {
        h: "What it cost",
        p: [
          "The Bouligand standard deviation is enormous \u2014 267 against 62 for cast. Same design, same day, wildly different numbers, traced to filament width, voids, and interlayer bonding rather than to the architecture. Notch sharpness and roller seating add their own scatter.",
          "So the finding is really two findings: the architecture works, and process control is what stands between the concept and a usable material.",
        ],
      },
      {
        h: "Where the theory oversells",
        p: [
          "Euler buckling puts a hollow cylinder at 241 printable layers and a thin wall at 81 about its weak axis. Set against the yielding limit of about 91 layers, the cylinder yields first and the wall buckles first \u2014 different failure modes for the same paste, decided by geometry.",
          "But elastic buckling theory assumes ideal geometry and rate-independent behaviour, and the literature has it overestimating buildability by 104\u2013210%. Running the thixotropy numbers makes that concrete: for yielding and buckling to arrive together you would print at 8.79 mm/min, against the 750 mm/min we actually used. The structural build-up rate cannot keep up. Worth knowing before quoting a limiting height from an equation.",
        ],
      },
      {
        h: "The arm half of the course",
        p: [
          "Alongside the cement work: ABB IRB1200 programming in RobotStudio and on the FlexPendant \u2014 RAPID motion, work objects, tool frames, gripper I/O, and the tests that matter operationally, like whether the arm resumes cleanly after an E-stop, or follows the path correctly after the fixture moves and the work object is redefined. It does.",
          "My term paper proposed closing the loop between those two halves: keeping CAD-grade conformal path planning while a safety-bounded reinforcement-learning layer makes micro-adjustments to heading, lane spacing, and feed rate from multi-sensor feedback, with local replanning when deviation crosses a threshold. The gaps I was patching by hand at layer 14 are exactly what such a controller should catch.",
        ],
      },
    ],
    media: [
      { file: "printing.jpg", caption: "The Bouligand beam mid-print \u2014 syringe extrusion, no heat, cold-extrusion G-code." },
      { file: "slicing-preview.jpg", caption: "Simplify3D preview of the layer being deposited, next to the machine running it." },
      { file: "senb-setup.jpg", caption: "Bouligand beam 2 in the MTS bend fixture, notch centred under the top roller." },
      { file: "fracture-surfaces.jpg", caption: "After failure: the crack twisted along the rotated filament interfaces instead of running straight." },
      { file: "load-displacement.jpg", caption: "Load\u2013displacement for all six specimens. Cast peaks highest and drops instantly; printed beams keep carrying." },
      { file: "toughness-bar.jpg", caption: "Mean initiation and energy-equivalent toughness. The two metrics rank the architectures in opposite orders." },
      { file: "toughness-normalized.jpg", caption: "Normalized by density \u2014 the printed beams gain ground, because they are lighter." },
      { file: "rapid-code.jpg", caption: "RAPID motion program and taught point coordinates on the FlexPendant." },
      { file: "workobject-code.jpg", caption: "Drawing on a redefined work object: move the fixture, redefine wobjPaper, path still holds." },
      { file: "abb-gripper.jpg", caption: "IRB1200 in RobotStudio with the gripper attached, open." },
      { file: "abb-pick.jpg", caption: "Picking a part off the holder \u2014 gripper I/O and jogging from the pendant." },
    ],
  },

  {
    slug: "plasma-carbon",
    groups: ["materials","research"],
    lede: "Low-temperature CO₂ conversion",
    outcome: "2 optical diagnostics evaluated",
    title: "Plasma carbon conversion",
    subtitle: "CO₂ to graphene at ~400 °C, if you can see what's happening",
    kind: "ACEE Summer Research · Ju Lab, Princeton",
    date: "Summer 2025",
    tags: ["Plasma", "Diagnostics", "Energy research"],
    tracks: ["mech", "space"],
    summary:
      "Design-stage work in Princeton's Combustion & Low Carbon Energy Conversion Laboratory on dielectric-barrier-discharge plasma as a lower-temperature route from CO₂ to solid carbon.",
    specs: [
      ["Lab", "Combustion & Low Carbon Energy Conversion"],
      ["Advisor", "Prof. Yiguang Ju"],
      ["Method", "Dielectric-barrier-discharge plasma"],
      ["Target operating point", "~400 \u00b0C"],
      ["Products targeted", "CO \u00b7 graphene \u00b7 Na\u2082CO\u2083"],
      ["Diagnostics evaluated", "2 \u2014 laser absorption, LIF"],
      ["Funding", "Peter B. Lewis Fund / ACEE"],
      ["Stage", "Design phase"],
    ],
    sections: [
      {
        h: "Context",
        p: [
          "Conventional routes from CO\u2082 to solid carbon run hot. Dielectric-barrier-discharge plasma drives the chemistry at much lower bulk temperature \u2014 around 400 \u00b0C \u2014 which is where the energy saving lives, provided you can measure what is happening well enough to optimize it.",
        ],
      },
      {
        h: "What I did",
        p: [
          "Surveyed reactor geometries and catalyst pathways for dissociating CO\u2082 into CO, graphene, and sodium carbonate, and evaluated two optical diagnostics \u2014 laser absorption spectroscopy against laser-induced fluorescence \u2014 for tracking CO and CO\u2082 concentrations in real time rather than inferring them after the fact.",
          "Design phase, not a completed experimental campaign: groundwork for the lab's move toward a built reactor. I would rather say that plainly than dress it up.",
        ],
      },
    ],
    media: [],
    mediaNote:
      "Reactor CAD is in assets/plasma-carbon/ but not published \u2014 the design is Shuzi Wang's and the work is unpublished. Confirm with the lab first, then list the files here.",
  },

  {
    slug: "aegis",
    groups: ["research"],
    lede: "Field research & analysis",
    outcome: "612-participant baseline · 3,753 stakeholders reached",
    title: "Aegis Trust",
    subtitle: "Two summers of research and community work in Rwanda",
    kind: "Gender & Research Intern · Youth Volunteer",
    date: "Summers 2023 & 2024",
    tags: ["Research", "SPSS", "Facilitation", "Fieldwork"],
    tracks: ["mech", "space"],
    aside:
      "Aegis Trust, Kigali, in partnership with the University of Rwanda Centre for Gender Studies and funded by the Embassy of Belgium. Project figures below are the programme's, drawn from its end-project report; my role was research and analysis inside it.",
    summary:
      "Before the labs, two summers at Aegis Trust — the first mentoring Youth Peace Clubs, the second on the research team for a two-year programme on gender norms and positive masculinities.",
    specs: [
      ["Programme", "2 years, 3 Community Peace Centres"],
      ["Baseline study", "612 participants, 5 districts"],
      ["Stakeholders reached", "3,753 against a 2,600 target"],
      ["Faith leaders trained", "180 of 200 invited"],
      ["Gender Champions", "96, split 50/50 by gender"],
      ["Awards scheme", "50 recipients, 52% women"],
      ["Analysis", "SPSS, quantitative"],
      ["Methods", "Survey · interviews · reflection workshop"],
    ],
    sections: [
      {
        h: "What the work was",
        p: [
          "A programme run across five districts — Huye, Nyagatare, Gasabo, Kicukiro, Nyarugenge — aimed at shifting gender norms through dialogue, training, and building capacity in the organizations that shape those norms: churches, schools, cooperatives, civil society.",
          "The evaluation rested on four sources: a document review, SPSS analysis of the follow-up survey, semi-structured interviews with staff and the monitoring team, and a reflection workshop with community leaders and local authorities. Four ways of asking the same question, which is how you find out whether a number means anything.",
        ],
      },
      {
        h: "The part that outlasts the project",
        p: [
          "Assessment criteria for positive masculinities, built from the baseline study and the national dialogues, and an awards scheme developed with the Centre for Gender Studies to recognize organizations doing this well. Fifty recipients were selected by district committees and awarded in early 2024 — 49 individuals, one civil society organization, and six couples.",
          "Criteria and recognition are what remain once funding ends. That was the point of building them.",
        ],
      },
      {
        h: "What the numbers did and didn't show",
        p: [
          "Reach exceeded target — 3,753 stakeholders against 2,600 planned, and 2,953 parents where 2,000 were budgeted, because partner organizations extended the invitation through their own constituencies at no extra cost. Attendance ran below invitation almost everywhere: 180 of 200 faith leaders, 96 of 100 Gender Champions.",
          "Reach is the easy metric. Self-reported attitude change is the hard one, and it is exactly where a follow-up survey is weakest — which is why the interviews and the workshop mattered more than the percentages.",
        ],
      },
      {
        h: "The part I still think about",
        p: [
          "The Ubumwe Sports Initiative put boys and girls on a basketball court together — a blunt instrument for a subtle problem, and it worked better than any workshop. What I remember is the hesitation dissolving over about twenty minutes, and a girl scoring while the boys cheered as loudly as the girls did.",
          "That's not a data point. It doesn't go in a table and it isn't what the funder measures. But it's the thing that told me the intervention was landing, weeks before the survey said so — and it's why I don't fully trust a result I haven't also watched happen.",
        ],
      },
      {
        h: "Why it's on an engineering site",
        p: [
          "Because it taught me what I now bring to test campaigns: a result nobody can act on isn't finished. Collection, analysis, and write-up are the easy two-thirds. Getting a finding into a form that changes what someone does is the rest of the job — and that's the same problem whether the audience is a district committee in Nyagatare or a design review.",
        ],
      },
    ],
    media: [
      { file: "poster-gender.jpg", caption: "Gender & Research Intern, 2024 — showcase poster." },
      { file: "poster-youth.jpg", caption: "Youth Volunteer, 2023 — showcase poster." },
    ],
  },
];

module.exports = { profile, projects };
