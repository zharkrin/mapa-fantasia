// ===============================
// Leyenda Terreno Especial
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===============================

// Lista de iconos de lugares singulares
import { lugaresSingulares } from "./nombresTerrenoEspecial.js";

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-leyenda");
  const contenido = document.getElementById("contenido-leyenda");
  const lista = document.getElementById("lista-leyenda");

  // Rellenar dinámicamente la leyenda
  lugaresSingulares.forEach(lugar => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = `/static/img/icons/${lugar.icono}.png`;
    img.alt = lugar.nombre;

    const span = document.createElement("span");
    span.textContent = lugar.nombre;

    li.appendChild(img);
    li.appendChild(span);
    lista.appendChild(li);
  });

  // Evento para abrir/cerrar
  boton.addEventListener("click", () => {
    contenido.style.display = contenido.style.display === "block" ? "none" : "block";
  });
});