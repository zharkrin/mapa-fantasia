// ======================================
// Script principal
// frontend/js/script.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  // Generar los terrenos especiales
  const terrenosGenerados = generarTerrenoEspecial();

  // Inicializar la leyenda con esos terrenos
  inicializarLeyendaTerrenoEspecial(terrenosGenerados);
});