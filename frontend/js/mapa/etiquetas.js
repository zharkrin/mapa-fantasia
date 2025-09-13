// ==============================
// frontend/js/mapa/etiquetas.js
// ==============================

// Módulo para gestionar etiquetas del mapa (montañas, ríos, ciudades, rutas comerciales)
export const etiquetas = [];

/**
 * Añade una nueva etiqueta al sistema
 * @param {string} texto - El nombre o etiqueta a mostrar
 * @param {number} x - Coordenada X
 * @param {number} y - Coordenada Y
 * @param {string} tipo - Tipo de etiqueta (montaña, rio, ciudad, ruta)
 */
export function agregarEtiqueta(texto, x, y, tipo = "general") {
  etiquetas.push({ texto, x, y, tipo });
}

/**
 * Dibuja todas las etiquetas en el canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {number} zoom - Nivel de zoom actual
 * @param {number} offsetX - Desplazamiento en X
 * @param {number} offsetY - Desplazamiento en Y
 */
export function dibujarEtiquetas(ctx, zoom, offsetX, offsetY) {
  ctx.save();
  ctx.font = `${12 * zoom}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  etiquetas.forEach(etiqueta => {
    let { texto, x, y, tipo } = etiqueta;

    // Estilos según el tipo
    if (tipo === "montaña") ctx.font = `${14 * zoom}px serif`;
    if (tipo === "rio") ctx.font = `${12 * zoom}px italic`;
    if (tipo === "ciudad") ctx.font = `${13 * zoom}px bold Arial`;
    if (tipo === "ruta") ctx.font = `${11 * zoom}px Arial`;

    ctx.fillText(texto, x * zoom + offsetX, y * zoom + offsetY);
  });

  ctx.restore();
}