// frontend/js/script.js
// Script principal del generador de mapas de fantasía

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";
import { Etiquetas } from "./etiquetas.js";
import { Rutas } from "./rutas/rutas.js";

let canvas, ctx;
let mapa = null;
let etiquetas = null;
let rutas = null;

function inicializar() {
    canvas = document.getElementById("mapaCanvas");
    ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generar el mapa inicial
    mapa = generarTerreno(canvas.width, canvas.height);

    // Crear sistema de etiquetas
    etiquetas = new Etiquetas();

    // Crear sistema de rutas
    rutas = new Rutas();

    // Generar rutas automáticas
    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    // Dibujar mapa base
    dibujar();
}

function dibujar() {
    // Dibujar terreno y biomas
    dibujarMapa(ctx, mapa);

    // Dibujar rutas terrestres
    rutas.dibujar(ctx);

    // Dibujar etiquetas
    etiquetas.dibujar(ctx);
}

// Evento: generar un mapa nuevo
document.getElementById("btnGenerar").addEventListener("click", () => {
    mapa = generarTerreno(canvas.width, canvas.height);
    rutas.limpiar();
    etiquetas.limpiar();

    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    dibujar();
});

// Ajustar canvas al redimensionar ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dibujar();
});

// Iniciar cuando la ventana cargue
window.onload = inicializar;