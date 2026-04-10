// =======================================================
// PANTANOS 
// =======================================================

import { obtenerVecinos } from "../utils/grid.js";

export function generarPantanos(rios, lagos, celdas, ancho, alto) {

    const pantanos = [];

    // RÍOS
    rios.forEach(rio => {
        const final = rio[rio.length - 1];

        if (final.altura < 0.3) {
            expandir(final);
        }
    });

    // LAGOS
    lagos.forEach(lago => {
        lago.forEach(celda => {
            const vecinos = obtenerVecinos(celda, celdas, ancho, alto);
            vecinos.forEach(v => {
                if (v.altura < 0.3) expandir(v);
            });
        });
    });

    return pantanos;

    function expandir(origen) {
        const vecinos = obtenerVecinos(origen, celdas, ancho, alto);

        vecinos.forEach(v => {
            if (v.altura < 0.32 && v.tipo !== "mar") {
                pantanos.push(v);
            }
        });
    }
}