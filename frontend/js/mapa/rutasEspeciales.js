// frontend/js/mapa/rutasEspeciales.js

/**
 * Generador de rutas especiales (marinas y mágicas).
 * Estas rutas son opcionales y no se generan por defecto.
 * Se podrán activar manualmente desde el script principal cuando se desee.
 */

import { asentamientos } from './asentamientos.js';

export let rutasEspeciales = {
    marinas: [],
    magicas: []
};

/**
 * Genera rutas marinas entre puertos.
 * Solo conecta asentamientos que tengan atributo "puerto: true".
 */
export function generarRutasMarinas() {
    rutasEspeciales.marinas = [];

    const puertos = asentamientos.filter(a => a.puerto === true);
    if (puertos.length < 2) {
        console.warn("No hay suficientes puertos para rutas marinas.");
        return;
    }

    for (let i = 0; i < puertos.length; i++) {
        for (let j = i + 1; j < puertos.length; j++) {
            const desde = puertos[i];
            const hasta = puertos[j];
            rutasEspeciales.marinas.push({ desde, hasta });
        }
    }
}

/**
 * Genera rutas mágicas entre ciudades con nodos de poder.
 * Conecta asentamientos que tengan atributo "magico: true".
 */
export function generarRutasMagicas() {
    rutasEspeciales.magicas = [];

    const nodos = asentamientos.filter(a => a.magico === true);
    if (nodos.length < 2) {
        console.warn("No hay suficientes nodos mágicos para rutas mágicas.");
        return;
    }

    for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
            const desde = nodos[i];
            const hasta = nodos[j];
            rutasEspeciales.magicas.push({ desde, hasta });
        }
    }
}

/**
 * Limpia todas las rutas especiales (reset).
 */
export function limpiarRutasEspeciales() {
    rutasEspeciales.marinas = [];
    rutasEspeciales.magicas = [];
}