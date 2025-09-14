// 📂 frontend/js/script.js

import { generarTerreno } from "./mapa/generacionTerreno.js";

// Seleccionamos el canvas y el contexto
const canvas = document.getElementById("mapaCanvas");
const ctx = canvas.getContext("2d");

// Botones
const btnGenerar = document.getElementById("btnGenerar");
const btnGuardar = document.getElementById("btnGuardar");

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

// Generar mapa inicial al cargar la página
let mapaActual = generarTerreno(80, 60);
dibujarMapa(mapaActual);

// Botón: generar un nuevo terreno
btnGenerar.addEventListener("click", () => {
  mapaActual = generarTerreno(80, 60);
  dibujarMapa(mapaActual);
});

// Botón: guardar el mapa como imagen
btnGuardar.addEventListener("click", () => {
  const enlace = document.createElement("a");
  enlace.download = "mapa_fantasia.png";
  enlace.href = canvas.toDataURL("image/png");
  enlace.click();
});