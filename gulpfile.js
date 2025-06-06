import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series, parallel } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import sharp from 'sharp';
import rename from 'gulp-rename';

// Inicializar sass con dartSass (ya que node-sass está deprecado)
const sass = gulpSass(dartSass);

// Rutas centralizadas - MODIFICADAS para usar mayúsculas como en tu estructura real
const paths = {
    src: {
        scss: 'SRC/SASS/**/*.scss',
        js: 'SRC/JS/**/*.js',
        img: 'SRC/img/**/*'
    },
    build: {
        css: './build/css',
        js: './build/js',
        img: './build/img'
    }
};

// Opciones para procesamiento de imágenes
const imageOptions = {
    jpeg: { quality: 80 },
    webp: { quality: 80 },
    avif: {}
};

// Compilar SCSS a CSS
export function css() {
    console.log('Compilando SCSS a CSS...');
    return src(paths.src.scss, { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest(paths.build.css, { sourcemaps: '.' }));
}

// Compilar JS
export function js() {
    console.log('Compilando JS...');
    return src(paths.src.js)
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.build.js));
}

// Procesar imágenes
export async function imagenes() {
    console.log('Procesando imágenes...');
    const srcDir = './SRC/img'; // Cambio a mayúsculas
    const buildDir = paths.build.img;

    try {
        const images = await glob(paths.src.img);

        // Procesar las imágenes en paralelo
        const processingPromises = images.map(file => {
            const relativePath = path.relative(srcDir, path.dirname(file));
            const outputSubDir = path.join(buildDir, relativePath);
            return procesarImagenes(file, outputSubDir);
        });

        await Promise.all(processingPromises);
        return Promise.resolve();
    } catch (err) {
        console.error('Error procesando imágenes:', err);
        return Promise.reject(err);
    }
}

// Función para procesar cada imagen individual
async function procesarImagenes(file, outputSubDir) {
    // Crear el directorio de salida si no existe
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    }

    const baseName = path.basename(file, path.extname(file));
    const extName = path.extname(file).toLowerCase();

    // Procesar según el tipo de archivo
    if (extName === '.svg') {
        // Copiar SVGs sin procesar
        const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
        fs.copyFileSync(file, outputFile);
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extName)) {
        // Procesar formatos de imagen raster
        try {
            const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
            const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
            const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

            // Procesar en paralelo los diferentes formatos
            await Promise.all([
                sharp(file).jpeg(imageOptions.jpeg).toFile(outputFile),
                sharp(file).webp(imageOptions.webp).toFile(outputFileWebp),
                sharp(file).avif(imageOptions.avif).toFile(outputFileAvif)
            ]);
        } catch (err) {
            console.error(`Error procesando imagen ${file}:`, err);
        }
    }
}

// Copiar archivos HTML
export function html() {
    console.log('Copiando HTML...');
    return src('./index.html')
        .pipe(dest('./'));
}

// Crear directorios necesarios
export function crearDirectorios(done) {
    console.log('Creando directorios...');
    const dirs = [
        './build',
        paths.build.css,
        paths.build.js,
        paths.build.img,
        './SRC/SASS', // Cambiado a mayúsculas
        './SRC/JS',   // Cambiado a mayúsculas
        './SRC/img'   // Cambiado a mayúsculas
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    done();
}

// Eliminar la carpeta build
export function limpiar(done) {
    console.log('Limpiando carpeta build...');
    if (fs.existsSync('./build')) {
        fs.rmSync('./build', { recursive: true, force: true });
    }
    done();
}

// Tareas de desarrollo: observar cambios
export function dev() {
    console.log('Iniciando modo desarrollo...');
    console.log('Escuchando cambios en:', paths.src.scss);
    console.log('Escuchando cambios en:', paths.src.js);

    watch(paths.src.scss, css);
    watch(paths.src.js, js);
    watch([
        'SRC/img/**/*.{png,jpg,jpeg,gif,svg,webp}' // Cambiado a mayúsculas
    ], imagenes);
    watch('./index.html', html);
}

// Tarea de construcción: compila todos los activos
export const build = series(
    limpiar,
    crearDirectorios,
    parallel(css, js, imagenes, html)
);

// Tarea por defecto: ejecutar todo en paralelo y luego el modo desarrollo
export default series(
    crearDirectorios,
    parallel(css, js, imagenes, html),
    dev
);