# Mi Sitio Web Personal

Portafolio personal de Marco Antonio Rulfo Castro migrado a React con Vite, Sass y GSAP.

## Stack actual

- React para la interfaz y la composición del sitio
- Vite como entorno de desarrollo y build
- Sass para estilos y layout responsivo
- GSAP para animaciones sutiles
- jsPDF para generar el CV desde la propia aplicación

## Características

- Diseño responsivo para desktop, tablet y mobile
- Navegación móvil con menú colapsable
- Secciones de perfil, experiencia, formación, certificaciones, habilidades y contacto
- Modal de detalle para experiencia profesional
- Formulario que prepara el mensaje en el cliente de correo
- Descarga dinámica de CV en PDF
- Carga local de certificaciones sin `fetch` roto

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

## Notas

- El directorio `SRC` se mantiene en mayúsculas para respetar la estructura original del proyecto.
- El build de Vite se genera en `dist/`.
- El directorio `build/` pertenece a la etapa anterior basada en Gulp y ya no forma parte del flujo actual.

## Licencia

ISC - Marco Antonio Rulfo Castro
