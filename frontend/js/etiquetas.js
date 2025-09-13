// etiquetas.js
// Módulo encargado de dibujar etiquetas (nombres) sobre el mapa

/**
 * Dibuja una etiqueta de texto en el canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
 * @param {string} texto - Texto a mostrar
 * @param {number} x - Coordenada X
 * @param {number} y - Coordenada Y
 * @param {string} tipo - Tipo de etiqueta ("bioma", "montaña", "río")
 */
export function dibujarEtiqueta(ctx, texto, x, y, tipo = "bioma") {
  ctx.save();

  // Estilo según el tipo
  if (tipo === "bioma") {
    ctx.font = "16px serif";
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  } else if (tipo === "montaña") {
    ctx.font = "bold 14px serif";
    ctx.fillStyle = "rgba(80, 60, 40, 0.8)";
  } else if (tipo === "río") {
    ctx.font = "italic 13px serif";
    ctx.fillStyle = "rgba(30, 60, 150, 0.8)";
  }

  ctx.textAlign = "center";
  ctx.fillText(texto, x, y);

  ctx.restore();
}

/**
 * Dibuja múltiples etiquetas en el mapa
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {Array} etiquetas - Lista de objetos {texto, x, y, tipo}
 */
export function dibujarEtiquetas(ctx, etiquetas) {
  etiquetas.forEach(etiqueta => {
    dibujarEtiqueta(ctx, etiqueta.texto, etiqueta.x, etiqueta.y, etiqueta.tipo);
  });
}