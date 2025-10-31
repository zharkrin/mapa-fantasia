// ===============================================================
// Archivo: frontend/js/mapa/leyendaTerrenoEspecial.js
// Descripción: Genera automáticamente la leyenda visual de los
// terrenos especiales en el mapa.
// ===============================================================

import { terrenosEspeciales } from "./terrenoEspecial.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedorLeyenda = document.getElementById("leyenda-terreno-especial");

  if (!contenedorLeyenda) {
    console.error("No se encontró el contenedor de leyenda en el HTML.");
    return;
  }

  // Estilo básico para la leyenda
  contenedorLeyenda.style.position = "absolute";
  contenedorLeyenda.style.top = "20px";
  contenedorLeyenda.style.right = "20px";
  contenedorLeyenda.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  contenedorLeyenda.style.color = "white";
  contenedorLeyenda.style.padding = "10px";
  contenedorLeyenda.style.borderRadius = "8px";
  contenedorLeyenda.style.maxHeight = "400px";
  contenedorLeyenda.style.overflowY = "auto";
  contenedorLeyenda.style.fontFamily = "Georgia, serif";
  contenedorLeyenda.style.fontSize = "14px";
  contenedorLeyenda.style.width = "220px";

  // Título de la leyenda
  const titulo = document.createElement("h3");
  titulo.textContent = "Leyenda del Terreno";
  titulo.style.textAlign = "center";
  titulo.style.marginTop = "0";
  titulo.style.marginBottom = "10px";
  titulo.style.textTransform = "uppercase";
  titulo.style.fontSize = "16px";
  titulo.style.borderBottom = "1px solid white";
  contenedorLeyenda.appendChild(titulo);

  // Contenedor de ítems
  const lista = document.createElement("div");
  lista.style.display = "flex";
  lista.style.flexDirection = "column";
  lista.style.gap = "8px";

  // Crear cada ítem de leyenda
  terrenosEspeciales.forEach((terreno) => {
    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "10px";
    item.style.background = "rgba(255, 255, 255, 0.1)";
    item.style.borderRadius = "6px";
    item.style.padding = "4px 6px";

    // Imagen del icono
    const icono = document.createElement("img");
    icono.src = terreno.icono;
    icono.alt = terreno.nombre;
    icono.style.width = "28px";
    icono.style.height = "28px";
    icono.style.objectFit = "contain";
    icono.onerror = () => {
      console.warn(`No se pudo cargar el icono: ${terreno.icono}`);
      icono.src = "frontend/static/img/icons/placeholder.png";
    };

    // Nombre + descripción
    const texto = document.createElement("div");
    const nombre = document.createElement("div");
    nombre.textContent = terreno.nombre;
    nombre.style.fontWeight = "bold";

    const descripcion = document.createElement("div");
    descripcion.textContent = terreno.descripcion;
    descripcion.style.fontSize = "12px";
    descripcion.style.opacity = "0.8";

    texto.appendChild(nombre);
    texto.appendChild(descripcion);

    item.appendChild(icono);
    item.appendChild(texto);
    lista.appendChild(item);
  });

  contenedorLeyenda.appendChild(lista);
});