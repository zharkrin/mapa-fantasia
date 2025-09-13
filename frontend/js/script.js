// ===============================
// Script Principal - Mapas de Fantasía con Zoom, Arrastre y Etiquetas Dinámicas
// ===============================

// Importaciones de módulos
import { GeneracionProcedural } from "./generacionProcedural.js";
import { generarNombreMontaña, generarNombreRio } from "./nombresMontañasRios.js";

// Configuración inicial
const config = {
  ancho: 300,
  alto: 300,
  escalaRuido: 60,
  porcentajeAgua: 0.35,
  semilla: Date.now(),
};

// Inicializamos el generador
GeneracionProcedural.inicializar(config);

// Generamos el mapa
const mapa = GeneracionProcedural.generarMundo();

// Configuramos el canvas
const canvas = document.getElementById("mapaCanvas");
const ctx = canvas.getContext("2d");
canvas.width = config.ancho;
canvas.height = config.alto;

// Variables de zoom y desplazamiento
let escala = 1;
let offsetX = 0;
let offsetY = 0;
let arrastrando = false;
let lastX = 0;
let lastY = 0;

// Generación de nombres de montañas y ríos
const montañas = [{ x: 150, y: 50 }, { x: 220, y: 180 }];
const rios = [{ x: 50, y: 250 }, { x: 120, y: 100 }];
const etiquetas = [];

// Montañas
montañas.forEach(m => {
  etiquetas.push({
    texto: generarNombreMontaña(),
    x: m.x,
    y: m.y,
    tipo: "montaña"
  });
});

// Ríos
rios.forEach(r => {
  etiquetas.push({
    texto: generarNombreRio(),
    x: r.x,
    y: r.y,
    tipo: "río"
  });
});

// Ejemplo de ruta A*
const inicio = { x: 10, y: 10 };
const destino = { x: 200, y: 200 };
const ruta = GeneracionProcedural.calcularRuta(mapa, inicio, destino);

// ------------------------------
// Función principal de dibujo
// ------------------------------
function dibujarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar terreno
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      const valor = mapa[y][x];
      let color;
      if (valor < 0.3) color = "#1E90FF";       // agua
      else if (valor < 0.5) color = "#228B22";  // tierra baja
      else if (valor < 0.7) color = "#8B4513";  // colinas
      else color = "#A9A9A9";                   // montañas

      const px = (x * escala) + offsetX;
      const py = (y * escala) + offsetY;
      ctx.fillStyle = color;
      ctx.fillRect(px, py, escala, escala);
    }
  }

  // Dibujar ruta
  if (ruta && ruta.length > 0) {
    ctx.fillStyle = "red";
    ruta.forEach(p => {
      const px = (p.x * escala) + offsetX;
      const py = (p.y * escala) + offsetY;
      ctx.fillRect(px, py, escala, escala);
    });
  }

  // Dibujar etiquetas
  ctx.fillStyle = "black";
  ctx.font = `${12 * escala}px Arial`;
  ctx.textAlign = "center";
  etiquetas.forEach(e => {
    const px = (e.x * escala) + offsetX;
    const py = (e.y * escala) + offsetY;
    ctx.fillText(e.texto, px, py);
  });
}

// ------------------------------
// Interactividad: arrastrar
// ------------------------------
canvas.addEventListener("mousedown", e => {
  arrastrando = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => arrastrando = false);
canvas.addEventListener("mouseleave", () => arrastrando = false);

canvas.addEventListener("mousemove", e => {
  if (!arrastrando) return;
  offsetX += e.offsetX - lastX;
  offsetY += e.offsetY - lastY;
  lastX = e.offsetX;
  lastY = e.offsetY;
  dibujarMapa();
});

// ------------------------------
// Interactividad: zoom
// ------------------------------
canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const factorZoom = 0.1;
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  const zoomAnterior = escala;
  if (e.deltaY < 0) escala *= 1 + factorZoom;
  else escala /= 1 + factorZoom;

  // Ajustar offset para mantener la posición del mouse
  offsetX -= (mouseX - offsetX) * (escala / zoomAnterior - 1);
  offsetY -= (mouseY - offsetY) * (escala / zoomAnterior - 1);

  dibujarMapa();
});

// ------------------------------
// Dibujo inicial
// ------------------------------
dibujarMapa();