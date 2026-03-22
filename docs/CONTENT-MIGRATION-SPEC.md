# Content migration spec (UI → Firestore + API)

This document inventories the portfolio UI’s **currently-hardcoded content** and defines what moves to Firestore (and what stays static), plus the **admin UI** plan for editing and previewing scheduled content.

> Scope note: UI layout/styling stays in code. Only “content” (copy + datasets) moves.

---

## 1) Inventory of static content sources (current UI)

### Blog posts

- **Source**: `src/content/blogData.js` exports `BLOG_POSTS`
- **Used by**: `src/components/portfolio/Blog/BlogIndex.jsx`
- **Current shape**
  - `slug`, `title`, `date` (string), `readingTime`, `category`, `tags[]`, `excerpt`
  - `sections[]: { heading, body[] }`, where `body[]` contains:
    - paragraph string, or
    - link object `{ label, href }`
- **Other blog copy in UI**
  - Blog section title + topic summary + disclaimer text: `src/components/portfolio/Blog/BlogIndex.jsx`

### Case studies

- **Source**: `src/content/caseStudies.js` exports `CASE_STUDIES`
- **Used by**: `src/components/portfolio/CaseStudies/CaseStudiesSection.jsx`
- **Current shape**
  - `id`, `title`, `role`, `domain`, `problem`, `approach[]`, `results[]`
- **Other case-study copy in UI**
  - Section title and labels “Problem/Approach/Results”: `src/components/portfolio/CaseStudies/CaseStudiesSection.jsx`

### Portfolio (jobs, skills, projects, etc.)

- **Source**: `src/data/portfolio.js`
- **Used by**: `src/App.jsx`
- **Datasets**
  - `JOBS[]`, `CONTRIBUTIONS[]`, `SKILL_GROUPS[]`, `PROJECTS[]`, `EDUCATION[]`, `CERTIFICATIONS[]`, `LANGUAGES[]`, `ADDITIONAL_INFO[]`
  - `SUMMARY_TEXT` (string)
- **Other portfolio copy in UI**
  - Section titles and “Expertise/What I Help With” content: `src/App.jsx`
  - “View all repositories →” label: `src/App.jsx`

### Navigation

- **Source**: `src/config/nav.js` exports `NAV_ITEMS`
- **Used by**: `src/components/portfolio/Navbar/Navbar.jsx`
- **Other nav copy in UI**
  - Brand name text (“Felipe Silva de Mello”), menu labels/ARIA strings: `src/components/portfolio/Navbar/Navbar.jsx`

### External links

- **Source**: `src/config/links.js` exports `LINKS`
- **Used by**: `src/components/portfolio/Hero/Hero.jsx`, `src/components/portfolio/Contact/Contact.jsx`, `src/App.jsx`

### Hero + contact copy

- **Hero**: `src/components/portfolio/Hero/Hero.jsx`
  - name, badge, location, summary
  - avatar path: uses `${import.meta.env.BASE_URL}profile.png` (asset in `public/`)
- **Contact**: `src/components/portfolio/Contact/Contact.jsx`
  - section title, body, disclaimer

### Skill logos

- **Source**: `src/data/skillLogosData.json`
  - Contains per-skill logo metadata and large SVG path strings.

---

## 1b) What moves to Firestore vs remains static

### Move to Firestore (editable content)

- **Global site copy + navigation** (single fetch)
  - nav items (`NAV_ITEMS`)
  - external links (`LINKS`)
  - hero copy (name, badge, location, summary)
  - contact copy (title, body, disclaimer)
  - navbar brand label (optional; included if you want the name editable)
  - portfolio section titles + “Expertise” cards copy (currently in `App.jsx`)
- **Portfolio datasets** (single fetch)
  - `JOBS`, `CONTRIBUTIONS`, `SKILL_GROUPS`, `PROJECTS`, `EDUCATION`, `CERTIFICATIONS`, `LANGUAGES`, `ADDITIONAL_INFO`, `SUMMARY_TEXT`
- **Case studies** (collection)
  - published flag + (optional) scheduled publish support
- **Blog posts** (collection)
  - includes **scheduled publishing** via `publishAt` + draft control via `published`

### Remain static (keep in repo)

- **Skill logos** (`src/data/skillLogosData.json`)
  - Rationale: large SVG payloads; rarely change; simplest to ship with the UI bundle.
  - Optional future move: `assets/skillLogos` document in Firestore if you want logos configurable.
- **Layout/styling/structure**
  - React components, CSS, and non-content UI strings such as ARIA labels that are not “site content” (you can still move them later, but it complicates i18n/accessibility testing).
- **Avatar image**
  - Keep `public/profile.png` as a static asset; store only its path/URL in Firestore if needed.

---

## 4) Admin UI plan (screens + auth gating + preview)

### Auth model

- **Provider**: Firebase Auth (email/password or OAuth; whichever you enable)
- **Admin authorization**: Firebase custom claim `admin=true`
- **Client behavior**
  - User signs in → client obtains Firebase ID token
  - Client calls API with `Authorization: Bearer <idToken>`
  - API validates token and checks claim for admin endpoints

Operational note (claims):

- If you grant `admin=true` after a user already signed in, the user must **refresh** their ID token (sign out/in, or `getIdToken(true)`) before the claim appears client-side.

### Route gating

- **Public app**: unchanged routes (regular portfolio)
- **Admin area**: add protected route `#/admin` (or `/admin` with SPA routing)
  - If not signed in: redirect to `/admin/login`
  - If signed in but not admin: show “Not authorized” (and do not expose admin data)

Recommended admin route map:

- `/admin/login`
- `/admin` (dashboard)
- `/admin/site-config`
- `/admin/portfolio`
- `/admin/blog`
- `/admin/blog/new`
- `/admin/blog/:slug`
- `/admin/case-studies`
- `/admin/case-studies/new`
- `/admin/case-studies/:id`

How to check admin authorization (client):

- Primary: call an admin endpoint (e.g. `GET /api/v1/admin/site-config`) and treat `403` as “not admin”.
- Secondary (optional): decode the Firebase ID token and check `admin` claim for faster UI gating (still rely on server enforcement).

### Admin screens (minimum viable)

- **Login**
  - Sign in (Firebase Auth)
  - Show current user + whether admin claim is present

- **Dashboard**
  - Quick links to: Site config, Portfolio, Blog posts, Case studies
  - Show “Last updated” timestamps (from `updatedAt`)

- **Site config editor**
  - Edit nav items (label, href, primary, order)
  - Edit links (GitHub, LinkedIn, repos, etc.)
  - Edit hero + contact copy
  - Save → `PUT /api/v1/admin/site-config`

- **Portfolio editor**
  - Editable lists: jobs, contributions, skills, projects, education, certs, languages, additional info
  - “Add / reorder / delete” items
  - Save → `PUT /api/v1/admin/portfolio`

- **Blog post list**
  - Filters: status (Published / Draft / Scheduled), category, tag search
  - Creates new post (slug)
  - Opens editor for a post
  - Uses `GET /api/v1/admin/blog-posts` with `status=all|draft|scheduled|published`

- **Blog post editor**
  - Fields: title, excerpt, category, tags, readingTime
  - Sections editor: heading + body entries (paragraphs + links)
  - Publishing controls:
    - `published` toggle (draft vs publishable)
    - `publishAt` date-time (supports scheduled publishing)
  - Actions:
    - Save draft
    - Publish now (set `published=true`, `publishAt=now`)
    - Schedule (set `published=true`, `publishAt=future`)

- **Case studies list + editor**
  - Similar to blog, but simpler fields
  - Optional schedule support with `publishAt`

### Preview behavior (scheduled/drafts)

- **Public UI** only shows content where `published=true` AND `publishAt <= now`.
- **Admin preview** needs access to drafts/scheduled content. Recommended options:
  - Option A (recommended): preview **inside the admin editor** by rendering the same “article” component using the draft payload returned by `GET /api/v1/admin/blog-posts/{slug}`.
  - Option B (optional): add a “preview mode” to the public article route, enabled only for logged-in admins, where the UI fetches from an admin endpoint instead of the public one. Keep it opt-in (e.g. `?preview=1`) and always enforce access server-side.

---

## UI integration notes (for implementation phase)

- Replace direct imports of `BLOG_POSTS`, `CASE_STUDIES`, `portfolio.js`, `nav.js`, `links.js` with API reads.
- Keep a small local fallback (optional) for local dev if API is down (feature flag / mock).

