// frontend/js/mapa/generacionTerreno.js

import { generarRuidoPerlin } from '../perlin.js';

/**
 * Generación de terreno base para el mapa
 * Incluye:
 *  - Altura (para relieve)
 *  - Biomas básicos
 *  - Listas de montañas y ríos para asignar nombres
 */

export function generarTerreno(ancho, alto) {
    const escala = 100;
    const terreno = {
        ancho,
        alto,
        altura: [],
        biomas: [],
        montanas: [],
        rios: []
    };

    // Generar mapa de alturas con ruido Perlin
    for (let x = 0; x < ancho; x++) {
        terreno.altura[x] = [];
        for (let y = 0; y < alto; y++) {
            const valorRuido = generarRuidoPerlin(x / escala, y / escala);
            terreno.altura[x][y] = valorRuido;
        }
    }

    // Clasificar biomas y detectar montañas / ríos
    for (let x = 0; x < ancho; x++) {
        terreno.biomas[x] = [];
        for (let y = 0; y < alto; y++) {
            const h = terreno.altura[x][y];

            // Definir bioma según altura
            let bioma = "llanura";
            if (h < 0.3) bioma = "agua";
            else if (h < 0.4) bioma = "costa";
            else if (h < 0.6) bioma = "bosque";
            else if (h < 0.8) bioma = "colina";
            else bioma = "montaña";

            terreno.biomas[x][y] = bioma;

            // Detectar montañas (puntos de altura > 0.8)
            if (bioma === "montaña" && Math.random() < 0.0015) {
                terreno.montanas.push({ x, y });
            }

            // Detectar ríos (zonas de transición entre montaña y costa/agua)
            if (bioma === "agua" && Math.random() < 0.0008) {
                terreno.rios.push({ x, y });
            }
        }
    }

    console.log(
        `Terreno generado: ${terreno.montanas.length} montañas y ${terreno.rios.length} ríos detectados.`
    );

    return terreno;
}