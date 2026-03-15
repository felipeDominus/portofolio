# Portfolio

A React portfolio application built with Vite. Includes full CI/CD via GitHub Actions and Docker.

## Tech Stack

- **React** + **Vite**
- **npm** for package management
- **Docker** for containerized deployment
- **GitHub Actions** for CI/CD

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

## Docker

Build the image:

```bash
docker build -t portofolio .
docker run -p 80:80 portofolio
```

Then open http://localhost

## CI/CD Pipeline

The `.github/workflows/ci-cd.yml` workflow:

1. **CI (on every push/PR)**
   - Checkout code
   - Install deps (`npm ci`)
   - Lint (`npm run lint`)
   - Build (`npm run build`)

2. **CD (on push to `main`/`master`)**
   - Build Docker image
   - Push to GitHub Container Registry (`ghcr.io`)

### GitHub Setup

1. Create a repository and push this project
2. Default branch: `main` or `master`
3. On push to main, the workflow builds and pushes:
   - `ghcr.io/<owner>/<repo>:latest`
   - `ghcr.io/<owner>/<repo>:main`
   - `ghcr.io/<owner>/<repo>:<sha>`

### Run the Image

```bash
docker run -p 80:80 ghcr.io/<owner>/portofolio:latest
```
