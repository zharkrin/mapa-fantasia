// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// Importar módulos (si se usa sistema de módulos ES6)
import { generarTerreno } from "./mapa/generacionTerreno.js";
import { generarBiomas } from "./mapa/biomas.js";
import { inicializarTerrenosEspeciales, terrenosEspeciales } from "./mapa/terrenoEspecial.js";
import { renderLeyendaTerrenoEspecial } from "./mapa/leyendaTerrenoEspecial.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMapa");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");

    // 1. Generar el terreno base
    const terreno = generarTerreno(canvas.width, canvas.height);

    // 2. Generar biomas sobre el terreno
    const biomas = generarBiomas(terreno);

    // 3. Dibujar mapa base con terreno y biomas
    dibujarMapa(ctx, terreno, biomas);

    // 4. Dibujar nombres de lugares, ciudades y montañas
    dibujarNombres(ctx, terreno, biomas);

    // 5. Inicializar terrenos especiales y dibujarlos sobre el mapa
    inicializarTerrenosEspeciales(canvas);

    // 6. Renderizar leyenda de terrenos especiales
    renderLeyendaTerrenoEspecial();

    // 7. Configurar panel de leyenda (desplegable)
    const btn = document.getElementById("btnLeyendaEspecial");
    const panel = document.getElementById("panelLeyendaEspecial");
    btn.addEventListener("click", () => {
        panel.classList.toggle("activo");
    });

    console.log("Mapa generado con biomas y terrenos especiales:", terrenosEspeciales);
});