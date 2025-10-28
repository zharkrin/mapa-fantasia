// =======================================================
// frontend/js/mapa/generacionTerreno.js
// Generación base del terreno (zonas físicas principales)
// =======================================================

export const tiposTerreno = [
  "montanas", "colina", "costa", "playa", "valle",
  "pantano", "lago", "rio", "acantilado", "meseta",
  "canon", "glaciar", "crater"
];

export function generarTerrenoBase(ancho, alto, cantidad) {
  const terrenos = [];
  for (let i = 0; i < cantidad; i++) {
    const tipo = tiposTerreno[Math.floor(Math.random() * tiposTerreno.length)];
    terrenos.push({
      tipo,
      x: Math.floor(Math.random() * ancho),
      y: Math.floor(Math.random() * alto)
    });
  }
  return terrenos;
}