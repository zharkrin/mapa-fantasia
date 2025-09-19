// ===============================
// Script principal
// frontend/js/script.js
// ===============================

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { DibujarMapa } from "./mapa/dibujarMapa.js";
import { TerrenoEspecial } from "./mapa/terrenoEspecial.js";
import { DibujarTerrenoEspecial } from "./mapa/dibujarTerrenoEspecial.js";

window.onload = () => {
    // Obtener canvas y contexto
    const canvas = document.getElementById("mapaCanvas");
    const ctx = canvas.getContext("2d");

    // 1. Generar terreno base
    const celdas = generarTerreno(canvas.width, canvas.height);

    // 2. Dibujar mapa base
    const dibujarMapa = new DibujarMapa(celdas);
    dibujarMapa.dibujar(ctx);

    // 3. Generar terreno especial (volcanes, glaciares, etc.)
    const terrenoEspecial = new TerrenoEspecial();
    terrenoEspecial.generarVolcanes(celdas, 3);
    terrenoEspecial.generarGlaciares(celdas, 2);
    terrenoEspecial.generarBosquesUnicos(celdas, 2);
    terrenoEspecial.generarMontesLegendarios(celdas, 2);
    terrenoEspecial.generarVallesEspeciales(celdas, 2);

    // 4. Dibujar terreno especial
    const dibujarTE = new DibujarTerrenoEspecial(terrenoEspecial);
    dibujarTE.dibujar(ctx);

    console.log("Terreno especial generado:", terrenoEspecial);
};