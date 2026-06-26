import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'PlayPatch-logo.png';
const SIZES = [16, 32, 48, 128];
const OUT = 'public/icon';

await mkdir(OUT, { recursive: true });
for (const size of SIZES) {
  await sharp(SRC)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${OUT}/${size}.png`);
  console.log(`✓ ${OUT}/${size}.png`);
}
