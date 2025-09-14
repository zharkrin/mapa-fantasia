import { generarTerreno } from "./mapa/generacionTerreno.js";

// Referencias al DOM
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
const btnGenerar = document.getElementById("generar");
const selectTamano = document.getElementById("tamano");
const inputDetalle = document.getElementById("detalle");

// Función para dibujar el mapa en el canvas
function dibujarMapa(matriz) {
  const ancho = matriz.length;
  const alto = matriz[0].length;
  const imgData = ctx.createImageData(ancho, alto);

  for (let x = 0; x < ancho; x++) {
    for (let y = 0; y < alto; y++) {
      const valor = matriz[x][y];
      const index = (y * ancho + x) * 4;

      // Escala de colores según altura
      let color;
      if (valor < 0.3) color = [0, 0, 150];       // Agua profunda
      else if (valor < 0.4) color = [0, 100, 200]; // Costa
      else if (valor < 0.6) color = [50, 200, 50]; // Llanura
      else if (valor < 0.8) color = [100, 100, 100]; // Montaña
      else color = [255, 255, 255];               // Nieve

      imgData.data[index] = color[0];
      imgData.data[index + 1] = color[1];
      imgData.data[index + 2] = color[2];
      imgData.data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

// Función principal para generar y mostrar el mapa
function generarMapa() {
  const tamano = parseInt(selectTamano.value, 10);
  const detalle = parseInt(inputDetalle.value, 10);

  // Ajustar tamaño del canvas
  canvas.width = tamano;
  canvas.height = tamano;

  const terreno = generarTerreno(tamano, tamano, detalle);
  dibujarMapa(terreno);
}

// Evento para botón
btnGenerar.addEventListener("click", generarMapa);

// Generar mapa inicial
generarMapa();