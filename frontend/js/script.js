// ==========================
// frontend/js/script.js
// ==========================

import { generarMapa } from "./mapa/generacionProcedural.js";
import { aStar } from "./mapa/aStar.js";
import { agregarEtiqueta, dibujarEtiquetas } from "./mapa/etiquetas.js";
import { generarNombreMontana, generarNombreRio } from "./mapa/nombresGeograficos.js";

// Configuración del canvas
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStartX, dragStartY;

// =====================
// Generar el terreno
// =====================
const { mapa } = generarMapa(canvas.width, canvas.height);

// =====================
// Ciudades y rutas
// =====================
const ciudades = [
  { x: 100, y: 200, nombre: "Eldoria" },
  { x: 400, y: 350, nombre: "Dunrock" },
  { x: 700, y: 150, nombre: "Silvaris" }
];

// Añadimos etiquetas de ciudades
ciudades.forEach(c => agregarEtiqueta(c.nombre, c.x, c.y, "ciudad"));

// =====================
// Rutas comerciales
// =====================
const rutas = [
  { desde: ciudades[0], hasta: ciudades[1], nombre: "Ruta de Hierro" },
  { desde: ciudades[1], hasta: ciudades[2], nombre: "Camino de Seda" }
];

// Añadimos etiquetas de rutas
rutas.forEach(r => {
  let midX = (r.desde.x + r.hasta.x) / 2;
  let midY = (r.desde.y + r.hasta.y) / 2;
  agregarEtiqueta(r.nombre, midX, midY, "ruta");
});

// =====================
// Montañas y ríos
// =====================
for (let i = 0; i < 5; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  agregarEtiqueta(generarNombreMontana(), x, y, "montaña");
}

for (let i = 0; i < 5; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  agregarEtiqueta(generarNombreRio(), x, y, "rio");
}

// =====================
// Dibujar mapa completo
// =====================
function dibujarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Terreno
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[0].length; x++) {
      const altura = mapa[y][x];
      if (altura < 0.3) ctx.fillStyle = "#1E90FF";
      else if (altura < 0.5) ctx.fillStyle = "#228B22";
      else if (altura < 0.7) ctx.fillStyle = "#A0522D";
      else ctx.fillStyle = "#DCDCDC";

      ctx.fillRect(x * zoom + offsetX, y * zoom + offsetY, zoom, zoom);
    }
  }

  // Rutas comerciales (líneas)
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2 * zoom;
  rutas.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.desde.x * zoom + offsetX, r.desde.y * zoom + offsetY);
    ctx.lineTo(r.hasta.x * zoom + offsetX, r.hasta.y * zoom + offsetY);
    ctx.stroke();
  });

  // Dibujar etiquetas unificadas
  dibujarEtiquetas(ctx, zoom, offsetX, offsetY);
}

// =====================
// Interactividad
// =====================
canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const zoomFactor = 1.1;
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  if (e.deltaY < 0) {
    zoom *= zoomFactor;
    offsetX = mouseX - (mouseX - offsetX) * zoomFactor;
    offsetY = mouseY - (mouseY - offsetY) * zoomFactor;
  } else {
    zoom /= zoomFactor;
    offsetX = mouseX - (mouseX - offsetX) / zoomFactor;
    offsetY = mouseY - (mouseY - offsetY) / zoomFactor;
  }
  dibujarMapa();
});

canvas.addEventListener("mousedown", e => {
  isDragging = true;
  dragStartX = e.clientX - offsetX;
  dragStartY = e.clientY - offsetY;
});
canvas.addEventListener("mouseup", () => { isDragging = false; });
canvas.addEventListener("mousemove", e => {
  if (isDragging) {
    offsetX = e.clientX - dragStartX;
    offsetY = e.clientY - dragStartY;
    dibujarMapa();
  }
});

// =====================
// Dibujar inicial
// =====================
dibujarMapa();