// =======================================================
// frontend/js/mapa/dibujarMapa.js
// Dibuja terrenos, biomas, especiales y ríos (canvas procedural)
// =======================================================

import { tiposTerreno } from "./generacionTerreno.js";
import { tiposBiomas } from "./biomas.js";
import { dibujarRiosCanvas } from "./dibujarRiosCanvas.js";

const rutaTerrenos = "frontend/static/img/icons/terreno/";
const rutaBiomas = "frontend/static/img/icons/biomas/";
const rutaEspeciales = "frontend/static/img/icons/terreno_especial/";

export function dibujarMapa(terrenos, biomas, especiales, rios) {

  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";

  // Crear canvas para ríos (si no existe)
  let canvas = document.getElementById("capa-rutas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "capa-rutas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "3";
    contenedor.appendChild(canvas);
  }

  // Terrenos
  terrenos.forEach(t => {
    const img = document.createElement("img");
    img.src = `${rutaTerrenos}${t.tipo}.png`;
    img.classList.add("icono-terreno");
    img.style.position = "absolute";
    img.style.left = `${t.x}px`;
    img.style.top = `${t.y}px`;
    contenedor.appendChild(img);
  });

  // Biomas
  biomas.forEach(b => {
    const img = document.createElement("img");
    img.src = `${rutaBiomas}${b.tipo}.png`;
    img.classList.add("icono-bioma");
    img.style.position = "absolute";
    img.style.left = `${b.x}px`;
    img.style.top = `${b.y}px`;
    contenedor.appendChild(img);
  });

  // Especiales
  if (especiales && Array.isArray(especiales)) {
    especiales.forEach(e => {
      const img = document.createElement("img");
      img.src = `${rutaEspeciales}${e.tipo}.png`;
      img.classList.add("icono-especial");
      img.style.position = "absolute";
      img.style.left = `${e.x}px`;
      img.style.top = `${e.y}px`;
      contenedor.appendChild(img);
    });
  }

  // 🔵 RÍOS PROCEDURALES EN CANVAS
  if (rios && Array.isArray(rios) && rios.length > 0) {

    // Calcular tamaño total del mapa basado en terrenos
    const anchoMapa = Math.max(...terrenos.map(t => t.x)) + 200;
    const altoMapa = Math.max(...terrenos.map(t => t.y)) + 200;

    dibujarRiosCanvas(rios, anchoMapa, altoMapa);
  }
}