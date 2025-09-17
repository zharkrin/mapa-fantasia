// frontend/js/mapa/caminos.js
// Generación y renderizado de caminos en el mapa

/**
 * Genera caminos terrestres entre regiones
 * - Por defecto: comerciales y militares
 * - Opcionales: mágicos y marinos
 */
export function generarCaminos(regiones, ancho, alto, opts = {}) {
  const {
    gridSize = 20,
    maxDist = 300,
    maxConexiones = 3,
    costObstacle = 9999,
    generarMagicos = false,
    generarMarinos = false,
  } = opts;

  const cols = Math.ceil(ancho / gridSize);
  const rows = Math.ceil(alto / gridSize);
  const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(1));

  // Obstáculos: montañas y glaciares
  regiones.forEach(r => {
    if (!r || !r.centro) return;
    if (r.tipo === "montaña" || r.tipo === "glaciar") {
      const col = Math.floor(r.centro.x / gridSize);
      const row = Math.floor(r.centro.y / gridSize);
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = costObstacle;
      }
    }
  });

  const caminos = [];
  const conexiones = new Map(regiones.map(r => [r, 0]));

  for (let i = 0; i < regiones.length; i++) {
    const a = regiones[i];
    if (!a || !a.centro) continue;

    const candidatos = [];
    for (let j = 0; j < regiones.length; j++) {
      if (i === j) continue;
      const b = regiones[j];
      if (!b || !b.centro) continue;
      const d = distancia(a.centro, b.centro);
      if (d <= maxDist) candidatos.push({ b, d });
    }
    candidatos.sort((p, q) => p.d - q.d);

    for (const cand of candidatos) {
      const b = cand.b;
      if (conexiones.get(a) >= maxConexiones) break;
      if (conexiones.get(b) >= maxConexiones) continue;
      if (existeCaminoEntre(caminos, a, b)) continue;

      // Tipo de camino
      let tipo = "comercial";
      if (a.tipo === "montaña" || b.tipo === "montaña") tipo = "militar";
      if (generarMagicos && Math.random() < 0.1) tipo = "magico";
      if (generarMarinos && (a.tipo === "costa" || b.tipo === "costa")) tipo = "marina";

      // Ruta con A*
      const rutaGrid = aStarRuta(a.centro, b.centro, grid, gridSize);
      const rutaFinal = (rutaGrid && rutaGrid.length > 0) ? suavizarRuta(rutaGrid) : [a.centro, b.centro];

      caminos.push({ origen: a, destino: b, tipo, ruta: rutaFinal });
      conexiones.set(a, conexiones.get(a) + 1);
      conexiones.set(b, conexiones.get(b) + 1);
    }
  }

  return caminos;
}

/**
 * Dibuja caminos y asentamientos
 */
export function dibujarCaminos(ctx, caminos) {
  if (!Array.isArray(caminos)) return;

  caminos.forEach(c => {
    // Estilos según tipo de camino
    switch (c.tipo) {
      case "comercial":
        ctx.strokeStyle = "#FFD700"; // dorado
        ctx.lineWidth = 2;
        break;
      case "militar":
        ctx.strokeStyle = "#FF4500"; // rojo fuerte
        ctx.lineWidth = 2.5;
        break;
      case "magico":
        ctx.strokeStyle = "#4B0082"; // índigo
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        break;
      case "marina":
        ctx.strokeStyle = "#1E90FF"; // azul
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        break;
      default:
        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 1.5;
    }

    // Ruta
    ctx.beginPath();
    const ruta = c.ruta;
    if (ruta && ruta.length > 0) {
      ctx.moveTo(ruta[0].x, ruta[0].y);
      for (let i = 1; i < ruta.length; i++) {
        ctx.lineTo(ruta[i].x, ruta[i].y);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
  });

  // Asentamientos
  const asentamientos = new Set();
  caminos.forEach(c => {
    asentamientos.add(c.origen);
    asentamientos.add(c.destino);
  });

  asentamientos.forEach(a => {
    let color = "#FFFFFF";
    switch (a.tipo) {
      case "glaciar":
        color = "#000000";
        break;
      case "desierto":
        color = "#FFDAB9";
        break;
      case "bosque":
        color = "#228B22";
        break;
      case "montaña":
        color = "#A9A9A9";
        break;
      default:
        color = "#FFFFFF";
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(a.centro.x, a.centro.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ---------------------------
   Helpers internos
----------------------------*/
function distancia(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

function existeCaminoEntre(caminos, a, b) {
  return caminos.some(c => (c.origen === a && c.destino === b) || (c.origen === b && c.destino === a));
}

function aStarRuta(start, end, grid, gridSize) {
  const cols = grid[0].length;
  const rows = grid.length;
  const nodoKey = (x, y) => `${x},${y}`;
  const heur = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const startNode = {
    x: clamp(Math.floor(start.x / gridSize), 0, cols - 1),
    y: clamp(Math.floor(start.y / gridSize), 0, rows - 1),
    g: 0, f: 0, parent: null
  };
  const endNode = {
    x: clamp(Math.floor(end.x / gridSize), 0, cols - 1),
    y: clamp(Math.floor(end.y / gridSize), 0, rows - 1)
  };

  const open = [startNode];
  const openMap = new Map([[nodoKey(startNode.x, startNode.y), startNode]]);
  const closed = new Set();

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    openMap.delete(nodoKey(current.x, current.y));
    closed.add(nodoKey(current.x, current.y));

    if (current.x === endNode.x && current.y === endNode.y) {
      const path = [];
      let node = current;
      while (node) {
        path.push({ x: node.x * gridSize + gridSize / 2, y: node.y * gridSize + gridSize / 2 });
        node = node.parent;
      }
      return path.reverse();
    }

    const vecinos = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ];

    for (const v of vecinos) {
      if (v.x < 0 || v.x >= cols || v.y < 0 || v.y >= rows) continue;
      const k = nodoKey(v.x, v.y);
      if (closed.has(k)) continue;

      const stepCost = grid[v.y][v.x] || 1;
      const gTent = current.g + stepCost;
      const fTent = gTent + heur(v, endNode);

      const existing = openMap.get(k);
      if (!existing || gTent < existing.g) {
        const node = { x: v.x, y: v.y, g: gTent, f: fTent, parent: current };
        open.push(node);
        openMap.set(k, node);
      }
    }
  }
  return null;
}

function suavizarRuta(ruta) {
  if (!ruta || ruta.length < 3) return ruta;
  const nueva = [ruta[0]];
  for (let i = 1; i < ruta.length - 1; i++) {
    const prev = ruta[i - 1];
    const curr = ruta[i];
    const next = ruta[i + 1];
    const mx = (prev.x + next.x) / 2;
    const my = (prev.y + next.y) / 2;
    nueva.push({ x: (curr.x + mx) / 2, y: (curr.y + my) / 2 });
  }
  nueva.push(ruta[ruta.length - 1]);
  return nueva;
}

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }