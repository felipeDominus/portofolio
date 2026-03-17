# Portfolio

A React portfolio application built with Vite. Includes full CI/CD via GitHub Actions, Docker, and GitHub Pages.

## Tech Stack

- **React** + **Vite**
- **npm** for package management
- **Docker** (multi-stage: Node build → Nginx serve) for containerized deployment
- **GitHub Actions** for CI/CD, CodeQL, and GitHub Pages

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Command   | Description                    |
| --------- | ------------------------------ |
| `npm run dev`    | Start dev server (Vite)       |
| `npm run build`  | Production build              |
| `npm run lint`   | Run ESLint                    |
| `npm run preview`| Preview production build      |
| `npm test`       | Placeholder test command (always exits 0) |

On `npm install`, the `prepare` script runs **Husky**, which installs Git hooks from the `.husky/` directory. The `pre-commit` hook is configured to run:

```bash
npm run lint
```

This means every `git commit` will first run ESLint and abort if there are any lint errors.

## Docker

Build and run the image locally:

```bash
docker build -t portofolio .
docker run -p 80:80 portofolio
```

Then open http://localhost. The image uses **Nginx** to serve the built `dist/` with SPA routing (`try_files $uri $uri/ /index.html`) and long-lived caching for static assets.

## CI/CD Architecture

The pipeline has two workflows:

| Workflow | Purpose |
|----------|---------|
| **CI/CD** (`.github/workflows/ci-cd.yml`) | Lint & build on every push/PR; on push to `main`/`master`: build and push Docker image to GHCR, deploy static site to GitHub Pages. |
| **CodeQL** (`.github/workflows/codeql.yml`) | Security and code quality analysis (JavaScript/TypeScript) on every push/PR. |

**CI job:** Checkout → Setup Node.js → Install dependencies (`npm ci`) → Lint → Build.  
**CD job (push to main only):** Checkout → Docker Buildx → Log in to GHCR → Extract metadata (tags) → Build and push image to `ghcr.io/<owner>/<repo>`.  
**Pages job (push to main only):** Checkout → Setup Node.js → Install dependencies → Build (with repo base path) → Setup Pages → Upload `dist/` artifact → Deploy to GitHub Pages.  
**CodeQL job:** Checkout → Initialize CodeQL → Perform CodeQL Analysis (results in Security tab and PR checks).

**Full documentation:** [docs/CI-CD-ARCHITECTURE.md](docs/CI-CD-ARCHITECTURE.md) — all jobs, steps, Docker stages, Nginx config, and end-to-end flow.

### GitHub Setup

1. Create a repository and push this project.
2. Default branch: `main` or `master`.
3. **Settings → Pages:** Source = GitHub Actions (so the `pages` job can deploy).
4. On push to main, the workflow produces:
   - **GitHub Pages:** `https://<owner>.github.io/<repo>/`
   - **Container image:** `ghcr.io/<owner>/<repo>:latest`, `:main`, `:<sha>`

### Run the Image

```bash
docker run -p 80:80 ghcr.io/<owner>/<repo>:latest
```
