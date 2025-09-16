// frontend/js/mapa/generacionVoronoi.js
import { coloresTerreno } from "./coloresTerreno.js";

/**
 * Genera regiones y sus polígonos estilo Voronoi
 * @param {number} ancho - ancho del canvas
 * @param {number} alto - alto del canvas
 * @param {number} numRegiones - cantidad de regiones
 * @returns {Array} regiones con centro, tipo y polígonos
 */
export function generarVoronoi(ancho, alto, numRegiones) {
    // generar centros aleatorios
    const centros = [];
    for (let i = 0; i < numRegiones; i++) {
        centros.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            tipo: asignarTipo(),
            nombre: `Región ${i + 1}`
        });
    }

    // generar polígonos Voronoi aproximados (por ahora simple cuadrícula adaptativa)
    // en el futuro se puede reemplazar por algoritmo de Voronoi real
    const regiones = centros.map(c => {
        const poligono = [
            { x: c.x - 50, y: c.y - 50 },
            { x: c.x + 50, y: c.y - 50 },
            { x: c.x + 50, y: c.y + 50 },
            { x: c.x - 50, y: c.y + 50 }
        ];
        return { ...c, poligono };
    });

    return regiones;
}

// función para asignar tipo de bioma
function asignarTipo() {
    const r = Math.random();
    if (r < 0.1) return "montaña";
    if (r < 0.2) return "desierto";
    if (r < 0.35) return "bosque";
    if (r < 0.45) return "helada";
    if (r < 0.55) return "glaciar";
    return "llanura";
}

/**
 * Dibuja regiones Voronoi en el canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} regiones
 */
export function dibujarVoronoi(ctx, regiones) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    regiones.forEach(region => {
        const color = coloresTerreno[region.tipo] || "#cccccc";
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(region.poligono[0].x, region.poligono[0].y);
        for (let i = 1; i < region.poligono.length; i++) {
            ctx.lineTo(region.poligono[i].x, region.poligono[i].y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}