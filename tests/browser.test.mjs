import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';

// npm run build primero. Chromium se proporciona por el entorno, no se descarga al ejecutar pruebas.
test('producción: hidratación, contenido sin JS, filtros, modal, CV y menú móvil', { timeout: 60000 }, async (t) => {
  const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4175', '--strictPort'], { stdio: 'pipe' });
  t.after(() => server.kill());
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    try { ready = (await fetch('http://127.0.0.1:4175/')).ok; } catch {}
    if (ready) break;
    await setTimeout(100);
  }
  assert.ok(ready, 'preview debe responder');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'], headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
  // Las fuentes externas no forman parte del comportamiento bajo prueba.
  await context.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error' && /hydrat|Minified React error/i.test(message.text())) errors.push(message.text()); });
  const failedAssets = [];
  page.on('response', (response) => { if (response.url().includes('/assets/') && !response.ok()) failedAssets.push(response.url()); });
  await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').count(), 1);
  assert.ok(await page.locator('h1').isVisible());
  assert.match(await page.locator('h1').textContent(), /^Marco Antonio Rulfo Castro/);
  const faqSchema = await page.locator('#structured-data').textContent().then(JSON.parse);
  const questions = faqSchema['@graph'].find((item) => item['@type'] === 'FAQPage').mainEntity;
  assert.equal(await page.locator('#seo-geo article').count(), questions.length);
  for (const question of questions) {
    const article = page.locator(`[id="${question['@id'].split('#')[1]}"]`);
    assert.equal(await article.locator('h3').textContent(), question.name);
    assert.equal(await article.locator('p').textContent(), question.acceptedAnswer.text);
  }
  const faqDetails = page.locator('#seo-geo details').nth(1);
  assert.equal(await faqDetails.getAttribute('open'), null);
  await faqDetails.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.ok(await faqDetails.locator('p').isVisible());
  await page.keyboard.press('Enter');
  assert.equal(await faqDetails.getAttribute('open'), null);
  const contactEmail = page.locator('#contact-email');
  await contactEmail.fill('correo-invalido');
  await contactEmail.blur();
  assert.equal(await contactEmail.getAttribute('aria-invalid'), 'true');
  const emailErrorId = await contactEmail.getAttribute('aria-describedby');
  assert.equal(await page.locator(`[id="${emailErrorId}"]`).textContent().then((text) => text.trim()), 'Ingresa un email válido.');
  await page.locator('#contact-name').fill('Prueba local');
  await contactEmail.fill('prueba@example.com');
  await page.locator('#contact-subject').fill('Consulta sobre SEO y GEO');
  await page.locator('#contact-message').fill('Quiero revisar el contenido y la estructura de un sitio web.');
  await page.locator('#contact-type').selectOption('GEO');
  assert.ok(await page.getByRole('button', { name: 'Preparar correo', exact: true }).isEnabled());
  // Solo validación local: no se abre mailto ni se envía ningún mensaje.
  assert.equal(await page.evaluate(() => [...document.images].filter((img) => img.loading !== 'lazy').every((img) => img.complete && img.naturalWidth > 0)), true);
  const certs = page.locator('#certificaciones');
  await certs.getByRole('searchbox').fill('Innovation');
  assert.equal(await certs.locator('[data-credential-card]').count(), 1);
  await certs.getByRole('button', { name: /Ver detalles de Innovation/ }).click();
  const dialog = page.getByRole('dialog');
  assert.ok(await dialog.isVisible());
  assert.equal(await dialog.getByRole('link', { name: 'Ver credencial' }).getAttribute('href'), 'https://www.coursera.org/account/accomplishments/specialization/certificate/WVMY046JEAG8');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);
  await certs.getByRole('button', { name: 'Limpiar filtros' }).click();
  assert.ok(await certs.locator('[data-credential-card]').count() > 1);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descargar CV', exact: true }).click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /CV_Marco.*\.pdf/);
  assert.equal(await download.failure(), null);
  await page.screenshot({ path: '/tmp/mi-sitio-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir navegación' }).click();
  await page.locator('#site-navigation').getByRole('link', { name: 'Servicios' }).click();
  assert.equal(await page.getByRole('button', { name: 'Abrir navegación' }).getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await page.screenshot({ path: '/tmp/mi-sitio-mobile.png', fullPage: true });
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto('http://127.0.0.1:4175/', { waitUntil: 'domcontentloaded' });
  assert.ok(await staticPage.getByRole('heading', { name: 'Innovation and Entrepreneurship' }).isVisible());
  assert.ok(await staticPage.locator('#contacto').isVisible());
  assert.equal(await staticPage.locator('#seo-geo article').count(), questions.length);
  assert.ok(await staticPage.getByRole('heading', { name: '¿Quién es Marco Antonio Rulfo Castro?', exact: true }).isVisible());
  const staticDetails = staticPage.locator('#seo-geo details').nth(1);
  await staticDetails.locator('summary').click();
  assert.ok(await staticDetails.locator('p').isVisible());
  assert.deepEqual(failedAssets, []);
  assert.deepEqual(errors, []);
});
