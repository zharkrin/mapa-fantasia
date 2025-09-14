// ==============================
// script.js - Control principal del mapa con guardado
// ==============================

import { generarTerreno } from "./mapa/generacionTerreno.js";
import { generarNombreMontaña, generarNombreRio, generarNombreCiudad } from "./mapa/nombresGeograficos.js";
import { guardarMapa, cargarMapa, listarProyectos } from "./mapa/guardadoMapa.js";

// Canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Variables globales
let terreno = [];
let etiquetas = [];

// ==============================
// Generación del mapa
// ==============================
function generarMapa() {
  terreno = generarTerreno(canvas.width, canvas.height);

  etiquetas = [
    { tipo: "montaña", nombre: generarNombreMontaña(), x: 200, y: 150 },
    { tipo: "montaña", nombre: generarNombreMontaña(), x: 600, y: 120 },
    { tipo: "río", nombre: generarNombreRio(), x: 300, y: 400 },
    { tipo: "río", nombre: generarNombreRio(), x: 700, y: 350 },
    { tipo: "ciudad", nombre: generarNombreCiudad(), x: 400, y: 500 },
    { tipo: "ciudad", nombre: generarNombreCiudad(), x: 650, y: 250 },
  ];

  dibujarMapa();
}

// ==============================
// Dibujar mapa
// ==============================
function dibujarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const valor = terreno[y][x];
      ctx.fillStyle = valor < 0.3 ? "#1E90FF" : valor < 0.6 ? "#228B22" : "#A9A9A9";
      ctx.fillRect(x, y, 1, 1);
    }
  }

  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";

  etiquetas.forEach((et) => {
    ctx.fillText(et.nombre, et.x, et.y);
  });
}

// ==============================
// Botones de control
// ==============================
document.getElementById("btnGenerar").addEventListener("click", generarMapa);

document.getElementById("btnGuardar").addEventListener("click", () => {
  const nombre = prompt("Nombre del proyecto:");
  if (nombre) guardarMapa(nombre, terreno, etiquetas);
});

document.getElementById("btnCargar").addEventListener("click", () => {
  const proyectos = listarProyectos();
  if (proyectos.length === 0) return alert("No hay proyectos guardados.");

  const nombre = prompt(`Proyectos disponibles:\n${proyectos.join("\n")}\nIngrese el nombre a cargar:`);
  if (!nombre) return;
  const proyecto = cargarMapa(nombre);
  if (proyecto) {
    terreno = proyecto.mapa;
    etiquetas = proyecto.etiquetas;
    dibujarMapa();
  }
});

// ==============================
// Inicialización
// ==============================
window.onload = generarMapa;