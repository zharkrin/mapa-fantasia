// script.js
// Punto de entrada principal para el generador de mapas de fantasía

import { generarTerreno } from "./mapa/generacionTerreno.js";

// ================================
// Selección de elementos del DOM
// ================================
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const btnGenerar = document.getElementById("btnGenerar");
const btnLimpiar = document.getElementById("btnLimpiar");

// ================================
// Funciones principales
// ================================

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

// ================================
// Eventos
// ================================

btnGenerar.addEventListener("click", () => {
  limpiarMapa();
  const mapa = generarTerreno(60, 45); // ancho x alto en celdas
  dibujarTerreno(mapa);
});

btnLimpiar.addEventListener("click", limpiarMapa);

// ================================
// Inicialización automática
// ================================

// Genera un mapa al cargar la página
window.addEventListener("load", () => {
  const mapa = generarTerreno(60, 45);
  dibujarTerreno(mapa);
});