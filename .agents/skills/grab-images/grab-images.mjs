// usage: node grab-images.mjs <url> [outdir]   outdir defaults to public/, --list to dry-run
const [base, arg] = process.argv.slice(2);
if (!base) { console.error("usage: node grab-images.mjs <url> [outdir|--list]"); process.exit(1); }

const html = await (await fetch(base)).text();
const urls = [...new Set(
  [...html.matchAll(/(?:src|href|content)="([^"]+\.(?:svg|png|jpe?g|webp|avif|ico)[^"]*)"/gi)]
    .map(m => new URL(m[1], base).href)
)];

if (arg === "--list") { console.log(urls.join("\n")); process.exit(0); }

const out = arg || "public";
const { writeFile, mkdir } = await import("node:fs/promises");
await mkdir(out, { recursive: true });
for (const u of urls) {
  const r = await fetch(u);
  if (!r.ok) { console.error(`${r.status} ${u}`); continue; }
  // ponytail: basename only, so same-named files in different dirs overwrite. Rename by hand if it bites.
  const name = new URL(u).pathname.split("/").pop();
  if (!name) continue;
  await writeFile(`${out}/${name}`, Buffer.from(await r.arrayBuffer()));
  console.log(`${name}  ${u}`);
}
