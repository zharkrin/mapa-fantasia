// ==============================
// script.js - Control principal del mapa
// ==============================

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { generarNombreMontaña, generarNombreRio, generarNombreCiudad } from "./mapa/nombresGeograficos.js";

// Selección de canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

// Tamaño del mapa
canvas.width = 800;
canvas.height = 600;

// ==============================
// Función principal de generación
// ==============================
function generarMapa() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Generar el terreno procedural
  const mapa = generarTerreno(canvas.width, canvas.height);

  // Pintar el terreno
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const valor = mapa[y][x];
      ctx.fillStyle = valor < 0.3 ? "#1E90FF" : valor < 0.6 ? "#228B22" : "#A9A9A9";
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // ==============================
  // Añadir etiquetas geográficas
  // ==============================

  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";

  // Ejemplo: nombres de montañas
  ctx.fillText(generarNombreMontaña(), 200, 150);
  ctx.fillText(generarNombreMontaña(), 600, 120);

  // Ejemplo: nombres de ríos
  ctx.fillText(generarNombreRio(), 300, 400);
  ctx.fillText(generarNombreRio(), 700, 350);

  // Ejemplo: nombres de ciudades
  ctx.fillText(generarNombreCiudad(), 400, 500);
  ctx.fillText(generarNombreCiudad(), 650, 250);
}

// ==============================
// Botón de generar mapa
// ==============================
document.getElementById("btnGenerar").addEventListener("click", generarMapa);

// Generar un mapa inicial al cargar
window.onload = generarMapa;