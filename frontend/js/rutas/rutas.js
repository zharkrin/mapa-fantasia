// frontend/js/rutas/rutas.js

/**
 * Módulo para generación y gestión de rutas
 * Tipos de rutas: terrestres (obligatorias), marinas (opcional), mágicas (opcional)
 */

import { aStar } from './aStar.js';
import { Grafo } from './grafo.js';
import { Ciudades } from './ciudades.js';

export const Rutas = (() => {

    // Opciones para generar rutas
    const opcionesRutas = {
        terrestres: true,
        marinas: false,   // opcional
        magicas: false    // opcional
    };

    // Listado de rutas generadas
    const rutasGeneradas = {
        terrestres: [],
        marinas: [],
        magicas: []
    };

    // Generar rutas terrestres
    function generarTerrestres(ciudades) {
        if (!opcionesRutas.terrestres) return;
        rutasGeneradas.terrestres = [];

        ciudades.forEach((origen) => {
            ciudades.forEach((destino) => {
                if (origen !== destino) {
                    const camino = aStar(origen, destino);
                    rutasGeneradas.terrestres.push(camino);
                }
            });
        });
    }

    // Generar rutas marinas
    function generarMarinas(puertos) {
        if (!opcionesRutas.marinas) return;
        rutasGeneradas.marinas = [];
        // Lógica para rutas marinas
        // Solo si el usuario activa esta opción
    }

    // Generar rutas mágicas
    function generarMagicas(puntosMagicos) {
        if (!opcionesRutas.magicas) return;
        rutasGeneradas.magicas = [];
        // Lógica para rutas mágicas
        // Solo si el usuario activa esta opción
    }

    // Obtener rutas de un tipo
    function obtener(tipo) {
        return rutasGeneradas[tipo] || [];
    }

    // Limpiar rutas
    function limpiar(tipo) {
        if (rutasGeneradas[tipo]) {
            rutasGeneradas[tipo] = [];
        }
    }

    // Exportar funciones públicas
    return {
        opcionesRutas,
        generarTerrestres,
        generarMarinas,
        generarMagicas,
        obtener,
        limpiar
    };
})();