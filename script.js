// script.js

const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const inputSemilla = document.getElementById("inputSemilla");
const btnGenerar = document.getElementById("btnGenerar");
const btnAleatorio = document.getElementById("btnAleatorio");
const infoSemilla = document.getElementById("infoSemilla");

function generarMapa(seed) {
  Perlin.init(seed);

  const escala = 0.05;
  const nivelAgua = 0.0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let valor = Perlin.noise(x * escala, y * escala, 0);

      if (valor < nivelAgua) {
        ctx.fillStyle = "#2a4d8f"; // mar
      } else {
        ctx.fillStyle = "#3b8d3b"; // tierra
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  infoSemilla.innerHTML = `Semilla usada: <b>${seed}</b>`;
}

// Generar mapa inicial aleatorio
let semillaInicial = Math.floor(Math.random() * 100000);
generarMapa(semillaInicial);

// Botón: generar con semilla introducida
btnGenerar.addEventListener("click", () => {
  let s = parseInt(inputSemilla.value);
  if (isNaN(s)) {
    alert("Introduce un número válido como semilla.");
    return;
  }
  generarMapa(s);
});

// Botón: mapa aleatorio
btnAleatorio.addEventListener("click", () => {
  let s = Math.floor(Math.random() * 100000);
  inputSemilla.value = s;
  generarMapa(s);
});