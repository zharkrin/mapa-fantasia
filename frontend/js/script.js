// script.js
// Archivo principal del proyecto

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { asignarBiomas } from "./mapa/biomas.js";

// ================================
// Configuración inicial
// ================================
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

const ancho = 60; // número de columnas
const alto = 45;  // número de filas
const tamCelda = 12; // tamaño en px de cada celda

canvas.width = ancho * tamCelda;
canvas.height = alto * tamCelda;

// ================================
// Generación del mapa
// ================================
let mapa = generarTerreno(ancho, alto);
mapa = asignarBiomas(mapa);

// ================================
// Dibujado del mapa
// ================================
function dibujarMapa() {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const celda = mapa[y][x];
      ctx.fillStyle = colorSegunCelda(celda);
      ctx.fillRect(x * tamCelda, y * tamCelda, tamCelda, tamCelda);
    }
  }
}

// ================================
// Colores según tipo de celda
// ================================
function colorSegunCelda(celda) {
  switch (celda) {
    case "agua":
      return "#4f81bd"; // azul
    case "montaña":
      return "#7f7f7f"; // gris
    case "bosque":
      return "#228B22"; // verde bosque
    case "pradera":
      return "#7CFC00"; // verde claro
    case "desierto":
      return "#edc9af"; // arena
    case "tundra":
      return "#dcdcdc"; // blanco/grisáceo
    case "tierra":
    default:
      return "#deb887"; // marrón tierra
  }
}

// ================================
// Inicialización
// ================================
dibujarMapa();