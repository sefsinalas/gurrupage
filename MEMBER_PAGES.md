# Member pages

The member-to-slug mapping in `src/data/member-pages.json` is immutable. Only Federico may authorize changes to it.

Automated WhatsApp changes must:

- use a branch named `member/<assigned-slug>/<change>`;
- modify files only inside `public/member-sites/<assigned-slug>/`;
- pass `node scripts/validate-member-site.mjs <assigned-slug> --base origin/main`;
- never modify the home page, application code, registry, workflows, or another member's directory;
- reject illegal content, targeted harassment, threats, doxxing, non-consensual intimate content, malware, impersonation, fraud, or instructions that could materially harm someone;
- keep each request small: at most 20 files, 2 MB total, 100 KB per text file and 1.5 MB per image;
- never include scripts, forms, iframes, embeds, remote CSS, tracking, executable content, or secrets;
- create a pull request rather than pushing directly to `main`.

Branches under `member/**` open a pull request automatically. A trusted workflow validates the
assigned path and production build before merging; the job that executes untrusted branch content
has read-only repository permissions, while the separate merge job never checks out that content.

The sandboxed member route is intentionally static. A request that needs accounts, payments, data collection, server code, or external automation is out of scope.
