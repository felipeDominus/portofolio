# CI/CD Architecture

This document describes the end-to-end CI/CD setup: workflows, jobs, Docker, and Nginx.

---

## Overview

| Workflow | File | Triggers | Purpose |
|----------|------|----------|---------|
| **CI/CD** | `.github/workflows/ci-cd.yml` | `push` / `pull_request` to `main` or `master` | Lint, build, Docker image push to GHCR, **Firebase Hosting** (preview on PRs, **live** on main/master) |
| **CodeQL** | `.github/workflows/codeql.yml` | `push` / `pull_request` to `main` or `master` | Security and code quality analysis |

Static hosting is **Firebase Hosting** (see [`firebase.json`](../firebase.json) and [FIREBASE-HOSTING.md](./FIREBASE-HOSTING.md)). There is **no** GitHub Pages deploy job in this repo.

### Architecture diagram (Mermaid)

GitHub renders Mermaid in this file. Below: full pipeline, then Docker build stages.

**Pipeline (workflows + jobs):**

```mermaid
flowchart TB
  subgraph trigger["Trigger"]
    E[push or pull_request to main/master]
  end

  subgraph workflows["Workflows"]
    E --> CI
    E --> CodeQL
  end

  subgraph ci_job["CI job: Lint & Build"]
    CI[ci-cd.yml]
    A1[Checkout]
    A2[Setup Node.js]
    A3[npm ci]
    A4[Lint]
    A5[Build]
    CI --> A1 --> A2 --> A3 --> A4 --> A5
  end

  A5 --> branch{event?}

  branch -->|pull_request| firebase_preview
  branch -->|push to main/master| cd_job
  branch -->|push to main/master| firebase_hosting

  subgraph cd_job["CD job: Docker Build & Push"]
    B1[Checkout]
    B2[Docker Buildx]
    B3[Log in GHCR]
    B4[Metadata / tags]
    B5[Build & push image]
    B1 --> B2 --> B3 --> B4 --> B5
    B5 --> GHCR[ghcr.io/owner/repo]
  end

  subgraph firebase_preview["Firebase Hosting — Preview"]
    F1[Checkout]
    F2[Setup Node]
    F3[npm ci]
    F4[Build with VITE_BASE=/]
    F5[Deploy preview channel]
    F1 --> F2 --> F3 --> F4 --> F5
    F5 --> PreviewURL[PR preview URL]
  end

  subgraph firebase_hosting["Firebase Hosting — Production"]
    H1[Checkout]
    H2[Setup Node]
    H3[npm ci]
    H4[Build with VITE_BASE=/]
    H5[Deploy live channel]
    H1 --> H2 --> H3 --> H4 --> H5
    H5 --> Live[Firebase live site]
  end

  subgraph codeql_job["CodeQL workflow: Analyze"]
    CodeQL[codeql.yml]
    D1[Checkout]
    D2[Initialize CodeQL]
    D3[Perform CodeQL Analysis]
    CodeQL --> D1 --> D2 --> D3
    D3 --> Security[Security tab / PR checks]
  end
```

**Docker image build (multi-stage):**

```mermaid
flowchart LR
  subgraph builder["Stage: builder (node:22-alpine)"]
    P[package.json]
    N[npm ci]
    S[Copy source]
    V[npm run build]
    P --> N --> S --> V
    V --> dist["dist/"]
  end

  subgraph runner["Stage: runner (nginx:alpine)"]
    NGX[nginx.conf]
    HTML["/usr/share/nginx/html"]
    dist --> HTML
    NGX --> HTML
    HTML --> Serve[Serve on :80]
  end

  builder --> runner
```

**Pipeline flow (CI/CD workflow):**

```
                    push or pull_request
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  CI job (Lint & Build)                                                   │
│  1. Checkout repo                                                        │
│  2. Setup Node.js 22                                                     │
│  3. Install dependencies (npm ci)                                        │
│  4. Lint (npm run lint)                                                  │
│  5. Build (npm run build)                                                │
└─────────────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │ pull_request       │ push main/master   │
         ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────────┐
│ Firebase Preview │  │ Docker push GHCR │  │ Firebase Hosting (live)      │
│ PR channel       │  │ multi-stage img  │  │ live channel                 │
└──────────────────┘  └──────────────────┘  └──────────────────────────────┘
```

**CodeQL workflow** runs in parallel with CI (separate workflow):

```
push or pull_request
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Analyze job (CodeQL)                                                    │
│  1. Checkout repository                                                 │
│  2. Initialize CodeQL (javascript-typescript)                            │
│  3. Perform CodeQL Analysis                                              │
│     → results in Security tab / PR checks                                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## CI/CD Workflow (`.github/workflows/ci-cd.yml`)

### Triggers

- **Push** to `main` or `master`
- **Pull request** targeting `main` or `master`

### Job 1: `ci` — Lint & Build

Runs on every push and every PR. Must pass before CD or Firebase deploy jobs run.

| Step | Action | Purpose |
|------|--------|---------|
| **Checkout** | `actions/checkout@v5` | Clone the repository into the runner. |
| **Setup Node.js** | `actions/setup-node@v5` | Install Node.js **22** and enable `npm` cache. |
| **Install dependencies** | `npm ci` | Install exact versions from `package-lock.json` (reproducible). |
| **Lint** | `npm run lint` | Run ESLint; fails the job on errors. |
| **Build** | `npm run build` | Run Vite build with default `base` (typically `/` in CI unless env overrides). |

### Job 2: `cd` — Docker Build & Push

Runs only on **push** to `main` or `master` (not on PRs). Depends on `ci` passing.

| Step | Action | Purpose |
|------|--------|---------|
| **Checkout** | `actions/checkout@v5` | Fresh clone for the Docker build context. |
| **Set up Docker Buildx** | `docker/setup-buildx-action@v3` | Enable Buildx for multi-stage and caching. |
| **Log in to Container Registry** | `docker/login-action@v3` | Authenticate to GitHub Container Registry (`ghcr.io`) with `GITHUB_TOKEN`. |
| **Extract metadata for Docker** | `docker/metadata-action@v5` | Generate image tags and labels (branch, SHA, `latest` on main/master). |
| **Build and push Docker image** | `docker/build-push-action@v6` | Build the Dockerfile and push to `ghcr.io/<owner>/<repo>`. Uses GHA cache. |

**Output:** Image available as e.g. `ghcr.io/<owner>/<repo>:latest`, branch tag, SHA tag.

### Job 3: `firebase_preview` — Firebase Hosting (preview)

Runs only on **pull requests**. Depends on `ci` passing. Uses `FirebaseExtended/action-hosting-deploy@v0`.

| Step | Action | Purpose |
|------|--------|---------|
| **Checkout** | `actions/checkout@v5` | Clone the repo. |
| **Setup Node.js** | `actions/setup-node@v5` | Node 22 + npm cache. |
| **Install dependencies** | `npm ci` | Same as CI. |
| **Build** | `npm run build` with `NODE_ENV=production` and **`VITE_BASE=/`** | Root base path for Firebase preview URLs. |
| **Deploy** | Firebase Hosting deploy action | Deploy to channel `pr-<number>`, expires in 7 days; comments preview URL on the PR (`pull-requests: write`). |

**Secrets:** `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID` (see [FIREBASE-HOSTING.md](./FIREBASE-HOSTING.md)).

### Job 4: `firebase_hosting` — Firebase Hosting (production)

Runs only on **push** to `main` or `master`. Depends on `ci` passing.

| Step | Action | Purpose |
|------|--------|---------|
| **Checkout** | `actions/checkout@v5` | Clone the repo. |
| **Setup Node.js** | `actions/setup-node@v5` | Node 22 + npm cache. |
| **Install dependencies** | `npm ci` | Same as CI. |
| **Build** | `npm run build` with `NODE_ENV=production` and **`VITE_BASE=/`** | Production bundle for Firebase. |
| **Deploy** | Firebase Hosting deploy action | Deploy to **`live`** channel. |

**Output:** Site served on your Firebase Hosting domain (e.g. `*.web.app` or custom domain).

---

## CodeQL Workflow (`.github/workflows/codeql.yml`)

Runs on every push and every PR, independent of the CI/CD workflow. Used for security and quality checks.

| Step | Action | Purpose |
|------|--------|---------|
| **Checkout repository** | `actions/checkout@v5` | Clone the repo so CodeQL can analyze the code. |
| **Initialize CodeQL** | `github/codeql-action/init@v4` | Set up CodeQL and the database for `javascript-typescript`. |
| **Perform CodeQL Analysis** | `github/codeql-action/analyze@v4` | Run queries, upload results to the Security tab and PR checks. |

**Output:** Code Scanning results in the repo’s **Security** tab and as status checks on the PR.

---

## Docker Build

### Multi-stage Dockerfile

| Stage | Base image | Purpose |
|-------|------------|---------|
| **builder** | `node:22-alpine` | Install deps and run `npm run build` to produce `dist/`. |
| **runner** | `nginx:alpine` | Serve the built static files with Nginx. |

**Flow:**

1. **Build stage:** Copy `package*.json` → `npm ci` → copy source → `npm run build` → `dist/` is created.
2. **Production stage:** Copy `nginx.conf` and `dist/` from builder → Nginx serves them on port 80.

### Nginx Configuration (`nginx.conf`)

- **Listen:** Port 80.
- **Root:** `/usr/share/nginx/html` (where `dist/` is copied in the image).
- **SPA routing:** `try_files $uri $uri/ /index.html` so client-side routes work on refresh and direct links.
- **Static assets:** JS, CSS, images, fonts get long-lived cache (`expires 1y`, `Cache-Control: public, immutable`).

### Why Nginx Alpine (and not Apache httpd)?

We use **`nginx:alpine`** in the final Docker stage to serve the static SPA. Here’s how it compares to **Apache httpd** for this use case, and why Nginx Alpine is the better fit.

| Aspect | nginx:alpine | httpd (Apache) |
|--------|----------------|----------------|
| **Image size** | ~40 MB (Alpine base, minimal Nginx) | ~145 MB (Debian-based) or ~55 MB (Alpine-based `httpd:alpine`) — still larger than nginx:alpine. |
| **Static file performance** | Event-driven, very efficient for many small static files and concurrent connections. | Process/thread per request; fine for static but typically uses more memory under concurrency. |
| **Config for SPA** | One directive: `try_files $uri $uri/ /index.html`. | Needs `FallbackResource` or `RewriteRule`; slightly more verbose. |
| **Memory footprint** | Low; single process, worker model. | Higher; MPM (e.g. worker/prefork) uses more RAM per connection. |
| **Ecosystem** | Default choice in most “static site in Docker” examples and docs; easy to find snippets. | Common for dynamic apps (PHP, etc.); less often used as the only static server in a container. |
| **Alpine variant** | Official `nginx:alpine` is mature and widely used. | `httpd:alpine` exists but is less common than nginx:alpine. |

**Conclusion:** For a **static SPA in a container** (no server-side rendering, no PHP/Perl), **nginx:alpine is the better choice**: smaller image, lower memory use, simple SPA config, and a standard in the Docker/static-serving world. Apache httpd is a good fit when you need its features (e.g. `.htaccess`, mod_rewrite-heavy setups, or integration with other Apache modules); for “serve `dist/` with SPA fallback,” Nginx Alpine is simpler and more efficient.

### Build Context (`.dockerignore`)

Excluded from the Docker build context to keep the image small and avoid invalidating cache with irrelevant files:

- `node_modules`, `dist`, `.git`, `.github`, `*.md`, `.gitignore`, `.env*`, `.DS_Store`, `*.log`, `.vscode`, `.idea`.

---

## End-to-End Flow

1. **Developer pushes or opens a PR** to `main`/`master`.
2. **Local pre-commit hook (Husky)** runs on every `git commit`: `npm run lint`. This prevents committing code that fails ESLint before it even reaches CI.  
3. **CI job** runs: checkout → setup Node 22 → `npm ci` → lint → build.  
   **CodeQL** runs in parallel: checkout → init CodeQL → analyze.
4. On **pull request:** **Firebase preview** job runs after CI: build with `VITE_BASE=/` → deploy to a **preview channel** and post the URL on the PR.
5. On **push to main/master:**  
   - **CD job** builds the Docker image and pushes to `ghcr.io/<owner>/<repo>`.  
   - **Firebase production** job deploys the **live** channel.
6. **Results:**  
   - **Firebase Hosting:** Preview URLs on PRs; production site on push.  
   - **Container:** Image `ghcr.io/<owner>/<repo>:latest` (and branch/SHA tags) for `docker pull` / Kubernetes / Cloud Run.

---

## Component Summary

| Component | Role |
|-----------|------|
| **Checkout** | Provides the repository source for every job. |
| **Setup Node.js** | Ensures Node 22 and npm cache for install/build. |
| **npm ci / lint / build** | Reproducible install, quality check, and production bundle. Locally, Husky runs `npm run lint` on every commit via the `pre-commit` hook. |
| **Docker Buildx** | Builds the multi-stage image with caching. |
| **GHCR login + metadata** | Authenticates and defines image tags/labels. |
| **Build and push** | Produces and publishes the container image. |
| **Firebase Hosting deploy** | Publishes `dist/` to preview (PR) or **live** (main/master) channels. |
| **Initialize CodeQL** | Prepares the CodeQL database for the chosen language. |
| **Perform CodeQL Analysis** | Runs security/quality queries and reports results. |
| **Nginx** | Serves the static `dist/` in the Docker image and handles SPA routing and caching. |
