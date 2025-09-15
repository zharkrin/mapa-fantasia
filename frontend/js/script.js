// script.js
// Punto de entrada principal para el generador de mapas

import { generarTerreno } from "./mapa/generacionTerreno.js";

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const btnGenerar = document.getElementById("btnGenerar");
const btnLimpiar = document.getElementById("btnLimpiar");

// Dibujar el terreno generado en el canvas
function dibujarTerreno(mapa) {
  const colores = {
    agua: "#1E90FF",
    tierra: "#228B22",
    montaña: "#A9A9A9",
  };

  const anchoCelda = canvas.width / mapa[0].length;
  const altoCelda = canvas.height / mapa.length;

  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      ctx.fillStyle = colores[mapa[y][x]] || "#000";
      ctx.fillRect(x * anchoCelda, y * altoCelda, anchoCelda, altoCelda);
    }
  }
}

// Limpiar el canvas
function limpiarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

btnGenerar.addEventListener("click", () => {
  limpiarMapa();
  const mapa = generarTerreno(60, 45);
  dibujarTerreno(mapa);
});

btnLimpiar.addEventListener("click", limpiarMapa);

window.addEventListener("load", () => {
  const mapa = generarTerreno(60, 45);
  dibujarTerreno(mapa);
});