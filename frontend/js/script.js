// script.js
// Integración de terreno, biomas, ríos, caminos y nombres

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { asignarBiomas } from "./mapa/biomas.js";
import { generarRios } from "./mapa/rios.js";
import { generarCaminos } from "./mapa/caminos.js";
import { generarNombreRio, generarNombreMontaña, generarNombreCamino } from "./mapa/nombres.js";

// Canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

const ancho = 60;
const alto = 45;
const tamCelda = 12;

canvas.width = ancho * tamCelda;
canvas.height = alto * tamCelda;

// Generar mapa
let mapa = generarTerreno(ancho, alto);
mapa = asignarBiomas(mapa);
mapa = generarRios(mapa, 3);
mapa = generarCaminos(mapa);

// Almacenar nombres
let nombres = {
  rios: [],
  montanas: [],
  caminos: []
};

// Buscar ubicaciones y asignar nombres
function asignarNombres() {
  // Ríos
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (mapa[y][x] === "rio" && Math.random() < 0.002) {
        nombres.rios.push({ nombre: generarNombreRio(), x, y });
      }
    }
  }
  // Montañas
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (mapa[y][x] === "montaña" && Math.random() < 0.005) {
        nombres.montanas.push({ nombre: generarNombreMontaña(), x, y });
      }
    }
  }
  // Caminos
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (mapa[y][x] === "camino" && Math.random() < 0.003) {
        nombres.caminos.push({ nombre: generarNombreCamino(), x, y });
      }
    }
  }
}

// Dibujar mapa
function dibujarMapa() {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      ctx.fillStyle = colorSegunCelda(mapa[y][x]);
      ctx.fillRect(x * tamCelda, y * tamCelda, tamCelda, tamCelda);
    }
  }
  dibujarNombres();
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

// Dibujar etiquetas de nombres
function dibujarNombres() {
  ctx.font = "10px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  nombres.rios.forEach(r => {
    ctx.fillText(r.nombre, r.x * tamCelda, r.y * tamCelda);
  });
  nombres.montanas.forEach(m => {
    ctx.fillText(m.nombre, m.x * tamCelda, m.y * tamCelda);
  });
  nombres.caminos.forEach(c => {
    ctx.fillText(c.nombre, c.x * tamCelda, c.y * tamCelda);
  });
}

asignarNombres();
dibujarMapa();