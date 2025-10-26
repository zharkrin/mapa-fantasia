// ======================================================
// dibujarMapa.js
// ------------------------------------------------------
// Dibuja el mapa base, biomas, terrenos, y los terrenos especiales
// ======================================================

// Función principal para dibujar el mapa
function dibujarMapa(ctx, terrenos, biomas, terrenosEspeciales) {
  // Limpiar el lienzo
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Fondo general
  ctx.fillStyle = "#b8d0ff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Dibuja biomas
  dibujarBiomas(ctx, biomas);

  // Dibuja terrenos normales
  dibujarTerrenos(ctx, terrenos);

  // Dibuja los terrenos especiales (nuevo)
  if (terrenosEspeciales && terrenosEspeciales.length > 0) {
    dibujarTerrenosEspeciales(ctx, terrenosEspeciales);
  }

  // Dibuja marco o borde decorativo
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// ======================================================
// DIBUJAR BIOMAS
// ======================================================
function dibujarBiomas(ctx, biomas) {
  biomas.forEach(bioma => {
    const icono = new Image();
    icono.src = `static/img/icons/biomas/${bioma.tipo}.png`;

    icono.onload = () => {
      ctx.drawImage(icono, bioma.x - 16, bioma.y - 16, 32, 32);
    };

    icono.onerror = () => {
      ctx.fillStyle = "#7bb661";
      ctx.beginPath();
      ctx.arc(bioma.x, bioma.y, 5, 0, Math.PI * 2);
      ctx.fill();
    };
  });
}

// ======================================================
// DIBUJAR TERRENOS
// ======================================================
function dibujarTerrenos(ctx, terrenos) {
  terrenos.forEach(terreno => {
    const icono = new Image();
    icono.src = `static/img/icons/terreno/${terreno.tipo}.png`;

    icono.onload = () => {
      ctx.drawImage(icono, terreno.x - 16, terreno.y - 16, 32, 32);
    };

    icono.onerror = () => {
      ctx.fillStyle = "#9b7653";
      ctx.fillRect(terreno.x - 2, terreno.y - 2, 4, 4);
    };
  });
}