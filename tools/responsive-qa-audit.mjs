#!/usr/bin/env node
/**
 * Responsive QA audit — đọc source, không cần browser.
 * Tailwind v4 mặc định: sm 40rem, md 48rem (768px), lg 64rem, xl 80rem, 2xl 96rem.
 * @see https://tailwindcss.com/docs/screens
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const webSrc = join(root, "apps", "web", "src");

const checks = [
  {
    name: "Header: nav desktop ≥md, hamburger <md",
    file: join(webSrc, "components", "layout", "Header.tsx"),
    mustInclude: ['className="hidden items-center gap-5 md:flex"', "md:hidden"],
  },
  {
    name: "Footer: max-w-7xl + grid responsive",
    file: join(webSrc, "components", "layout", "Footer.tsx"),
    mustInclude: ["max-w-7xl", "md:grid-cols-2", "lg:grid-cols-["],
  },
  {
    name: "PageShell: narrow/default/wide",
    file: join(webSrc, "components", "layout", "PageShell.tsx"),
    mustInclude: ["max-w-3xl", "max-w-5xl", "max-w-7xl"],
  },
  {
    name: "Home: Card showcase md:grid-cols-2",
    file: join(webSrc, "app", "page.tsx"),
    mustInclude: ["md:grid-cols-2"],
  },
];

let failed = false;

console.log("[responsive-qa-audit] Tailwind breakpoints mặc định: md=768px, lg=1024px, xl=1280px\n");

for (const c of checks) {
  if (!existsSync(c.file)) {
    console.error(`FAIL: thiếu file ${c.file}`);
    failed = true;
    continue;
  }
  const text = readFileSync(c.file, "utf8");
  const missing = c.mustInclude.filter((s) => !text.includes(s));
  if (missing.length) {
    console.error(`FAIL: ${c.name}`);
    missing.forEach((m) => console.error(`  - thiếu: ${m}`));
    failed = true;
  } else {
    console.log(`OK:   ${c.name}`);
  }
}

if (failed) {
  console.error("\n[responsive-qa-audit] Có check thất bại.");
  process.exit(1);
}
console.log("\n[responsive-qa-audit] Pass: class responsive khớp checklist tối thiểu.");
