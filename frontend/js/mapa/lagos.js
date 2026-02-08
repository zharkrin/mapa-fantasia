/**************************************************
 * GENERADOR DE LAGOS
 **************************************************/

/**
 * Genera lagos a partir del final de los ríos
 * @param {Array} rios
 * @param {Array} mapa
 * @returns {Array} lagos
 */
function generarLagos(rios, mapa) {
  const lagos = [];

  rios.forEach(rio => {
    const ultimo = rio[rio.length - 1];

    // Si el río acaba en terreno bajo → lago
    if (esZonaLacustre(ultimo, mapa)) {
      const lago = crearLago(ultimo, mapa);
      if (lago.length > 0) {
        lagos.push(lago);
      }
    }
  });

  return lagos;
}

/**
 * Decide si una celda puede albergar un lago
 */
function esZonaLacustre(celda, mapa) {
  return (
    celda.altura < 0.25 &&
    celda.bioma !== "desierto" &&
    celda.terreno !== "mar"
  );
}

/**
 * Expande un lago desde una celda inicial
 */
function crearLago(origen, mapa) {
  const lago = [];
  const visitadas = new Set();
  const cola = [origen];

  while (cola.length > 0 && lago.length < 25) {
    const actual = cola.shift();
    const key = `${actual.x},${actual.y}`;

    if (visitadas.has(key)) continue;
    visitadas.add(key);

    lago.push(actual);

    const vecinos = obtenerVecinos(actual, mapa);
    vecinos.forEach(v => {
      if (
        !visitadas.has(`${v.x},${v.y}`) &&
        v.altura <= actual.altura + 0.02
      ) {
        cola.push(v);
      }
    });
  }

  return lago;
}

// Exposición global
window.generarLagos = generarLagos;