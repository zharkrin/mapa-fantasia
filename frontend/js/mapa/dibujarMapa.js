// ================================================
// frontend/js/mapa/dibujarMapa.js
// ================================================
// Se encarga de renderizar el mapa base, biomas y terrenos,
// integrando los iconos definidos en iconosTerreno.js.
// ================================================

import { obtenerIcono } from './iconosTerreno.js';

export function dibujarMapa(ctx, mapa, opciones = {}) {
  const { anchoCelda = 64, altoCelda = 64 } = opciones;

  mapa.forEach(fila => {
    fila.forEach(celda => {
      const iconoSrc = obtenerIcono(celda.tipo);
      const imagen = new Image();
      imagen.src = iconoSrc;

      imagen.onload = () => {
        ctx.drawImage(imagen, celda.x * anchoCelda, celda.y * altoCelda, anchoCelda, altoCelda);
      };
    });
  });
}

// ================================================
// Función auxiliar para redibujar completamente
// el mapa cuando se actualiza el terreno o biomas.
// ================================================
export function actualizarMapa(ctx, mapa, opciones) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  dibujarMapa(ctx, mapa, opciones);
}