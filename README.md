# Mi Sitio Web Personal

Sitio web personal tipo currículum para Marco Antonio Rulfo Castro.

## Características

- Diseño completamente responsivo para dispositivos móviles, tablets y desktop
- Secciones para presentación personal, sobre mí, certificaciones y habilidades
- Formulario de contacto
- Enlaces a redes sociales y métodos de contacto
- Procesamiento de imágenes optimizadas (JPEG, WebP, AVIF)
- Compilación de SCSS y JavaScript

## Estructura del Proyecto

```
/
├── build/              # Archivos compilados (generados por Gulp)
│   ├── css/            # CSS compilado
│   ├── js/             # JavaScript compilado
│   └── img/            # Imágenes optimizadas
├── src/                # Código fuente
│   ├── scss/           # Archivos SCSS
│   │   ├── base/       # Estilos base (variables, mixins, reset, etc.)
│   │   └── layout/     # Componentes y secciones
│   ├── js/             # Archivos JavaScript
│   └── img/            # Imágenes originales
├── index.html          # Página principal
├── gulpfile.js         # Configuración de Gulp
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## Requisitos

- Node.js 16.x o superior
- npm 8.x o superior

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Marcor360/Mi-Sitio-Web.git
   cd Mi-Sitio-Web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Desarrollo

Para iniciar el entorno de desarrollo con recompilación automática:

```bash
npm run dev
```

Esto iniciará Gulp en modo desarrollo y vigilará los cambios en los archivos SCSS, JS e imágenes.

### Construcción

Para construir el proyecto para producción:

```bash
npm run build
```

Esto limpiará la carpeta `build` y generará nuevos archivos optimizados.

## Personalización

### Imágenes

Coloca tus imágenes en la carpeta `src/img/`. Serán procesadas automáticamente en varios formatos:
- El formato original se mantendrá
- Se creará una versión WebP (mejor compatibilidad y compresión)
- Se creará una versión AVIF (máxima compresión para navegadores modernos)

### Estilos

Los estilos están organizados en módulos SCSS para facilitar su mantenimiento:

- `_variables.scss`: Colores, tipografía, tamaños, etc.
- `_mixins.scss`: Funciones reutilizables para responsividad y componentes
- Archivos específicos para cada sección del sitio

### JavaScript

El archivo `app.js` contiene la funcionalidad principal del sitio, incluyendo:

- Menú de navegación móvil
- Animaciones de elementos
- Manejo del formulario de contacto

## Despliegue

Este sitio puede desplegarse en cualquier servidor web estático, incluyendo:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Cualquier servidor web tradicional

## Licencia

ISC - Marco Antonio Rulfo Castro