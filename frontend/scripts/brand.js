import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const configPath = path.resolve('branding.config.json');
if (!fs.existsSync(configPath)) {
  console.error('No branding.config.json found!');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const { appName, logoPath } = config;

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const manifestPath = path.join(publicDir, 'manifest.json');
const faviconPath = path.join(publicDir, 'favicon.ico');
const logo192Path = path.join(publicDir, 'logo192.png');
const logo512Path = path.join(publicDir, 'logo512.png');
const indexHtmlPath = path.join(rootDir, 'index.html');

const brandConfigPath = path.join(rootDir, 'src/utils/branding/branding.js');

if (!fs.existsSync(logoPath)) {
  console.error(`Logo not found at: ${logoPath}`);
  process.exit(1);
}

async function generateIcons() {
  console.log(`Generating icons from ${logoPath}...`);

  try {
    await sharp(logoPath).resize(192, 192).toFile(logo192Path);
    await sharp(logoPath).resize(512, 512).toFile(logo512Path);
    await sharp(logoPath).resize(64, 64).toFile(faviconPath);

    console.log('Icons generated successfully.');
  } catch (err) {
    console.error('Failed to generate icons:', err);
  }
}

function updateManifest() {
  if (!fs.existsSync(manifestPath)) {
    console.warn('manifest.json not found, skipping...');
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  manifest.name = appName;
  manifest.short_name = appName;
  delete manifest.theme_color; // no theme color because DaisyUI handles it

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('Updated manifest.json');
}

function updateIndexHTML() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('index.html not found in root, skipping...');
    return;
  }

  let html = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Update <title>
  html = html.replace(/<title>.*<\/title>/, `<title>${appName}</title>`);

  // Update favicon link if it exists
  html = html.replace(
    /<link rel="icon" href=".*?"/,
    `<link rel="icon" href="/favicon.ico"`
  );

  fs.writeFileSync(indexHtmlPath, html, 'utf-8');
  console.log('Updated index.html title and favicon link');
}
function updateBrandingConfig() {
  const content = `export const BRAND = Object.freeze({
  name: "${appName}",
  logo: "/logo192.png",
});\n`;

  const dirPath = path.dirname(brandConfigPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(brandConfigPath, content, 'utf-8');
  console.log('Updated src/utils/branding/branding.js');
}

(async () => {
  await generateIcons();
  updateManifest();
  updateIndexHTML();
  updateBrandingConfig();
  console.log(`Branding applied successfully for "${appName}"!`);
})();
