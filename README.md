# Portfolio

A React portfolio application built with **Vite**. Includes CI/CD via GitHub Actions (lint/build, Docker image to GHCR), and optional local Docker runs. **Firebase Hosting** deploy jobs are already defined in the workflow but **disabled** (`if: false && …`) until you add secrets and flip the condition—see [docs/FIREBASE-HOSTING.md](docs/FIREBASE-HOSTING.md).

## Tech Stack

- **React 19** + **Vite 8**
- **Node.js 22** (local dev and CI — see `.github/workflows/ci-cd.yml`)
- **npm** for package management
- **Docker** (multi-stage: Node build → Nginx serve) for containerized deployment
- **GitHub Actions** — CI/CD, CodeQL, and (when enabled) Firebase Hosting deploys

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| ------- | ------------- |
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm test` | Placeholder (exits 0; no tests configured yet) |
| `npm run docker:build` | Build Docker image tagged `portofolio` |
| `npm run docker:run` | Run container with **host port 8080** → container 80 |

On `npm install`, the `prepare` script runs **Husky**, which installs Git hooks from the `.husky/` directory. The `pre-commit` hook runs:

```bash
npm run lint
```

So each `git commit` runs ESLint first and aborts on lint errors.

## Docker

From the repo root:

```bash
npm run docker:build
npm run docker:run
```

Then open **http://localhost:8080** (maps host `8080` → container `80`).

Alternatively:

```bash
docker build -t portofolio .
docker run -p 80:80 portofolio
```

Then open **http://localhost** (requires binding to port 80 on the host).

The image uses **Nginx** to serve `dist/` with SPA routing (`try_files $uri $uri/ /index.html`) and long-lived caching for hashed static assets.

## Firebase Hosting (ready to enable)

`firebase.json` configures a **Vite SPA** on Firebase (serve `dist/` + rewrite routes to `index.html`). Matching **GitHub Actions** jobs (`firebase_preview`, `firebase_hosting`) live in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) but are **turned off** until you remove the `false &&` in each job’s `if:` and add the Firebase secrets.

- **Docs:** [docs/FIREBASE-HOSTING.md](docs/FIREBASE-HOSTING.md)

## CI/CD Architecture

Two workflows:

| Workflow | Purpose |
| -------- | ------- |
| **CI/CD** ([`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)) | **Lint & build** on every push/PR. On **push** to `main`/`master`: push Docker image to **GHCR**. **Firebase** preview/prod jobs are in the file but **disabled** until you enable them. |
| **CodeQL** ([`.github/workflows/codeql.yml`](.github/workflows/codeql.yml)) | Security / code quality (JavaScript/TypeScript) on push/PR. |

**CI job:** Checkout → Setup Node.js 22 → `npm ci` → Lint → Build.

**CD job** (push to `main`/`master` only): Checkout → Docker Buildx → GHCR login → metadata tags → build and push `ghcr.io/<owner>/<repo>`.

**CodeQL:** Checkout → Initialize CodeQL → Analyze (results in **Security** tab and PR checks).

**Full documentation:** [docs/CI-CD-ARCHITECTURE.md](docs/CI-CD-ARCHITECTURE.md) — jobs, Docker stages, Nginx, and end-to-end flow.

### GitHub setup

1. Create a repository and push this project.
2. Default branch: `main` or `master`.
3. On push to `main`/`master`, the workflow publishes a **container image** — `ghcr.io/<owner>/<repo>:latest` and other tags from metadata (no Firebase secrets required until you enable Firebase jobs).

When you are ready for **Firebase Hosting** from Actions, add secrets per [docs/FIREBASE-HOSTING.md](docs/FIREBASE-HOSTING.md) and change each Firebase job’s `if:` in `ci-cd.yml` from `false && …` to the condition shown in the comment (drop `false &&`).

### Run the published image

```bash
docker run -p 8080:80 ghcr.io/<owner>/<repo>:latest
```

Open **http://localhost:8080** (adjust host port as needed).
