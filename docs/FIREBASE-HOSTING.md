# Firebase Hosting (SPA)

This project ships with Firebase Hosting configuration in `firebase.json`:

- Serves the Vite build output from `dist/`
- SPA routing via rewrite: `** → /index.html`
- Long-lived caching headers for hashed static assets

## Prereqs

- A Firebase project (existing or new)
- Firebase CLI available via `npx` (no global install required)

## One-time setup

1. **Set your Firebase project id**

Update `.firebaserc`:

- Replace the value under `projects.default` with your actual Firebase project id (example: `my-prod-project`)

2. **Login + initialize hosting (first time only)**

From the repo root:

```bash
npx firebase-tools login
```

If this is a brand new Firebase project, enable **Hosting** in the Firebase console, then:

```bash
npx firebase-tools init hosting
```

When prompted:

- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **GitHub deploys**: optional (we use GitHub Actions later)

If you already initialized hosting in another repo, you can skip this and just keep `firebase.json` + `.firebaserc`.

## Local preview

Build with a root base-path (recommended for custom domain + Firebase Hosting):

```bash
VITE_BASE=/ npm run build
```

Preview with the Firebase emulator:

```bash
npx firebase-tools emulators:start --only hosting
```

## Deploy

```bash
VITE_BASE=/ npm run build
npx firebase-tools deploy --only hosting
```

## GitHub Actions deploy (recommended)

This repo’s CI/CD workflow deploys to Firebase Hosting automatically:

- **Preview deploys**: on every PR (preview channel, PR comment includes URL)
- **Production deploys**: on push to `main`/`master` (deploys to the `live` channel)

### Required GitHub secrets

Create these repository secrets:

- `FIREBASE_PROJECT_ID`: your Firebase project id
- `FIREBASE_SERVICE_ACCOUNT`: a Firebase service account JSON with Hosting deploy permissions

### Service account notes

Create a service account in Google Cloud/Firebase for your project, grant the minimum required roles for Hosting deploys, then add its JSON key as `FIREBASE_SERVICE_ACCOUNT`.

If you prefer avoiding long-lived JSON keys, migrate this workflow to Workload Identity Federation (more setup).

## Custom domain + TLS (managed)

Firebase Hosting provisions TLS certificates automatically once your DNS is configured.

1. Firebase Console → **Hosting**
2. Click **Add custom domain**
3. Enter your domain (e.g. `www.example.com`)
4. Follow the DNS instructions (TXT verification + A/AAAA or CNAME records)
5. Wait for verification and certificate provisioning

Notes:

- If you want apex → www redirects, configure that in the Hosting UI (or use separate sites).
- Certificate issuance can take minutes to hours depending on DNS propagation.

## Cutover / rollback

### Cutover checklist (GitHub Pages → Firebase Hosting)

1. Ensure the **production** workflow deploys successfully (push to `main`/`master`).
2. Verify the Firebase-provided domain works (`https://<site>.web.app`) and deep links reload correctly.
3. Add the custom domain (`www`) in Firebase Hosting and apply DNS (details below).
4. Wait for Firebase to show **Connected** and for TLS to be provisioned.
5. Disable GitHub Pages in repo settings (so it’s no longer the “source of truth”).

### Disable GitHub Pages (after Firebase is serving prod)

Once `www` is serving correctly from Firebase (including deep-link refresh), disable Pages:

1. GitHub repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch** and select **None** (or disable Pages if the UI offers a direct toggle).
3. (Optional) Remove any custom domain configured in Pages if it previously claimed `www`.

### Custom domain (`www`) steps (Firebase Console + DNS)

1. Firebase Console → your project → **Hosting**.
2. Click **Add custom domain**.
3. Enter your domain: `www.<yourdomain.tld>`.
4. Follow Firebase’s DNS prompts:
   - **TXT** record for domain ownership verification (one-time).
   - **CNAME** (typical for `www`) pointing `www` to the Firebase target shown in the UI.
     - If Firebase instead instructs **A/AAAA** records, use those values (providers differ).
5. Wait for the UI to show:
   - **Domain verified**
   - **SSL certificate** provisioned (can take minutes to hours depending on DNS propagation).

Optional:

- If you want **apex** (`example.com`) to redirect to `www`, add the apex domain separately in Hosting and set up the redirect in the Hosting UI.

### Rollback (fast)

If you need to roll back quickly:

1. Re-point DNS from Firebase back to the previous target (or remove the Firebase records for `www`).
2. Re-enable GitHub Pages (Settings → Pages) and restore a Pages deploy job/workflow from git history if needed.

