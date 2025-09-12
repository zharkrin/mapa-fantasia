// drawRutas.js
// Ejemplo simple de cómo dibujar rutas en canvas 2D o preparar una estructura para Three.js.
// No fijamos estilos (según tus reglas) — aquí solo funcionalidad.

export function drawRutasCanvas(ctx, rutas, transform) {
  // transform: {scale, offsetX, offsetY} para pasar de mapa->canvas
  const {scale=1, offsetX=0, offsetY=0} = transform || {};
  function toCanvas(p) { return {x: p.x*scale + offsetX, y: p.y*scale + offsetY}; }

  for (let ruta of rutas) {
    const coords = ruta.coords.map(toCanvas);
    ctx.beginPath();
    ctx.lineWidth = (ruta.type === 'maritima' ? 2 : (ruta.type==='magica' ? 3 : 1.5));
    // color logic left to caller; here we set simple stroke style for visibility
    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i=1;i<coords.length;i++){
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();

    // draw waypoints or icons optionally
    if (ruta.type === 'magica') {
      ctx.fillStyle = 'rgba(200,0,200,0.6)';
      const p = coords[Math.floor(coords.length/2)];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
      ctx.fill();
    }
  }
}
