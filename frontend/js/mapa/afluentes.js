/**************************************************
 * GENERADOR DE AFLUENTES
 **************************************************/

/**
 * Genera afluentes secundarios que desembocan en ríos principales
 * @param {Array} riosPrincipales
 * @param {Array} mapa
 * @param {number} cantidad
 * @returns {Array} afluentes
 */
function generarAfluentes(riosPrincipales, mapa, cantidad = 15) {
  const afluentes = [];

  for (let i = 0; i < cantidad; i++) {
    const puntoUnion = seleccionarPuntoDeRio(riosPrincipales);
    if (!puntoUnion) continue;

    const nacimiento = buscarNacimientoCercano(puntoUnion, mapa);
    if (!nacimiento) continue;

    const afluente = trazarAfluente(nacimiento, puntoUnion, mapa);
    if (afluente.length > 3) {
      afluentes.push(afluente);
    }
  }

  return afluentes;
}

/**
 * Selecciona una celda aleatoria de un río existente
 */
function seleccionarPuntoDeRio(rios) {
  const rio = rios[Math.floor(Math.random() * rios.length)];
  if (!rio || rio.length < 5) return null;
  return rio[Math.floor(Math.random() * (rio.length - 3)) + 2];
}

/**
 * Busca una celda más alta cercana para el nacimiento
 */
function buscarNacimientoCercano(destino, mapa) {
  const vecinos = obtenerVecinos(destino, mapa)
    .filter(v => v.altura > destino.altura + 0.05);

  if (vecinos.length === 0) return null;
  return vecinos[Math.floor(Math.random() * vecinos.length)];
}

/**
 * Traza el recorrido del afluente hasta unirse al río
 */
function trazarAfluente(origen, destino, mapa) {
  const afluente = [];
  let actual = origen;
  const visitadas = new Set();

  while (actual && actual !== destino && afluente.length < 30) {
    const key = `${actual.x},${actual.y}`;
    if (visitadas.has(key)) break;
    visitadas.add(key);

    afluente.push(actual);

    const vecinos = obtenerVecinos(actual, mapa)
      .filter(v => v.altura <= actual.altura);

    if (vecinos.length === 0) break;

    vecinos.sort((a, b) => a.altura - b.altura);
    actual = vecinos[0];
  }

  afluente.push(destino);
  return afluente;
}

// Exposición global
window.generarAfluentes = generarAfluentes;