// =======================================================
// frontend/js/mapa/dibujarRiosCanvas.js
// Sistema procedural completo de ríos en canvas
// =======================================================

export function dibujarRiosCanvas(rios, anchoMapa, altoMapa) {

  const canvas = document.getElementById("capa-rutas");
  const ctx = canvas.getContext("2d");

  canvas.width = anchoMapa;
  canvas.height = altoMapa;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rios.forEach(rio => {
    dibujarRio(ctx, rio);
  });
}

function dibujarRio(ctx, puntos) {
  if (!puntos || puntos.length < 2) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

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

    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.stroke();
  }

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function calcularGrosor(progreso) {
  const grosorMin = 4;
  const grosorMax = 18;

  return grosorMin + (grosorMax - grosorMin) * progreso;
}