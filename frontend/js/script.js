// ============================
// script.js — Generador de mapa fantástico
// ============================

import { inicializarLeyendaTerrenoEspecial } from './leyendaTerrenoEspecial.js';

// -----------------------------
// CONFIGURACIONES GENERALES
// -----------------------------

const CANVAS_ID = "mapaCanvas";
const BOTON_GENERAR_ID = "btnGenerarMapa";

const RUTA_ICONOS_TERRENO = "static/img/icons/terreno/";
const RUTA_ICONOS_BIOMAS = "static/img/icons/biomas/";
const RUTA_ICONOS_ESPECIALES = "static/img/icons/terreno_especial/";

const DIMENSIONES_MAPA = { ancho: 1000, alto: 600 };
const NUM_TILES_X = 10;
const NUM_TILES_Y = 6;

// -----------------------------
// LISTAS DE ELEMENTOS
// -----------------------------

const TERRENOS = [
    "acantilado", "canon", "colina", "costa", "lago", "mar", "mesera",
    "montanas", "oceano", "pantano", "playa", "valle", "volcan",
    "glaciar", "rio", "crater", "cavernas"
];

const BIOMAS = [
    "bosque_boreal", "bosque_tropical", "bosque", "desierto_calido",
    "desierto_frio", "estepa", "humedal", "pradera", "sabana",
    "selva_tropical", "tundra", "tierras_aridas", "chaparral",
    "selva", "manglar", "jungla", "matorral"
];

const TERRENOS_ESPECIALES = [
    "bosque_especial", "desierto_calido_especial", "glaciar_especial",
    "lago_especial", "montanas_especial", "pantano_especial", "volcan_especial"
];

// -----------------------------
// INICIALIZACIÓN DEL MAPA
// -----------------------------

function inicializarMapa() {
    const canvas = document.getElementById(CANVAS_ID);
    if (!canvas) {
        console.error("No se encontró el canvas del mapa.");
        return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = DIMENSIONES_MAPA.ancho;
    canvas.height = DIMENSIONES_MAPA.alto;

    generarMapa(ctx);
}

// -----------------------------
// GENERACIÓN DEL MAPA
// -----------------------------

function generarMapa(ctx) {
    ctx.clearRect(0, 0, DIMENSIONES_MAPA.ancho, DIMENSIONES_MAPA.alto);

    const tileWidth = DIMENSIONES_MAPA.ancho / NUM_TILES_X;
    const tileHeight = DIMENSIONES_MAPA.alto / NUM_TILES_Y;

    for (let y = 0; y < NUM_TILES_Y; y++) {
        for (let x = 0; x < NUM_TILES_X; x++) {
            const tipo = Math.random();
            let imagen = new Image();

            // 80% terrenos normales o biomas
            if (tipo < 0.8) {
                const lista = tipo < 0.4 ? TERRENOS : BIOMAS;
                const nombre = lista[Math.floor(Math.random() * lista.length)];
                const ruta = tipo < 0.4 ? RUTA_ICONOS_TERRENO : RUTA_ICONOS_BIOMAS;
                imagen.src = `${ruta}${nombre}.png`;
            }
            // 20% terrenos especiales
            else {
                const nombreEspecial = TERRENOS_ESPECIALES[Math.floor(Math.random() * TERRENOS_ESPECIALES.length)];
                imagen.src = `${RUTA_ICONOS_ESPECIALES}${nombreEspecial}.png`;
            }

            imagen.onerror = () => { imagen.src = `${RUTA_ICONOS_ESPECIALES}placeholder.png`; };

            imagen.onload = () => {
                ctx.drawImage(imagen, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            };
        }
    }
}

// -----------------------------
// EVENTOS Y BOTONES
// -----------------------------

function inicializarBotones() {
    const botonGenerar = document.getElementById(BOTON_GENERAR_ID);
    if (!botonGenerar) return;

    botonGenerar.addEventListener("click", () => {
        const canvas = document.getElementById(CANVAS_ID);
        if (canvas) {
            const ctx = canvas.getContext("2d");
            generarMapa(ctx);
        }
    });
}

// -----------------------------
// INICIALIZACIÓN GLOBAL
// -----------------------------

window.addEventListener("DOMContentLoaded", () => {
    inicializarMapa();
    inicializarBotones();
    inicializarLeyendaTerrenoEspecial();
});