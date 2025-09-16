// frontend/js/mapa/caminos.js

/**
 * Genera caminos entre regiones
 * @param {Array} regiones - lista de regiones con {centro: {x, y}}
 * @param {number} maxDist - distancia máxima para crear un camino directo
 * @returns {Array} lista de caminos [{origen, destino}]
 */
export function generarCaminos(regiones, maxDist = 250) {
    const caminos = [];

    for (let i = 0; i < regiones.length; i++) {
        for (let j = i + 1; j < regiones.length; j++) {
            const r1 = regiones[i];
            const r2 = regiones[j];
            const dx = r1.centro.x - r2.centro.x;
            const dy = r1.centro.y - r2.centro.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= maxDist) {
                caminos.push({ origen: r1, destino: r2 });
            }
        }
    }

    return caminos;
}

/**
 * Dibuja caminos en el canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} caminos - lista de caminos generados
 */
export function dibujarCaminos(ctx, caminos) {
    ctx.strokeStyle = "#FFD700"; // color dorado para caminos
    ctx.lineWidth = 2;

    caminos.forEach(c => {
        ctx.beginPath();
        ctx.moveTo(c.origen.centro.x, c.origen.centro.y);
        ctx.lineTo(c.destino.centro.x, c.destino.centro.y);
        ctx.stroke();
    });
}