// frontend/js/script.js
// Script completo del generador de mapas de fantasía con interactividad

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { DibujarNombres } from "./mapa/dibujarNombres.js";
import { Etiquetas } from "./etiquetas.js";
import { Rutas } from "./rutas/rutas.js";
import { NombresGeograficos } from "./mapa/nombresGeograficos.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";

let canvas, ctx;
let mapa = null;
let etiquetas = null;
let rutas = null;
let dibujarNombres = null;

// Variables de interactividad
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// Inicialización del mapa y módulos
function inicializar() {
    canvas = document.getElementById("mapaCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    generarMapa();

    // Eventos de interacción
    canvas.addEventListener("mousedown", iniciarArrastre);
    canvas.addEventListener("mousemove", arrastrando);
    canvas.addEventListener("mouseup", finalizarArrastre);
    canvas.addEventListener("wheel", zoomMapa);
}

// Función para generar mapa completo
function generarMapa() {
    mapa = generarTerreno(canvas.width, canvas.height);

    // Nombres geográficos
    const nombresGeo = new NombresGeograficos();
    mapa = nombresGeo.generarNombresMapa(mapa);

    // Etiquetas
    etiquetas = new Etiquetas();
    etiquetas.generarAutomaticas(mapa);

    // Rutas terrestres
    rutas = new Rutas();
    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    // Dibujo de nombres
    dibujarNombres = new DibujarNombres("#FFFFFF", "14px Arial");

    dibujar();
}

// Función principal de dibujo con zoom y desplazamiento
function dibujar() {
    if (!ctx || !mapa) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Dibujar mapa base
    dibujarMapa(ctx, mapa);

    // Dibujar rutas
    if (rutas) rutas.dibujar(ctx);

    // Dibujar etiquetas
    if (etiquetas) etiquetas.dibujar(ctx);

    // Dibujar nombres geográficos y ciudades
    if (dibujarNombres) dibujarNombres.dibujar(ctx, mapa, etiquetas);

    ctx.restore();
}

// Zoom con rueda del ratón
function zoomMapa(event) {
    event.preventDefault();
    const zoomFactor = 0.1;
    const delta = event.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;
    scale *= delta;

    // Ajustar offset para que zoom se centre en el cursor
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    offsetX -= (mx - offsetX) * (delta - 1);
    offsetY -= (my - offsetY) * (delta - 1);

    dibujar();
}

// Arrastre del mapa
function iniciarArrastre(event) {
    isDragging = true;
    dragStartX = event.clientX - offsetX;
    dragStartY = event.clientY - offsetY;
}

function arrastrando(event) {
    if (!isDragging) return;
    offsetX = event.clientX - dragStartX;
    offsetY = event.clientY - dragStartY;
    dibujar();
}

function finalizarArrastre() {
    isDragging = false;
}

// Botón para regenerar mapa
document.getElementById("btnGenerar").addEventListener("click", () => {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    generarMapa();
});

// Redimensionar canvas al cambiar tamaño de ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dibujar();
});

// Inicializar al cargar la página
window.onload = inicializar;