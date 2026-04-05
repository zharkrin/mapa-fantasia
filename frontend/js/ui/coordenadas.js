// =======================================================
// utils/coordenadas.js
// Conversión GRID <-> PIXEL
// =======================================================

/**
 * Convierte coordenadas de celda (grid) a píxeles
 */
export function gridAPixel(x, y, tamCelda) {
    return {
        x: x * tamCelda,
        y: y * tamCelda
    };
}

/**
 * Convierte píxeles a coordenadas de celda
 */
export function pixelAGrid(px, py, tamCelda) {
    return {
        x: Math.floor(px / tamCelda),
        y: Math.floor(py / tamCelda)
    };
}