// =======================================================
// frontend/js/script.js
// Script principal: genera y dibuja el mapa completo
// =======================================================

import { generarTerrenoBase } from "./mapa/generacionTerreno.js";
import { generarBiomas } from "./mapa/biomas.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";
import { generarTerrenoEspecial } from "./mapa/terrenoEspecial.js";

// Inicializar mapa al cargar
window.addEventListener("DOMContentLoaded", () => {
  const ancho = 1000;
  const alto = 600;

  // Generar terrenos, biomas y especiales
  const terrenos = generarTerrenoBase(ancho, alto, 25);
  const biomas = generarBiomas(ancho, alto, 35);
  const especiales = generarTerrenoEspecial(ancho, alto, 4);

  // Dibujar mapa completo
  dibujarMapa(terrenos, biomas, especiales);
});