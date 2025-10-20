// =====================================================
// leyendaTerrenoEspecial.js
// Crea y gestiona el panel de leyenda para los terrenos especiales
// =====================================================

import { terrenosEspeciales } from "./nombresTerrenoEspecial.js";

export function crearLeyendaTerrenoEspecial() {
  const contenedorLeyenda = document.createElement("div");
  contenedorLeyenda.id = "leyendaTerrenoEspecial";
  contenedorLeyenda.classList.add("leyenda-terreno");

  const titulo = document.createElement("h3");
  titulo.textContent = "Lugares Singulares del Mundo";
  contenedorLeyenda.appendChild(titulo);

  const lista = document.createElement("ul");
  lista.classList.add("lista-terrenos-especiales");

  terrenosEspeciales.forEach((terreno) => {
    const item = document.createElement("li");
    item.classList.add("item-terreno");

    const icono = document.createElement("img");
    icono.src = terreno.icono;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-terreno");

    const texto = document.createElement("div");
    texto.classList.add("texto-terreno");
    texto.innerHTML = `<strong>${terreno.nombre}</strong><br><span>${terreno.descripcion}</span>`;

    item.appendChild(icono);
    item.appendChild(texto);
    lista.appendChild(item);
  });

  contenedorLeyenda.appendChild(lista);

  // Botón para cerrar
  const botonCerrar = document.createElement("button");
  botonCerrar.textContent = "Cerrar";
  botonCerrar.classList.add("boton-cerrar");
  botonCerrar.addEventListener("click", () => {
    contenedorLeyenda.remove();
  });

  contenedorLeyenda.appendChild(botonCerrar);
  document.body.appendChild(contenedorLeyenda);
}