import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { buildStructuredData } from './utils/seo.js';
import { contactInfo } from './data/siteData.js';
import credentials from './data/credentials.js';
import { profileAnswers } from './data/profileAnswers.js';
import { professionalProfile } from './data/siteConfig.js';

export function render(siteUrl) {
  const llms = [
    `# ${professionalProfile.fullName}`,
    `> ${professionalProfile.description}`,
    ...(siteUrl ? [`Sitio oficial: ${siteUrl}/`] : []),
    ...profileAnswers.map(({ id, question, answer, links = [] }) => [
      `## ${question}`, answer,
      ...(siteUrl ? [`Fuente: ${siteUrl}/#pregunta-${id}`] : []),
      ...links.map(({ label, href }) => `- [${label}](${href.startsWith('#') ? `${siteUrl}/${href}` : href})`),
    ].join('\n\n')),
    '## Perfiles públicos',
    `- GitHub: ${contactInfo.githubUrl}\n- LinkedIn: ${contactInfo.linkedinUrl}`,
    '## Credenciales con enlace público',
    ...credentials.filter(({ url }) => url).map(({ title, issuer, url }) => `- [${title}](${url}) — ${issuer}`),
  ].join('\n\n') + '\n';
  return { html: renderToString(<App />), structuredData: buildStructuredData(siteUrl, contactInfo, credentials), llms };
}
