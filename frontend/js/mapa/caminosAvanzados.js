// frontend/js/mapa/caminosAvanzados.js
import { coloresTerreno } from "./coloresTerreno.js";

/**
 * Genera caminos avanzados entre regiones
 * @param {Array} regiones - lista de regiones con {centro, tipo}
 * @param {number} maxDist - distancia máxima para conexión
 * @returns {Array} lista de caminos [{origen, destino, tipo}]
 */
export function generarCaminosAvanzados(regiones, maxDist = 250) {
    const caminos = [];

    for (let i = 0; i < regiones.length; i++) {
        for (let j = i + 1; j < regiones.length; j++) {
            const r1 = regiones[i];
            const r2 = regiones[j];
            const dx = r1.centro.x - r2.centro.x;
            const dy = r1.centro.y - r2.centro.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= maxDist) {
                // Asignar tipo de camino según bioma o probabilidad
                let tipo = "comercial"; // default
                if (r1.tipo === "montaña" || r2.tipo === "montaña") tipo = "militar";
                if (Math.random() < 0.1) tipo = "magico";

                caminos.push({ origen: r1, destino: r2, tipo });
            }
        }
    }

    return caminos;
}

/**
 * Dibuja caminos avanzados en canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} caminos
 */
export function dibujarCaminosAvanzados(ctx, caminos) {
    caminos.forEach(c => {
        switch (c.tipo) {
            case "comercial":
                ctx.strokeStyle = "#FFD700"; // dorado
                ctx.lineWidth = 2;
                break;
            case "militar":
                ctx.strokeStyle = "#FF4500"; // rojo fuerte
                ctx.lineWidth = 2.5;
                break;
            case "magico":
                ctx.strokeStyle = "#4B0082"; // índigo
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]); // línea punteada
                break;
            default:
                ctx.strokeStyle = "#AAAAAA";
                ctx.lineWidth = 1.5;
        }

        ctx.beginPath();
        ctx.moveTo(c.origen.centro.x, c.origen.centro.y);
        ctx.lineTo(c.destino.centro.x, c.destino.centro.y);
        ctx.stroke();

        ctx.setLineDash([]); // resetear dash
    });
}
