// script.js
// Integración de terreno, biomas, ríos, caminos y nombres con detección de colisiones

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
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (mapa[y][x] === "rio" && Math.random() < 0.002) {
        nombres.rios.push({ nombre: generarNombreRio(), x, y });
      }
      if (mapa[y][x] === "montaña" && Math.random() < 0.005) {
        nombres.montanas.push({ nombre: generarNombreMontaña(), x, y });
      }
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

// Control de colisiones de texto
function hayColision(rect, usados) {
  return usados.some(u =>
    rect.x < u.x + u.w &&
    rect.x + rect.w > u.x &&
    rect.y < u.y + u.h &&
    rect.y + rect.h > u.y
  );
}

function dibujarNombres() {
  ctx.font = "10px Arial";
  ctx.fillStyle = "white"; // nombres en blanco
  ctx.textAlign = "center";

  let usados = [];

  function colocarNombre(obj) {
    const texto = obj.nombre;
    let posX = obj.x * tamCelda;
    let posY = obj.y * tamCelda;
    let anchoTexto = ctx.measureText(texto).width;
    let altoTexto = 10;

    let intentos = 0;
    let colocado = false;

    while (intentos < 10 && !colocado) {
      const rect = { x: posX - anchoTexto / 2, y: posY - altoTexto, w: anchoTexto, h: altoTexto };
      if (!hayColision(rect, usados)) {
        ctx.fillText(texto, posX, posY);
        usados.push(rect);
        colocado = true;
      } else {
        // Probar posiciones cercanas
        posX += (Math.random() - 0.5) * 20;
        posY += (Math.random() - 0.5) * 20;
        intentos++;
      }
    }
  }

  nombres.rios.forEach(colocarNombre);
  nombres.montanas.forEach(colocarNombre);
  nombres.caminos.forEach(colocarNombre);
}

asignarNombres();
dibujarMapa();