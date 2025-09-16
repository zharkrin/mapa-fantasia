// frontend/js/mapa/rutasEspeciales.js

/**
 * Genera rutas mágicas y marítimas entre regiones
 * @param {Array} regiones - lista de regiones con {centro, tipo}
 * @param {number} ancho - ancho del mapa
 * @param {number} alto - alto del mapa
 * @param {number} maxDist - distancia máxima para rutas especiales
 * @returns {Array} rutas [{origen, destino, ruta, tipo}]
 */
export function generarRutasEspeciales(regiones, ancho, alto, maxDist = 300) {
    const rutas = [];

    regiones.forEach((r1, i) => {
        for (let j = i + 1; j < regiones.length; j++) {
            const r2 = regiones[j];
            const dx = r1.centro.x - r2.centro.x;
            const dy = r1.centro.y - r2.centro.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if(dist <= maxDist){
                let tipo = "maritima";
                if(Math.random() < 0.15) tipo = "magica";

                const ruta = generarLineaCurva(r1.centro, r2.centro, tipo);
                rutas.push({origen: r1, destino: r2, tipo, ruta});
            }
        }
    });

    return rutas;
}

/**
 * Dibuja rutas especiales en canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} rutas
 */
export function dibujarRutasEspeciales(ctx, rutas){
    rutas.forEach(r => {
        switch(r.tipo){
            case "maritima": ctx.strokeStyle = "#1E90FF"; ctx.lineWidth=2; ctx.setLineDash([4,4]); break;
            case "magica": ctx.strokeStyle = "#9400D3"; ctx.lineWidth=3; ctx.setLineDash([6,3]); break;
            default: ctx.strokeStyle="#AAAAAA"; ctx.lineWidth=1.5;
        }

        ctx.beginPath();
        const rutaPuntos = r.ruta;
        if(rutaPuntos.length > 0){
            ctx.moveTo(rutaPuntos[0].x, rutaPuntos[0].y);
            for(let i=1; i<rutaPuntos.length; i++){
                ctx.lineTo(rutaPuntos[i].x, rutaPuntos[i].y);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
    });
}

/**
 * Genera una línea curva simple entre dos puntos
 * @param {Object} start {x,y}
 * @param {Object} end {x,y}
 * @param {string} tipo
 * @returns {Array} puntos de la ruta
 */
function generarLineaCurva(start, end, tipo){
    const puntos = [];
    const pasos = 10;
    for(let i=0; i<=pasos; i++){
        const t = i/pasos;
        // Curva simple tipo S para rutas mágicas
        const offset = (tipo === "magica") ? Math.sin(t * Math.PI)*20 : 0;
        const x = start.x*(1-t) + end.x*t + offset;
        const y = start.y*(1-t) + end.y*t + offset;
        puntos.push({x, y});
    }
    return puntos;
}