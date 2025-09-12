// grafo.js
// Construye un grafo entre ciudades. Aristas iniciales serán k-vecinos (Delaunay opcional).
// Exporta: buildGrafo(ciudades, grid, opts)

import { getTile } from '../mapa/generacionTerreno.js';

function dist(a,b){
  const dx = a.x-b.x, dy = a.y-b.y;
  return Math.sqrt(dx*dx + dy*dy);
}

// sampleLine: devuelve valores medias del coste del terreno entre dos puntos (muestreo simple)
function sampleLineCost(grid, a, b, samples=8) {
  let sum = 0;
  for (let i=0;i<=samples;i++){
    const t = i/samples;
    const x = a.x*(1-t) + b.x*t;
    const y = a.y*(1-t) + b.y*t;
    const tile = getTile(grid, x, y);
    sum += tile.costeTransporte;
  }
  return sum / (samples+1);
}

export function buildGrafo(ciudades, grid, opts = {}) {
  const k = opts.k || 6; // vecinos
  const edges = []; // {from,to,cost,type}
  // For each city find k nearest neighbors
  for (let i=0;i<ciudades.length;i++){
    const a = ciudades[i];
    // compute distances to others
    const neigh = [];
    for (let j=0;j<ciudades.length;j++){
      if (i===j) continue;
      const b = ciudades[j];
      neigh.push({idx:j, d: dist(a,b)});
    }
    neigh.sort((x,y)=>x.d-y.d);
    const limit = Math.min(k, neigh.length);
    for (let n=0;n<limit;n++){
      const b = ciudades[neigh[n].idx];
      const d = neigh[n].d;
      // sample terrain cost (terrestre)
      const meanCost = sampleLineCost(grid, a, b, 12);
      // if straight line crosses large water area, consider maritime or mixed
      const fromTile = getTile(grid, a.x, a.y);
      const toTile = getTile(grid, b.x, b.y);
      let type = 'land';
      if (fromTile.isWater && toTile.isWater) type = 'sea';
      else {
        // rough check: if many water samples along line -> mixed sea route with port hops
        const samples = 12;
        let waterCount = 0;
        for (let s=0;s<=samples;s++){
          const t = s/samples;
          const tile = getTile(grid, a.x*(1-t)+b.x*t, a.y*(1-t)+b.y*t);
          if (tile.isWater) waterCount++;
        }
        if (waterCount > samples*0.4) type = 'water_cross';
      }
      // compute cost: distance * meanCost * factorTipo
      const tipoFactor = (type==='land') ? 1.0 : (type==='sea' ? 0.6 : 1.3);
      const cost = d * meanCost * tipoFactor;
      edges.push({ from: a.id, to: b.id, cost, type, rawDist: d });
    }
  }
  // Optionally dedupe edges (undirected)
  const dedup = new Map();
  for (let e of edges) {
    const key = [e.from,e.to].sort().join('--');
    const existing = dedup.get(key);
    if (!existing || e.cost < existing.cost) dedup.set(key, e);
  }
  const finalEdges = Array.from(dedup.values());
  return {
    nodes: ciudades.map(c=>({id:c.id, x:c.x,y:c.y, puerto: c.puerto, importancia:c.importancia})),
    edges: finalEdges
  };
}
