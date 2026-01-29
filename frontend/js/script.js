/**************************************************
 * GENERADOR PRINCIPAL DEL MAPA
 **************************************************/

const selectorTamano = document.getElementById("tamano-mapa");
const botonGenerar = document.getElementById("btn-generar");
const mapaContainer = document.getElementById("mapa");

const TAM_CELDA = 16;

// Estado global del mapa
let datosMapa = null;
let riosGenerados = null;

/**
 * Genera TODO el mapa
 */
function generarMapaCompleto() {
  const escala = parseInt(selectorTamano.value, 10);

  // 1️⃣ Limpiar mapa
  mapaContainer.innerHTML = "";

  // 2️⃣ Generar estructura base
  datosMapa = generarMapaBase(escala);

  // 3️⃣ Biomas y terrenos
  generarBiomas(datosMapa);
  generarTerrenos(datosMapa);

  // 4️⃣ Terrenos especiales
  generarTerrenosEspeciales(datosMapa);

  // 5️⃣ Dibujar mapa base
  dibujarMapa(datosMapa, mapaContainer, TAM_CELDA);

  // 6️⃣ Generar ríos (usa alturas)
  riosGenerados = generarRios(datosMapa);

  // 7️⃣ Dibujar ríos
  dibujarRios(riosGenerados, mapaContainer, TAM_CELDA);
}

/**************************************************
 * EVENTOS
 **************************************************/

// Cambio de tamaño → genera automáticamente
selectorTamano.addEventListener("change", () => {
  generarMapaCompleto();
});

// Botón → regenerar con mismo tamaño
botonGenerar.addEventListener("click", () => {
  generarMapaCompleto();
});

// Generación inicial
generarMapaCompleto();