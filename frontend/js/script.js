// script.js
// Integración completa de terreno, biomas, ríos y caminos

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { asignarBiomas } from "./mapa/biomas.js";
import { generarRios } from "./mapa/rios.js";
import { generarCaminos } from "./mapa/caminos.js";

// Canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

const ancho = 60;
const alto = 45;
const tamCelda = 12;

canvas.width = ancho * tamCelda;
canvas.height = alto * tamCelda;

// Generar mapa completo
let mapa = generarTerreno(ancho, alto);
mapa = asignarBiomas(mapa);
mapa = generarRios(mapa, 3);
mapa = generarCaminos(mapa);

// Dibujar mapa
function dibujarMapa() {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      ctx.fillStyle = colorSegunCelda(mapa[y][x]);
      ctx.fillRect(x * tamCelda, y * tamCelda, tamCelda, tamCelda);
    }
  }
}

// Colores según tipo de celda
function colorSegunCelda(celda) {
  switch (celda) {
    case "agua": return "#4f81bd";
    case "montaña": return "#7f7f7f";
    case "bosque": return "#228B22";
    case "pradera": return "#7CFC00";
    case "desierto": return "#edc9af";
    case "tundra": return "#dcdcdc";
    case "rio": return "#1E90FF";
    case "camino": return "#8B4513";
    case "tierra":
    default: return "#deb887";
  }
}

dibujarMapa();