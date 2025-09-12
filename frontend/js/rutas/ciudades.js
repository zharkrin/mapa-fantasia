// ciudades.js
// Generación de ciudades basada en grid: recursos, coste y proximidad al agua.
// Exporta funciones para crear un listado de ciudades {id,x,y,puerto,importancia}

import { getTile } from '../mapa/generacionTerreno.js';

export function generarCiudades(grid, nCiudades = 100, opts = {}) {
  const height = grid.length;
  const width = grid[0].length;
  const ciudades = [];
  let id = 0;

  // Heurística: preferir tiles con costeTransporte bajo, o coastline si queremos puertos
  const scoreTile = (tile) => {
    let score = 1/(tile.costeTransporte + 0.01); // mejor coste -> mayor score
    if (tile.bioma === 'shore' || tile.bioma === 'beach') score *= 2.0;
    if (tile.bioma === 'deep_ocean') score *= 0.1;
    // penalizar montañas aisladas
    if (tile.bioma === 'mountain') score *= 0.5;
    // varía por aleatoriedad local
    score *= (0.5 + Math.random());
    return score;
  };

  // Crear lista de candidatos (muestreo aleatorio)
  const samples = 2000;
  const candidates = [];
  for (let i=0;i<samples;i++){
    const x = Math.floor(Math.random()*width);
    const y = Math.floor(Math.random()*height);
    const tile = grid[y][x];
    candidates.push({x,y,score: scoreTile(tile)});
  }
  // ordenar por score descendente
  candidates.sort((a,b)=>b.score-a.score);

  // Seleccionar ciudades asegurando separación mínima
  const minSeparation = Math.max(5, Math.floor(Math.min(width, height)/30));
  for (let c of candidates) {
    if (ciudades.length >= nCiudades) break;
    // comprobar distancia a otras ciudades
    let ok = true;
    for (let existing of ciudades) {
      const dx = existing.x - c.x;
      const dy = existing.y - c.y;
      const d2 = dx*dx + dy*dy;
      if (d2 < minSeparation*minSeparation) { ok = false; break; }
    }
    if (!ok) continue;
    const tile = grid[c.y][c.x];
    const puerto = tile.isWater && (tile.bioma === 'shore' || tile.bioma === 'beach');
    const importancia = Math.round(1 + 4 * (c.score / candidates[0].score)); // 1..5
    ciudades.push({ id: `C${id++}`, x: c.x, y: c.y, puerto, importancia, tileBioma: tile.bioma });
  }
  return ciudades;
}
