// =======================================================
// frontend/js/mapa/dibujarMapa.js
// Dibuja terrenos, biomas, especiales y ríos
// =======================================================

import { tiposTerreno } from "./generacionTerreno.js";
import { tiposBiomas } from "./biomas.js";

const rutaTerrenos = "frontend/static/img/icons/terreno/";
const rutaBiomas = "frontend/static/img/icons/biomas/";
const rutaEspeciales = "frontend/static/img/icons/terreno_especial/";
const rutaRios = "frontend/static/img/icons/rios/";

export function dibujarMapa(terrenos, biomas, especiales, rios) {

  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";

  // Terrenos
  terrenos.forEach(t => {
    const img = document.createElement("img");
    img.src = `${rutaTerrenos}${t.tipo}.png`;
    img.classList.add("icono-terreno");
    img.style.left = `${t.x}px`;
    img.style.top = `${t.y}px`;
    contenedor.appendChild(img);
  });

  // Biomas
  biomas.forEach(b => {
    const img = document.createElement("img");
    img.src = `${rutaBiomas}${b.tipo}.png`;
    img.classList.add("icono-bioma");
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
      img.style.left = `${e.x}px`;
      img.style.top = `${e.y}px`;
      contenedor.appendChild(img);
    });
  }

  // 🔵 RÍOS
  if (rios && Array.isArray(rios)) {
    rios.forEach(r => {
      const img = document.createElement("img");
      img.src = `${rutaRios}${r.tipo}.png`;
      img.classList.add("icono-rio");
      img.style.left = `${r.x}px`;
      img.style.top = `${r.y}px`;
      contenedor.appendChild(img);
    });
  }
}