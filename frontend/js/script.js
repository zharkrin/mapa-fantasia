// frontend/js/script.js
// Script completo del generador de mapas de fantasía

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

// Inicialización del mapa y módulos
function inicializar() {
    canvas = document.getElementById("mapaCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generar terreno
    mapa = generarTerreno(canvas.width, canvas.height);

    // Generar nombres geográficos
    const nombresGeo = new NombresGeograficos();
    mapa = nombresGeo.generarNombresMapa(mapa);

    // Inicializar etiquetas
    etiquetas = new Etiquetas();
    etiquetas.generarAutomaticas(mapa);

    // Inicializar rutas
    rutas = new Rutas();
    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    // Inicializar dibujo de nombres
    dibujarNombres = new DibujarNombres("#FFFFFF", "14px Arial");

    dibujar();
}

// Función principal de dibujo
function dibujar() {
    if (!ctx || !mapa) return;

    // Dibujar mapa base
    dibujarMapa(ctx, mapa);

    // Dibujar rutas
    if (rutas) rutas.dibujar(ctx);

    // Dibujar etiquetas
    if (etiquetas) etiquetas.dibujar(ctx);

    // Dibujar nombres geográficos y ciudades
    if (dibujarNombres) dibujarNombres.dibujar(ctx, mapa, etiquetas);
}

// Evento de botón para generar nuevo mapa
document.getElementById("btnGenerar").addEventListener("click", () => {
    mapa = generarTerreno(canvas.width, canvas.height);

    const nombresGeo = new NombresGeograficos();
    mapa = nombresGeo.generarNombresMapa(mapa);

    etiquetas.limpiar();
    etiquetas.generarAutomaticas(mapa);

    rutas.limpiar();
    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    dibujar();
});

// Redimensionar canvas al cambiar tamaño de ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dibujar();
});

// Inicializar al cargar la página
window.onload = inicializar;