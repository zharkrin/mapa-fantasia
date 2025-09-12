// generacionTerreno.js
// Módulo mínimo que exporta una rejilla de tiles con propiedades útiles
// (Se asume que usarás Perlin/Simplex noise para altura/biomas)

import {noise2D} from './util_noise.js'; // implementa noise.js o simplex

export function generarGrid(width, height, scale = 0.005, seed = 12345) {
  // Devuelve un array 2D: grid[y][x] -> {x,y,alt,bioma,isWater,costeTransporte}
  const grid = new Array(height);
  for (let y=0;y<height;y++){
    grid[y] = new Array(width);
    for (let x=0;x<width;x++){
      const nx = x*scale, ny = y*scale;
      const h = (noise2D(nx+seed, ny+seed) + 1) / 2; // 0..1
      // Ajustes simples de altitud/bioma
      let isWater = h < 0.35;
      let bioma = 'plains';
      if (isWater) bioma = (h < 0.18) ? 'deep_ocean' : 'shore';
      else if (h < 0.45) bioma = 'beach';
      else if (h < 0.55) bioma = 'grassland';
      else if (h < 0.7) bioma = 'forest';
      else if (h < 0.82) bioma = 'hills';
      else bioma = 'mountain';

      // Coste de transporte base por bioma
      const costeMap = {
        deep_ocean: 0.6,
        shore: 0.8,
        beach: 0.9,
        plains: 1.0,
        grassland: 1.1,
        forest: 1.4,
        hills: 1.8,
        mountain: 3.5
      };
      const costeTransporte = costeMap[bioma] ?? 1.2;

      grid[y][x] = {
        x, y, alt: h, bioma, isWater, costeTransporte
      };
    }
  }
  return grid;
}

// Util: obtener tile desde coordenadas reales (x,y)
export function getTile(grid, x, y) {
  const height = grid.length;
  const width = grid[0].length;
  const ix = Math.max(0, Math.min(width-1, Math.round(x)));
  const iy = Math.max(0, Math.min(height-1, Math.round(y)));
  return grid[iy][ix];
}
