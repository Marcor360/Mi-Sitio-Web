import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function normalizeSiteUrl(value) {
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/, '');
    return `${parsedUrl.origin}${normalizedPath}`;
  } catch {
    return '';
  }
}

const distDir = resolve(process.cwd(), 'dist');
const robotsPath = resolve(distDir, 'robots.txt');
const sitemapPath = resolve(distDir, 'sitemap.xml');
const siteUrl = normalizeSiteUrl(process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || '');

if (!existsSync(distDir)) {
  process.exit(0);
}

const robotsContent = siteUrl
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nAllow: /\n';

writeFileSync(robotsPath, robotsContent, 'utf8');

if (!siteUrl) {
  if (existsSync(sitemapPath)) {
    rmSync(sitemapPath);
  }

  process.exit(0);
}

const sitemapContent =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `  <url>\n` +
  `    <loc>${siteUrl}/</loc>\n` +
  `    <changefreq>weekly</changefreq>\n` +
  `    <priority>1.0</priority>\n` +
  `  </url>\n` +
  `</urlset>\n`;

writeFileSync(sitemapPath, sitemapContent, 'utf8');
