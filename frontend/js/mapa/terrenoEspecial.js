/**
 * @file terrenoEspecial.js
 * @description Genera los terrenos especiales del mapa con nombres y posiciones aleatorias.
 */

/**
 * Genera una lista de terrenos especiales y los coloca en el mapa.
 * @returns {Array<Object>} Lista de objetos con `tipo` y `nombre` de cada terreno.
 */
function generarTerrenoEspecial() {
  const mapaContainer = document.getElementById("mapa-container");
  if (!mapaContainer) {
    console.warn("⚠️ No se encontró el contenedor del mapa.");
    return [];
  }

  /** @type {string[]} Tipos de terreno especial disponibles */
  const tipos = [
    "bosque_especial",
    "desierto_calido_especial",
    "glaciar_especial",
    "lago_especial",
    "montanas_especial",
    "pantano_especial",
    "volcan_especial"
  ];

  /** @type {string[]} Fragmentos de nombres fantásticos */
  const nombres = [
    "del Trueno", "de la Luna", "del Eco", "del Sol",
    "Sombrío", "Eterno", "Sagrado", "Olvidado"
  ];

  const terrenos = [];

  for (let i = 0; i < 4; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const nombre = generarNombreTerreno(tipo, nombres);
    const x = Math.floor(Math.random() * 900);
    const y = Math.floor(Math.random() * 500);

    const icono = document.createElement("img");
    icono.src = `frontend/static/img/icons/terreno_especial/${tipo}.png`;
    icono.alt = tipo;
    icono.className = "icono-terreno-especial";
    icono.style.left = `${x}px`;
    icono.style.top = `${y}px`;

    mapaContainer.appendChild(icono);
    terrenos.push({ tipo, nombre });
  }

  return terrenos;
}

/**
 * Genera un nombre de terreno fantástico combinando el tipo y un adjetivo.
 * @param {string} tipo - Tipo de terreno especial (por ejemplo, "volcan_especial").
 * @param {string[]} nombresFantasia - Lista de nombres o adjetivos fantásticos.
 * @returns {string} Nombre completo del terreno.
 */
function generarNombreTerreno(tipo, nombresFantasia) {
  const base = tipo.replace("_especial", "").replace("_", " ");
  const fantasia = nombresFantasia[Math.floor(Math.random() * nombresFantasia.length)];
  return `${capitalizar(base)} ${fantasia}`;
}

/**
 * Convierte la primera letra de un texto a mayúscula.
 * @param {string} str - Texto a capitalizar.
 * @returns {string} Texto con la primera letra en mayúscula.
 */
function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}