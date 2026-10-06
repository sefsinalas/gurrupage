# Setup & Installation Guide

This document outlines the environment requirements, installation steps, local execution workflows, production build procedures, and troubleshooting guidelines for the **GurruBoys** web application.

---

## 1. Prerequisites & System Requirements

Before running the project, verify that your development environment meets the following specifications:

| Requirement | Minimum Version | Recommended Version | Verification Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v20.0.0` (LTS) | `v20.x` or `v22.x`+ | `node -v` |
| **npm** | `10.0.0` | Latest bundled with Node | `npm -v` |
| **Git** | `2.30.0` | Latest | `git --version` |
| **OS** | macOS, Linux, or Windows (WSL2 recommended for Windows) | macOS / Linux | `uname -a` |

> [!IMPORTANT]
> The project relies on Next.js 16 and React 19. Ensure you are using Node.js 20 or newer. Node versions below 18 will fail during Turbopack compilation.

---

## 2. Installation Steps

### Step 1: Clone the Repository
```bash
git clone https://github.com/sefsinalas/gurrupage.git
cd gurrupage
```

### Step 2: Install Dependencies
Use `npm ci` for deterministic, clean installs in CI or fresh environments, or `npm install` for active local development:
```bash
npm install
```

This installs all core dependencies including:
- **Next.js 16** (`next@16.2.7`)
- **React 19** (`react@19.2.4`, `react-dom@19.2.4`)
- **Tailwind CSS 4** (`tailwindcss@^4`, `@tailwindcss/postcss@^4`)
- **Framer Motion 12** (`framer-motion@^12.40.0`)
- **Lucide Icons** (`lucide-react@^1.17.0`)
- **TypeScript 5** (`typescript@^5`)
- **TSX Runtime** (`tsx` for executing TypeScript validation scripts)

---

## 3. Running Locally (Development Mode)

Start the Next.js development server with Turbopack:
```bash
npm run dev
```

- Local URL: **`http://localhost:3000`**
- Network URL: Displayed in the terminal if accessible on your local network.
- Hot Module Replacement (HMR): Automatically active. Any edits made to files in `src/` will refresh instantly.

---

## 4. Production Build & Static Prerendering

To simulate the exact build that runs on Netlify:

```bash
# 1. Compile production bundle and generate static pages
npm run build

# 2. Run the production server locally
npm run start
```

### Expected Output from `npm run build`:
```text
▲ Next.js 16.2.7 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully
  Running TypeScript ...
  Collecting page data ...
✓ Generating static pages (6/6)
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /apple-icon.png
└ ○ /icon.png
```

---

## 5. Quality Assurance (QA) Commands Reference

The repository provides granular commands to test and audit different aspects of the codebase:

| Command | Purpose | When to Run |
| :--- | :--- | :--- |
| `npm run typecheck` | Validates TypeScript types across the entire codebase (`tsc --noEmit`). | Before writing code and after changing data types. |
| `npm run lint` | Runs ESLint 9 using `eslint-config-next/core-web-vitals`. | Before staging git commits. |
| `npm run validate:data` | Runs `scripts/validate-data.ts` to audit member images, birthday dates, and content schema integrity. | Whenever editing `src/data/members.ts` or `src/data/content.ts`. |
| `npm run build` | Verifies Next.js Turbopack compilation and static generation. | Mandatory before opening any Pull Request. |
| **`npm run qa`** | **Executes all four checks sequentially**: `typecheck` ➔ `lint` ➔ `validate:data` ➔ `build`. | **Mandatory gate for humans and AI agents.** |

---

## 6. Hosting & Deployment Architecture (Netlify)

The project is configured for continuous deployment on **Netlify** via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- Every pull request automatically triggers a **Netlify Deploy Preview** for visual verification.
- Merges into the `main` branch trigger immediate deployment to the production environment.

---

## 7. Troubleshooting Common Issues

### Issue 1: Port 3000 is already in use
**Symptom**: `Error: listen EADDRINUSE: address already in use :::3000`
**Solution**: Next.js will automatically attempt port 3001, but you can explicitly specify a custom port:
```bash
npm run dev -- -p 3005
```

### Issue 2: Stale or corrupted Turbopack / Next.js cache
**Symptom**: Unexplained rendering anomalies, ghost errors after renaming files or assets.
**Solution**: Remove the `.next` build folder and re-run:
```bash
rm -rf .next
npm run dev
```

### Issue 3: Missing image in `validate:data`
**Symptom**: `[Members] Index #12: Image asset not found on disk: ".../public/members/photo.jpg"`
**Solution**:
1. Check that the image was committed inside `public/members/`.
2. Check that the path in `src/data/members.ts` matches exactly (case-sensitive on Linux/CI, e.g. `.jpg` vs `.JPG`).
3. If using an external avatar URL, ensure it starts with `http://` or `https://`.

### Issue 4: Birthday parsing failure
**Symptom**: `Birthday "15-09" could not be parsed. Expected format like "10 de Sep".`
**Solution**: The calendar parser requires Spanish month abbreviations or full names (e.g., `'15 de Sep'` or `'15 de Septiembre'`). Refer to [`docs/qa/data-integrity.md`](./qa/data-integrity.md) for valid formats.
