import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://guillaumezhu.com";
const OUTPUT_DIR = path.resolve(import.meta.dir, "../public");

const ADDITIONAL_ASSETS: string[] = [
  "/projects/pulse-festival/media/pulse-gallery4.mp4",
  "/projects/ornate/media/ornate-gallery3.mp4",
  "/projects/ornate/media/ornate-gallery7.mp4",
  "/projects/mae-webflow/media/webflow-gallery3.mp4",
  "/projects/mae-webflow/media/webflow-gallery4.mp4",
  "/playground/posters/playground-forest.webp",
  "/playground/media/playground-forest.mp4",
  "/playground/media/playground-exil-lab1.webp",
  "/playground/media/playground-capture.webp",
];

async function downloadAsset(assetPath: string): Promise<boolean> {
  const url = `${BASE_URL}${assetPath}`;
  const localPath = path.join(OUTPUT_DIR, assetPath.replace(/^\//, ""));
  const dir = path.dirname(localPath);

  if (fs.existsSync(localPath)) {
    console.log(`[EXISTS] ${assetPath}`);
    return true;
  }

  fs.mkdirSync(dir, { recursive: true });

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) {
      console.warn(`[FAIL ${res.status}] ${url}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(localPath, buffer);
    console.log(`[DONE] ${assetPath} (${buffer.length} bytes)`);
    return true;
  } catch (err: any) {
    console.error(`[ERROR] ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Downloading additional ${ADDITIONAL_ASSETS.length} targets...`);
  for (const asset of ADDITIONAL_ASSETS) {
    await downloadAsset(asset);
  }
  console.log(`\nAdditional downloads finished.`);
}

main();
