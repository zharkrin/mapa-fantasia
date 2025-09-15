// biomas.js
// Asignación de biomas sobre un terreno ya generado

export function asignarBiomas(mapa) {
  const alto = mapa.length;
  const ancho = mapa[0].length;

  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const celda = mapa[y][x];

      // No cambiamos agua ni montaña
      if (celda === "agua" || celda === "montaña") {
        continue;
      }

      // Latitud normalizada (0 arriba, 1 abajo)
      const latitud = y / alto;

      // Selección de biomas por latitud
      if (latitud < 0.2) {
        mapa[y][x] = "tundra";
      } else if (latitud < 0.4) {
        mapa[y][x] = Math.random() < 0.6 ? "bosque" : "pradera";
      } else if (latitud < 0.7) {
        mapa[y][x] = Math.random() < 0.7 ? "pradera" : "bosque";
      } else {
        mapa[y][x] = Math.random() < 0.5 ? "desierto" : "pradera";
      }
    }
  }

  return mapa;
}
