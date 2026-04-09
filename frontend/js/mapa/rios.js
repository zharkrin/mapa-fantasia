// =======================================================
// RÍOS - SISTEMA LIMPIO 
// =======================================================

import { obtenerVecinos } from "../utils/grid.js";

const MAX_RIOS = 12;
const LONGITUD_MIN_RIO = 6;
const LONGITUD_MAX_RIO = 25;

export function generarRios(celdas, ancho, alto) {

    const rios = [];
    const nacimientos = celdas.filter(c =>
        c.altura >= 0.75 &&
        c.tipo !== "mar" &&
        c.tipo !== "oceano"
    );

    shuffleArray(nacimientos);

    for (let i = 0; i < nacimientos.length && rios.length < MAX_RIOS; i++) {

        const rio = generarRioDesde(nacimientos[i], celdas, ancho, alto);

        if (rio.length >= LONGITUD_MIN_RIO) {
            rios.push(rio);
        }
    }

    return rios;
}

function generarRioDesde(inicio, celdas, ancho, alto) {

    const rio = [];
    const visitadas = new Set();

    let actual = inicio;

    while (actual && rio.length < LONGITUD_MAX_RIO) {

        const key = `${actual.x},${actual.y}`;
        if (visitadas.has(key)) break;

        rio.push(actual);
        visitadas.add(key);

        const vecinos = obtenerVecinos(actual, celdas, ancho, alto);

        let siguiente = null;
        let mejorAltura = actual.altura;

        for (const v of vecinos) {
            if (v.altura < mejorAltura) {
                mejorAltura = v.altura;
                siguiente = v;
            }
        }

        if (!siguiente) break;

        actual = siguiente;

        if (actual.tipo === "mar" || actual.tipo === "oceano") {
            rio.push(actual);
            break;
        }
    }

    return rio;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}