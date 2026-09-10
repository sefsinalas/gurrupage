# QA Checklist, Test Cases & Verification Matrix

This document provides a comprehensive test case catalog, responsive verification matrix, non-functional checklists, and defect reporting guidelines for testing the **GurruBoys** web application.

---

## 1. Functional Test Case Catalog

| Test Case ID | Feature / Component | Preconditions | Action / Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Navbar** | Page loaded at root (`/`) | 1. Observe top navbar.<br>2. Scroll down page past Hero. | Navbar remains fixed at top with semi-transparent frosted background (`backdrop-blur-md`), 4px border, and text "GURRUBOYS" with red accent. | P1 |
| **TC-02** | **Hero Section** | Page loaded at root (`/`) | 1. View banner, badge, and description.<br>2. Hover over buttons. | Hero renders styled badges ("ARG_2026", "SALTA_CAP"), retro anime typography, and smoothly scrolls to `#members` when action clicked. | P2 |
| **TC-03** | **Games Catalog** | Page loaded | 1. Scroll to "Juegos & Duelos" section.<br>2. Inspect all game badges. | All 10 games from `src/data/content.ts` render with consistent borders and tags. Badges wrap cleanly on mobile screens without overflow. | P2 |
| **TC-04** | **Tier List Grid** | Page loaded | 1. Scroll to `#members`.<br>2. Observe tiers S, A, B, C, D.<br>3. Hover on member avatar. | Each tier row renders with its distinct color and label. Member circles hover-scale by 1.1x with gold glow and show member photos without distortion. | P0 |
| **TC-05** | **Member Profile Modal** | Tier List visible | 1. Click any member thumbnail in the Tier List.<br>2. Review profile card & RPG tree.<br>3. Click `X` button or press `ESC`. | Modal opens with spring animation. Shows avatar, Rank badge, name, nickname, birthday, bio quote, calculated PWR, and skill bars. Modal closes cleanly without visual artifacts. | P0 |
| **TC-06** | **Calendar Grid Layout** | Page loaded | 1. Scroll to "Calendario de Cumpleaños".<br>2. Observe 12 month grids.<br>3. Inspect weekday labels (L, M, X, J, V, S, D). | 12 month cards render in a responsive grid. Days are aligned under correct weekday offsets. Leap year / month lengths are accurate. | P1 |
| **TC-07** | **Calendar Today Highlight** | System date set | 1. Locate current month card.<br>2. Locate today's day number. | Current month card has a red ring and "ACTUAL" badge. Today's day number is highlighted in dark inverted styling (`bg-accent-black text-white`). | P1 |
| **TC-08** | **Upcoming Birthdays List** | Calendar visible | 1. Inspect "Próximos Cumpleaños Gurruboys" section.<br>2. Click on any member card. | Displays the next 4 upcoming birthdays sorted chronologically (wrapping past December if needed). Clicking a card opens that member's modal. | P1 |
| **TC-09** | **Date Selection Popover** | Calendar visible | 1. Click on a calendar day containing a tier colored dot indicator. | A popup modal appears showing all members celebrating on that date with their photos, tier badges, and full date string. | P2 |
| **TC-10** | **Places Section** | Page loaded | 1. Scroll to "Lugares de Duelo".<br>2. Inspect cards for Plaza Gurruchaga, Full Terminal, etc. | Cards render in responsive grid with location icons, Japanese border styling, and descriptions from `content.ts`. | P2 |
| **TC-11** | **Travels Section** | Page loaded | 1. Scroll to "Expediciones & Viajes".<br>2. View photo galleries for Nacional and Quijano.<br>3. Inspect placeholder trip. | Trip cards display dates, attendee chips, descriptions, and thumbnail galleries. Placeholder trip ("Próximo Destino") renders gracefully without images. | P1 |
| **TC-12** | **Footer & Social Links** | Page loaded | 1. Scroll to bottom.<br>2. Inspect social links (Facebook, Instagram, TikTok). | Footer renders Japanese arcade branding, retro copyright notice, and valid external links that open in new tabs or valid URLs. | P2 |

---

## 2. Responsive & Viewport Matrix

All UI components must be validated across the following four primary responsive breakpoints:

| Viewport Category | Width | Key Verification Points |
| :--- | :--- | :--- |
| **Mobile (Small to Standard)** | $375\text{px} - 430\text{px}$ | - Navbar elements wrap or shrink without horizontal overflow.<br>- Tier List row labels compress gracefully.<br>- Member Modal stacks vertically (profile card on top, RPG stats below).<br>- Calendar displays 1 month per column. |
| **Tablet / Foldable** | $768\text{px} - 820\text{px}$ | - Calendar renders 2 columns of months.<br>- Member Modal transitions to side-by-side 2-column layout.<br>- Games section chips fit evenly. |
| **Desktop (Standard)** | $1024\text{px} - 1280\text{px}$ | - Calendar renders 3 to 4 columns of months.<br>- Tier cards display large member avatars ($80\times80\text{px}$).<br>- Shadows and borders render crisp with no pixel blurring. |
| **Wide / Ultra-Wide** | $\ge 1440\text{px}$ | - Layout remains centered with `max-w-5xl` constraint.<br>- Background radial dot grid extends seamlessly across entire screen. |

---

## 3. Non-Functional QA Checklists

### Accessibility (a11y)
- [ ] All `<img>` tags possess non-empty, descriptive `alt` attributes (e.g. `alt={member.name}`).
- [ ] Interactive buttons have accessible titles (e.g., Close button has `title="Cerrar"`).
- [ ] Modal dialogs trap focus and can be dismissed via keyboard `Escape` key.
- [ ] Text contrast ratios meet WCAG AA standards against colored tier backgrounds.

### Performance & Core Web Vitals
- [ ] No unoptimized oversized images ($> 2\text{MB}$). Standard member photos must be compressed.
- [ ] Production build (`npm run build`) completes without fatal chunk size errors.
- [ ] Initial page load does not trigger flash of unstyled content (FOUC) or severe layout shifts (CLS $< 0.1$).

### Cross-Browser Compatibility
- [ ] **Chromium** (Google Chrome, Microsoft Edge, Brave)
- [ ] **WebKit** (Apple Safari on macOS and iOS)
- [ ] **Gecko** (Mozilla Firefox)

---

## 4. Defect Severity Classifications

When logging bugs or resolving issues, use the following standardized severity tiers:

| Severity Tier | Definition | Example in GurruBoys |
| :--- | :--- | :--- |
| **P0 - Blocker** | Prevents production build, crashes the page, or prevents core user interaction. | `npm run build` fails; clicking a member crashes the page with a JavaScript exception. |
| **P1 - Critical** | Severe functionality bug without immediate workaround; broken data contracts. | Member photo returns 404; birthday date parsing algorithm throws `NaN` or crashes calendar. |
| **P2 - Major** | Visual or interactive defect that degrades user experience but does not block flow. | Modal overflows mobile screen; skill bar level bar renders beyond 100% boundary. |
| **P3 - Minor / Polish**| Cosmetic imperfection, minor typo, or subtle spacing inconsistency. | Minor typo in member bio; border shadow missing 1px offset on specific browser. |

---

## 5. Standard Bug Report Template

When submitting a defect issue (or when an AI agent documents an identified bug):

```markdown
### Bug Summary
[Brief one-line explanation of the defect]

### Severity
[P0 / P1 / P2 / P3]

### Environment
- OS: [e.g. macOS Sonoma / Ubuntu 22.04]
- Browser: [e.g. Chrome 125 / Mobile Safari]
- Viewport: [e.g. 390x844 iPhone 14]

### Steps to Reproduce
1. Navigate to '...'
2. Click on '...'
3. Observe behavior

### Expected Behavior
[What should have happened according to specs]

### Actual Behavior
[What actually occurred, including console errors or screenshots]

### Suggested Fix / Code Location
[Path to file and line range, e.g. src/data/members.ts#L150]
```
