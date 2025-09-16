// frontend/js/mapa/caminosSplines.js
import { generarCaminosCurvos } from "./caminosCurvos.js";

/**
 * Genera rutas suavizadas usando splines
 * @param {Array} regiones - lista de regiones
 * @param {number} ancho
 * @param {number} alto
 * @param {number} gridSize
 * @returns {Array} caminos con ruta suavizada
 */
export function generarCaminosSplines(regiones, ancho, alto, gridSize = 20) {
    const caminosCurvos = generarCaminosCurvos(regiones, ancho, alto, gridSize);

    // Suavizar cada camino
    const caminosSuaves = caminosCurvos.map(c => {
        return {
            origen: c.origen,
            destino: c.destino,
            tipo: c.tipo,
            ruta: suavizarRuta(c.ruta)
        };
    });

    return caminosSuaves;
}

/**
 * Suaviza una ruta de puntos usando interpolación cúbica simple
 * @param {Array} ruta
 * @returns {Array} ruta suavizada
 */
function suavizarRuta(ruta) {
    if (ruta.length < 3) return ruta;

    const nuevaRuta = [];
    for (let i = 0; i < ruta.length - 1; i++) {
        const p0 = ruta[i];
        const p1 = ruta[i + 1];
        // Interpolación simple: puntos intermedios
        const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        nuevaRuta.push(p0);
        nuevaRuta.push(mid);
    }
    nuevaRuta.push(ruta[ruta.length - 1]);
    return nuevaRuta;
}

/**
 * Dibuja rutas suavizadas en canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} caminos
 */
export function dibujarCaminosSplines(ctx, caminos) {
    caminos.forEach(c => {
        switch (c.tipo) {
            case "comercial": ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 2; break;
            case "militar": ctx.strokeStyle = "#FF4500"; ctx.lineWidth = 2.5; break;
            case "magico": ctx.strokeStyle = "#4B0082"; ctx.lineWidth = 3; ctx.setLineDash([5,5]); break;
            default: ctx.strokeStyle = "#AAAAAA"; ctx.lineWidth = 1.5;
        }

        ctx.beginPath();
        const ruta = c.ruta;
        if (ruta.length > 0) {
            ctx.moveTo(ruta[0].x, ruta[0].y);
            for (let i = 1; i < ruta.length; i++) {
                ctx.lineTo(ruta[i].x, ruta[i].y);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
    });
}