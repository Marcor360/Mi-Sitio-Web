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

- Node.js 20.19 o superior, o bien 22.12 o superior
- npm 10 o superior

## Instalación

```bash
npm install
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

`npm run build` genera los archivos de SEO dentro de `dist/`.

- `robots.txt`: permite el rastreo y, durante el despliegue, declara el sitemap absoluto.
- `sitemap.xml`: se genera con la URL pública de Netlify (`URL` o `SITE_URL`). Solo lista rutas que existen realmente.
- `llms.txt`: resume el perfil profesional y las áreas de experiencia para consumidores de contenido estructurado.

Para un dominio personalizado, configura `SITE_URL` en Netlify con la URL canónica, por ejemplo `https://tudominio.com`.

## Certificaciones y LinkedIn

Las credenciales visibles se mantienen en `SRC/data/credentials.js`; el CV usa además `SRC/data/certificates.json`.

La API pública estándar de LinkedIn no expone automáticamente las certificaciones de un perfil. Una sincronización real necesita una aplicación de LinkedIn aprobada, OAuth del titular y permisos de Profile API para el miembro autenticado. No se usa scraping.

Cuando estén disponibles esas credenciales, la integración debe ejecutarse en un servicio seguro (por ejemplo, una función programada de Netlify o GitHub Actions) que guarde los secretos fuera del repositorio, actualice los dos archivos de datos y cree un commit o despliegue.

## Notas

- El directorio `SRC` se mantiene en mayúsculas para respetar la estructura original del proyecto.
- El build de Vite se genera en `dist/`.
- El directorio `build/` pertenece a la etapa anterior basada en Gulp y ya no forma parte del flujo actual.

## Licencia

ISC - Marco Antonio Rulfo Castro
