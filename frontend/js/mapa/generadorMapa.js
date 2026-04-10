// =======================================================
// PIPELINE COMPLETO DEL MAPA
// =======================================================

import { generarRios } from "./rios.js";
import { generarLagos } from "./lagos.js";
import { generarPantanos } from "./pantanos.js";

export function generarMapa(celdas, ancho, alto) {

    // 1. RÍOS
    const rios = generarRios(celdas, ancho, alto);

    // 2. LAGOS
    const lagos = generarLagos(rios, celdas, ancho, alto);

    // 3. PANTANOS
    const pantanos = generarPantanos(rios, lagos, celdas, ancho, alto);

    return {
        rios,
        lagos,
        pantanos
    };
}