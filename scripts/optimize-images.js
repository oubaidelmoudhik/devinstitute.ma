import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/assets/large-img";
const outputDir = "./public/assets/img";

const optimize = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  sharp(src)
    .webp({ quality: 80 })
    .toFile(dest.replace(/\.(jpe?g|png)$/, ".webp"))
    .then(() => console.log(`✔ ${src} → ${dest}`))
    .catch((err) => console.error(`✖ ${src}`, err));
};

const walk = (dir, cb) => {
  fs.readdirSync(dir).forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) walk(fullPath, cb);
    else if (/\.(jpe?g|png)$/i.test(f)) cb(fullPath);
  });
};

walk(inputDir, (file) => {
  const relPath = path.relative(inputDir, file);
  const outPath = path.join(outputDir, relPath);
  optimize(file, outPath);
});
