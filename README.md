# Portfolio — Kéllia Gatete

A static site. The HTML in this folder is already generated and ready to publish
as-is — no build step required to deploy.

## Deploy to Netlify

**Fastest (no Git):**

1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page.
3. It's live. Netlify gives you a URL like `curious-fermi-12ab34.netlify.app`.
4. Site settings → Change site name → pick something like `kelliagatete`.

**Better long-term (auto-deploys on every push):**

1. Create a GitHub repo and push this folder to it.
2. In Netlify: Add new site → Import an existing project → pick the repo.
3. Build command: leave empty. Publish directory: `.`

**Custom domain:** Netlify → Domain management → Add a domain.

## Replacing your existing GitHub Pages site

You already have `kelliagatete.github.io`. To publish this in its place while
keeping the same URL, replace the contents rather than deleting the repo —
deleting and recreating briefly frees the name for anyone else, and you lose the
stars, history, and any custom domain settings.

From inside this folder:

```bash
git init
git remote add origin https://github.com/kelliagatete/kelliagatete.github.io.git
git add -A
git commit -m "Rebuild portfolio"
git push --force origin main
```

`--force` overwrites whatever is there now. That is what you want here, and it is
also irreversible — if there's anything in the old repo you haven't kept a copy
of, clone it somewhere else first.

Two things to check afterwards:

- **Custom domain.** If you ever set one, GitHub stores it in a `CNAME` file at
  the repo root. Force-pushing removes it and the domain stops resolving. Copy
  that file into this folder before pushing, or re-add the domain under
  Settings → Pages.
- **Branch name.** If your repo uses `master` rather than `main`, change the last
  command to match, or set Settings → Pages → Branch to whichever you pushed.

`.nojekyll` is included so GitHub serves the files as-is. Without it, Jekyll
ignores anything starting with an underscore — which would mean `_content.js`
and `_build.js` are silently unavailable. Nothing on the live site needs them,
but their absence is confusing when you go looking.

## Other hosts

The site is plain static HTML with no build step, so it works anywhere:

- **Cloudflare Pages** — Workers & Pages → Create → Pages → Upload assets. Reads
  `_redirects` the same way Netlify does.
- **GitHub Pages** — push this folder to a repo named `<username>.github.io`, then
  Settings → Pages → Deploy from branch → `main` / root.
- **Vercel** — drag and drop, or import the repo.
- **Surge** — `npx surge .` from inside this folder.

`netlify.toml` only applies on Netlify. `yoursite.com/resume` works everywhere
regardless, because `resume/index.html` redirects to the PDF on its own.

## Edit the writing

All copy lives in `_content.js`. To regenerate the HTML:

```bash
node _build.js
```

That rebuilds every page in place. If you'd rather not use Node, edit the
`.html` files directly — nothing overwrites them unless you run the build.

Things worth knowing about `_content.js`:

- `profile.links` — put your GitHub and LinkedIn URLs here and they appear in
  the footer of every page. Rows left empty are skipped, so nothing breaks.
- `profile.facts` — the "at a glance" panel on the about page, including
  funding and honours. Rows render in order.
- `project.links` — optional buttons under a project summary. KanthaGen uses
  one to open the live tool.
- `project.media` — add `type: "video"` for an `.mp4`. A matching
  `-poster.jpg` shows as the still frame.

## Media

Each project has a folder under `assets/`. Filenames must match what
`_content.js` lists — any image that isn't there shows a placeholder naming the
path it wants, so you can spot gaps by browsing the site.

Currently populated: `marskin`, `lurex`, `railway`, `stk-mission-analysis`,
`hydrogen-aircraft`, `kanthagen`, `robotic-am`, `aegis`, plus `covers/` (the
hover previews on the work index) and `docs/` (both résumé PDFs).

`plasma-carbon` deliberately publishes no media — the reactor CAD is Shuzi
Wang's and unpublished. Its card on the work index falls back to a hand-drawn
SVG of a DBD reactor rather than a placeholder, so nothing looks broken.

- **Resize before uploading.** Nothing needs to be wider than ~1600px.
- **Video:** short clips, under ~10 MB, MP4 (H.264), with a `-poster.jpg`.

## The KanthaGen demo

`demo/kanthagen/index.html` is the real tool, self-contained, no dependencies.
It deploys with the site and the project page links to it. To swap in a newer
version, replace that one file.

## Before you publish

- [x] ~~GitHub and LinkedIn URLs~~ — both set in `profile.links`.
- [x] ~~Media for `robotic-am`~~ — all eleven images in and referenced.
- [x] ~~Résumés~~ — both rebuilt, one page each, with the ISS figure corrected
      (92.903), the LUREX block updated to FDR, and your site URL in the header.
      Editable sources are in `assets/docs/sources/`.
- [ ] **Add your LinkedIn** once it's ready, in two places: `profile.links` in
      `_content.js` (footer of every page), and the `LINKEDIN` constant at the top
      of `assets/docs/sources/build.js` (header of both résumés). Both are set up
      to skip the entry while it's empty, so nothing breaks in the meantime.
- [ ] **Add a headshot.** Drop a file under `assets/` and set `profile.portrait`
      to its path. Until then the about panel renders as an abstract graphic.
- [ ] Confirm with your thesis advisor what MARSKIN material can be public.
- [ ] Confirm with the Ju Lab whether the plasma reactor CAD can be published.
      Both files are in `assets/plasma-carbon/`; `mediaNote` explains the hold.
- [ ] Decide whether the hydrogen aircraft belongs in the "Space" group. It
      currently surfaces under that filter, which may read oddly to a recruiter
      scanning for spacecraft work. The role switch already hides it under
      "Space / robotics", so this only affects the discipline filter.
- [ ] Open the site on a phone — check nothing overflows.

## Structure

```
index.html            home + filterable project index
about.html            longer bio, background at a glance
projects/*.html       one page per project
demo/kanthagen/       the live KanthaGen tool
style.css             all styling
main.js               filtering, reveals, counters, lightbox, motion
netlify.toml          headers, caching, /resume shortcut
_content.js           all site copy (edit here)
_build.js             regenerates the HTML
```

`/resume` resolves to the mechanical/R&D PDF, so you can print the short URL on
things.
