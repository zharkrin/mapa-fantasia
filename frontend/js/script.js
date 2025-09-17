// frontend/js/script.js

import { generarTerreno } from './mapa/generacionTerreno.js';
import { dibujarMapa } from './mapa/dibujarMapa.js';
import { Rutas } from './rutas/rutas.js';
import { DrawRutas } from './ui/drawRutas.js';
import { GeneradorNombres } from './nombresGeograficos.js';
import { DibujarNombres } from './mapa/dibujarNombres.js';

/**
 * Script principal del generador de mapas
 * Coordina la generación de terreno, rutas, nombres y renderizado.
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mapa");
    const ctx = canvas.getContext("2d");

    // Paso 1: Generar terreno
    console.log("Generando terreno...");
    const terreno = generarTerreno(canvas.width, canvas.height);

    // Paso 2: Dibujar terreno en el mapa
    console.log("Dibujando mapa...");
    dibujarMapa(ctx, terreno);

    // Paso 3: Generar rutas terrestres principales
    console.log("Generando rutas...");
    const rutas = Rutas.generar(terreno);

    // Paso 4: Dibujar rutas
    DrawRutas.dibujar(ctx, rutas);

    // Paso 5: Generar y asignar nombres a ríos y montañas
    console.log("Asignando nombres a montañas y ríos...");
    const listaMontanas = terreno.montanas || [];
    const listaRios = terreno.rios || [];

    GeneradorNombres.asignarMontanas(listaMontanas);
    GeneradorNombres.asignarRios(listaRios);

    // Paso 6: Dibujar etiquetas de nombres en el mapa
    console.log("Dibujando nombres...");
    DibujarNombres.dibujar(ctx);

    console.log("Mapa generado con éxito.");
});