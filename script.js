// script.js

const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

// Genera una semilla aleatoria o usa la definida en la URL
function getSeed() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("seed")) {
    return parseInt(params.get("seed"));
  }
  return Math.floor(Math.random() * 100000);
}

const seed = getSeed();
Perlin.init(seed);

function generarMapa() {
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
}

// Mostrar semilla en pantalla
function mostrarSemilla() {
  const div = document.createElement("div");
  div.style.marginTop = "10px";
  div.innerHTML = `Semilla usada: <b>${seed}</b><br>
    <small>(Para regenerar este mapa: ?seed=${seed} en la URL)</small>`;
  document.body.appendChild(div);
}

generarMapa();
mostrarSemilla();