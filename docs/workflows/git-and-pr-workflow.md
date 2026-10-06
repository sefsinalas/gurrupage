# Git & Pull Request (PR) Workflow

This document outlines the version control strategy, branching conventions, commit standards, and Pull Request procedures for the **GurruBoys** repository.

---

## 1. Branching Strategy

The repository follows a clean, trunk-based feature branching model:

```text
main (Protected production branch)
 │
 ├──► feat/birthday-calendar-feature
 ├──► fix/marcos-birthday-date
 ├──► docs/comprehensive-qa-documentation
 └──► chore/upgrade-dependencies
```

### Branch Naming Conventions:
| Branch Type | Format Pattern | Example |
| :--- | :--- | :--- |
| **New Feature** | `feat/<short-description>` | `feat/member-filter` |
| **Bug Fix** | `fix/<short-description>` | `fix/calendar-leap-year` |
| **Documentation** | `docs/<short-description>` | `docs/qa-and-ai-workflows` |
| **Maintenance / Tooling** | `chore/<short-description>` | `chore/update-packages` |

---

## 2. Commit Message Conventions (Conventional Commits)

All commits should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional scope>): <description in imperative mood>

[optional body]

[optional footer(s)]
```

### Allowed Types:
- **`feat`**: A new feature for the user or application.
- **`fix`**: A bug fix.
- **`docs`**: Documentation updates or additions only.
- **`style`**: Formatting, missing semicolons, whitespace (no code logic changes).
- **`refactor`**: Code change that neither fixes a bug nor adds a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`chore`**: Updating build tasks, package manager configs, etc.

### Examples:
- `feat: add Fede photo and update members data`
- `fix: correct Marcos birthday to 10 de Sep`
- `docs: add comprehensive QA and AI operational playbook`
- `chore: add automated data validation script`

---

## 3. Pull Request (PR) Lifecycle

### Step 1: Synchronize with Main
Before starting work, ensure your local `main` branch is up to date:
```bash
git checkout main
git pull origin main
```

### Step 2: Create a Feature Branch
```bash
git checkout -b <branch-type>/<branch-name>
```

### Step 3: Implement Changes & Run Pre-Flight QA
Before committing, run the complete local QA gate:
```bash
npm run qa
```
> [!CAUTION]
> Do not commit if `npm run qa` fails. Fix all TypeScript, ESLint, or validation errors locally first.

### Step 4: Stage & Commit
```bash
git add <files>
git commit -m "<type>: <concise description of changes>"
```

### Step 5: Push Branch to Remote
```bash
git push -u origin <branch-type>/<branch-name>
```

### Step 6: Create the Pull Request
You can open a PR directly from the command line using the GitHub CLI (`gh`):
```bash
gh pr create --title "feat: descriptive title" --body "Detailed summary of changes"
```
Or open the PR via the GitHub web interface. The repository will automatically populate the description with the structured template from `.github/PULL_REQUEST_TEMPLATE.md`.

---

## 4. PR Review & Merge Criteria

Before any pull request can be merged into `main`, it must satisfy:

1. **Automated CI Passing**: The `qa.yml` GitHub Actions workflow must complete with a green checkmark (`typecheck`, `lint`, `validate:data`, and `build`).
2. **Netlify Preview Verified**: Review the generated Netlify preview URL to confirm that visual styling, layouts, and animations render properly.
3. **No Unresolved Discussions**: All reviewer comments or QA questions must be addressed.
4. **Merge Method**: Use **Squash and merge** to maintain a clean, linear git history on `main`.
