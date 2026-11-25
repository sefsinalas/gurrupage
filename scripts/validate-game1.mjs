import { execFileSync } from 'node:child_process';
import { lstatSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/validate-game1.mjs <base-ref>');

const changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);
if (!changed.length || changed.some((path) => !path.startsWith('public/game1-assets/'))) {
  throw new Error('Game changes must stay inside public/game1-assets/');
}

const root = 'public/game1-assets';
let total = 0;
let files = 0;
function inspect(path) {
  for (const entry of readdirSync(path)) {
    const file = join(path, entry);
    if (lstatSync(file).isSymbolicLink()) throw new Error(`Symlink blocked: ${file}`);
    if (statSync(file).isDirectory()) inspect(file);
    else {
      files++;
      total += statSync(file).size;
      if (!/\.(html|css|js|png|jpe?g|webp|gif|svg|ogg|mp3|wav)$/i.test(file)) {
        throw new Error(`Unsupported game file: ${file}`);
      }
    }
  }
}
inspect(root);
if (!files || files > 100 || total > 20_000_000) throw new Error('Game exceeds file or size limits');
if (!statSync(join(root, 'index.html')).isFile()) throw new Error('Game needs index.html');
console.log(`Validated ${files} game files (${total} bytes)`);
