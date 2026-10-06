# Data Integrity, Schemas & Asset Specifications

This document defines the strict data schemas, field constraints, birthday parsing rules, image asset standards, and automated validation procedures for the **GurruBoys** project.

---

## 1. Single Source of Truth

The entire website is data-driven, powered by two static TypeScript files located in `src/data/`:
1. `src/data/members.ts`: Defines member profiles, tier rankings, birthdays, biographies, and RPG skill statistics.
2. `src/data/content.ts`: Defines games catalog, dueling venues, trip history, and social media links.

---

## 2. Member Entity Schema (`src/data/members.ts`)

```typescript
export interface Skill {
  name: string;        // Human-readable skill or trait name (e.g., "Gym", "Morbo")
  level: number;       // Numeric power level between 0 and 100
  raw?: string;        // Original RPG level string notation (e.g., "5", "5+1", "0")
}

export interface Member {
  name: string;        // Unique full or display name (e.g., "Marcos", "José")
  nickname: string;    // Nickname or alias (e.g., "Gato", "Barista")
  birthday: string;    // Parsed birthday string (see Section 3 for strict format)
  description: string; // Biography, anecdote, or playstyle summary
  tier: 'S' | 'A' | 'B' | 'C' | 'D'; // Must match one of the 5 canonical tiers
  image: string;       // Local asset path (e.g. "/members/marcos.jpg") or HTTPS URL
  skills: Skill[];     // Array of character skills used for PWR calculation
}
```

### Field Constraints & Invariants:
- **`name`**: Must be non-empty and globally unique within the `members` array.
- **`tier`**: Must strictly be one of `'S'`, `'A'`, `'B'`, `'C'`, or `'D'`.
- **`skills`**: Must contain at least one skill. `level` must be a valid number.
- **Average PWR Formula**: `Math.round(sum(skill.level) / skills.length)`.

---

## 3. Birthday String Parsing & Rules

The birthday calendar (`src/components/BirthdayCalendar.tsx`) parses member birthdays dynamically to plot dots on the 12-month calendar and calculate upcoming birthdays.

### Valid Birthday Formats:
| Format Pattern | Example | Parsing Result | Usage |
| :--- | :--- | :--- | :--- |
| `DD de [Mon]` | `'10 de Sep'` | Day: 10, Month: 8 (September) | **Preferred standard** |
| `DD de [Month]` | `'5 de Julio'` | Day: 5, Month: 6 (July) | Supported |
| `DD de [Mon] - YYYY` | `'18 de Oct - 2000'` | Day: 18, Month: 9 (October) | Supported (year ignored by calendar) |
| `'A confirmar'` | `'A confirmar'` | Ignored by calendar | Used when birthday is unknown |

### Valid Month Keywords (Case-Insensitive):
- **Enero**: `ene`, `enero`
- **Febrero**: `feb`, `febrero`
- **Marzo**: `mar`, `marzo`
- **Abril**: `abr`, `abril`
- **Mayo**: `may`, `mayo`
- **Junio**: `jun`, `junio`
- **Julio**: `jul`, `julio`
- **Agosto**: `ago`, `agosto`
- **Septiembre**: `sep`, `sept`, `septiembre`, `setiembre`
- **Octubre**: `oct`, `octubre`
- **Noviembre**: `nov`, `noviembre`
- **Diciembre**: `dic`, `diciembre`

### ❌ Invalid Formats (Will Fail QA Validation):
- `10/09` (Missing Spanish text separator)
- `September 10` (English month names are not supported)
- `10-09-1995` (Hyphenated numeric dates cannot be parsed)
- `35 de Enero` (Day out of range 1-31)

---

## 4. Image Asset Standards

### Member Portrait Photos:
- **Storage Directory**: `public/members/`
- **Filename Convention**: `<firstname-lowercase>.jpg` (e.g., `marcos.jpg`, `jose.jpg`, `diego.jpg`).
- **Aspect Ratio**: Strict **1:1 square**.
- **Dimensions**: **$640\times640\text{px}$** (standardized across the entire roster).
- **Format & Compression**: JPEG format, compressed to $< 150\text{KB}$ to preserve Core Web Vitals (LCP).
- **Remote Avatars**: If no real photo is available, an external SVG/avatar generator URL (e.g., `https://api.dicebear.com/...`) is permitted.

### Event & Travel Photos:
- **Storage Directory**: `public/images/nacio/` or `public/quijano/`.
- **Dimensions**: Maximum $1920\text{px}$ wide, compressed web formats (`.png`, `.jpg`, `.webp`).

---

## 5. Content Entities Schema (`src/data/content.ts`)

### 1. Games (`games: string[]`)
A simple array of non-empty strings representing the group's played card, board, and party games:
```typescript
export const games: string[] = [
  'Yu-Gi-Oh! Advanced',
  'Yu-Gi-Oh! Genesys',
  // ...
];
```

### 2. Places (`places: Place[]`)
```typescript
export interface Place {
  name: string;        // Venue name
  description: string; // Anecdote or playstyle description
}
```

### 3. Travels (`travels: Travel[]`)
```typescript
export interface Travel {
  id: string;          // Unique kebab-case slug (e.g., "nacio-2026")
  title: string;       // Display title
  date: string;        // Year or descriptive date string
  description: string; // Summary of the tournament or vacation
  attendees: string[]; // List of member names who attended
  images: string[];    // Array of local asset paths in public/ (can be empty)
}
```

### 4. Socials (`socials: Social[]`)
```typescript
export interface Social {
  name: string;        // Platform name (e.g., "TikTok")
  url: string;         // Fully qualified HTTPS link
  icon: string;        // Identifier mapped to UI icon renderer
}
```

---

## 6. Automated Validation Script (`scripts/validate-data.ts`)

To ensure data integrity is enforced continuously, the repository provides `scripts/validate-data.ts`.

### How to Run:
```bash
npm run validate:data
```

### Validation Checks Performed:
1. **Schema compliance**: Verifies types and non-empty required strings.
2. **Uniqueness**: Asserts that no duplicate member names exist.
3. **Enum validation**: Enforces valid tier assignments.
4. **Date parsing**: Runs the calendar parsing algorithm on all non-placeholder birthdays.
5. **Asset verification**: Verifies that every file path specified in `image` and `images[]` actually exists inside the `public/` directory on the local disk.

**Exit Codes:**
- `0`: All checks passed.
- `1`: Validation errors detected; prints granular diagnostic failure log.
