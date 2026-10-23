#!/usr/bin/env node
/**
 * Genereert `src/components/persona/avatarHeads.generated.ts` uit de vector-
 * bestanden in `public/avatars/*.svg` (Illustrator exports).
 *
 * - Illustrator gebruikt <style> met .cls-N klassen. Die zijn in een inline SVG
 *   globaal en botsen tussen varianten, daarom zetten we ze om naar `fill`.
 * - Groepen (<g>) worden platgeslagen; de tekenvolgorde blijft behouden.
 *
 * Gebruik:  npm run avatars
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "public", "avatars");
const outFile = join(root, "src", "components", "persona", "avatarHeads.generated.ts");

const SHAPE_TAGS = new Set(["path", "polygon", "ellipse", "circle", "rect"]);
const ALLOWED_ATTRS = new Set(["d", "points", "cx", "cy", "rx", "ry", "r", "x", "y", "width", "height", "transform"]);

function parseAttrs(str) {
  const attrs = {};
  for (const m of str.matchAll(/([a-zA-Z_:][\w:.-]*)\s*=\s*"([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}

function parseSvg(source, file) {
  const viewBoxMatch = source.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) throw new Error(`${file}: geen viewBox gevonden`);
  const viewBox = viewBoxMatch[1].trim().split(/[\s,]+/).map(Number);

  // .cls-N { fill: #xxxxxx; }
  const classFills = {};
  const style = source.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? "";
  for (const m of style.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const fill = m[2].match(/fill\s*:\s*([^;]+)/)?.[1]?.trim();
    if (!fill) continue;
    for (const sel of m[1].split(",")) {
      const cls = sel.trim().replace(/^\./, "");
      if (cls) classFills[cls] = fill.toLowerCase();
    }
  }

  const body = source.replace(/<defs>[\s\S]*?<\/defs>/, "");
  const shapes = [];
  for (const m of body.matchAll(/<(path|polygon|ellipse|circle|rect)\b([^>]*?)\/?>/g)) {
    const tag = m[1];
    if (!SHAPE_TAGS.has(tag)) continue;
    const raw = parseAttrs(m[2]);
    const attrs = {};
    for (const [k, v] of Object.entries(raw)) if (ALLOWED_ATTRS.has(k)) attrs[k] = v;
    const fill = (raw.fill ?? (raw.class ? classFills[raw.class] : undefined) ?? "#000000").toLowerCase();
    shapes.push({ tag, fill, attrs });
  }
  return { viewBox, shapes };
}

const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".svg")).sort();
const heads = {};
for (const file of files) {
  const key = basename(file, ".svg").toLowerCase();
  heads[key] = parseSvg(readFileSync(join(srcDir, file), "utf8"), file);
}

const out = `/* eslint-disable */
// ⚠️ AUTOMATISCH GEGENEREERD door scripts/generate-avatar-heads.mjs
// Bron: public/avatars/*.svg — pas de SVG's aan en draai \`npm run avatars\`.

export interface AvatarShape {
  tag: "path" | "polygon" | "ellipse" | "circle" | "rect";
  fill: string;
  attrs: Record<string, string>;
}

export interface AvatarHeadArt {
  viewBox: number[];
  shapes: AvatarShape[];
}

export const AVATAR_HEAD_ART: Record<string, AvatarHeadArt> = ${JSON.stringify(heads, null, 2)};
`;

writeFileSync(outFile, out);
console.log(`✔ ${files.length} avatar-koppen gegenereerd → ${outFile}`);
for (const [k, v] of Object.entries(heads)) console.log(`  • ${k}: ${v.shapes.length} vormen`);
