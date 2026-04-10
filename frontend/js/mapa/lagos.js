// =======================================================
// LAGOS (SIN GLOBALS)
// =======================================================

import { obtenerVecinos } from "../utils/grid.js";

export function generarLagos(rios, celdas, ancho, alto) {

    const lagos = [];

    rios.forEach(rio => {

        const ultimo = rio[rio.length - 1];

        if (ultimo.altura < 0.25 && ultimo.tipo !== "mar") {

            const lago = expandirLago(ultimo, celdas, ancho, alto);

            if (lago.length > 0) {
                lagos.push(lago);
            }
        }
    });

    return lagos;
}

function expandirLago(origen, celdas, ancho, alto) {

    const lago = [];
    const visitadas = new Set();
    const cola = [origen];

    while (cola.length && lago.length < 30) {

        const actual = cola.shift();
        const key = `${actual.x},${actual.y}`;

        if (visitadas.has(key)) continue;
        visitadas.add(key);

        lago.push(actual);

        const vecinos = obtenerVecinos(actual, celdas, ancho, alto);

        vecinos.forEach(v => {
            if (!visitadas.has(`${v.x},${v.y}`) && v.altura <= actual.altura + 0.02) {
                cola.push(v);
            }
        });
    }

    return lago;
}