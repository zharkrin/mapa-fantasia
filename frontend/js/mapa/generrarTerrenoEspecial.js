// ==========================================================
// Generador de Terrenos Especiales en el mapa
// frontend/js/mapa/generarTerrenoEspecial.js
// ==========================================================

/**
 * Genera de forma automática entre 3 y 4 terrenos especiales en el mapa
 * usando los datos definidos en terrenoEspecial.js
 *
 * @param {CanvasRenderingContext2D} ctx - contexto del canvas donde se dibuja
 * @param {number} ancho - ancho del mapa
 * @param {number} alto - alto del mapa
 */
function generarTerrenosEspeciales(ctx, ancho, alto) {
  if (!ctx || typeof ctx.drawImage !== "function") {
    console.error("❌ Error: contexto de canvas no válido.");
    return;
  }

  if (!Array.isArray(terrenoEspecial) || terrenoEspecial.length === 0) {
    console.warn("⚠️ No hay terrenos especiales definidos.");
    return;
  }

  // Número aleatorio de terrenos especiales (3 o 4)
  const cantidad = Math.floor(Math.random() * 2) + 3;
  console.log(`🗺️ Generando ${cantidad} terrenos especiales...`);

  // Mezclar copia del array para variedad
  const seleccion = [...terrenoEspecial]
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad);

  seleccion.forEach((terreno, index) => {
    const x = Math.floor(Math.random() * (ancho - 64));
    const y = Math.floor(Math.random() * (alto - 64));

    const img = new Image();
    img.src = terreno.icono;

    img.onload = () => {
      ctx.drawImage(img, x, y, 48, 48);
      console.log(`🌟 ${terreno.nombre} colocado en (${x}, ${y})`);
    };

    img.onerror = () => {
      console.error(`⚠️ No se pudo cargar el icono de ${terreno.nombre}`);
    };
  });
}