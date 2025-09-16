// frontend/js/mapa/dibujarNombres.js

/**
 * Dibuja los nombres de las regiones sobre el mapa
 * - Blanco para la mayoría de biomas
 * - Negro con borde blanco para helada y glaciar
 * 
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas
 * @param {Array} regiones - lista de regiones generadas
 */
export function dibujarNombres(ctx, regiones) {
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    regiones.forEach(region => {
        let colorTexto = "white";
        let borde = false;

        if (region.tipo === "helada" || region.tipo === "glaciar") {
            colorTexto = "black";
            borde = true;
        }

        // dibujar borde blanco si corresponde
        if (borde) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.strokeText(region.nombre, region.centro.x, region.centro.y);
        }

        // dibujar texto principal
        ctx.fillStyle = colorTexto;
        ctx.fillText(region.nombre, region.centro.x, region.centro.y);
    });
}