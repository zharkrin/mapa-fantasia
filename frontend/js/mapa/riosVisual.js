// =======================================================
// frontend/js/mapa/riosVisual.js
// Genera representación visual de ríos
// =======================================================

export function generarRiosVisual(terrenos) {

  const rios = [];

  terrenos.forEach(t => {

    // Simulación simple:
    // si el terreno es montaña o colina, pequeña probabilidad de río
    if (t.tipo === "montanas" || t.tipo === "colina") {

      if (Math.random() < 0.05) {

        rios.push({
          x: t.x,
          y: t.y,
          tipo: "rio_1"
        });

      }
    }

  });

  return rios;
}