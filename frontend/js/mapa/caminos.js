// frontend/js/mapa/caminos.js
// Módulo final de caminos terrestres
// - Genera conexiones entre regiones/asentamientos
// - Evita obstáculos (montañas, glaciares)
// - Calcula rutas con A* sobre cuadrícula
// - Suaviza rutas (interpolación básica)
// - Dibuja rutas con estilos por tipo (comercial, militar, mágico)

/**
 * Genera caminos terrestres entre regiones.
 * @param {Array} regiones - array de regiones/asentamientos con {centro: {x,y}, tipo}
 * @param {number} ancho - ancho del mapa (px)
 * @param {number} alto - alto del mapa (px)
 * @param {Object} [opts] - opciones
 *    opts.gridSize (px) tamaño de celda para la cuadrícula A* (default 20)
 *    opts.maxDist distancia máxima para intentar conectar regiones (default 300)
 *    opts.maxConexiones número máximo de conexiones por región (default 3)
 *    opts.costObstacle coste para celdas con obstáculos (default 9999)
 *    opts.probMagico probabilidad de que una conexión sea "mágica" (default 0.1)
 * @returns {Array} caminos - [{ origen, destino, tipo, ruta:[{x,y}] }]
 */
export function generarCaminos(regiones, ancho, alto, opts = {}) {
  const {
    gridSize = 20,
    maxDist = 300,
    maxConexiones = 3,
    costObstacle = 9999,
    probMagico = 0.1
  } = opts;

  // Preparar cuadrícula de costes
  const cols = Math.ceil(ancho / gridSize);
  const rows = Math.ceil(alto / gridSize);
  const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(1));

  // Marcar obstáculos según tipo de región (montaña, glaciar -> alto coste)
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
  // Para controlar cuántas conexiones tiene cada región
  const contadorConexiones = new Map(regiones.map((r, i) => [r, 0]));

  // Intenta conectar cada par de regiones cercanas
  for (let i = 0; i < regiones.length; i++) {
    const a = regiones[i];
    if (!a || !a.centro) continue;

    // Ordenar posibles destinos por distancia (más cercano primero)
    const candidatos = [];
    for (let j = 0; j < regiones.length; j++) {
      if (j === i) continue;
      const b = regiones[j];
      if (!b || !b.centro) continue;
      const d = distancia(a.centro, b.centro);
      if (d <= maxDist) candidatos.push({ b, d });
    }
    candidatos.sort((p, q) => p.d - q.d);

    for (const cand of candidatos) {
      const b = cand.b;

      // Si ya superó conexiones, saltar
      if (contadorConexiones.get(a) >= maxConexiones) break;
      if (contadorConexiones.get(b) >= maxConexiones) continue;

      // Evitar duplicados
      if (existeCaminoEntre(caminos, a, b)) continue;

      // Elegir tipo de camino
      let tipo = "comercial";
      if (a.tipo === "montaña" || b.tipo === "montaña") tipo = "militar";
      if (Math.random() < probMagico) tipo = "magico";

      // Calcular ruta A*
      const rutaGrid = aStarRuta(a.centro, b.centro, grid, gridSize);
      if (!rutaGrid || rutaGrid.length === 0) {
        // Si no se encontró ruta, intentamos una conexión directa como fallback (línea recta)
        const rutaFallback = [a.centro, b.centro];
        caminos.push({ origen: a, destino: b, tipo, ruta: suavizarRuta(rutaFallback) });
        contadorConexiones.set(a, contadorConexiones.get(a) + 1);
        contadorConexiones.set(b, contadorConexiones.get(b) + 1);
      } else {
        // Suavizar y guardar
        const rutaSuave = suavizarRuta(rutaGrid);
        caminos.push({ origen: a, destino: b, tipo, ruta: rutaSuave });
        contadorConexiones.set(a, contadorConexiones.get(a) + 1);
        contadorConexiones.set(b, contadorConexiones.get(b) + 1);
      }
    }
  }

  return caminos;
}

/**
 * Dibuja caminos en el canvas (función exportada)
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} caminos - salida de generarCaminos
 */
export function dibujarCaminos(ctx, caminos) {
  if (!Array.isArray(caminos)) return;
  caminos.forEach(c => {
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
      default:
        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 1.5;
    }

    ctx.beginPath();
    const ruta = c.ruta;
    if (ruta && ruta.length > 0) {
      ctx.moveTo(ruta[0].x, ruta[0].y);
      for (let i = 1; i < ruta.length; i++) ctx.lineTo(ruta[i].x, ruta[i].y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  });
}

/* ---------------------------
   Helpers internos
   --------------------------- */

/** Distancia Euclidiana entre dos puntos {x,y} */
function distancia(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/** Comprueba si ya existe un camino entre a y b */
function existeCaminoEntre(caminos, a, b) {
  return caminos.some(c =>
    (c.origen === a && c.destino === b) || (c.origen === b && c.destino === a)
  );
}

/**
 * A* simplificado sobre la cuadrícula de costes.
 * Devuelve una ruta en coordenadas reales (centro de celdas)
 * start/end son {x,y} en coordenadas px.
 */
function aStarRuta(start, end, grid, gridSize) {
  const cols = grid[0].length;
  const rows = grid.length;

  function nodoKey(x, y) { return `${x},${y}`; }
  function heur(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  const startNode = { x: clamp(Math.floor(start.x / gridSize), 0, cols - 1), y: clamp(Math.floor(start.y / gridSize), 0, rows - 1), g: 0, f: 0, parent: null };
  const endNode = { x: clamp(Math.floor(end.x / gridSize), 0, cols - 1), y: clamp(Math.floor(end.y / gridSize), 0, rows - 1) };

  const open = [startNode];
  const openMap = new Map();
  openMap.set(nodoKey(startNode.x, startNode.y), startNode);
  const closed = new Set();

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    openMap.delete(nodoKey(current.x, current.y));
    closed.add(nodoKey(current.x, current.y));

    if (current.x === endNode.x && current.y === endNode.y) {
      // Reconstruir ruta
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
      { x: current.x, y: current.y - 1 },
      // diagonales opcionales (más natural, pero + coste)
      { x: current.x + 1, y: current.y + 1 },
      { x: current.x - 1, y: current.y - 1 },
      { x: current.x + 1, y: current.y - 1 },
      { x: current.x - 1, y: current.y + 1 }
    ];

    for (const v of vecinos) {
      if (v.x < 0 || v.x >= cols || v.y < 0 || v.y >= rows) continue;
      const k = nodoKey(v.x, v.y);
      if (closed.has(k)) continue;

      // coste del paso: el valor en la grid (alto si obstáculo)
      const stepCost = grid[v.y][v.x] || 1;
      const gTent = current.g + stepCost;
      const h = heur({ x: v.x, y: v.y }, endNode);
      const fTent = gTent + h;

      const existing = openMap.get(k);
      if (!existing || gTent < existing.g) {
        const node = { x: v.x, y: v.y, g: gTent, f: fTent, parent: current };
        open.push(node);
        openMap.set(k, node);
      }
    }
  }

  // No se encontró ruta
  return [];
}

/**
 * Suaviza la ruta interpolando puntos intermedios
 * - Si la ruta es una lista de celdas, interpolamos midpoints para hacerla más "curva".
 */
function suavizarRuta(ruta) {
  if (!ruta || ruta.length < 2) return ruta || [];
  const nueva = [];
  for (let i = 0; i < ruta.length - 1; i++) {
    const p0 = ruta[i];
    const p1 = ruta[i + 1];
    nueva.push(p0);
    // añadir punto intermedio
    nueva.push({ x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 });
  }
  nueva.push(ruta[ruta.length - 1]);
  // opcional: reducir puntos muy cercanos
  return simplificarRuta(nueva, 1.0);
}

/** Simplifica ruta eliminando puntos demasiado próximos (umbral en px) */
function simplificarRuta(ruta, umbral = 1.0) {
  if (!ruta || ruta.length < 2) return ruta;
  const out = [ruta[0]];
  for (let i = 1; i < ruta.length; i++) {
    const prev = out[out.length - 1];
    const cur = ruta[i];
    if (Math.hypot(prev.x - cur.x, prev.y - cur.y) >= umbral) out.push(cur);
  }
  return out;
}

/** Clamp helper */
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }