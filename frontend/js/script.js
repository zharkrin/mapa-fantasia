// ===============================
// Script principal
// frontend/js/script.js
// ===============================

import { DibujarTerreno } from "./mapa/dibujarMapa.js";
import { DibujarNombres } from "./mapa/dibujarNombres.js";
import { dibujarTerrenoEspecial } from "./mapa/dibujarTerrenoEspecial.js";
import { generarTerreno } from "./mapa/generacionTerreno.js";
import { generarNombres } from "./mapa/nombres.js";
import { generarTerrenoEspecial } from "./mapa/terrenoEspecial.js";

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mapaCanvas");
    const ctx = canvas.getContext("2d");

    // 1. Generar terreno base
    const terreno = generarTerreno();

    // 2. Dibujar terreno
    const dibujarTerreno = new DibujarTerreno(terreno);
    dibujarTerreno.dibujar(ctx);

    // 3. Generar nombres
    const nombres = generarNombres(terreno);

    // 4. Dibujar nombres
    const dibujarNombres = new DibujarNombres(nombres);
    dibujarNombres.dibujar(ctx);

    // 5. Generar lugares singulares (volcanes, glaciares, bosques legendarios, etc.)
    const terrenoEspecial = generarTerrenoEspecial(terreno);

    // 6. Dibujar lugares singulares
    dibujarTerrenoEspecial(ctx, terrenoEspecial);
});