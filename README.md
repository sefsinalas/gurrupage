# GurruBoys (`gurrupage`)

> Official web platform for the **GurruBoys** gaming and dueling community. Built with a Japanese Neo-Brutalist arcade aesthetic, featuring dynamic tier lists, interactive member RPG stats, an annual birthday calendar, and event chronicles.

---

## 🚀 Quickstart

### Prerequisites
- **Node.js**: `v20.0.0` or higher (LTS recommended)
- **npm**: `v10.0.0` or higher

```bash
# 1. Clone repository
git clone https://github.com/sefsinalas/gurrupage.git
cd gurrupage

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🧪 Quality Assurance (QA) & Verification

The project includes an automated quality assurance pipeline. All changes must pass all quality gates before merging into `main`.

```bash
# Run the complete QA gate (typecheck + lint + validate:data + build)
npm run qa
```

### Granular QA Commands:
- **`npm run typecheck`**: Validates strict TypeScript types across the entire project (`tsc --noEmit`).
- **`npm run lint`**: Audits code conventions with ESLint 9 and Next.js Core Web Vitals rules.
- **`npm run validate:data`**: Audits data integrity in `members.ts` and `content.ts`, verifying image assets on disk and birthday date formats.
- **`npm run build`**: Runs Next.js 16 Turbopack production compilation and static prerendering.

---

## 📚 Comprehensive Documentation

The repository maintains an extensive documentation hub in the [`docs/`](./docs/README.md) directory:

- 🏛️ [**Architecture & System Design**](./docs/architecture.md): Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, and design tokens.
- ⚙️ [**Setup & Installation Guide**](./docs/setup-and-installation.md): Environment setup, commands, Netlify hosting, and troubleshooting.
- 🛡️ [**QA Test Strategy**](./docs/qa/test-strategy.md): The 5-layer testing pyramid, CI/CD pipeline, and regression prevention.
- 📋 [**QA Checklist & Test Cases**](./docs/qa/qa-checklist-and-test-cases.md): 12 functional test cases, responsive viewport matrix, and bug triage.
- 🗄️ [**Data Integrity & Schemas**](./docs/qa/data-integrity.md): Strict schemas, Spanish birthday parsing specifications, and asset standards.
- 🔀 [**Git & PR Workflow**](./docs/workflows/git-and-pr-workflow.md): Branching conventions, Conventional Commits, and PR review standards.
- 🤖 [**AI Agent Playbook**](./docs/workflows/ai-agent-playbook.md): Operational guide, SOPs, and mandatory quality gates for autonomous AI agents.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router, SSG)
- **UI & State**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Type Safety**: [TypeScript 5](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: [Netlify](https://www.netlify.com/) (`@netlify/plugin-nextjs`)
