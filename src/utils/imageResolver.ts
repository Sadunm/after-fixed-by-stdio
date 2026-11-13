
/**
 * Production-safe perfume image resolver for Vite.
 * Supports filename, /src/assets/images/... and relative paths.
 */

const importedImages = import.meta.glob(
  '../assets/images/**/*.{png,jpg,jpeg,webp,svg,gif,PNG,JPG,JPEG,WEBP,SVG,GIF}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
) as Record<string, string>;

const imageMap: Record<string, string> = {};
const resolvedAssetUrls = new Set<string>();

for (const [path, url] of Object.entries(importedImages)) {
  if (!url) continue;

  resolvedAssetUrls.add(url);
  imageMap[url] = url;

  const filename = path.split('/').pop() || '';
  const normalizedFilename = filename.toLowerCase();

  // Store the original filename and its lowercase version.
  imageMap[filename] = url;
  imageMap[normalizedFilename] = url;

  // Store supported path variations.
  const relativePath = path.replace('../assets/images/', '');

  imageMap[path] = url;
  imageMap[`../assets/images/${relativePath}`] = url;
  imageMap[`/src/assets/images/${relativePath}`] = url;
  imageMap[`src/assets/images/${relativePath}`] = url;
  imageMap[`assets/images/${relativePath}`] = url;
  imageMap[`/assets/images/${relativePath}`] = url;
}

const fallbackImage =
  imageMap['bleudechannel.jpg'] ||
  imageMap['100mlbleu.jpeg'] ||
  Object.values(importedImages)[0] ||
  '';

export function getPerfumeImageUrl(
  imagePathOrName?: string | null
): string {
  if (!imagePathOrName || typeof imagePathOrName !== 'string') {
    return fallbackImage;
  }

  const imagePath = imagePathOrName.trim();

  if (!imagePath) return fallbackImage;

  // Preserve already-resolved Vite asset URLs, external URLs, and data/blob URLs.
  if (resolvedAssetUrls.has(imagePath) || /^(https?:\/\/|data:|blob:)/i.test(imagePath)) {
    return imagePath;
  }

  // Remove query strings and normalize separators.
  const cleanPath = imagePath.split('?')[0].replace(/\\/g, '/');

  // Exact match.
  if (imageMap[cleanPath]) {
    return imageMap[cleanPath];
  }

  // Case-insensitive full path match.
  const lowerPath = cleanPath.toLowerCase();

  for (const [key, url] of Object.entries(imageMap)) {
    if (key.toLowerCase() === lowerPath) {
      return url;
    }
  }

  // Match by filename.
  const filename = cleanPath.split('/').pop() || '';
  const matchedImage = imageMap[filename.toLowerCase()];

  if (matchedImage) {
    return matchedImage;
  }

  // Recover from stale Vite-hashed /assets/<name>-<hash>.<ext> URLs (e.g. from localStorage).
  const unhashedFilename = filename.replace(/-[A-Za-z0-9_-]{6,}(\.[^.]+)$/, '$1');
  if (unhashedFilename !== filename && imageMap[unhashedFilename.toLowerCase()]) {
    return imageMap[unhashedFilename.toLowerCase()];
  }

  console.warn(`[Image Resolver] Image not found: ${imagePath}`);

  return fallbackImage;
}

export function resolvePerfumesWithAssets<
  T extends { image: string }
>(perfumes: T[]): T[] {
  if (!Array.isArray(perfumes)) return [];

  return perfumes.map((perfume) => ({
    ...perfume,
    image: getPerfumeImageUrl(perfume.image),
  }));
}
