// ===================================================
// Script principal del generador de mapa fantástico
// frontend/js/script.js
// ===================================================

import { dibujarMapa } from './mapa/dibujarMapa.js';
import { inicializarLeyendaTerrenoEspecial } from './mapa/leyendaTerrenoEspecial.js';
import { generarTerrenoEspecial, obtenerTerrenosEspeciales } from './mapa/terrenoEspecial.js';

// ===============================
// Inicialización general
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("🗺️ Generador de mapa fantástico iniciado.");

    inicializarInterfaz();
    inicializarEventos();
    inicializarLeyendaTerrenoEspecial(); // Muestra la leyenda en el panel lateral

    // Generar el mapa base al inicio
    dibujarMapa();
});

// ===============================
// Funciones de inicialización
// ===============================
function inicializarInterfaz() {
    const leyendaContainer = document.getElementById('leyenda-container');
    const toggleBtn = document.getElementById('toggle-leyenda');

    if (leyendaContainer && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            leyendaContainer.classList.toggle('visible');
        });
    }

    // Generar terrenos especiales al iniciar
    generarTerrenoEspecial();

    console.log("✅ Interfaz y leyenda de terreno especial listas.");
}

function inicializarEventos() {
    const botonGenerar = document.getElementById('generar-mapa');
    if (botonGenerar) {
        botonGenerar.addEventListener('click', () => {
            console.log("🌍 Regenerando mapa completo...");
            dibujarMapa();
            generarTerrenoEspecial();
        });
    }
}

// ===============================
// Renderizado del mapa
// ===============================
export function actualizarMapa() {
    dibujarMapa();

    // Cargar terrenos especiales generados
    const terrenosEspeciales = obtenerTerrenosEspeciales();
    const contenedor = document.getElementById("contenedor-terrenos-especiales");

    if (contenedor && terrenosEspeciales.length > 0) {
        contenedor.innerHTML = "";
        terrenosEspeciales.forEach(terreno => {
            const icono = document.createElement("img");
            icono.src = terreno.icono;
            icono.alt = terreno.nombre;
            icono.classList.add("icono-terreno-especial");

            const etiqueta = document.createElement("p");
            etiqueta.textContent = terreno.nombre;

            const bloque = document.createElement("div");
            bloque.classList.add("bloque-terreno-especial");
            bloque.appendChild(icono);
            bloque.appendChild(etiqueta);

            contenedor.appendChild(bloque);
        });
    }

    console.log("🗾 Terrenos especiales actualizados en el mapa.");
}

// ===============================
// Depuración
// ===============================
window.debugMapa = {
    regenerar: () => {
        console.log("🔄 Regenerando mapa desde consola...");
        actualizarMapa();
    },
    listarTerrenosEspeciales: () => {
        console.table(obtenerTerrenosEspeciales());
    }
};