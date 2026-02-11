/**************************************************
 * GENERADOR DE DELTAS FLUVIALES
 **************************************************/

/**
 * Genera deltas en ríos que desembocan en el mar
 * @param {Array} rios
 * @param {Array} mapa
 * @returns {Array} deltas
 */
function generarDeltas(rios, mapa) {
  const deltas = [];

  rios.forEach(rio => {
    const final = rio[rio.length - 1];

    if (esDesembocaduraEnMar(final, mapa)) {
      const brazos = crearBrazosDelta(final, mapa);
      deltas.push(...brazos);
    }
  });

  return deltas;
}

/**
 * Verifica si el río termina junto al mar
 */
function esDesembocaduraEnMar(celda, mapa) {
  const vecinos = obtenerVecinos(celda, mapa);
  return vecinos.some(v => v.terreno === "mar" || v.terreno === "oceano");
}

/**
 * Crea ramificaciones cortas tipo abanico
 */
function crearBrazosDelta(origen, mapa) {
  const brazos = [];
  const vecinos = obtenerVecinos(origen, mapa)
    .filter(v => v.altura <= origen.altura);

  // máximo 3 brazos
  const cantidad = Math.min(3, vecinos.length);

  for (let i = 0; i < cantidad; i++) {
    const brazo = [];
    let actual = vecinos[i];
    let pasos = 0;

    while (actual && pasos < 6) {
      brazo.push(actual);

      const siguientes = obtenerVecinos(actual, mapa)
        .filter(v => v.altura <= actual.altura);

      if (siguientes.length === 0) break;

      siguientes.sort((a, b) => a.altura - b.altura);
      actual = siguientes[0];
      pasos++;
    }

    if (brazo.length > 2) {
      brazos.push(brazo);
    }
  }

  return brazos;
}

// Exposición global
window.generarDeltas = generarDeltas;