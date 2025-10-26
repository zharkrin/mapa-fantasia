// ===========================================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===========================================

import { terrenosEspeciales } from "./terrenoEspecial.js";

// ============================
// Función para crear la leyenda
// ============================
export function crearLeyendaTerrenosEspeciales(contenedorId = "contenido-leyenda") {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    const titulo = document.createElement("h4");
    titulo.textContent = "🌋 Lugares Singulares del Mundo";
    contenedor.appendChild(titulo);

    const lista = document.createElement("ul");
    lista.classList.add("lista-leyenda");

    terrenosEspeciales.forEach((terreno) => {
        const item = document.createElement("li");
        item.classList.add("item-leyenda");

        const icono = document.createElement("img");
        icono.src = terreno.icono;
        icono.alt = terreno.nombre;
        icono.classList.add("icono-leyenda");

        const texto = document.createElement("span");
        texto.textContent = terreno.nombre;

        item.appendChild(icono);
        item.appendChild(texto);
        lista.appendChild(item);
    });

    contenedor.appendChild(lista);
}

// ============================
// Mostrar / Ocultar Leyenda
// ============================
export function inicializarLeyenda() {
    const btnToggle = document.getElementById("toggle-leyenda");
    const btnCerrar = document.getElementById("cerrar-leyenda");
    const panel = document.getElementById("leyenda-container");

    btnToggle.addEventListener("click", () => {
        panel.classList.toggle("visible");
    });

    btnCerrar.addEventListener("click", () => {
        panel.classList.remove("visible");
    });
}