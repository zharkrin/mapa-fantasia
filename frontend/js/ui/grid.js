// =======================================================
// utils/grid.js
// Funciones comunes de grid (vecinos, índices, etc.)
// =======================================================

/**
 * Obtiene vecinos ortogonales
 */
export function obtenerVecinos(celda, celdas, ancho, alto) {

    const offsets = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 }
    ];

    const vecinos = [];

    for (const o of offsets) {

        const nx = celda.x + o.x;
        const ny = celda.y + o.y;

        if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto) {

            const index = ny * ancho + nx;
            vecinos.push(celdas[index]);
        }
    }

    return vecinos;
}