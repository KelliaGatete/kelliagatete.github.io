const fs = require("fs");
const path = require("path");
const { profile, projects } = require("./_content.js");

// Builds in place by default, so `node _build.js` works from this folder.
// Set PORTFOLIO_OUT to write the generated site somewhere else.
const OUT = process.env.PORTFOLIO_OUT
  ? path.resolve(process.env.PORTFOLIO_OUT)
  : __dirname;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600&family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400&display=swap" rel="stylesheet">`;

const CREASE = `<svg class="crease" viewBox="0 0 1200 14" preserveAspectRatio="none" aria-hidden="true">
    <path class="crease__mtn" d="M0 10 L60 4 L120 10 L180 4 L240 10 L300 4 L360 10 L420 4 L480 10 L540 4 L600 10 L660 4 L720 10 L780 4 L840 10 L900 4 L960 10 L1020 4 L1080 10 L1140 4 L1200 10"/>
    <path class="crease__val" d="M0 10 L1200 10"/>
  </svg>`;

function shell({ title, description, body, rootPrefix = "", current = "" }) {
  const nav = [
    ["work", `${rootPrefix}index.html#work`, "work"],
    ["about", `${rootPrefix}about.html`, "about"],
    ["résumé", `${rootPrefix}index.html#contact`, "contact"],
  ];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  ${FONTS}
  <link rel="stylesheet" href="${rootPrefix}home.css">
  <link rel="stylesheet" href="${rootPrefix}style.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div class="rail" aria-hidden="true"><span class="rail__fill"></span></div>
  ${CREASE}
  <header class="site-header">
    <a class="wordmark" href="${rootPrefix}index.html" aria-label="Home"><span>MAE</span><i></i> <span>ROB</span></a>
    <button class="menu-toggle" aria-expanded="false" aria-label="Toggle navigation"><span></span><span></span></button>
    <nav class="nav" aria-label="Primary">
      <a href="${rootPrefix}index.html#work"${current === "work" ? ' aria-current="page"' : ""}>Work</a>
      <a href="${rootPrefix}about.html"${current === "about" ? ' aria-current="page"' : ""}>About</a>
      <a href="${rootPrefix}index.html#contact">Contact</a>
    </nav>
    <a class="header-status" href="${rootPrefix}index.html#contact"><span></span> Available for opportunities</a>
  </header>
  <main id="main">
${body}
  </main>
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <p class="footer__cta" id="contact">Currently looking for engineering roles.</p>
        <div class="footer__links">
          <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
          <a href="tel:${profile.phone.replace(/[^0-9+]/g, "")}">${esc(
    profile.phone
  )}</a>
          <a href="${rootPrefix}${profile.resumeMech}">Résumé — mechanical / R&amp;D (PDF)</a>
          <a href="${rootPrefix}${profile.resumeSpace}">Résumé — space / robotics (PDF)</a>
${(profile.links || [])
  .filter((l) => l.url)
  .map((l) => `          <a href="${esc(l.url)}" rel="me">${esc(l.label)}</a>`)
  .join("\n")}
        </div>
      </div>
      <p class="colophon">Built and maintained by Kéllia Gatete · Princeton, NJ</p>
    </div>
  </footer>
  <div class="lightbox" id="lightbox" hidden>
    <button class="lightbox__close" type="button" aria-label="Close">close</button>
    <figure class="lightbox__stage"><img alt=""><figcaption></figcaption></figure>
  </div>
  <script src="${rootPrefix}main.js"></script>
</body>
</html>
`;
}

// A project's hover preview: prefer a hand-picked cover, fall back to its first image.
const coverFor = (p) => {
  const cover = `assets/covers/${p.slug}.jpg`;
  for (const base of [__dirname, OUT]) {
    if (fs.existsSync(path.join(base, cover))) return cover;
  }
  const first = (p.media || []).find((m) => m.type !== "video");
  return first ? `assets/${p.slug}/${first.file}` : null;
};

/* ---------------- home ---------------- */
function renderHome() {
  const FILTERS = [
    ["all", "All"],
    ["space", "Space"],
    ["robotics", "Robotics"],
    ["materials", "Materials & test"],
    ["research", "Research & software"],
  ];

  const filters = FILTERS.map(
    ([key, label], i) =>
      `<button class="filter${i === 0 ? " filter--active" : ""}" data-filter="${key}">${label}</button>`
  ).join("");

  const TRACKS = [
    ["all", "Any role"],
    ["mech", "Mechanical / R&D"],
    ["space", "Space / robotics"],
  ];

  const trackFilters = TRACKS.map(
    ([key, label], i) =>
      `<button class="filter track-filter${i === 0 ? " filter--active" : ""}" data-track="${key}">${label}</button>`
  ).join("");

  const plasmaSvg = `<svg class="project-visual__svg" viewBox="0 0 600 420" role="img" aria-label="Line diagram of a dielectric barrier discharge reactor">
            <g class="diagram-grid"><path d="M0 70H600M0 140H600M0 210H600M0 280H600M0 350H600M100 0V420M200 0V420M300 0V420M400 0V420M500 0V420"/></g>
            <g class="diagram-main">
              <rect x="132" y="168" width="336" height="84" rx="8"/>
              <path d="M132 192h336M132 228h336M72 210h60M468 210h60"/>
              <circle cx="300" cy="104" r="27"/><path d="M286 104h28M300 90v28M300 131v37"/>
              <path d="M168 252v46h264v-46"/>
            </g>
            <g class="diagram-accent"><path d="M160 210h280"/><path d="M424 199l20 11-20 11"/></g>
            <text x="34" y="40">DBD REACTOR / CONCEPT</text>
            <text x="392" y="396">CO₂ → CO + C</text>
          </svg>`;

  const projectCards = projects
    .map((p, i) => {
      const cover = coverFor(p);
      const visual = cover ? `<img src="${cover}" alt="" loading="lazy">` : plasmaSvg;

      return `        <article class="project reveal" data-groups="${p.groups.join(" ")}" data-tracks="${(p.tracks || []).join(" ")}">
          <div class="project__topline">
            <span>${String(i + 1).padStart(2, "0")} / ${esc(p.lede)}</span>
            <span>${esc(p.kind)}</span>
            <span>${esc(p.date)}</span>
          </div>
          <div class="project__content">
            <div class="project__copy">
              <h3><a href="projects/${p.slug}.html">${esc(p.title)}</a></h3>
              <p>${esc(p.subtitle.replace(/[.?!]+$/, ""))}${/[?!]$/.test(p.subtitle) ? p.subtitle.slice(-1) : "."}</p>
              <ul>${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              <div class="project__result"><span>Outcome</span>${esc(p.outcome)}</div>
            </div>
            <a class="project-visual" href="projects/${p.slug}.html" aria-label="Read the ${esc(
        p.title
      )} case study">
              ${visual}
              <div class="visual-stamp">DESIGN<br>TEST<br>REPORT</div>
            </a>
          </div>
        </article>`;
    })
    .join("\n");

  const facts = [
    ["Education", "Princeton University<br>B.S.E. MAE · Robotics minor"],
    ["Focus", "Planetary robotics<br>Thermal &amp; mechanical test"],
    ["Toolkit", "Fusion 360 · Rhino · Ansys STK<br>Python · MATLAB · C++"],
    ["Languages", "English · French · Kinyarwanda<br>Kirundi · Kiswahili · Spanish · German"],
  ]
    .map(([k, v]) => `          <div><span>${k}</span><strong>${v}</strong></div>`)
    .join("\n");

  const profileLinks = (profile.links || [])
    .filter((l) => l.url)
    .map((l) => `<a href="${esc(l.url)}">${esc(l.label)}</a>`)
    .join("");

  const arrow = (mod) =>
    `<svg aria-hidden="true" class="arrow${mod ? " arrow--" + mod : ""}" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" stroke-width="1.7"/></svg>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${esc(profile.name)} — Princeton mechanical and aerospace engineer. Planetary robotics, thermal and mechanical test, spacecraft systems.">
  <meta name="theme-color" content="#f1eddf">
  <title>${esc(profile.name)} — Robotics, Flight &amp; Mechanisms</title>
  <link rel="stylesheet" href="home.css">
</head>
<body>
<main>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Back to top"><span>MAE</span><i></i> <span>ROB</span></a>
    <button class="menu-toggle" aria-expanded="false" aria-label="Toggle navigation"><span></span><span></span></button>
    <nav class="nav" aria-label="Primary navigation">
      <a href="#work">Work</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="header-status" href="#contact"><span></span> Available for opportunities</a>
  </header>

  <section class="hero" id="top">
    <div class="hero__eyebrow hero-load">Princeton University · B.S.E. Mechanical &amp; Aerospace Engineering · 2026</div>
    <div class="hero__grid">
      <div class="hero__title hero-load"><h1>I build things<br>that have to <em>survive</em><br>somewhere difficult.</h1></div>
      <div class="hero__orbital hero-load" aria-hidden="true">
        <svg class="fold" viewBox="0 0 260 260" role="img">
          <g class="fold__flux">
            <path d="M46 26v22M78 20v28M110 26v22M142 20v28M174 26v22M206 20v28"/>
          </g>
          <g class="fold__stack">
            <path class="fold__crease" d="M40 78l38-22 38 22 38-22 38 22 38-22"/>
            <path class="fold__crease" d="M40 108l38-22 38 22 38-22 38 22 38-22"/>
            <path class="fold__crease" d="M40 138l38-22 38 22 38-22 38 22 38-22"/>
            <path class="fold__crease" d="M40 168l38-22 38 22 38-22 38 22 38-22"/>
            <path class="fold__crease" d="M40 198l38-22 38 22 38-22 38 22 38-22"/>
            <path class="fold__crease" d="M40 228l38-22 38 22 38-22 38 22 38-22"/>
          </g>
          <g class="fold__gauge">
            <path d="M232 62v168"/>
            <path d="M226 62h12M226 230h12"/>
          </g>
        </svg>
        <span class="orbital-note">SIX LAYERS<br>ONE FOLD<br>26.5 °C</span>
      </div>
      <div class="hero__intro hero-load">
        <p>${esc(profile.blurb)}</p>
        <a class="text-link" href="#work">Explore selected work ${arrow("down")}</a>
      </div>
    </div>
    <div class="hero__meta hero-load">
      <span>Princeton, NJ</span>
      <span>40.343° N / 74.651° W</span>
      <span>Portfolio / 2026</span>
    </div>
  </section>

  <section class="work-section" id="work">
    <div class="section-heading reveal">
      <span class="section-index">01 / Selected work</span>
      <h2>From first prototype<br>to <em>data that settles it.</em></h2>
      <p>Nine projects across planetary robotics, spacecraft systems, fabrication and test. Every page says what worked, what didn't, and what I'd do differently.</p>
    </div>
    <div class="filters reveal" aria-label="Filter projects by discipline">${filters}</div>
    <div class="filters filters--track reveal" aria-label="Filter projects by role type">
      <span class="filters__label">Hiring for</span>${trackFilters}
    </div>
    <p class="filter-empty" hidden>No projects match both filters. <button type="button" class="filter-reset">Show everything</button></p>
    <div class="project-list">
${projectCards}
    </div>
  </section>

  <section class="about-section" id="about">
    <div class="about__statement reveal">
      <span class="section-index">02 / About</span>
      <p>The interesting part is when a prototype stops being a model and <em>starts producing numbers.</em></p>
    </div>
    <div class="about__details reveal">
      <div class="about__portrait"${profile.portrait ? "" : ' aria-hidden="true"'}>
${
  profile.portrait
    ? `        <img src="${profile.portrait}" alt="${esc(profile.name)}" class="portrait-img">`
    : `        <div class="portrait-line portrait-line--one"></div>
        <div class="portrait-line portrait-line--two"></div>`
}
      </div>
      <div class="about__bio">
        <p>${esc(profile.about[2])}</p>
        <p>${esc(profile.about[3])}</p>
        <p>${esc(profile.about[profile.about.length - 1])}</p>
        <a class="button-link" href="${profile.resumeMech}">Résumé — mechanical / R&amp;D ${arrow("right")}</a>
        <div class="about__links">
          <a href="${profile.resumeSpace}">Résumé — space / robotics</a>
          <a href="about.html">Full background</a>${profileLinks}
        </div>
      </div>
      <div class="about__facts">
${facts}
      </div>
    </div>
  </section>

  <section class="process-section">
    <div class="process-heading reveal">
      <span class="section-index">03 / How I work</span>
      <h2>Build it properly.<br><em>Then try to break it.</em></h2>
    </div>
    <div class="process-steps reveal">
      <div><span>01</span><h3>Frame</h3><p>Find the constraint that actually governs before solving the visible problem.</p></div>
      <div><span>02</span><h3>Build</h3><p>Prototype early enough that reality still has time to change the design.</p></div>
      <div><span>03</span><h3>Instrument</h3><p>Decide what to measure, and against which control, before the first run.</p></div>
      <div><span>04</span><h3>Report</h3><p>Say what the data shows, including the conditions where the design loses.</p></div>
    </div>
  </section>

  <footer id="contact">
    <div class="footer__top reveal">
      <span class="section-index">04 / Contact</span>
      <h2>Let's build something<br><em>worth testing.</em></h2>
      <a class="contact-circle" href="mailto:${profile.email}" aria-label="Send an email">${arrow("right")}</a>
    </div>
    <div class="footer__bottom">
      <a href="mailto:${profile.email}">${profile.email}</a>
      <div>${profileLinks}</div>
      <span>${esc(profile.name)} · 2026</span>
    </div>
  </footer>
</main>
<script>
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  var buttons = document.querySelectorAll(".filter:not(.track-filter)");
  var trackButtons = document.querySelectorAll(".track-filter");
  var cards = document.querySelectorAll(".project");
  var state = { group: "all", track: "all" };

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var inGroup = state.group === "all" || card.dataset.groups.split(" ").indexOf(state.group) !== -1;
      var inTrack = state.track === "all" || (card.dataset.tracks || "").split(" ").indexOf(state.track) !== -1;
      var show = inGroup && inTrack;
      card.hidden = !show;
      if (show) shown++;
    });
    var empty = document.querySelector(".filter-empty");
    if (empty) empty.hidden = shown > 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("filter--active"); });
      btn.classList.add("filter--active");
      state.group = btn.dataset.filter;
      apply();
    });
  });

  trackButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      trackButtons.forEach(function (b) { b.classList.remove("filter--active"); });
      btn.classList.add("filter--active");
      state.track = btn.dataset.track;
      apply();
    });
  });
  var reset = document.querySelector(".filter-reset");
  if (reset) {
    reset.addEventListener("click", function () {
      state.group = "all";
      state.track = "all";
      buttons.forEach(function (b) { b.classList.toggle("filter--active", b.dataset.filter === "all"); });
      trackButtons.forEach(function (b) { b.classList.toggle("filter--active", b.dataset.track === "all"); });
      apply();
    });
  }
})();
</script>
</body>
</html>
`;
}

/* ---------------- about ---------------- */
function renderAbout() {
  const paras = profile.about.map((p) => `          <p>${esc(p)}</p>`).join("\n");

  const facts = profile.facts
    .map(
      ([k, v]) => `          <div class="factlist__row">
            <div class="factlist__k">${esc(k)}</div>
            <div class="factlist__v">${esc(v)}</div>
          </div>`
    )
    .join("\n");

  const body = `    <section class="project__head">
      <div class="wrap">
        <p class="eyebrow">About</p>
        <h1 class="h-display project__title">Kéllia Gatete</h1>
        <p class="project__sub">Mechanical and aerospace engineer. I design hardware for difficult environments and build the tests that prove whether it works.</p>
      </div>
    </section>
    <div class="wrap">${CREASE}</div>
    <section class="wrap about__grid">
      <div class="about__body prose">
${paras}
      </div>
      <aside class="factlist reveal" aria-label="Background at a glance">
${facts}
      </aside>
    </section>
`;

  return shell({
    title: `About — ${profile.name}`,
    description: profile.about[0],
    body,
    current: "about",
  });
}

/* ---------------- project pages ---------------- */
function renderProject(p, i) {
  const prev = projects[i - 1];
  const next = projects[i + 1];

  const specs = p.specs
    .map(
      ([k, v], si) => `          <div class="spec__row" style="--i:${si}">
            <div class="spec__k">${esc(k)}</div>
            <div class="spec__v">${esc(v)}</div>
          </div>`
    )
    .join("\n");

  const blocks = p.sections
    .map(
      (s) => `        <div class="block">
          <h2 class="block__h">${esc(s.h)}</h2>
          <div class="prose">
${s.p.map((t) => `            <p>${esc(t)}</p>`).join("\n")}
          </div>
${s.note ? `          <p class="note">${esc(s.note)}</p>\n` : ""}        </div>`
    )
    .join("\n");

  const media = p.media
    .map((m) => {
      const src = `../assets/${p.slug}/${m.file}`;
      const inner =
        m.type === "video"
          ? `<video controls preload="metadata" poster="../assets/${p.slug}/${m.file.replace(
              /\.mp4$/,
              "-poster.jpg"
            )}">
              <source src="${src}" type="video/mp4">
            </video>`
          : `<img src="${src}" alt="${esc(m.caption)}" loading="lazy">`;
      return `          <figure class="reveal shot shot--${(p.media.indexOf(m) % 3)}">
            <div class="frame" data-media>
              ${inner}
              <p class="frame__placeholder" data-fallback hidden>Drop file at<br><code>assets/${p.slug}/${esc(
        m.file
      )}</code></p>
            </div>
            <figcaption>${esc(m.caption)}</figcaption>
          </figure>`;
    })
    .join("\n");

  const body = `    <section class="project__head">
      <div class="wrap">
        <p class="eyebrow">${esc(p.kind)}</p>
        <h1 class="h-display project__title">${esc(p.title)}</h1>
        <p class="project__sub">${esc(p.subtitle)}</p>
        <p class="project__metaline">
          <span>${esc(p.date)}</span>
          <span>${p.tags.map(esc).join(" · ")}</span>
        </p>
${p.aside ? `        <p class="marginalia">${esc(p.aside)}</p>` : ""}
      </div>
    </section>
    <div class="wrap">${CREASE}</div>

    <section class="wrap project__body">
      <div>
        <p class="project__summary">${esc(p.summary)}</p>
${
  (p.links || []).filter((l) => l.url).length
    ? `        <p class="project__links">${(p.links || [])
        .filter((l) => l.url)
        .map(
          (l) =>
            `<a class="btn${l.primary ? "" : " btn--ghost"}" href="${esc(l.url)}"${
              /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : ""
            }>${esc(l.label)}</a>`
        )
        .join("\n          ")}</p>\n`
    : ""
}${blocks}
      </div>
      <aside class="spec" aria-label="Project specifications">
        <div class="spec__head">Spec</div>
${specs}
      </aside>
    </section>

    <section class="wrap media">
      <p class="eyebrow">Documentation</p>
${p.media.length ? `      <div class="media__grid">\n${media}\n      </div>` : `      <p class="media__empty">${esc(p.mediaNote || "")}</p>`}
    </section>

    <div class="wrap">
      <nav class="pager" aria-label="More projects">
        <span>${
          prev
            ? `<a href="${prev.slug}.html">← ${esc(prev.title)}</a>`
            : `<a href="../index.html#work">← All work</a>`
        }</span>
        <span>${
          next
            ? `<a href="${next.slug}.html">${esc(next.title)} →</a>`
            : `<a href="../index.html#work">All work →</a>`
        }</span>
      </nav>
    </div>
`;

  return shell({
    title: `${p.title} — ${profile.name}`,
    description: p.summary,
    body,
    rootPrefix: "../",
    current: "work",
  });
}

/* ---------------- write ---------------- */
// Never wipe OUT — assets/ lives here and is expensive to rebuild.
fs.rmSync(path.join(OUT, "projects"), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "projects"), { recursive: true });
fs.mkdirSync(path.join(OUT, "assets", "docs"), { recursive: true });

fs.writeFileSync(path.join(OUT, "index.html"), renderHome());
fs.writeFileSync(path.join(OUT, "about.html"), renderAbout());
projects.forEach((p, i) => {
  fs.mkdirSync(path.join(OUT, "assets", p.slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, "projects", `${p.slug}.html`), renderProject(p, i));
});

if (path.resolve(OUT) !== path.resolve(__dirname)) {
  ["style.css", "home.css", "main.js", "netlify.toml", "_redirects", "README.md", "_content.js", "_build.js"].forEach(
    (f) => fs.copyFileSync(path.join(__dirname, f), path.join(OUT, f))
  );
  ["assets", "demo", "resume"].forEach((dir) => {
    const src = path.join(__dirname, dir);
    if (fs.existsSync(src)) fs.cpSync(src, path.join(OUT, dir), { recursive: true });
  });
}

console.log(`Built ${projects.length + 2} pages to ${OUT}`);
