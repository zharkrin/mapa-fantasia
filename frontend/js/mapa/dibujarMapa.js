// =======================================================
// frontend/js/mapa/dibujarMapa.js
// Dibuja los iconos del terreno, biomas y lugares especiales
// =======================================================

import { tiposTerreno } from "./generacionTerreno.js";
import { tiposBiomas } from "./biomas.js";

const rutaTerrenos = "frontend/static/img/icons/terreno/";
const rutaBiomas = "frontend/static/img/icons/biomas/";
const rutaEspeciales = "frontend/static/img/icons/terreno_especial/";

export function dibujarMapa(terrenos, biomas, especiales) {
  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";

  // Dibujar terrenos
  terrenos.forEach(t => {
    const img = document.createElement("img");
    img.src = `${rutaTerrenos}${t.tipo}.png`;
    img.classList.add("icono-terreno");
    img.style.left = `${t.x}px`;
    img.style.top = `${t.y}px`;
    contenedor.appendChild(img);
  });

  // Dibujar biomas
  biomas.forEach(b => {
    const img = document.createElement("img");
    img.src = `${rutaBiomas}${b.tipo}.png`;
    img.classList.add("icono-bioma");
    img.style.left = `${b.x}px`;
    img.style.top = `${b.y}px`;
    contenedor.appendChild(img);
  });

  // Dibujar lugares especiales
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
}