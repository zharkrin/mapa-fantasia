// ===========================================
// script.js (principal)
// frontend/js/script.js
// ===========================================

import { generarTerrenosEspeciales } from "./mapa/terrenoEspecial.js";
import { crearLeyendaTerrenosEspeciales, inicializarLeyenda } from "./mapa/leyendaTerrenoEspecial.js";

// =====================================================
// VARIABLES GLOBALES
// =====================================================
let terrenosEspeciales = [];
let canvas, ctx;

// =====================================================
// FUNCIÓN PRINCIPAL DE INICIO
// =====================================================
window.addEventListener("DOMContentLoaded", () => {
    console.log("🌍 Iniciando mapa interactivo...");

    canvas = document.getElementById("mapa");
    ctx = canvas.getContext("2d");

    inicializarMapa();
    inicializarLeyenda();
    crearLeyendaTerrenosEspeciales();

    // Generar los terrenos especiales de inicio
    terrenosEspeciales = generarTerrenosEspeciales(3);
    dibujarTerrenosEspeciales();
});

// =====================================================
// MAPA BASE
// =====================================================
function inicializarMapa() {
    canvas.width = 1280;
    canvas.height = 720;
    ctx.fillStyle = "#9fd6c2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#1b4332";
    ctx.fillText("🗺️ Mapa del Mundo - Terrenos Especiales", 40, 40);
}

// =====================================================
// DIBUJAR TERRENOS ESPECIALES
// =====================================================
function dibujarTerrenosEspeciales() {
    terrenosEspeciales.forEach((terreno) => {
        const img = new Image();
        img.src = terreno.icono;

        img.onload = () => {
            ctx.drawImage(img, terreno.x, terreno.y, 64, 64);

            // Etiqueta con nombre
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fillRect(terreno.x, terreno.y + 64, ctx.measureText(terreno.nombre).width + 10, 24);
            ctx.fillStyle = "white";
            ctx.fillText(terreno.nombre, terreno.x + 5, terreno.y + 82);
        };

        img.onerror = () => {
            console.warn(`⚠️ No se pudo cargar el icono de ${terreno.nombre}: ${terreno.icono}`);
        };
    });
}

// =====================================================
// REGENERAR TERRENOS (si se desea hacerlo dinámico)
// =====================================================
const btnRegenerar = document.getElementById("regenerar-especiales");
if (btnRegenerar) {
    btnRegenerar.addEventListener("click", () => {
        terrenosEspeciales = generarTerrenosEspeciales(3);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        inicializarMapa();
        dibujarTerrenosEspeciales();
    });
}

// =====================================================
// PLACEHOLDER (fallback visual desde CSS)
// =====================================================
// No se requiere imagen "placeholder.png" porque se usa desde CSS:
// .placeholder { background: repeating-linear-gradient(...); }