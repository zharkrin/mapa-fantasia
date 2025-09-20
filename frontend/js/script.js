// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// Importaciones de módulos (ejemplo)
import { generarBiomas } from "./generacion-biomas.js";
import { dibujarMapa } from "../mapa/dibujarMapa.js";
import { generarTerrenoEspecial } from "../mapa/terrenoEspecial.js";

// Inicializar el canvas
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

// Función principal de generación
function generarMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar base del terreno
    dibujarMapa(ctx);

    // Dibujar biomas
    generarBiomas(ctx);

    // Dibujar elementos singulares: volcanes, glaciares, bosques especiales
    generarTerrenoEspecial(ctx);
}

// Ejecutar al cargar la página
window.onload = generarMapa;