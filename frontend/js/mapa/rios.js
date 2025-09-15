// rios.js
// Generación de ríos que fluyen desde montañas hasta el mar

export function generarRios(mapa, numRios = 3) {
  const alto = mapa.length;
  const ancho = mapa[0].length;

  for (let r = 0; r < numRios; r++) {
    // Buscar una montaña aleatoria para inicio del río
    let inicio;
    do {
      const x = Math.floor(Math.random() * ancho);
      const y = Math.floor(Math.random() * alto);
      if (mapa[y][x] === "montaña") inicio = { x, y };
    } while (!inicio);

    let pos = { ...inicio };
    const maxIter = ancho * alto;
    let iter = 0;

    while (iter < maxIter) {
      mapa[pos.y][pos.x] = "rio";

      // Verificar si llegó al mar
      if (mapa[pos.y][pos.x] === "agua") break;

      // Elegir dirección hacia vecino más cercano al agua o borde del mapa
      const movimientos = [
        { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }
      ];
      const mov = movimientos[Math.floor(Math.random() * movimientos.length)];

      const nx = pos.x + mov.dx;
      const ny = pos.y + mov.dy;

      if (nx >= 0 && nx < ancho && ny >= 0 && ny < alto) {
        pos.x = nx;
        pos.y = ny;
      }

      iter++;
    }
  }

  return mapa;
}