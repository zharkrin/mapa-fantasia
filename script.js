// script.js con ríos y montañas

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
  const nivelMontana = 0.5; // valores altos -> montañas
  const nivelRío = 0.05;    // valles para ríos (aprox)

  let altura = []; // matriz para almacenar valores de altura

  // 1️⃣ Generar mapa base y almacenar alturas
  for (let x = 0; x < width; x++) {
    altura[x] = [];
    for (let y = 0; y < height; y++) {
      let valor = Perlin.noise(x * escala, y * escala, 0);
      altura[x][y] = valor;

      if (valor < nivelAgua) {
        ctx.fillStyle = "#2a4d8f"; // mar
      } else if (valor > nivelMontana) {
        ctx.fillStyle = "#888888"; // montaña
      } else {
        ctx.fillStyle = "#3b8d3b"; // tierra
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // 2️⃣ Generar ríos simples
  // Estrategia: buscar puntos altos y trazar hacia mar siguiendo pendiente
  const numRios = 5;
  for (let i = 0; i < numRios; i++) {
    // punto inicial montaña aleatoria
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    // solo empezar si es montaña
    if (altura[x][y] < nivelMontana) continue;

    for (let paso = 0; paso < 300; paso++) {
      ctx.fillStyle = "#1ca3ec"; // color río
      ctx.fillRect(x, y, 1, 1);

      // buscar vecino más bajo
      let vecinos = [
        [x+1,y], [x-1,y], [x,y+1], [x,y-1],
        [x+1,y+1], [x-1,y-1], [x+1,y-1], [x-1,y+1]
      ];

      let minAltura = altura[x][y];
      let siguiente = [x, y];

      for (let [nx, ny] of vecinos) {
        if (nx >= 0 && nx < width && ny >=0 && ny < height) {
          if (altura[nx][ny] < minAltura) {
            minAltura = altura[nx][ny];
            siguiente = [nx, ny];
          }
        }
      }

      x = siguiente[0];
      y = siguiente[1];

      // parar si llegamos al mar
      if (altura[x][y] < nivelAgua) break;
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