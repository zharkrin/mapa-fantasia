// aStar.js
// A* para grafos y también versión de rejilla opcional.
// Aquí implementamos A* sobre la rejilla (tile-based), útil para caminos que sigan terreno local.
// Devuelve un array de puntos (x,y)

import { getTile } from '../mapa/generacionTerreno.js';

export function astarGrid(grid, start, goal, opts = {}) {
  // start, goal: {x,y} floats -> convert to tile centers
  const w = grid[0].length, h = grid.length;
  const sx = Math.max(0, Math.min(w-1, Math.round(start.x)));
  const sy = Math.max(0, Math.min(h-1, Math.round(start.y)));
  const gx = Math.max(0, Math.min(w-1, Math.round(goal.x)));
  const gy = Math.max(0, Math.min(h-1, Math.round(goal.y)));
  const key = (x,y)=> `${x},${y}`;

  // Heuristic: Euclidean * average terrain cost
  const heuristic = (x,y) => {
    const dx = gx - x, dy = gy - y;
    return Math.sqrt(dx*dx + dy*dy);
  };

  const open = new Map(); // key -> node {x,y,g,f, parent}
  const closed = new Set();

  function pushNode(node) {
    open.set(key(node.x,node.y), node);
  }
  function popLowest() {
    let bestK = null, best = null;
    for (let [k,node] of open.entries()) {
      if (best===null || node.f < best.f) { best = node; bestK = k; }
    }
    if (bestK) open.delete(bestK);
    return best;
  }

  pushNode({x:sx,y:sy,g:0,f:heuristic(sx,sy), parent:null});
  const neighbors = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  while (open.size > 0) {
    const current = popLowest();
    if (!current) break;
    if (current.x === gx && current.y === gy) {
      // reconstruct
      const path = [];
      let cur = current;
      while (cur) { path.push({x:cur.x,y:cur.y}); cur = cur.parent; }
      return path.reverse();
    }
    closed.add(key(current.x,current.y));
    for (let n of neighbors) {
      const nx = current.x + n[0];
      const ny = current.y + n[1];
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (closed.has(key(nx,ny))) continue;
      const tile = getTile(grid, nx, ny);
      // movement cost: diagonal cost sqrt(2) times tile costeTransporte
      const moveBase = (n[0]!==0 && n[1]!==0) ? Math.SQRT2 : 1;
      const tentative_g = current.g + moveBase * tile.costeTransporte;
      const exist = open.get(key(nx,ny));
      if (!exist || tentative_g < exist.g) {
        const h = heuristic(nx,ny);
        const node = { x: nx, y: ny, g: tentative_g, f: tentative_g + h, parent: current };
        pushNode(node);
      }
    }
  }
  // no path
  return null;
}
