import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getSiteUrl } from '../scripts/generate-seo-files.mjs';
import { buildStructuredData } from '../SRC/utils/seo.js';
import credentials from '../SRC/data/credentials.js';

test('canonical: solo dominio HTTP(S), sin parámetros ni rutas inventadas', () => {
  assert.equal(getSiteUrl({}), 'https://marcorulfo.netlify.app');
  assert.equal(getSiteUrl({ SITE_URL: 'https://example.com/' }), 'https://example.com');
  assert.equal(getSiteUrl({ URL: 'https://example.net' }), 'https://example.net');
  for (const SITE_URL of ['javascript:alert(1)', 'https://user:pass@example.com', 'https://example.com/sub', 'https://example.com/?q=x', 'no-url']) {
    assert.throws(() => getSiteUrl({ SITE_URL }));
  }
});

test('el perfil y las credenciales mantienen identidades y enlaces consistentes', () => {
  const graph = buildStructuredData('https://example.com', { email: 'test@example.com', githubUrl: 'https://github.com/Marcor360', location: 'México' }, credentials)['@graph'];
  assert.equal(graph[2].mainEntity['@id'], graph[0]['@id']);
  assert.equal(graph[1].publisher['@id'], graph[0]['@id']);
  assert.ok(graph[0].hasCredential.find((item) => item.identifier === 'WVMY046JEAG8'));
  assert.equal(new Set(credentials.map(({ id }) => id)).size, credentials.length);
  assert.ok(credentials.every(({ title, issuer, skills }) => title && issuer && skills.length));
});

test('el build contiene contenido completo y metadatos sin ejecutar JavaScript', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const id of ['servicios', 'sobre-mi', 'proyectos', 'experiencia', 'formacion', 'certificaciones', 'habilidades', 'seo-geo', 'contacto']) {
    assert.ok(html.includes(`id="${id}"`), id);
  }
  assert.ok(html.includes('WVMY046JEAG8'));
  assert.ok(html.includes('Innovation and Entrepreneurship'));
  assert.ok(!html.includes('<!--seo-head-->'));
  const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@graph'][2]['@type'], 'ProfilePage');
  assert.ok(!html.includes('src="/SRC/img/'));
});

test('nombre completo y preguntas frecuentes coinciden en HTML, datos estructurados y llms', async () => {
  const { professionalProfile } = await import('../SRC/data/siteConfig.js');
  const { profileAnswers } = await import('../SRC/data/profileAnswers.js');
  const html = await readFile('dist/index.html', 'utf8');
  const llms = await readFile('dist/llms.txt', 'utf8');
  assert.ok(html.includes(`<title>${professionalProfile.title}</title>`));
  assert.ok(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1].startsWith(professionalProfile.fullName));
  for (const attribute of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    assert.ok(html.includes(`<meta ${attribute}\n    content="${professionalProfile.description}"`), attribute);
  }
  const graph = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const faq = graph.find((item) => item['@type'] === 'FAQPage');
  const person = graph.find((item) => item['@type'] === 'Person');
  assert.equal(person.name, professionalProfile.fullName);
  assert.equal(faq.about['@id'], person['@id']);
  assert.equal(faq.mainEntity.length, profileAnswers.length);
  assert.equal(new Set(profileAnswers.map(({ id }) => id)).size, profileAnswers.length);
  profileAnswers.forEach(({ id, question, answer }, index) => {
    assert.equal(faq.mainEntity[index].name, question);
    assert.equal(faq.mainEntity[index].acceptedAnswer.text, answer);
    assert.ok(html.includes(`id="pregunta-${id}"`));
    assert.ok(llms.includes(question));
    assert.ok(llms.includes(answer));
    assert.ok(llms.includes(`/#pregunta-${id}`));
  });
});
