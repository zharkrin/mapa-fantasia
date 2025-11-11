// ==============================
// Generador de Mapa Fantástico
// ==============================

// Escala del mundo (1 = tamaño Tierra)
let escalaMundo = 1;

// Referencias al DOM
const selectorTamano = document.getElementById("tamano-mapa");
const botonGenerar = document.getElementById("btn-generar");

// Inicialización del mapa
window.addEventListener("DOMContentLoaded", () => {
  generarMapa();
});

// Evento: cambio de tamaño del mundo
selectorTamano.addEventListener("change", () => {
  escalaMundo = parseInt(selectorTamano.value);
  generarMapa();
});

// Evento: botón Generar manualmente
botonGenerar.addEventListener("click", () => {
  generarMapa();
});

// ==========================================
// Función principal: generar el mapa completo
// ==========================================
function generarMapa() {
  const mapaContainer = document.getElementById("mapa-container");

  // Limpia el contenedor antes de generar
  mapaContainer.innerHTML = "";

  // Ajuste de tamaño del mapa según escala
  const anchoBase = 1000;
  const altoBase = 600;
  mapaContainer.style.width = `${anchoBase * escalaMundo * 0.8}px`;
  mapaContainer.style.height = `${altoBase * escalaMundo * 0.8}px`;

  // Genera terrenos especiales
  generarTerrenosEspeciales(mapaContainer, escalaMundo);

  // Actualiza la leyenda
  generarLeyendaTerrenosEspeciales();
}