#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const registryPath = join(repoRoot, "src/data/member-pages.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const slug = process.argv[2];
const baseIndex = process.argv.indexOf("--base");
const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : null;

const fail = (message) => {
  console.error(`Member-site validation failed: ${message}`);
  process.exit(1);
};

if (!slug || !registry.members.some((member) => member.slug === slug)) {
  fail("unknown or missing immutable member slug");
}

const siteRoot = join(repoRoot, "public/member-sites", slug);
const allowedExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
]);
const textExtensions = new Set([".html", ".css", ".js"]);
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const stat = lstatSync(path);

    if (stat.isSymbolicLink()) fail(`symlinks are forbidden: ${relative(repoRoot, path)}`);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile()) files.push({ path, size: stat.size });
  }
}

walk(siteRoot);

if (!files.some(({ path }) => path === join(siteRoot, "index.html"))) {
  fail("index.html is required");
}
if (files.length > 20) fail("a member site may contain at most 20 files");

let totalBytes = 0;
let totalTextBytes = 0;
for (const file of files) {
  totalBytes += file.size;
  const extension = extname(file.path).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    fail(`file type is not allowed: ${relative(repoRoot, file.path)}`);
  }
  if (textExtensions.has(extension) && file.size > 100_000) {
    fail(`text file exceeds 100 KB: ${relative(repoRoot, file.path)}`);
  }
  if (extension === ".js" && file.size > 50_000) {
    fail(`JavaScript file exceeds 50 KB: ${relative(repoRoot, file.path)}`);
  }
  if (textExtensions.has(extension)) totalTextBytes += file.size;
  if (!textExtensions.has(extension) && file.size > 1_500_000) {
    fail(`image exceeds 1.5 MB: ${relative(repoRoot, file.path)}`);
  }

  if (extension === ".html") {
    const html = readFileSync(file.path, "utf8");
    const blockedHtml = [
      /<\s*(iframe|object|embed|form|input|textarea|select)\b/i,
      /<\s*meta[^>]+http-equiv\s*=\s*["']?refresh/i,
      /<\s*base\b/i,
      /\son[a-z]+\s*=/i,
      /javascript\s*:/i,
      /data\s*:\s*text\/html/i,
    ];
    if (blockedHtml.some((pattern) => pattern.test(html))) {
      fail(`dangerous active HTML is forbidden: ${relative(repoRoot, file.path)}`);
    }

    const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
    const scriptStarts = [...html.matchAll(/<script\b/gi)];
    if (scriptTags.length !== scriptStarts.length) {
      fail(`malformed script element: ${relative(repoRoot, file.path)}`);
    }
    for (const [, attributes, inlineBody] of scriptTags) {
      if (inlineBody.trim()) {
        fail(`inline JavaScript is forbidden; use a local .js file: ${relative(repoRoot, file.path)}`);
      }
      const srcMatch = attributes.match(/\bsrc\s*=\s*(["'])(.*?)\1/i);
      if (!srcMatch) {
        fail(`script elements require a local src: ${relative(repoRoot, file.path)}`);
      }
      const src = srcMatch[2].trim();
      if (
        !src ||
        !/^(?:\.\/)?[a-zA-Z0-9][a-zA-Z0-9._/-]*\.js(?:\?[a-zA-Z0-9._=-]+)?$/.test(src) ||
        src.startsWith("/") ||
        src.includes("..") ||
        src.includes(":") ||
        src.startsWith("//")
      ) {
        fail(`only local relative JavaScript files are allowed: ${relative(repoRoot, file.path)}`);
      }
    }
  }

  if (extension === ".css") {
    const css = readFileSync(file.path, "utf8");
    if (/@import\b|expression\s*\(|behavior\s*:|url\s*\(\s*["']?https?:/i.test(css)) {
      fail(`remote or executable CSS is forbidden: ${relative(repoRoot, file.path)}`);
    }
  }

  if (extension === ".js") {
    const javascript = readFileSync(file.path, "utf8");
    const blockedJavaScript = [
      /\bfetch\s*\(/i,
      /\bXMLHttpRequest\b/i,
      /\bWebSocket\b/i,
      /\bEventSource\b/i,
      /\bsendBeacon\s*\(/i,
      /\bimportScripts\s*\(/i,
      /\bimport\s*\(/i,
      /\beval\s*\(/i,
      /\bnew\s+Function\b/i,
      /\bdocument\s*\.\s*cookie\b/i,
    ];
    if (blockedJavaScript.some((pattern) => pattern.test(javascript))) {
      fail(`networking or dynamic code is forbidden: ${relative(repoRoot, file.path)}`);
    }
    if (javascript.split(/\r?\n/).some((line) => line.length > 2_000)) {
      fail(`minified or oversized JavaScript line is forbidden: ${relative(repoRoot, file.path)}`);
    }
  }
}
if (totalBytes > 2_000_000) fail("member site exceeds the 2 MB total limit");
if (totalTextBytes > 150_000) fail("member site exceeds the 150 KB total text limit");

if (base) {
  const changed = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACDMRTUXB", `${base}...HEAD`],
    { cwd: repoRoot, encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean);

  const allowedPrefix = `public/member-sites/${slug}/`;
  const invalid = changed.filter(
    (path) => !path.startsWith(allowedPrefix) || path.includes(`${sep}..${sep}`),
  );
  if (invalid.length) {
    fail(`changes escape the assigned folder: ${invalid.join(", ")}`);
  }
}

console.log(`Validated member site "${slug}": ${files.length} files, ${totalBytes} bytes`);
