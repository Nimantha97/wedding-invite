// ═══════════════════════════════════════════════════════
//  Wedding Guest Link Generator
//  Usage: node scripts/generate-links.js
//
//  Reads:   public/guests.json
//  Outputs: scripts/output/guest-links.csv
//           scripts/output/guest-links.html  (printable)
// ═══════════════════════════════════════════════════════

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config — update BASE_URL after Netlify deploy ──────
const BASE_URL   = process.env.SITE_URL || "https://nimantha-binasha.netlify.app";
const OUTPUT_DIR = path.join(__dirname, "output");
const GUESTS_FILE = path.join(__dirname, "..", "public", "guests.json");

// ── Read guests ────────────────────────────────────────
const guests = JSON.parse(fs.readFileSync(GUESTS_FILE, "utf-8"));

// ── Build link list ────────────────────────────────────
const links = guests.map(g => ({
  name: g.name,
  slug: g.slug,
  url:  `${BASE_URL}/?g=${g.slug}`,
}));

// ── Ensure output dir ──────────────────────────────────
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// ── 1. CSV output ──────────────────────────────────────
const csv = [
  "Name,Slug,Personalized URL",
  ...links.map(l => `"${l.name}","${l.slug}","${l.url}"`),
].join("\n");

fs.writeFileSync(path.join(OUTPUT_DIR, "guest-links.csv"), csv, "utf-8");

// ── 2. HTML printable report ───────────────────────────
const rows = links.map((l, i) => `
  <tr>
    <td>${i + 1}</td>
    <td><strong>${l.name}</strong></td>
    <td><code>${l.slug}</code></td>
    <td><a href="${l.url}" target="_blank">${l.url}</a></td>
    <td>
      <button onclick="navigator.clipboard.writeText('${l.url}').then(()=>this.textContent='✅ Copied').catch(()=>{})">
        Copy
      </button>
    </td>
  </tr>`).join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wedding Guest Links — Nimantha & Binasha</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #F7F6F2; color: #2E3A36; padding: 2rem;
    }
    h1 {
      font-size: 1.8rem; font-weight: 300;
      margin-bottom: 0.25rem; color: #2E3A36;
    }
    .meta { font-size: 0.8rem; color: #7A8E89; margin-bottom: 2rem; }
    .stats {
      display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;
    }
    .stat {
      background: #fff; border: 1px solid rgba(212,180,131,0.3);
      border-radius: 0.75rem; padding: 1rem 1.5rem;
      box-shadow: 0 2px 8px rgba(46,58,54,0.06);
    }
    .stat-num { font-size: 2rem; font-weight: 300; color: #D4B483; }
    .stat-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: #7A8E89; }
    table {
      width: 100%; border-collapse: collapse;
      background: #fff; border-radius: 1rem; overflow: hidden;
      box-shadow: 0 4px 24px rgba(46,58,54,0.08);
    }
    thead { background: #2E3A36; color: #fff; }
    thead th {
      padding: 1rem 1.25rem; text-align: left;
      font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500;
    }
    tbody tr:nth-child(even) { background: #F7F6F2; }
    tbody tr:hover { background: rgba(212,180,131,0.08); }
    td { padding: 0.85rem 1.25rem; font-size: 0.875rem; border-bottom: 1px solid rgba(46,58,54,0.06); }
    td code {
      background: rgba(139,178,170,0.12); color: #7FA99C;
      padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;
    }
    td a { color: #8BB2AA; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    button {
      background: #D4B483; color: #fff; border: none;
      padding: 0.35rem 0.85rem; border-radius: 9999px;
      font-size: 0.7rem; cursor: pointer; transition: background 0.2s;
      white-space: nowrap;
    }
    button:hover { background: #B8965C; }
    .footer { margin-top: 2rem; font-size: 0.75rem; color: #7A8E89; text-align: center; }
    @media print {
      button { display: none; }
      body { background: #fff; padding: 1rem; }
    }
  </style>
</head>
<body>
  <h1>💍 Wedding Guest Links</h1>
  <p class="meta">Nimantha &amp; Binantha · 30 July 2026 · Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

  <div class="stats">
    <div class="stat">
      <div class="stat-num">${links.length}</div>
      <div class="stat-label">Total Guests</div>
    </div>
    <div class="stat">
      <div class="stat-num">${BASE_URL.replace("https://", "")}</div>
      <div class="stat-label">Base URL</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Guest Name</th>
        <th>Slug</th>
        <th>Personalized URL</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <p class="footer">
    Share each URL directly via WhatsApp · Right-click "Copy" to copy individual links · Use Ctrl+P to print this page
  </p>
</body>
</html>`;

fs.writeFileSync(path.join(OUTPUT_DIR, "guest-links.html"), html, "utf-8");

// ── Console summary ────────────────────────────────────
console.log("\n✅ Guest links generated!\n");
console.log(`   📊 Total guests : ${links.length}`);
console.log(`   🌐 Base URL     : ${BASE_URL}`);
console.log(`   📁 CSV output   : scripts/output/guest-links.csv`);
console.log(`   🌐 HTML report  : scripts/output/guest-links.html\n`);
console.log("─".repeat(55));
links.forEach(l => console.log(`  ${l.name.padEnd(28)} ${l.url}`));
console.log("─".repeat(55) + "\n");
