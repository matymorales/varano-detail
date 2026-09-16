import { readdirSync } from "node:fs";

const PUBLIC_DIR = new URL("../../public/", import.meta.url);

const IMAGE_EXT = /\.(png|svg|webp|jpg|jpeg|avif)$/i;

function score(name: string): number {
  let s = 0;
  if (/\.svg$/i.test(name)) s += 3;
  else if (/\.png$/i.test(name)) s += 2;
  else s += 1;
  if (/varan/i.test(name)) s += 3;
  else if (/logo/i.test(name)) s += 2;
  else if (/marca|brand/i.test(name)) s += 1;
  return s;
}

export function findLogo(): string | null {
  try {
    const entries = readdirSync(PUBLIC_DIR, { withFileTypes: true });
    const ranked = entries
      .filter((e) => e.isFile())
      .filter((e) => IMAGE_EXT.test(e.name))
      .sort((a, b) => score(b.name) - score(a.name));
    if (ranked[0] && score(ranked[0].name) > 0) {
      return `/${ranked[0].name}`;
    }
  } catch {
    /* public dir unavailable */
  }
  return null;
}