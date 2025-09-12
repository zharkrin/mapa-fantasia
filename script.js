// script.js con ríos, montañas, ciudades y rutas

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
  const numRios = 5;
  const numCiudades = 10;

  let altura = []; // matriz de alturas
  let ciudades = [];

  // 1️⃣ Generar mapa base y almacenar alturas
  for (let x = 0; x < width; x++) {
    altura[x] = [];
    for (let y = 0; y < height; y++) {
      let valor = Perlin.noise(x * escala, y * escala, 0);
      altura[x][y] = valor;

      if (valor < nivelAgua) ctx.fillStyle = "#2a4d8f"; // mar
      else if (valor > nivelMontana) ctx.fillStyle = "#888888"; // montaña
      else ctx.fillStyle = "#3b8d3b"; // tierra

      ctx.fillRect(x, y, 1, 1);
    }
  }

  // 2️⃣ Generar ríos simples
  for (let i = 0; i < numRios; i++) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (altura[x][y] < nivelMontana) continue;

    for (let paso = 0; paso < 300; paso++) {
      ctx.fillStyle = "#1ca3ec"; // río
      ctx.fillRect(x, y, 1, 1);

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

      if (altura[x][y] < nivelAgua) break;
    }
  }

  // 3️⃣ Generar ciudades
  while (ciudades.length < numCiudades) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (altura[x][y] > nivelAgua && altura[x][y] < nivelMontana) {
      ciudades.push({x, y});
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI*2);
      ctx.fill();
    }
  }

  // 4️⃣ Generar rutas entre ciudades (conexión a 2-3 ciudades más cercanas)
  for (let i = 0; i < ciudades.length; i++) {
    let cityA = ciudades[i];

    // ordenar ciudades por distancia
    let otras = ciudades.filter((_, idx) => idx !== i);
    otras.sort((c) => Math.hypot(c.x - cityA.x, c.y - cityA.y));

    // conectar a 2 ciudades más cercanas
    for (let j = 0; j < 2 && j < otras.length; j++) {
      let cityB = otras[j];
      ctx.strokeStyle = "#654321"; // camino terrestre
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cityA.x, cityA.y);
      ctx.lineTo(cityB.x, cityB.y);
      ctx.stroke();
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