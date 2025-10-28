/**
 * @file script.js
 * @description Punto de entrada del generador de mapa fantástico. 
 * Coordina la creación de terrenos especiales y la generación de la leyenda.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.info("🗺️ Iniciando generador de mapa fantástico...");

  // Generar los terrenos especiales
  const terrenosGenerados = generarTerrenoEspecial();

  // Inicializar la leyenda
  inicializarLeyendaTerrenoEspecial(terrenosGenerados);

  console.info("✅ Mapa y leyenda generados correctamente.");
});