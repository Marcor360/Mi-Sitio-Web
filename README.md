# Marco Antonio Rulfo Castro

Especialista en SEO, GEO, UX y Desarrollo Web en México.

Desarrollador web e Ingeniero en Sistemas especializado en SEO técnico, SEO ecommerce,
Generative Engine Optimization, UX, analítica digital, automatización con IA y soluciones web.

📍 Naucalpan de Juárez, Estado de México
💼 Diltex brands

## Stack actual

- React para la interfaz y la composición del sitio
- Vite como entorno de desarrollo y build
- Sass para estilos y layout responsivo
- GSAP para animaciones sutiles
- jsPDF para generar el CV desde la propia aplicación

## Especialidades

- SEO técnico, SEO ecommerce y Generative Engine Optimization (GEO)
- UX web, conversión y Core Web Vitals
- React, TypeScript, WordPress y Salesforce Commerce Cloud
- GA4, Google Tag Manager, Google Search Console y Semrush
- Ecommerce, automatización e IA aplicada

## Características

- Diseño responsivo para desktop, tablet y mobile
- Navegación móvil con menú colapsable
- Secciones de perfil, experiencia, formación, certificaciones, habilidades y contacto
- Modal de detalle para experiencia profesional
- Formulario que prepara el mensaje en el cliente de correo
- Descarga dinámica de CV en PDF
- Carga local de certificaciones sin `fetch` roto
- SEO técnico: canonical, Open Graph, Twitter Cards, Schema.org `Person`, `robots.txt`, sitemap y `llms.txt`
- Navegación accesible con enlace para saltar al contenido y sección activa visible
- Filtros, búsqueda, contador de resultados y limpieza rápida en certificaciones

## Estructura principal

```txt
/
|-- index.html
|-- package.json
|-- vite.config.js
|-- SRC/
|   |-- App.jsx
|   |-- main.jsx
|   |-- components/
|   |-- data/
|   |-- hooks/
|   |-- img/
|   |-- SASS/
|   `-- utils/
`-- README.md
```

## Requisitos

- Node.js 24.19.0 (LTS, versión fijada en `.nvmrc`)
- npm 10 o superior

## Instalación

```bash
npm ci
```

## Scripts

### Desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

## SEO y rastreo

`npm run build` compila el cliente y un renderizador de build, genera el HTML completo e hidrata React en el navegador. El despliegue sigue siendo estático: solo se publica `dist/`, sin servidor Node en producción. El contenido, las certificaciones y los datos estructurados están disponibles sin ejecutar JavaScript.

- `robots.txt`: permite el rastreo y, durante el despliegue, declara el sitemap absoluto.
- `sitemap.xml`: se genera con `SITE_URL`, `URL` o `DEPLOY_PRIME_URL`, usando por defecto el dominio confirmado `https://marcorulfo.netlify.app`. Solo lista rutas que existen realmente.
- `llms.txt`: resume el perfil profesional y las áreas de experiencia para consumidores de contenido estructurado.

Para un dominio personalizado, configura `SITE_URL` en Netlify con la URL canónica, por ejemplo `https://tudominio.com`.

## Certificaciones y LinkedIn

Las credenciales visibles y el CV usan una sola fuente: `SRC/data/credentials.js`. `SRC/data/certificates.json` es un archivo histórico y ya no alimenta el flujo React. La experiencia se mantiene en `SRC/data/experience.js`; las preguntas frecuentes, en `SRC/data/profileAnswers.js`. No se deben publicar fechas o resultados profesionales sin evidencia.

La API pública estándar de LinkedIn no expone automáticamente las certificaciones de un perfil. Una sincronización real necesita una aplicación de LinkedIn aprobada, OAuth del titular y permisos de Profile API para el miembro autenticado. No se usa scraping.

Cuando estén disponibles esas credenciales, la integración debe ejecutarse en un servicio seguro (por ejemplo, una función programada de Netlify o GitHub Actions) que guarde los secretos fuera del repositorio, actualice los dos archivos de datos y cree un commit o despliegue.

## Notas

- El directorio `SRC` se mantiene en mayúsculas para respetar la estructura original del proyecto.
- El build de Vite se genera en `dist/`.
- El directorio `build/` pertenece a la etapa anterior basada en Gulp y ya no forma parte del flujo actual.

## Licencia

ISC - Marco Antonio Rulfo Castro

## Validación

```bash
npm run build
npm test
npm run test:browser
npm audit
```

La prueba de navegador usa Chromium instalado en el entorno (`/usr/bin/chromium`), o la ruta indicada en `CHROMIUM_PATH`. Comprueba hidratación sin errores, contenido sin JavaScript, recursos, filtros, credenciales, descarga de CV y navegación móvil. No envía mensajes ni formularios a servicios externos. Las fuentes externas se excluyen de esta prueba.

## Publicación, SEO y GEO

- En Netlify, define `SITE_URL` con el dominio canónico HTTP(S), sin rutas, parámetros ni fragmentos. Si no existe, se usa `URL` de Netlify, después `DEPLOY_PRIME_URL` y finalmente el dominio confirmado `https://marcorulfo.netlify.app`, definido en `SRC/data/siteConfig.js`. El build genera canonical, Open Graph absoluto, `robots.txt` y sitemap con ese origen. Una URL inválida detiene el build. El dominio debe actualizarse en esa configuración si se migra el sitio.
- Publica solo `dist/`. El sitio usa anclas y no tiene rutas SPA: las direcciones inexistentes deben responder 404. `public/404.html` evita indexar una página de error como si fuera el perfil.
- Envía `/sitemap.xml` a Google Search Console y verifica indexación, canonical elegido y Core Web Vitals después del despliegue. Las pruebas locales no demuestran indexación ni rendimiento de usuarios reales.
- `ProfilePage`, `Person`, `WebSite`, credenciales y `llms.txt` se generan desde el perfil y las certificaciones. `llms.txt` es una ayuda para consumidores de contenido, no un requisito de Google ni una garantía de citas en sistemas de IA.
- Mantén casos verificables con problema, trabajo realizado, evidencia pública y resultados medidos. Evita añadir métricas, reseñas o promesas de posicionamiento sin respaldo.
- `VITE_GA_MEASUREMENT_ID` solo etiqueta eventos si `window.gtag` ya está cargado por una integración propia. Esta variable por sí sola no carga GA4.
- La especialización **Innovation and Entrepreneurship**, del **Tecnológico de Monterrey**, se añadió con los datos proporcionados por el titular y el ID `WVMY046JEAG8`. Coursera devolvió HTTP 403 durante la consulta automática; la fecha de emisión no fue indicada y no se inventó.

## Identidad de marca y preguntas frecuentes

La consulta principal de marca es **Marco Antonio Rulfo Castro**. Se usa en el título, H1, descripciones, autor y entidad `Person`. **Marco Rulfo** es el alias secundario. Los temas complementarios son SEO técnico, SEO ecommerce, GEO (Generative Engine Optimization), UX, desarrollo web en México y analítica digital. No se añade una etiqueta `meta keywords`: Google no la utiliza para posicionar.

`SRC/data/siteConfig.js` define la identidad y los temas; `SRC/data/profileAnswers.js` mantiene las diez preguntas frecuentes. Cada respuesta tiene un ancla estable, fuentes o enlaces relacionados cuando corresponde, y se publica en HTML prerenderizado, JSON-LD `FAQPage` y `llms.txt`. Las pruebas verifican que las respuestas visibles coincidan con el marcado. Evita introducir credenciales, fechas, cargos o resultados sin respaldo.

El marcado FAQ describe el contenido; no garantiza resultados enriquecidos en Google ni citas en motores generativos. Tras publicar, comprueba la URL en Search Console, envía el sitemap y revisa las consultas del nombre completo y sus variantes para medir impresiones y clics. Mantén el mismo nombre y enlace al sitio en tus perfiles profesionales.
