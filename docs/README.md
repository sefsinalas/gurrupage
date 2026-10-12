# GurruBoys Engineering & QA Documentation Hub

Welcome to the official technical documentation for **GurruBoys** (`gurrupage`). This documentation serves as the single source of truth for software engineers, Quality Assurance (QA) specialists, and **autonomous AI agents** contributing to or operating on this repository.

---

## 📑 Documentation Index

| Document | Focus & Audience | Key Contents |
| :--- | :--- | :--- |
| [**Architecture & System Design**](./architecture.md) | Engineers & AI | Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, data layer, asset pipeline, styling conventions. |
| [**Setup & Installation Guide**](./setup-and-installation.md) | All Developers & CI | Prerequisites, local setup, build commands, Netlify deployment, troubleshooting common environment issues. |
| [**QA Test Strategy**](./qa/test-strategy.md) | QA, Engineers, AI | QA philosophy, testing pyramid, automated quality gates, CI/CD pipeline, performance & a11y standards. |
| [**QA Checklist & Test Cases**](./qa/qa-checklist-and-test-cases.md) | QA Specialists & AI | Comprehensive manual test matrix (TC-01 to TC-12), cross-device/browser testing, bug report template, and severity tiers. |
| [**Data Integrity & Schemas**](./qa/data-integrity.md) | Data Maintainers & AI | Strict schemas for `members.ts` and `content.ts`, birthday string format parsing, image resolution rules, automated validator. |
| [**Git & PR Workflow**](./workflows/git-and-pr-workflow.md) | Contributors & Reviewers | Branching naming conventions, Conventional Commits, PR lifecycle, Netlify preview checks, merge criteria. |
| [**AI Agent Playbook**](./workflows/ai-agent-playbook.md) | Autonomous AI Agents | Protocol for AI models: context gathering, SOPs for modifying data and UI, mandatory pre-flight verification gate, recovery steps. |

---

## ⚡ Quick Technical Overview

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router, React Server Components by default).
- **Runtime & Language**: Node.js 20+ LTS, TypeScript 5 (Strict mode).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS-first configuration (`@import "tailwindcss"`, `@theme inline`).
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) for fluid Neo-Brutalist micro-interactions and modals.
- **Icons**: [Lucide React](https://lucide.dev/).
- **Hosting & CI**: Hosted on [Netlify](https://www.netlify.com/) with `@netlify/plugin-nextjs`, validated via GitHub Actions CI.

---

## 🛠️ Essential QA & Development Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# 1. Typecheck: Verify TypeScript without emitting JS
npm run typecheck

# 2. Lint: Check code style and React / Next.js best practices
npm run lint

# 3. Validate Data: Run strict schema & asset audits on members and content
npm run validate:data

# 4. Build: Run Next.js Turbopack production compilation & static export
npm run build

# 5. ALL-IN-ONE QA Gate: Run typecheck + lint + validate:data + build
npm run qa
```

---

## 🤖 Instructions for AI Agents

If you are an AI assistant (e.g. Antigravity, Claude, Copilot, Cursor):
1. **Always read** [`docs/workflows/ai-agent-playbook.md`](./workflows/ai-agent-playbook.md) before implementing changes.
2. **Never commit without running** `npm run qa`. Every pull request must pass all four quality gates (typecheck, lint, validate:data, and build).
3. **Respect data schemas** defined in [`docs/qa/data-integrity.md`](./qa/data-integrity.md). For example, birthdays must match Spanish month conventions or `'A confirmar'`.
