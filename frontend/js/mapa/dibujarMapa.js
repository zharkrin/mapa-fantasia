// frontend/js/mapa/dibujarMapa.js
import { coloresTerreno } from "./coloresTerreno.js";

/**
 * Dibuja el mapa en un canvas usando las regiones generadas
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas
 * @param {Array} regiones - lista de regiones generadas
 */
export function dibujarMapa(ctx, regiones) {
    // limpiar canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    regiones.forEach(region => {
        const color = coloresTerreno[region.tipo] || "#cccccc"; // gris por defecto
        ctx.fillStyle = color;

        // dibujar región como un círculo por ahora (placeholder de polígonos)
        ctx.beginPath();
        ctx.arc(region.centro.x, region.centro.y, 40, 0, Math.PI * 2);
        ctx.fill();

        // trazo fino para separar regiones
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}