// frontend/js/script.js
import { generarVoronoiReal, dibujarVoronoiReal } from "./mapa/generacionVoronoiReal.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";
import { generarCaminosFinales, dibujarCaminosFinales } from "./mapa/caminosFinales.js";
import { generarRutasEspeciales, dibujarRutasEspeciales } from "./mapa/rutasEspeciales.js";

// Configuración del mapa
const ancho = 800;
const alto = 600;
const numRegiones = 12;

// Canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
canvas.width = ancho;
canvas.height = alto;

// Transformaciones (zoom y pan)
let escala = 1;
let offsetX = 0;
let offsetY = 0;
let arrastrando = false;
let inicioArrastre = { x: 0, y: 0 };

// Límites de zoom
const zoomMin = 0.5;
const zoomMax = 5;

// Generación de mapa base
const regiones = generarVoronoiReal(ancho, alto, numRegiones);
const caminos = generarCaminosFinales(regiones, ancho, alto, 20, 250);
let rutasOpcionales = [];

// Redibujar todo con transformaciones
function redibujar() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // resetear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(escala, 0, 0, escala, offsetX, offsetY);

    dibujarVoronoiReal(ctx, regiones);
    dibujarCaminosFinales(ctx, caminos);
    dibujarNombres(ctx, regiones);
    dibujarRutasEspeciales(ctx, rutasOpcionales);
}

// Actualizar rutas especiales con checkbox
function actualizarRutasEspeciales() {
    const activar = document.getElementById("activarRutasEspeciales").checked;
    rutasOpcionales = generarRutasEspeciales(regiones, ancho, alto, 300, activar);
    redibujar();
}

// Eventos: zoom con rueda (con límites)
canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factorZoom = 1.1;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offsetX) / escala;
    const y = (e.clientY - rect.top - offsetY) / escala;

    let nuevaEscala = escala;

    if (e.deltaY < 0) {
        nuevaEscala *= factorZoom;
    } else {
        nuevaEscala /= factorZoom;
    }

    // Aplicar límites
    if (nuevaEscala < zoomMin) nuevaEscala = zoomMin;
    if (nuevaEscala > zoomMax) nuevaEscala = zoomMax;

    // Ajustar desplazamiento solo si hay cambio
    if (nuevaEscala !== escala) {
        offsetX -= x * (nuevaEscala - escala);
        offsetY -= y * (nuevaEscala - escala);
        escala = nuevaEscala;
        redibujar();
    }
});

// Eventos: arrastrar con ratón
canvas.addEventListener("mousedown", (e) => {
    arrastrando = true;
    inicioArrastre.x = e.clientX - offsetX;
    inicioArrastre.y = e.clientY - offsetY;
});
canvas.addEventListener("mouseup", () => arrastrando = false);
canvas.addEventListener("mouseleave", () => arrastrando = false);
canvas.addEventListener("mousemove", (e) => {
    if (arrastrando) {
        offsetX = e.clientX - inicioArrastre.x;
        offsetY = e.clientY - inicioArrastre.y;
        redibujar();
    }
});

// Checkbox
document.getElementById("activarRutasEspeciales").addEventListener("change", actualizarRutasEspeciales);

// Inicialización
actualizarRutasEspeciales();

// Debug
console.log("Regiones generadas:", regiones);
console.log("Caminos finales generados:", caminos);