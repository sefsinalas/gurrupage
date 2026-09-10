import fs from 'node:fs';
import path from 'node:path';
import { members, type Member } from '../src/data/members';
import { games, places, travels, socials } from '../src/data/content';

interface ValidationError {
  category: string;
  item: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];

const MONTH_MAP: Record<string, number> = {
  ene: 0, enero: 0,
  feb: 1, febrero: 1,
  mar: 2, marzo: 2,
  abr: 3, abril: 3,
  may: 4, mayo: 4,
  jun: 5, junio: 5,
  jul: 6, julio: 6,
  ago: 7, agosto: 7,
  sep: 8, sept: 8, septiembre: 8, setiembre: 8,
  oct: 9, octubre: 9,
  nov: 10, noviembre: 10,
  dic: 11, diciembre: 11,
};

function parseBirthday(bdayStr: string): { day: number; month: number } | null {
  if (!bdayStr || bdayStr.toLowerCase().includes('confirmar')) return null;

  const cleanStr = bdayStr.split('-')[0].trim().toLowerCase();
  const parts = cleanStr.split(/\s+de\s+/);
  if (parts.length < 2) return null;

  const day = parseInt(parts[0], 10);
  const monthKey = parts[1].trim();

  const month = MONTH_MAP[monthKey];
  if (isNaN(day) || month === undefined) return null;

  return { day, month };
}

console.log('🔍 [QA Validator] Starting data integrity audit...\n');

// 1. Members Validation
const allowedTiers = new Set(['S', 'A', 'B', 'C', 'D']);
const seenNames = new Set<string>();

members.forEach((m: Member, idx: number) => {
  const identifier = m.name || `Index #${idx}`;

  if (!m.name || m.name.trim() === '') {
    errors.push({ category: 'Members', item: identifier, message: 'Name cannot be empty.' });
  } else if (seenNames.has(m.name.toLowerCase())) {
    errors.push({ category: 'Members', item: identifier, message: `Duplicate member name detected: "${m.name}".` });
  } else {
    seenNames.add(m.name.toLowerCase());
  }

  if (!m.nickname || m.nickname.trim() === '') {
    errors.push({ category: 'Members', item: identifier, message: 'Nickname is missing or empty.' });
  }

  if (!allowedTiers.has(m.tier)) {
    errors.push({ category: 'Members', item: identifier, message: `Invalid tier "${m.tier}". Allowed tiers: ${[...allowedTiers].join(', ')}.` });
  }

  if (!m.description || m.description.trim() === '') {
    errors.push({ category: 'Members', item: identifier, message: 'Description is missing or empty.' });
  }

  // Birthday validation
  if (!m.birthday || m.birthday.trim() === '') {
    errors.push({ category: 'Members', item: identifier, message: 'Birthday field is required (use "A confirmar" if unknown).' });
  } else if (!m.birthday.toLowerCase().includes('confirmar')) {
    const parsed = parseBirthday(m.birthday);
    if (!parsed) {
      errors.push({
        category: 'Members',
        item: identifier,
        message: `Birthday "${m.birthday}" could not be parsed. Expected format like "10 de Sep" or "18 de Oct - 2000".`
      });
    } else if (parsed.day < 1 || parsed.day > 31) {
      errors.push({
        category: 'Members',
        item: identifier,
        message: `Invalid birthday day: ${parsed.day}. Must be between 1 and 31.`
      });
    }
  }

  // Image validation
  if (!m.image || m.image.trim() === '') {
    errors.push({ category: 'Members', item: identifier, message: 'Image path is missing.' });
  } else if (m.image.startsWith('http://') || m.image.startsWith('https://')) {
    try {
      new URL(m.image);
    } catch {
      errors.push({ category: 'Members', item: identifier, message: `Invalid external image URL: "${m.image}".` });
    }
  } else {
    const cleanPath = m.image.startsWith('/') ? m.image.slice(1) : m.image;
    const localAssetPath = path.join(process.cwd(), 'public', cleanPath);
    if (!fs.existsSync(localAssetPath)) {
      errors.push({ category: 'Members', item: identifier, message: `Image asset not found on disk: "${localAssetPath}".` });
    }
  }

  // Skills validation
  if (!Array.isArray(m.skills) || m.skills.length === 0) {
    warnings.push(`Member "${m.name}" has no skills defined.`);
  } else {
    m.skills.forEach((skill, sIdx) => {
      if (!skill.name || skill.name.trim() === '') {
        errors.push({ category: 'Members', item: `${identifier} -> Skill #${sIdx}`, message: 'Skill name cannot be empty.' });
      }
      if (typeof skill.level !== 'number' || isNaN(skill.level)) {
        errors.push({ category: 'Members', item: `${identifier} -> Skill "${skill.name}"`, message: `Skill level must be a number, got: ${skill.level}.` });
      }
    });
  }
});

// 2. Content Validation - Games
if (!Array.isArray(games) || games.length === 0) {
  errors.push({ category: 'Games', item: 'games', message: 'Games list must be a non-empty array.' });
} else {
  games.forEach((game, idx) => {
    if (!game || typeof game !== 'string' || game.trim() === '') {
      errors.push({ category: 'Games', item: `Index #${idx}`, message: 'Game title cannot be empty.' });
    }
  });
}

// 3. Content Validation - Places
if (!Array.isArray(places) || places.length === 0) {
  errors.push({ category: 'Places', item: 'places', message: 'Places list must be a non-empty array.' });
} else {
  places.forEach((place, idx) => {
    const id = place.name || `Index #${idx}`;
    if (!place.name || place.name.trim() === '') {
      errors.push({ category: 'Places', item: id, message: 'Place name is required.' });
    }
    if (!place.description || place.description.trim() === '') {
      errors.push({ category: 'Places', item: id, message: 'Place description is required.' });
    }
  });
}

// 4. Content Validation - Travels
if (!Array.isArray(travels) || travels.length === 0) {
  errors.push({ category: 'Travels', item: 'travels', message: 'Travels list must be a non-empty array.' });
} else {
  travels.forEach((travel, idx) => {
    const id = travel.title || travel.id || `Index #${idx}`;
    if (!travel.id || travel.id.trim() === '') {
      errors.push({ category: 'Travels', item: id, message: 'Travel id is required.' });
    }
    if (!travel.title || travel.title.trim() === '') {
      errors.push({ category: 'Travels', item: id, message: 'Travel title is required.' });
    }
    if (!travel.date || travel.date.trim() === '') {
      errors.push({ category: 'Travels', item: id, message: 'Travel date is required.' });
    }
    if (travel.images && Array.isArray(travel.images)) {
      travel.images.forEach((img) => {
        if (!img.startsWith('http://') && !img.startsWith('https://')) {
          const cleanPath = img.startsWith('/') ? img.slice(1) : img;
          const localAssetPath = path.join(process.cwd(), 'public', cleanPath);
          if (!fs.existsSync(localAssetPath)) {
            errors.push({ category: 'Travels', item: id, message: `Travel image asset not found on disk: "${localAssetPath}".` });
          }
        }
      });
    }
  });
}

// 5. Content Validation - Socials
if (!Array.isArray(socials) || socials.length === 0) {
  errors.push({ category: 'Socials', item: 'socials', message: 'Socials list must be a non-empty array.' });
} else {
  socials.forEach((social, idx) => {
    const id = social.name || `Index #${idx}`;
    if (!social.name) errors.push({ category: 'Socials', item: id, message: 'Social name is required.' });
    if (!social.url) errors.push({ category: 'Socials', item: id, message: 'Social URL is required.' });
    if (!social.icon) errors.push({ category: 'Socials', item: id, message: 'Social icon is required.' });
  });
}

// Report
console.log(`📊 Audit summary:`);
console.log(`   - Members checked: ${members.length}`);
console.log(`   - Games checked: ${games.length}`);
console.log(`   - Places checked: ${places.length}`);
console.log(`   - Travels checked: ${travels.length}`);
console.log(`   - Social links checked: ${socials.length}\n`);

if (warnings.length > 0) {
  console.log('⚠️  Warnings:');
  warnings.forEach((w) => console.log(`   - ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.error('❌ Data integrity failures detected:');
  errors.forEach((err) => {
    console.error(`   [${err.category}] ${err.item}: ${err.message}`);
  });
  console.error(`\nTotal failures: ${errors.length}. QA Check FAILED.\n`);
  process.exit(1);
} else {
  console.log('✅ All data integrity checks PASSED successfully!\n');
  process.exit(0);
}
