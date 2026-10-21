import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.vite/ssr/entry-server.js';
import { generateSeoFiles, getSiteUrl } from './generate-seo-files.mjs';

const siteUrl = getSiteUrl();
const { html, structuredData, llms } = render(siteUrl);
let page = await readFile('dist/index.html', 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const head = [
  siteUrl ? `<link rel="canonical" href="${escape(siteUrl)}/" />` : '',
  `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
].join('\n');
page = page.replace('<!--seo-head-->', head).replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
if (siteUrl) {
  page = page.replace(/(<meta property="og:url" content=")[^"]+/, `$1${escape(siteUrl)}/`);
  page = page.replace(/(content=")\/social-preview.svg/g, `$1${escape(siteUrl)}/social-preview.svg`);
}
await writeFile('dist/index.html', page);
await generateSeoFiles(siteUrl);
await writeFile('dist/llms.txt', llms);
console.log(`Prerender completo; ${siteUrl ? 'canonical y sitemap configurados' : 'sin dominio público: sitemap omitido'}.`);
