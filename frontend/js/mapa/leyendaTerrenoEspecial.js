// =====================================================
// 🌋 GENERADOR DE TERRENOS ESPECIALES
// Coloca iconos de terrenos especiales en el mapa
// usando posiciones aleatorias dentro del contenedor.
// =====================================================

// Ruta base de iconos
const RUTA_TERRENO_ESPECIAL = "frontend/static/img/icons/terreno_especial/";

// Lista compartida con la leyenda
const TERRENOS_ESPECIALES = [
  "bosque_especial",
  "desierto_calido_especial",
  "glaciar_especial",
  "lago_especial",
  "montanas_especial",
  "pantano_especial",
  "volcan_especial"
];

// Número máximo de iconos especiales que se generarán automáticamente
const NUM_ICONOS_ESPECIALES = 4;

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", generarTerrenosEspeciales);

function generarTerrenosEspeciales() {
  const contenedor = document.getElementById("mapa-container");
  if (!contenedor) {
    console.error("❌ No se encontró el contenedor del mapa.");
    return;
  }

  // Limpiar iconos anteriores si existen
  const existentes = contenedor.querySelectorAll(".icono-terreno-especial");
  existentes.forEach(icono => icono.remove());

  // Elegir aleatoriamente terrenos especiales
  const seleccionados = obtenerTerrenosAleatorios(TERRENOS_ESPECIALES, NUM_ICONOS_ESPECIALES);

  seleccionados.forEach(nombre => {
    const icono = document.createElement("img");
    icono.src = `${RUTA_TERRENO_ESPECIAL}${nombre}.png`;
    icono.alt = nombre.replace(/_/g, " ");
    icono.classList.add("icono-terreno-especial");

    // Posición aleatoria dentro del mapa
    const x = Math.random() * (contenedor.clientWidth - 64);
    const y = Math.random() * (contenedor.clientHeight - 64);
    icono.style.left = `${x}px`;
    icono.style.top = `${y}px`;

    contenedor.appendChild(icono);
  });
}

/**
 * Devuelve una lista con `cantidad` elementos aleatorios del array
 */
function obtenerTerrenosAleatorios(array, cantidad) {
  const copia = [...array];
  const resultado = [];
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const indice = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(indice, 1)[0]);
  }
  return resultado;
}