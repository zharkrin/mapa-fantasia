// =======================================================
// frontend/js/mapa/biomas.js
// Asignación de biomas a las regiones del mapa
// =======================================================

export const tiposBiomas = [
  "bosque", "bosque_boreal", "bosque_tropical",
  "desierto_calido", "desierto_frio", "estepa",
  "humedal", "pradera", "sabana",
  "selva_tropical", "tundra", "tierras_aridas",
  "chaparral", "selva", "manglar", "jungla", "matorral"
];

export function generarBiomas(ancho, alto, cantidad) {
  const biomas = [];
  for (let i = 0; i < cantidad; i++) {
    const tipo = tiposBiomas[Math.floor(Math.random() * tiposBiomas.length)];
    biomas.push({
      tipo,
      x: Math.floor(Math.random() * ancho),
      y: Math.floor(Math.random() * alto)
    });
  }
  return biomas;
}