/**************************************************
 * RÍOS - SISTEMA COMPLETO
 * ORGÁNICO + EROSIÓN + MEANDROS
 * CAUDAL ACUMULATIVO + CASCADAS
 **************************************************/

// Configuración base
const MAX_RIOS = 12;
const LONGITUD_MIN_RIO = 6;
const LONGITUD_MAX_RIO = 25;

// Erosión
const EROSION_BASE = 0.01;
const EROSION_EXTRA_BAJA_ALTURA = 0.015;
const EROSION_CASCADA = 0.05;

// Meandros
const UMBRAL_PENDIENTE_PLANA = 0.03;
const PROBABILIDAD_MEANDRO = 0.35;

// Cascadas
const UMBRAL_CASCADA = 0.15;

/**
 * Genera todos los ríos
 */
function generarRios(celdas, ancho, alto) {
  const rios = [];
  const nacimientos = buscarZonasAltas(celdas);

  shuffleArray(nacimientos);

  for (let i = 0; i < nacimientos.length && rios.length < MAX_RIOS; i++) {
    const inicio = nacimientos[i];
    const rio = generarRioDesde(inicio, celdas, ancho, alto);

    if (rio.length >= LONGITUD_MIN_RIO) {
      aplicarErosion(rio);
      rios.push(rio);
    }
  }

  calcularCaudalGlobal(rios);

  return rios;
}

/**
 * Busca nacimientos en altura elevada
 */
function buscarZonasAltas(celdas) {
  return celdas.filter(celda =>
    celda.altura >= 0.75 &&
    celda.tipo !== "mar" &&
    celda.tipo !== "oceano"
  );
}

/**
 * Genera un río
 */
function generarRioDesde(inicio, celdas, ancho, alto) {
  const rio = [];
  const visitadas = new Set();

  let actual = inicio;
  let direccionAnterior = null;
  let caudal = 1;

  while (actual && rio.length < LONGITUD_MAX_RIO) {
    const key = `${actual.x},${actual.y}`;
    if (visitadas.has(key)) break;

    actual.rio = true;
    actual.caudal = (actual.caudal || 0) + caudal;

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

    // 🌊 DETECTAR CASCADA
    const salto = actual.altura - siguiente.altura;
    if (salto > UMBRAL_CASCADA) {
      actual.cascada = true;
    }

    direccionAnterior = {
      dx: siguiente.x - actual.x,
      dy: siguiente.y - actual.y
    };

    actual = siguiente;

    caudal += 0.5;

    if (actual.tipo === "mar" || actual.tipo === "oceano") {
      rio.push(actual);
      break;
    }
  }

  return rio;
}

/**
 * Selección orgánica
 */
function buscarCeldaOrganica(celda, direccionAnterior, celdas, ancho, alto) {
  const vecinos = obtenerVecinos(celda, celdas, ancho, alto);

  let mejor = null;
  let mejorScore = Infinity;

  for (const v of vecinos) {

    if (v.altura > celda.altura) continue;

    const pendiente = celda.altura - v.altura;

    const dx = v.x - celda.x;
    const dy = v.y - celda.y;

    let penalizacionGiro = 0;

    if (direccionAnterior) {
      const cambio =
        Math.abs(dx - direccionAnterior.dx) +
        Math.abs(dy - direccionAnterior.dy);

      penalizacionGiro = cambio * 0.05;
    }

    let bonusMeandro = 0;

    if (pendiente < UMBRAL_PENDIENTE_PLANA) {
      if (Math.random() < PROBABILIDAD_MEANDRO) {
        bonusMeandro = -0.02;
      }
    }

    const ruido = Math.random() * 0.02;

    const score =
      v.altura +
      penalizacionGiro +
      ruido +
      bonusMeandro;

    if (score < mejorScore) {
      mejorScore = score;
      mejor = v;
    }
  }

  return mejor;
}

/**
 * Aplica erosión
 */
function aplicarErosion(rio) {
  for (let i = 0; i < rio.length; i++) {
    const celda = rio[i];

    let erosion = EROSION_BASE;

    if (celda.altura < 0.5) {
      erosion += EROSION_EXTRA_BAJA_ALTURA;
    }

    if (celda.cascada) {
      erosion += EROSION_CASCADA;
    }

    celda.altura = Math.max(0, celda.altura - erosion);
  }
}

/**
 * Recalcula caudal acumulado
 */
function calcularCaudalGlobal(rios) {
  for (const rio of rios) {
    for (let i = 0; i < rio.length; i++) {
      const celda = rio[i];

      if (!celda.caudal) celda.caudal = 1;

      celda.anchoRio = Math.min(4, Math.floor(celda.caudal / 2));
    }
  }
}

/**
 * Vecinos ortogonales
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
 * Shuffle
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

window.generarRios = generarRios;