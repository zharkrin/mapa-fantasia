// caminos.js
// Generación de caminos simples entre puntos de interés (ciudades) usando vecinos adyacentes

export function generarCaminos(mapa, ciudades = []) {
  const ancho = mapa[0].length;
  const alto = mapa.length;

  // Si no hay ciudades, generar puntos aleatorios
  if (ciudades.length === 0) {
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(Math.random() * ancho);
      const y = Math.floor(Math.random() * alto);
      if (mapa[y][x] !== "agua" && mapa[y][x] !== "montaña") {
        ciudades.push({ x, y });
      }
    }
  }

  // Conectar cada ciudad con la siguiente
  for (let i = 0; i < ciudades.length - 1; i++) {
    let start = ciudades[i];
    let end = ciudades[i + 1];

    let pos = { ...start };
    while (pos.x !== end.x || pos.y !== end.y) {
      if (mapa[pos.y][pos.x] === "tierra" || mapa[pos.y][pos.x] === "pradera" || mapa[pos.y][pos.x] === "bosque") {
        mapa[pos.y][pos.x] = "camino";
      }

      if (pos.x < end.x) pos.x++;
      else if (pos.x > end.x) pos.x--;
      if (pos.y < end.y) pos.y++;
      else if (pos.y > end.y) pos.y--;
    }
  }

  return mapa;
}