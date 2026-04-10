// =======================================================
// MAIN DEL MAPA (PIPELINE COMPLETO)
// =======================================================

import { generarMapa } from "./mapa/generarMapa.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";

// ⚠️ IMPORTANTE: estos deben existir en tu proyecto
import { generarTerrenoBase } from "./mapa/terrenoBase.js";
import { generarBiomas } from "./mapa/generacion-biomas.js";
import { generarTerrenoEspecial } from "./mapa/terrenoEspecial.js";

// =======================================================
// CONFIG
// =======================================================

const ancho = 100;
const alto = 100;
const tamCelda = 32;

// =======================================================
// INICIO
// =======================================================

window.addEventListener("DOMContentLoaded", () => {
    generarYdibujar();
});

// =======================================================
// FUNCIÓN PRINCIPAL
// =======================================================

function generarYdibujar() {

    // =====================================
    // 1. GENERAR TERRENO BASE (GRID)
    // =====================================
    const celdas = generarTerrenoBase(ancho, alto);

    // =====================================
    // 2. GENERAR BIOMAS
    // =====================================
    const biomas = generarBiomas(celdas, ancho, alto);

    // =====================================
    // 3. TERRENO ESPECIAL
    // =====================================
    const especiales = generarTerrenoEspecial(celdas);

    // =====================================
    // 4. HIDROLOGÍA (PIPELINE NUEVO)
    // =====================================
    const { rios, lagos, pantanos } = generarMapa(celdas, ancho, alto);

    // =====================================
    // 5. CONVERTIR A FORMATO DIBUJO
    // =====================================

    const terrenos = celdas.map(c => ({
        x: c.x,
        y: c.y,
        tipo: c.tipo
    }));

    const biomasFlat = celdas.map(c => ({
        x: c.x,
        y: c.y,
        tipo: c.bioma || "pradera"
    }));

    // =====================================
    // 6. DIBUJAR TODO
    // =====================================
    dibujarMapa(
        terrenos,
        biomasFlat,
        especiales,
        rios,
        tamCelda
    );

    // =====================================
    // DEBUG (opcional)
    // =====================================
    console.log("Ríos:", rios.length);
    console.log("Lagos:", lagos.length);
    console.log("Pantanos:", pantanos.length);
}