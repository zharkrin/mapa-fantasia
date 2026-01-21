/**************************************************
 * RÍOS - LÓGICA PURA
 * Genera ríos como recorridos de puntos
 **************************************************/

// Configuración base
const MAX_RIOS = 12;
const LONGITUD_MIN_RIO = 6;
const LONGITUD_MAX_RIO = 20;

/**
 * Genera todos los ríos del mapa
 * @param {Array} celdas - grid del mapa con altura y tipo
 * @param {number} ancho
 * @param {number} alto
 * @returns {Array} rios
 */
function generarRios(celdas, ancho, alto) {
  const rios = [];
  const nacimientos = buscarZonasAltas(celdas);

  shuffleArray(nacimientos);

  for (let i = 0; i < nacimientos.length && rios.length < MAX_RIOS; i++) {
    const inicio = nacimientos[i];
    const rio = generarRioDesde(inicio, celdas, ancho, alto);

    if (rio.length >= LONGITUD_MIN_RIO) {
      rios.push(rio);
    }
  }

  return rios;
}

/**
 * Busca posibles nacimientos (zonas altas)
 */
function buscarZonasAltas(celdas) {
  return celdas.filter(celda =>
    celda.altura >= 0.75 &&
    celda.tipo !== "mar" &&
    celda.tipo !== "oceano"
  );
}

/**
 * Genera un río desde una celda inicial
 */
function generarRioDesde(inicio, celdas, ancho, alto) {
  const rio = [];
  const visitadas = new Set();

  let actual = inicio;

  while (actual && rio.length < LONGITUD_MAX_RIO) {
    const key = `${actual.x},${actual.y}`;
    if (visitadas.has(key)) break;

    rio.push(actual);
    visitadas.add(key);

    const siguiente = buscarCeldaMasBaja(actual, celdas, ancho, alto);
    if (!siguiente) break;

    actual = siguiente;

    if (actual.tipo === "mar" || actual.tipo === "oceano") {
      rio.push(actual);
      break;
    }
  }

  return rio;
}

/**
 * Busca la celda vecina más baja
 */
function buscarCeldaMasBaja(celda, celdas, ancho, alto) {
  const vecinos = obtenerVecinos(celda, celdas, ancho, alto);

  let mejor = null;
  let alturaMin = celda.altura;

  for (const v of vecinos) {
    if (v.altura < alturaMin) {
      alturaMin = v.altura;
      mejor = v;
    }
  }

  return mejor;
}

/**
 * Obtiene vecinos ortogonales
 */
function obtenerVecinos(celda, celdas, ancho, alto) {
  const offsets = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];

  const vecinos = [];

  for (const o of offsets) {
    const nx = celda.x + o.x;
    const ny = celda.y + o.y;

    if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto) {
      const index = ny * ancho + nx;
      vecinos.push(celdas[index]);
    }
  }

  return vecinos;
}

/**
 * Baraja un array (Fisher–Yates)
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Exposición global (proyecto sin módulos ES)
window.generarRios = generarRios;