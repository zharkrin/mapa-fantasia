// frontend/js/script.js
// Script principal del generador de mapas de fantasía

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";
import { Etiquetas } from "./etiquetas.js";
import { Rutas } from "./rutas/rutas.js";
import { NombresGeograficos } from "./mapa/nombresGeograficos.js";

let canvas, ctx;
let mapa = null;
let etiquetas = null;
let rutas = null;

function inicializar() {
    canvas = document.getElementById("mapaCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generar mapa inicial
    mapa = generarTerreno(canvas.width, canvas.height);

    // Crear sistema de nombres geográficos
    const nombresGeo = new NombresGeograficos();
    mapa = nombresGeo.generarNombresMapa(mapa);

    // Crear sistema de etiquetas
    etiquetas = new Etiquetas();

    // Crear sistema de rutas
    rutas = new Rutas();
    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    dibujar();
}

function dibujar() {
    dibujarMapa(ctx, mapa);
    rutas.dibujar(ctx);
    etiquetas.dibujar(ctx);
}

document.getElementById("btnGenerar").addEventListener("click", () => {
    mapa = generarTerreno(canvas.width, canvas.height);

    const nombresGeo = new NombresGeograficos();
    mapa = nombresGeo.generarNombresMapa(mapa);

    rutas.limpiar();
    etiquetas.limpiar();

    if (mapa.ciudades) {
        rutas.generarAutomaticas(mapa.ciudades);
        rutas.generarRutasPrincipales(mapa.ciudades);
    }

    dibujar();
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dibujar();
});

window.onload = inicializar;