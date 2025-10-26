// ===========================================
// Generación de Terreno Especial
// frontend/js/mapa/terrenoEspecial.js
// ===========================================

/**
 * Lista base de tipos de terreno especial
 * - nombre: nombre genérico
 * - icono: nombre del archivo correspondiente en /frontend/static/Img/icons/terreno_especial/
 */
const tiposTerrenoEspecial = [
  { nombre: "Bosque especial", icono: "bosque_especial.png" },
  { nombre: "Desierto cálido especial", icono: "desierto_calido_especial.png" },
  { nombre: "Glaciar especial", icono: "glaciar_especial.png" },
  { nombre: "Lago especial", icono: "lago_especial.png" },
  { nombre: "Montañas especiales", icono: "montanas_especial.png" },
  { nombre: "Pantano especial", icono: "pantano_especial.png" },
  { nombre: "Volcán especial", icono: "volcan_especial.png" }
];

// Ruta base de los íconos
const RUTA_ICONOS_ESPECIALES = "frontend/static/Img/icons/terreno_especial/";

/**
 * Genera un número aleatorio entre min y max (inclusive)
 */
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Genera un conjunto de terrenos especiales en posiciones aleatorias dentro del mapa
 * @param {Object} mapa - objeto de mapa con ancho y alto { ancho, alto }
 * @param {number} cantidad - cantidad de terrenos especiales a generar
 * @returns {Array} lista de terrenos especiales generados con {nombre, icono, x, y}
 */
function generarTerrenosEspeciales(mapa, cantidad = 3) {
  const generados = [];

  for (let i = 0; i < cantidad; i++) {
    const tipo = tiposTerrenoEspecial[aleatorio(0, tiposTerrenoEspecial.length - 1)];

    const terreno = {
      nombre: tipo.nombre,
      icono: `${RUTA_ICONOS_ESPECIALES}${tipo.icono}`,
      x: aleatorio(0, mapa.ancho),
      y: aleatorio(0, mapa.alto)
    };

    generados.push(terreno);
  }

  return generados;
}

/**
 * Dibuja los terrenos especiales sobre el mapa en un canvas o contenedor específico
 * @param {Array} terrenos - lista generada por generarTerrenosEspeciales()
 * @param {HTMLElement} contenedor - elemento donde se dibujarán los iconos
 */
function dibujarTerrenosEspeciales(terrenos, contenedor) {
  if (!contenedor) {
    console.warn("⚠️ Contenedor no definido para dibujar terrenos especiales.");
    return;
  }

  terrenos.forEach((terreno) => {
    const img = document.createElement("img");
    img.src = terreno.icono;
    img.alt = terreno.nombre;
    img.title = terreno.nombre;
    img.classList.add("icono-terreno-especial");

    // Posición absoluta basada en coordenadas x, y
    img.style.position = "absolute";
    img.style.left = `${terreno.x}px`;
    img.style.top = `${terreno.y}px`;
    img.style.width = "32px"; // tamaño estándar de icono
    img.style.height = "32px";

    contenedor.appendChild(img);
  });
}

/**
 * Inicializa la generación de terrenos especiales
 * @param {HTMLElement} contenedorMapa - elemento contenedor del mapa
 * @param {Object} mapa - objeto con ancho y alto
 */
function inicializarTerrenoEspecial(contenedorMapa, mapa) {
  const terrenos = generarTerrenosEspeciales(mapa, 3); // por defecto 3
  dibujarTerrenosEspeciales(terrenos, contenedorMapa);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const contenedorMapa = document.getElementById("mapa-container");
  if (!contenedorMapa) {
    console.warn("⚠️ Contenedor del mapa no encontrado.");
    return;
  }

  // Ejemplo: objeto mapa con tamaño de contenedor
  const mapa = {
    ancho: contenedorMapa.clientWidth,
    alto: contenedorMapa.clientHeight
  };

  inicializarTerrenoEspecial(contenedorMapa, mapa);
});