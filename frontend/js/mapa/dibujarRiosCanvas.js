// =======================================================
// frontend/js/mapa/dibujarRiosCanvas.js
// RÍOS PROCEDURALES CON CURVAS SUAVES (BEZIER)
// =======================================================

export function dibujarRiosCanvas(rios, anchoMapa, altoMapa) {

  const canvas = document.getElementById("capa-rutas");
  const ctx = canvas.getContext("2d");

  canvas.width = anchoMapa;
  canvas.height = altoMapa;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rios.forEach(rio => {
    dibujarRioCurvo(ctx, rio);
  });
}

/**
 * Dibuja un río con curvas suaves
 */
function dibujarRioCurvo(ctx, puntos) {
  if (!puntos || puntos.length < 2) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();

  // Punto inicial
  ctx.moveTo(puntos[0].x, puntos[0].y);

  for (let i = 1; i < puntos.length - 1; i++) {

    const pActual = puntos[i];
    const pSiguiente = puntos[i + 1];

    // Punto medio para suavizar
    const midX = (pActual.x + pSiguiente.x) / 2;
    const midY = (pActual.y + pSiguiente.y) / 2;

    ctx.quadraticCurveTo(
      pActual.x,
      pActual.y,
      midX,
      midY
    );
  }

  // Último tramo
  const ultimo = puntos[puntos.length - 1];
  ctx.lineTo(ultimo.x, ultimo.y);

  // Dibujar por segmentos con grosor progresivo
  dibujarConGrosorVariable(ctx, puntos);
}

/**
 * Aplica grosor progresivo al río
 */
function dibujarConGrosorVariable(ctx, puntos) {

  for (let i = 0; i < puntos.length - 1; i++) {

    const p1 = puntos[i];
    const p2 = puntos[i + 1];

    const progreso = i / puntos.length;
    const grosor = calcularGrosor(progreso);

    ctx.beginPath();

    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.lineWidth = grosor;
    ctx.strokeStyle = "#3a7bd5";

    // Sombra para efecto isométrico
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.stroke();
  }

  // Reset sombra
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Grosor progresivo
 */
function calcularGrosor(progreso) {
  const min = 4;
  const max = 20;

  return min + (max - min) * progreso;
}