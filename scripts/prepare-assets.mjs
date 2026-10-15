// Builds web derivatives from /source-assets. Originals are never modified.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "source-assets";
const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const photos = [
  ["Słoneczna nauka przy biurku.png", "hero-jezykownia.jpg", 2400],
  ["Przytulna nauka przy biurku z zielenią.png", "kids-learning.jpg", 1800],
  ["Przytulne biurko do nauki w słońcu.png", "exam-learning.jpg", 2000],
  ["Przytulny kącik do nauki języków.png", "language-learning.jpg", 1800],
];

for (const [src, out, width] of photos) {
  const info = await sharp(path.join(SRC, src))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(OUT, out));
  console.log(out, info.width, info.height, Math.round(info.size / 1024) + "kB");
}

// Logo: crop to content (ignoring the thin frame of the supplied file) and
// remove the white background with a colour-to-alpha pass. No redrawing.
const logoSrc = path.join(SRC, "jezykownia-logo.jpg");
const { data, info } = await sharp(logoSrc).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const inset = 24;
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = inset; y < H - inset; y++) {
  for (let x = inset; x < W - inset; x++) {
    const i = (y * W + x) * C;
    if (Math.min(data[i], data[i + 1], data[i + 2]) < 200) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log("logo bbox", minX, minY, maxX, maxY);

function toAlpha(buf, w, h) {
  const out = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    const r = buf[p * 3], g = buf[p * 3 + 1], b = buf[p * 3 + 2];
    const a = 1 - Math.min(r, g, b) / 255;
    let A = a < 0.035 ? 0 : a;
    const un = (c) => (A === 0 ? 0 : Math.max(0, Math.min(255, Math.round((c - 255 * (1 - A)) / A))));
    out[p * 4] = un(r);
    out[p * 4 + 1] = un(g);
    out[p * 4 + 2] = un(b);
    out[p * 4 + 3] = Math.round(A * 255);
  }
  return out;
}

async function cutout(left, top, right, bottom, file, targetWidth) {
  const pad = 6;
  const region = {
    left: Math.max(0, left - pad),
    top: Math.max(0, top - pad),
    width: Math.min(W, right + pad) - Math.max(0, left - pad),
    height: Math.min(H, bottom + pad) - Math.max(0, top - pad),
  };
  const raw = await sharp(logoSrc).extract(region).removeAlpha().raw().toBuffer();
  const rgba = toAlpha(raw, region.width, region.height);
  const res = await sharp(rgba, { raw: { width: region.width, height: region.height, channels: 4 } })
    .resize({ width: targetWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file));
  console.log(file, res.width, res.height);
}

await cutout(minX, minY, maxX, maxY, "logo-jezykownia.png", 900);

// Symbol only (pencil "J"), used for the favicon / app icon.
let sMaxY = 0, sMinX = W, sMaxX = 0;
for (let y = minY; y < minY + 400; y++) {
  for (let x = inset; x < W - inset; x++) {
    const i = (y * W + x) * C;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (Math.min(r, g, b) < 200 && g > r + 20) {
      if (y > sMaxY) sMaxY = y;
      if (x < sMinX) sMinX = x;
      if (x > sMaxX) sMaxX = x;
    }
  }
}
await cutout(sMinX, minY, sMaxX, sMaxY, "logo-mark.png", 512);
