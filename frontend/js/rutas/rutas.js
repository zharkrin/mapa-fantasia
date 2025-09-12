// rutas.js
// Pipeline de alto nivel para generar rutas comerciales, militares, marítimas y mágicas.
// Usa buildGrafo + aStar para caminos locales si se desea.

import { buildGrafo } from './grafo.js';
import { astarGrid } from './aStar.js';

// Suavizado por Chaikin (control simple)
function chaikinSmoothing(points, iterations = 2) {
  let pts = points.slice();
  for (let it=0; it<iterations; it++) {
    const newPts = [];
    for (let i=0;i<pts.length-1;i++){
      const p0 = pts[i], p1 = pts[i+1];
      newPts.push({x: p0.x*0.75 + p1.x*0.25, y: p0.y*0.75 + p1.y*0.25});
      newPts.push({x: p0.x*0.25 + p1.x*0.75, y: p0.y*0.25 + p1.y*0.75});
    }
    pts = newPts;
  }
  return pts;
}

export function generarRutas(ciudades, grid, opts = {}) {
  const grafo = buildGrafo(ciudades, grid, {k: opts.k || 6});

  // 1) Rutas comerciales: conectar por importancia y coste mínimo
  // Simple: para cada ciudad grande, conectar a K vecinos minimizando coste del grafo
  const rutasComerciales = [];
  const edgesByPair = new Map();
  for (let e of grafo.edges) {
    const key = [e.from, e.to].sort().join('--');
    edgesByPair.set(key, e);
  }

  // Strategy: for top-N important cities, compute shortest path through grafo nodes (Dijkstra on nodes)
  function dijkstraPaths(sourceId) {
    // basic dijkstra on nodes/grafo.edges
    const nodeIds = new Set(grafo.nodes.map(n=>n.id));
    const dist = new Map();
    const prev = new Map();
    for (let id of nodeIds) dist.set(id, Infinity);
    dist.set(sourceId, 0);
    const Q = new Set(nodeIds);
    while (Q.size) {
      // pick min
      let u = null;
      for (let id of Q) {
        if (u===null || dist.get(id) < dist.get(u)) u = id;
      }
      Q.delete(u);
      if (!u) break;
      // neighbors
      for (let e of grafo.edges) {
        if (e.from === u || e.to === u) {
          const v = (e.from === u) ? e.to : e.from;
          if (!Q.has(v)) continue;
          const alt = dist.get(u) + e.cost;
          if (alt < dist.get(v)) {
            dist.set(v, alt);
            prev.set(v, u);
          }
        }
      }
    }
    return {dist, prev};
  }

  // pick top important cities
  const topCities = ciudades.slice().sort((a,b)=>b.importancia - a.importancia).slice(0, Math.max(5, Math.floor(ciudades.length*0.08)));
  for (let c of topCities) {
    const { dist, prev } = dijkstraPaths(c.id);
    // connect to 6 nearest by graph-dist
    const targets = Array.from(dist.entries()).filter(([id,d])=>id!==c.id && isFinite(d)).sort((a,b)=>a[1]-b[1]).slice(0,6);
    for (let [tid, dval] of targets) {
      // reconstruct path
      const pathIds = [];
      let cur = tid;
      while (cur && cur !== c.id) { pathIds.push(cur); cur = prev.get(cur); }
      if (!cur) continue;
      pathIds.push(c.id);
      pathIds.reverse();
      // convert to coordinates by looking up cities
      const pathCoords = pathIds.map(pid=> {
        const node = ciudades.find(x=>x.id===pid);
        return {x: node.x, y: node.y, id: pid};
      });
      // optional: refine path with astarGrid to hug terrain between adjacent nodes
      const refined = [];
      for (let i=0;i<pathCoords.length-1;i++){
        const a = pathCoords[i], b = pathCoords[i+1];
        // Use astarGrid to get tile path
        const tilePath = astarGrid(grid, {x:a.x,y:a.y}, {x:b.x,y:b.y});
        if (tilePath && tilePath.length>0) {
          // convert tile path into float points (center)
          const pts = tilePath.map(t=>({x:t.x, y:t.y}));
          refined.push(...pts.slice(0, -1));
        } else {
          refined.push({x:a.x, y:a.y});
        }
      }
      // add last point
      const last = pathCoords[pathCoords.length-1];
      refined.push({x:last.x, y:last.y});
      // smooth
      const smooth = chaikinSmoothing(refined, 2);
      rutasComerciales.push({type:'comercial',importance:c.importancia,coords:smooth});
    }
  }

  // 2) Rutas militares: conectar fronteras o nodos menos directos -> estrategia: conectar ciudades con baja densidad de rutas
  const rutasMilitares = [];
  // heuristic: connect mid-importance cities to nearest topCities with straighter lines
  for (let c of ciudades.filter(cc=>cc.importancia <= 3).slice(0, Math.floor(ciudades.length*0.2))) {
    const nearestTop = topCities.map(t=>({t, d: Math.hypot(t.x-c.x, t.y-c.y)})).sort((a,b)=>a.d-b.d)[0];
    if (!nearestTop) continue;
    // direct astar
    const tilePath = astarGrid(grid, {x:c.x,y:c.y}, {x:nearestTop.t.x,y:nearestTop.t.y});
    const pts = (tilePath && tilePath.length>0) ? tilePath.map(t=>({x:t.x,y:t.y})) : [{x:c.x,y:c.y},{x:nearestTop.t.x,y:nearestTop.t.y}];
    rutasMilitares.push({type:'militar',coords: chaikinSmoothing(pts, 1)});
  }

  // 3) Rutas marítimas: conectar puertos por grafo marítimo mínimo (prim-like over sea nodes)
  const puertos = ciudades.filter(c=>c.puerto);
  const rutasMaritimas = [];
  if (puertos.length >= 2) {
    // Simple: conectar cada puerto a su 3 puertos más cercanos por distancia euclidiana (puede mejorarse con waypoints)
    for (let p of puertos) {
      const nbs = puertos.map(q=>({q, d: Math.hypot(q.x-p.x,q.y-p.y)})).filter(x=>x.q.id!==p.id).sort((a,b)=>a.d-b.d).slice(0,3);
      for (let nb of nbs) {
        // build a simple sea polyline (straight) and smooth
        const pts = [{x:p.x,y:p.y}, {x:nb.q.x,y:nb.q.y}];
        rutasMaritimas.push({type:'maritima', coords: chaikinSmoothing(pts, 2)});
      }
    }
  }

  // 4) Rutas mágicas: crear aristas especiales entre nodos seleccionados aleatoriamente o por "leyendas"
  const rutasMagicas = [];
  const magCount = Math.max(1, Math.floor(ciudades.length * 0.02));
  for (let i=0;i<magCount;i++) {
    const a = ciudades[Math.floor(Math.random()*ciudades.length)];
    const b = ciudades[Math.floor(Math.random()*ciudades.length)];
    if (a.id === b.id) continue;
    // si la distancia es grande, crear ruta mágica (teleport/puente)
    if (Math.hypot(a.x-b.x,a.y-b.y) > (Math.min(grid[0].length, grid.length)/6)) {
      // represent as direct line but styled distinto
      const pts = [{x:a.x,y:a.y},{x:b.x,y:b.y}];
      rutasMagicas.push({type:'magica',effect:'teleport',coords:pts, manaCost: Math.random()*100});
    } else {
      // puente flotante: follow an arcing curve
      const mid = {x:(a.x+b.x)/2 + (Math.random()-0.5)*10, y:(a.y+b.y)/2 + (Math.random()-0.5)*10};
      const pts = [{x:a.x,y:a.y}, mid, {x:b.x,y:b.y}];
      rutasMagicas.push({type:'magica',effect:'bridge',coords: chaikinSmoothing(pts,1), manaCost: Math.random()*40});
    }
  }

  // Return structure
  return {
    grafo,
    rutasComerciales,
    rutasMilitares,
    rutasMaritimas,
    rutasMagicas
  };
}
