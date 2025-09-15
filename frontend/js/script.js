// 📂 frontend/js/script.js

import { generarTerreno } from "./mapa/generacionTerreno.js";

// Seleccionamos el canvas y el contexto
const canvas = document.getElementById("mapaCanvas");
const ctx = canvas.getContext("2d");

// Botones y controles
const btnGenerar = document.getElementById("btnGenerar");
const btnGuardar = document.getElementById("btnGuardar");
const sliderEscala = document.getElementById("escala");
const valorEscala = document.getElementById("valorEscala");

// Escala inicial por defecto
let escalaActual = parseInt(sliderEscala.value, 10);

// Función para dibujar el mapa en el canvas
function dibujarMapa(mapa) {
  const anchoCelda = canvas.width / mapa[0].length;
  const altoCelda = canvas.height / mapa.length;

  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[0].length; x++) {
      const valor = mapa[y][x];

      if (valor < 0.3) {
        ctx.fillStyle = "#1E90FF"; // Agua
      } else if (valor < 0.5) {
        ctx.fillStyle = "#228B22"; // Tierra baja
      } else if (valor < 0.7) {
        ctx.fillStyle = "#A9A9A9"; // Montaña baja
      } else {
        ctx.fillStyle = "#FFFFFF"; // Nieve
      }

      ctx.fillRect(x * anchoCelda, y * altoCelda, anchoCelda, altoCelda);
    }
  }
}

// Generar mapa inicial
let mapaActual = generarTerreno(80, 60, escalaActual);
dibujarMapa(mapaActual);

// Botón: generar un nuevo terreno
btnGenerar.addEventListener("click", () => {
  escalaActual = parseInt(sliderEscala.value, 10);
  mapaActual = generarTerreno(80, 60, escalaActual);
  dibujarMapa(mapaActual);
});

// Botón: guardar el mapa como imagen
btnGuardar.addEventListener("click", () => {
  const enlace = document.createElement("a");
  enlace.download = "mapa_fantasia.png";
  enlace.href = canvas.toDataURL("image/png");
  enlace.click();
});

// Slider: actualizar valor mostrado
sliderEscala.addEventListener("input", () => {
  valorEscala.textContent = sliderEscala.value;
});