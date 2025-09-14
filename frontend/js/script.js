import { generarTerreno } from "./mapa/generacionTerreno.js";

// ==============================
// Configuración del canvas
// ==============================
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

let terreno = [];
let etiquetas = [];
let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let lastX, lastY;

// ==============================
// Generación del mapa
// ==============================
function generarMapa() {
  const ancho = canvas.width;
  const alto = canvas.height;

  // Generar terreno
  terreno = generarTerreno(ancho, alto);

  // Generar etiquetas de ejemplo
  etiquetas = [
    { tipo: "montaña", nombre: "Montañas Grises", x: 200, y: 150 },
    { tipo: "río", nombre: "Río del Alba", x: 500, y: 400 },
    { tipo: "ciudad", nombre: "Ciudadela Roja", x: 800, y: 600 },
  ];

  dibujarMapa();
}

// ==============================
// Dibujo del mapa
// ==============================
function dibujarMapa() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(offsetX, offsetY);
  ctx.scale(zoom, zoom);

  // Terreno
  for (let x = 0; x < terreno.length; x++) {
    for (let y = 0; y < terreno[x].length; y++) {
      const altura = terreno[x][y];
      if (altura < 0.3) ctx.fillStyle = "#4a90e2"; // Agua
      else if (altura < 0.5) ctx.fillStyle = "#a0d468"; // Llanura
      else ctx.fillStyle = "#8b572a"; // Montaña

      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Etiquetas
  ctx.fillStyle = "#000";
  ctx.font = "14px serif";
  etiquetas.forEach((et) => {
    ctx.fillText(et.nombre, et.x, et.y);
  });

  ctx.restore();
}

// ==============================
// Eventos de interacción
// ==============================
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    offsetX += e.offsetX - lastX;
    offsetY += e.offsetY - lastY;
    lastX = e.offsetX;
    lastY = e.offsetY;
    dibujarMapa();
  }
});

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = 1.1;
  if (e.deltaY < 0) {
    zoom *= zoomFactor;
  } else {
    zoom /= zoomFactor;
  }
  dibujarMapa();
});

// ==============================
// Botones de control
// ==============================
document.getElementById("btnGenerar").addEventListener("click", () => {
  generarMapa();
});

document.getElementById("btnZoomIn").addEventListener("click", () => {
  zoom *= 1.2;
  dibujarMapa();
});

document.getElementById("btnZoomOut").addEventListener("click", () => {
  zoom /= 1.2;
  dibujarMapa();
});

document.getElementById("btnReset").addEventListener("click", () => {
  zoom = 1;
  offsetX = 0;
  offsetY = 0;
  dibujarMapa();
});

// ==============================
// Inicialización
// ==============================
generarMapa();