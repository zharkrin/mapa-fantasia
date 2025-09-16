// frontend/js/mapa/rutasTerrestres.js

/**
 * Generador de rutas terrestres entre asentamientos
 * Se asegura de que las rutas conecten de forma coherente ciudades, pueblos o aldeas.
 * Las rutas especiales (marinas y mágicas) quedan fuera de este archivo.
 */

import { mapa } from './generacionTerreno.js';
import { asentamientos } from './asentamientos.js';

export let rutasTerrestres = [];

/**
 * Función principal para generar rutas terrestres.
 * Conecta asentamientos cercanos en función de su importancia y la distancia.
 */
export function generarRutasTerrestres() {
    rutasTerrestres = [];

    if (!asentamientos || asentamientos.length === 0) {
        console.warn("No hay asentamientos para generar rutas terrestres.");
        return;
    }

    // Ordenar por importancia (ciudad > pueblo > aldea)
    const ciudades = asentamientos.filter(a => a.tipo === "ciudad");
    const pueblos = asentamientos.filter(a => a.tipo === "pueblo");
    const aldeas = asentamientos.filter(a => a.tipo === "aldea");

    // Conectar ciudades primero
    conectarAsentamientos(ciudades, 3);

    // Conectar pueblos con ciudades cercanas
    conectarAsentamientos(pueblos, 2, ciudades);

    // Conectar aldeas con pueblos o ciudades
    conectarAsentamientos(aldeas, 1, pueblos.concat(ciudades));
}

/**
 * Conecta un grupo de asentamientos entre sí o hacia un grupo mayor.
 * @param {Array} origenes - asentamientos a conectar
 * @param {number} maxConexiones - número máximo de conexiones por asentamiento
 * @param {Array} destinos - asentamientos hacia los que conectar (opcional)
 */
function conectarAsentamientos(origenes, maxConexiones, destinos = null) {
    for (let origen of origenes) {
        let posiblesDestinos = destinos || origenes.filter(a => a !== origen);

        if (posiblesDestinos.length === 0) continue;

        // Ordenar por distancia
        posiblesDestinos.sort((a, b) => distancia(origen, a) - distancia(origen, b));

        let conexiones = 0;
        for (let destino of posiblesDestinos) {
            if (conexiones >= maxConexiones) break;

            if (!existeRuta(origen, destino)) {
                rutasTerrestres.push({ desde: origen, hasta: destino });
                conexiones++;
            }
        }
    }
}

/**
 * Comprueba si ya existe una ruta entre dos asentamientos
 */
function existeRuta(a, b) {
    return rutasTerrestres.some(r =>
        (r.desde === a && r.hasta === b) || (r.desde === b && r.hasta === a)
    );
}

/**
 * Distancia euclidiana entre dos puntos
 */
function distancia(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}