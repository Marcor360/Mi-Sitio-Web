import { writeFile, rm } from 'node:fs/promises';
import { publicSiteUrl } from '../SRC/data/siteConfig.js';

export function getSiteUrl(variables = process.env) {
  const raw = variables.SITE_URL || variables.URL || variables.DEPLOY_PRIME_URL || publicSiteUrl;
  if (!raw) return '';
  const parsed = new URL(raw);
  if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error('SITE_URL debe ser una URL pública HTTP(S), sin credenciales, parámetros ni fragmentos.');
  }
  if (parsed.pathname !== '/') throw new Error('Este sitio se despliega en la raíz del dominio; SITE_URL no admite subrutas.');
  return parsed.origin;
}

export async function generateSeoFiles(siteUrl) {
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  if (!siteUrl) {
    await rm('dist/sitemap.xml', { force: true });
    return;
  }
  const xmlUrl = siteUrl.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlUrl}/</loc></url></urlset>\n`);
}
