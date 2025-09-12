// script.js

const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

function generarMapa() {
  const escala = 0.05; // controla el tamaño de los continentes
  const nivelAgua = 0.0; // umbral entre agua y tierra

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // ruido 2D
      let valor = Perlin.noise(x * escala, y * escala, 0);

      if (valor < nivelAgua) {
        ctx.fillStyle = "#2a4d8f"; // mar
      } else {
        ctx.fillStyle = "#3b8d3b"; // tierra
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

generarMapa();