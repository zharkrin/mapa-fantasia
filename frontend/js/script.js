// frontend/js/script.js
// Archivo principal que inicializa el mapa

import { generarBiomas } from "./generacion-biomas.js";

function generarMapa() {
  const canvas = document.getElementById("mapa");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  // Generar biomas primero
  const dataBiomas = generarBiomas(ctx, width, height, 0.008);

  console.log("Biomas generados:", dataBiomas);
}

window.onload = generarMapa;
