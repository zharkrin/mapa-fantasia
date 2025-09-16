// frontend/js/mapa/generacionVoronoiReal.js
import { coloresTerreno } from "./coloresTerreno.js";

/**
 * Genera regiones tipo Voronoi reales con polígonos
 * @param {number} ancho - ancho del canvas
 * @param {number} alto - alto del canvas
 * @param {number} numRegiones - número de regiones
 * @returns {Array} regiones con centro, tipo y polígono Voronoi
 */
export function generarVoronoiReal(ancho, alto, numRegiones) {
    // generar puntos centrales
    const puntos = [];
    for (let i = 0; i < numRegiones; i++) {
        puntos.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            tipo: asignarTipo(),
            nombre: `Región ${i + 1}`
        });
    }

    // usar librería simple de Voronoi: d3-voronoi
    // https://github.com/d3/d3-voronoi
    const voronoi = d3.Delaunay.from(
        puntos,
        d => d.x,
        d => d.y
    ).voronoi([0, 0, ancho, alto]);

    const regiones = puntos.map((p, i) => {
        const poligono = voronoi.cellPolygon(i);
        return {
            ...p,
            poligono: poligono || [
                { x: p.x - 10, y: p.y - 10 },
                { x: p.x + 10, y: p.y - 10 },
                { x: p.x + 10, y: p.y + 10 },
                { x: p.x - 10, y: p.y + 10 }
            ]
        };
    });

    return regiones;
}

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
 * Dibuja regiones Voronoi en canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} regiones
 */
export function dibujarVoronoiReal(ctx, regiones) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    regiones.forEach(region => {
        const color = coloresTerreno[region.tipo] || "#cccccc";
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(region.poligono[0][0], region.poligono[0][1]);
        for (let i = 1; i < region.poligono.length; i++) {
            ctx.lineTo(region.poligono[i][0], region.poligono[i][1]);
        }
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}