<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Agent Operational Rules & QA Guardrails

All autonomous AI agents (Antigravity, Claude Code, GitHub Copilot, Cursor, etc.) working on this repository must strictly adhere to the operational playbooks and verification standards established in the [`docs/`](./docs/README.md) directory.

## 📖 Mandatory Agent Reading
1. [**AI Agent Playbook**](./docs/workflows/ai-agent-playbook.md): Detailed SOPs for updating data, modifying components, and error recovery.
2. [**Data Integrity & Schemas**](./docs/qa/data-integrity.md): Strict requirements for member birthdays (Spanish month keywords or `'A confirmar'`), image asset dimensions ($640\times640\text{px}$ in `public/members/`), and RPG skill power levels.
3. [**QA Test Strategy**](./docs/qa/test-strategy.md): The 5-layer quality pyramid and zero-regression policy.

## 🛡️ Mandatory Pre-Flight Verification Gate
Before declaring any task complete or committing code:

```bash
npm run qa
```

This single command executes:
1. `npm run typecheck` (`tsc --noEmit` - zero TypeScript errors allowed)
2. `npm run lint` (ESLint 9 - zero linting errors allowed)
3. `npm run validate:data` (`tsx scripts/validate-data.ts` - audits all images and schemas)
4. `npm run build` (`next build` - verifies production static export)

**Never bypass or ignore failures in `npm run qa`.**
