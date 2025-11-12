// ==============================
// Generador de Mapa Fantástico
// ==============================

// Escala del mundo (1 = tamaño Tierra)
let escalaMundo = 1;

// Referencias al DOM
const selectorTamano = document.getElementById("tamano-mapa");
const botonGenerar = document.getElementById("btn-generar");
const mapaContainer = document.getElementById("mapa-container");

// ==============================
// Inicialización
// ==============================
window.addEventListener("DOMContentLoaded", () => {
  generarMapa();
});

// ==============================
// Cambio de tamaño del mundo
// ==============================
selectorTamano.addEventListener("change", () => {
  escalaMundo = parseInt(selectorTamano.value);
  generarMapa();
});

// ==============================
// Botón "Generar mapa"
// ==============================
botonGenerar.addEventListener("click", () => {
  generarMapa();
});

// ==============================
// Función principal
// ==============================
function generarMapa() {
  // Limpia el contenedor
  mapaContainer.innerHTML = "";

  // Tamaño base del mapa
  const anchoBase = 1000;
  const altoBase = 600;

  // Escala visual real: más grande según tamaño del mundo
  const factorEscalaVisual = 0.6 + escalaMundo * 0.25;
  const anchoFinal = anchoBase * factorEscalaVisual;
  const altoFinal = altoBase * factorEscalaVisual;

  // Aplica el nuevo tamaño
  mapaContainer.style.width = `${anchoFinal}px`;
  mapaContainer.style.height = `${altoFinal}px`;

  // Centra el mapa en la pantalla
  mapaContainer.style.margin = "0 auto";

  // Genera terrenos especiales
  generarTerrenosEspeciales(mapaContainer, escalaMundo);

  // Actualiza la leyenda
  generarLeyendaTerrenosEspeciales();
}