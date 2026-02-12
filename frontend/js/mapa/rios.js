/**************************************************
 * RÍOS - LÓGICA PURA (VERSIÓN ORGÁNICA)
 * Genera ríos como recorridos de puntos
 **************************************************/

// Configuración base
const MAX_RIOS = 12;
const LONGITUD_MIN_RIO = 6;
const LONGITUD_MAX_RIO = 20;

/**
 * Genera todos los ríos del mapa
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
 * (Ahora con curvatura orgánica)
 */
function generarRioDesde(inicio, celdas, ancho, alto) {
  const rio = [];
  const visitadas = new Set();

  let actual = inicio;
  let direccionAnterior = null;

  while (actual && rio.length < LONGITUD_MAX_RIO) {
    const key = `${actual.x},${actual.y}`;
    if (visitadas.has(key)) break;

    rio.push(actual);
    visitadas.add(key);

    const siguiente = buscarCeldaOrganica(
      actual,
      direccionAnterior,
      celdas,
      ancho,
      alto
    );

    if (!siguiente) break;

    direccionAnterior = {
      dx: siguiente.x - actual.x,
      dy: siguiente.y - actual.y
    };

    actual = siguiente;

    if (actual.tipo === "mar" || actual.tipo === "oceano") {
      rio.push(actual);
      break;
    }
  }

  return rio;
}

/**
 * Selecciona siguiente celda con curvatura natural
 */
function buscarCeldaOrganica(celda, direccionAnterior, celdas, ancho, alto) {
  const vecinos = obtenerVecinos(celda, celdas, ancho, alto);

  let mejor = null;
  let mejorScore = Infinity;

  for (const v of vecinos) {

    // Solo bajamos o nos mantenemos
    if (v.altura > celda.altura) continue;

    const dx = v.x - celda.x;
    const dy = v.y - celda.y;

    let penalizacionGiro = 0;

    if (direccionAnterior) {
      const cambio =
        Math.abs(dx - direccionAnterior.dx) +
        Math.abs(dy - direccionAnterior.dy);

      penalizacionGiro = cambio * 0.05;
    }

    const ruido = Math.random() * 0.02;

    const score = v.altura + penalizacionGiro + ruido;

    if (score < mejorScore) {
      mejorScore = score;
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

// Exposición global
window.generarRios = generarRios;