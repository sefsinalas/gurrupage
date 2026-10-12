# Autonomous AI Agent Operational Playbook

This document serves as the **Standard Operating Procedure (SOP)** and operational manual for autonomous AI coding agents (such as Antigravity, Claude Code, GitHub Copilot Workspace, Cursor, etc.) working on the **GurruBoys** codebase.

---

## 1. Prime Directives for AI Agents

As an AI agent operating in this repository, you must strictly observe the following principles:

1. **Verify Before Declaring Complete**: Never report a task as completed without executing the automated QA gate (`npm run qa`).
2. **Preserve Data Contracts**: The application is data-driven. Any modification to `src/data/members.ts` or `src/data/content.ts` must conform exactly to domain schemas.
3. **Respect Next.js 16 & React 19 Patterns**: This project runs on modern Next.js 16 with Turbopack and React 19. Do not apply outdated patterns from older Next.js versions (e.g., `pages/` router patterns or legacy `getStaticProps`).
4. **Zero Unintended Side Effects**: Keep edits surgical and scoped. Do not reformat unrelated files or remove comments and docstrings.
5. **Enforce Bilingual Context**: All code, documentation, types, and commit messages must be in **English**. User-facing cultural content (member descriptions, quotes, anime badges, and Spanish dates) remains in **Spanish** as designed.

---

## 2. Context Gathering Protocol

Before proposing or executing code changes, follow this discovery sequence:

```text
1. Inspect package.json & tsconfig.json to confirm dependencies and path aliases (@/*).
2. Grep search for the specific symbol, component, or data field you plan to alter.
3. If modifying data: Check public/ for relevant images and check date formats.
4. If modifying components: Verify if 'use client' is required (e.g. Framer Motion, hooks).
```

---

## 3. Standard Operating Procedures (SOPs)

### SOP-AI-01: Updating Member Data (e.g. Birthdays, Tier, Bio)
- **Target File**: `src/data/members.ts`
- **Procedure**:
  1. Locate the member object in `members` array by `name`.
  2. If updating `birthday`:
     - Must match Spanish format: `'<day> de <Month-short>'` (e.g. `'10 de Sep'`) or `'<day> de <Month>'` (e.g. `'5 de Julio'`).
     - If unknown, use `'A confirmar'`.
  3. If updating `tier`:
     - Must be one of: `'S' | 'A' | 'B' | 'C' | 'D'`.
     - Move the member entry under the corresponding tier comment section for code clarity.
  4. If updating `skills`:
     - Each entry must follow `{ name: string, level: number, raw?: string }`.
     - `level` must be between $0$ and $100$.
  5. Run `npm run validate:data` to confirm integrity.

---

### SOP-AI-02: Adding a New Member Profile
- **Target Files**: `src/data/members.ts`, `public/members/`
- **Procedure**:
  1. Add a standardized square portrait photo ($640\times640\text{px}$) to `public/members/<name-slug>.jpg`.
  2. Append the new member object in `src/data/members.ts`:
     ```typescript
     {
       name: 'FirstName',
       nickname: 'Alias',
       birthday: 'DD de Mon',
       description: 'Humorous anime/gamer biography.',
       tier: 'B',
       image: '/members/name-slug.jpg',
       skills: [
         { name: 'Skill 1', level: 80, raw: '4' },
         { name: 'Skill 2', level: 90, raw: '5' }
       ]
     }
     ```
  3. Run `npm run qa`.

---

### SOP-AI-03: Updating Content Stores (Games, Places, Travels)
- **Target File**: `src/data/content.ts`
- **Procedure**:
  1. If adding a trip to `travels`:
     - Define a unique `id` (e.g. `'salta-cup-2026'`).
     - Specify non-empty `title`, `date`, `description`, `attendees`.
     - If images are provided, place files in `public/images/<event-id>/` and reference paths starting with `/`.
  2. If adding places or games: ensure non-empty strings.
  3. Run `npm run validate:data`.

---

### SOP-AI-04: Modifying UI Components & Styling
- **Target Files**: `src/components/*.tsx`, `src/app/globals.css`
- **Procedure**:
  1. Adhere to the Neo-Brutalist design tokens:
     - Borders: `border-2 border-accent-black` or `border-4 border-accent-black`.
     - Hard drop shadows: `shadow-[4px_4px_0px_#000]`.
     - Headers: `anime-text` utility (`uppercase italic font-black`).
     - Tier colors: Use `TIER_COLORS` map or CSS variables (`--tier-s`, `--tier-a`, etc.).
  2. If using Framer Motion or React hooks (`useState`, `useEffect`), ensure `'use client';` is at the very first line of the component file.
  3. Avoid causing hydration mismatch errors (e.g. server-side date rendering vs. client-side date rendering).
  4. Run `npm run build` to confirm Turbopack static prerendering succeeds.

---

## 4. Mandatory Pre-Flight Verification Gate

Before committing or pushing any change, execute the automated QA gate:

```bash
npm run qa
```

This single command automatically validates:
1. **`npm run typecheck`**: `tsc --noEmit` verifies strict TypeScript compilation.
2. **`npm run lint`**: ESLint flags syntax, accessibility, and Next.js issues.
3. **`npm run validate:data`**: Validates schema compliance, birthday formats, and image file presence on disk.
4. **`npm run build`**: Compiles production bundle and checks static page generation.

> [!CAUTION]
> **GATE FAILURE PROTOCOL**: If `npm run qa` reports any error, you are strictly prohibited from pushing to remote or merging a PR. Resolve the underlying cause and re-run until all checks exit with status `0`.

---

## 5. Known Pitfalls & How to Avoid Them

| Pitfall | Cause | AI Prevention Guideline |
| :--- | :--- | :--- |
| **Missing Image File** | Referencing an asset in `members.ts` that was not committed to `public/`. | Run `npm run validate:data` which verifies file existence on disk via `fs.existsSync`. |
| **English Month in Birthday** | Writing `'10 of Sep'` instead of `'10 de Sep'`. | Always format birthdays using Spanish months (`ene`, `feb`, `mar`, `abr`, `may`, `jun`, `jul`, `ago`, `sep`, `oct`, `nov`, `dic`). |
| **Broken Tailwind v4 Config** | Attempting to create a `tailwind.config.js`. | Tailwind v4 uses CSS-first configuration in `src/app/globals.css` with `@theme inline`. Do not add legacy JS config files. |
| **Hydration Mismatch on Dates** | Using `new Date()` directly in static JSX without `'use client'`. | Mark interactive time/calendar components with `'use client'` to ensure client-side hydration consistency. |

---

## 6. Git & PR Protocol for AI Agents

When opening a Pull Request:
1. Branch off `main` with prefix `feat/`, `fix/`, `docs/`, or `chore/`.
2. Commit with Conventional Commits (e.g. `fix: correct Marcos birthday date`).
3. Push to `origin <branch-name>`.
4. Open the PR using GitHub CLI:
   ```bash
   gh pr create --title "<type>: <title>" --body "Detailed summary adhering to PR template"
   ```
5. Verify that CI GitHub Actions workflow completes successfully.
