// script.js con nombres en blanco y borde negro

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
  Math.seedrandom(seed);

  const escala = 0.05;
  const nivelAgua = 0.0;
  const nivelMontana = 0.5;
  const numRios = 5;
  const numCiudades = 10;
  const numMontanas = 6;

  let altura = [];
  let ciudades = [];
  let rios = [];
  let montanas = [];

  // Función auxiliar para escribir texto con borde
  function escribirTexto(texto, x, y) {
    ctx.font = "12px Arial";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.strokeText(texto, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(texto, x, y);
  }

  // 1️⃣ Generar mapa base
  for (let x = 0; x < width; x++) {
    altura[x] = [];
    for (let y = 0; y < height; y++) {
      let valor = Perlin.noise(x * escala, y * escala, 0);
      altura[x][y] = valor;

      if (valor < nivelAgua) ctx.fillStyle = "#2a4d8f";
      else if (valor > nivelMontana) ctx.fillStyle = "#888888";
      else ctx.fillStyle = "#3b8d3b";

      ctx.fillRect(x, y, 1, 1);
    }
  }

  // 2️⃣ Generar ríos
  for (let i = 0; i < numRios; i++) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (altura[x][y] < nivelMontana) continue;

    let nombreRio = generarNombreRio();
    let camino = [];

    for (let paso = 0; paso < 300; paso++) {
      ctx.fillStyle = "#1ca3ec";
      ctx.fillRect(x, y, 1, 1);
      camino.push({x, y});

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

    rios.push({nombre: nombreRio, camino});
  }

  // 3️⃣ Generar ciudades
  while (ciudades.length < numCiudades) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (altura[x][y] > nivelAgua && altura[x][y] < nivelMontana) {
      let nombreCiudad = generarNombreCiudad();
      ciudades.push({x, y, nombre: nombreCiudad});

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI*2);
      ctx.fill();

      escribirTexto(nombreCiudad, x+6, y-6);
    }
  }

  // 4️⃣ Generar montañas
  for (let i = 0; i < numMontanas; i++) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (altura[x][y] > nivelMontana) {
      let nombreMontana = generarNombreMontana();
      montanas.push({x, y, nombre: nombreMontana});

      ctx.fillStyle = "#444444";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI*2);
      ctx.fill();

      escribirTexto(nombreMontana, x+8, y+4);
    }
  }

  // 5️⃣ Rutas entre ciudades
  function trazarRuta(cityA, cityB) {
    let x = cityA.x;
    let y = cityA.y;

    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);

    let maxPasos = 1000;
    for (let paso = 0; paso < maxPasos; paso++) {
      if (Math.hypot(cityB.x - x, cityB.y - y) < 2) break;

      let vecinos = [
        [x+1,y], [x-1,y], [x,y+1], [x,y-1],
        [x+1,y+1], [x-1,y-1], [x+1,y-1], [x-1,y+1]
      ];

      let mejor = [x, y];
      let minScore = Infinity;

      for (let [nx, ny] of vecinos) {
        if (nx >= 0 && nx < width && ny >=0 && ny < height) {
          let alturaTile = altura[nx][ny];
          let penal = 0;
          if (alturaTile < nivelAgua) penal += 100;
          if (alturaTile > nivelMontana) penal += 50;
          let distancia = Math.hypot(cityB.x - nx, cityB.y - ny);
          let score = distancia + penal;
          if (score < minScore) {
            minScore = score;
            mejor = [nx, ny];
          }
        }
      }

      x = mejor[0];
      y = mejor[1];
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  for (let i = 0; i < ciudades.length; i++) {
    let cityA = ciudades[i];
    let otras = ciudades.filter((_, idx) => idx !== i);
    otras.sort((c) => Math.hypot(c.x - cityA.x, c.y - cityA.y));
    for (let j = 0; j < 2 && j < otras.length; j++) {
      trazarRuta(cityA, otras[j]);
    }
  }

  // 6️⃣ Dibujar nombres de ríos
  for (let rio of rios) {
    if (rio.camino.length > 0) {
      let mid = rio.camino[Math.floor(rio.camino.length / 2)];
      escribirTexto(rio.nombre, mid.x+4, mid.y+4);
    }
  }

  infoSemilla.innerHTML = `Semilla usada: <b>${seed}</b>`;
}

// ------------------------------------
// 🔹 Generadores de nombres
function generarNombreCiudad() {
  const prefijos = ["El", "An", "Gal", "Fin", "Mor", "Dor"];
  const sufijos = ["dor", "ion", "mir", "wen", "tal"];
  return prefijos[Math.floor(Math.random()*prefijos.length)] +
         sufijos[Math.floor(Math.random()*sufijos.length)];
}

function generarNombreRio() {
  const prefijos = ["Al", "Ra", "Thal", "Eri", "Var"];
  const sufijos = ["ria", "stream", "brook", "flow", "run"];
  return prefijos[Math.floor(Math.random()*prefijos.length)] +
         sufijos[Math.floor(Math.random()*sufijos.length)];
}

function generarNombreMontana() {
  const prefijos = ["Kar", "Gor", "Thul", "Mor", "Bal"];
  const sufijos = ["peak", "mont", "ridge", "spire", "hill"];
  return prefijos[Math.floor(Math.random()*prefijos.length)] +
         sufijos[Math.floor(Math.random()*sufijos.length)];
}

// ------------------------------------
// Generar mapa inicial aleatorio
let semillaInicial = Math.floor(Math.random() * 100000);
generarMapa(semillaInicial);

btnGenerar.addEventListener("click", () => {
  let s = parseInt(inputSemilla.value);
  if (isNaN(s)) { alert("Introduce un número válido como semilla."); return; }
  generarMapa(s);
});

btnAleatorio.addEventListener("click", () => {
  let s = Math.floor(Math.random() * 100000);
  inputSemilla.value = s;
  generarMapa(s);
});