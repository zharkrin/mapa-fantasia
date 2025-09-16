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

// 1️⃣ Generar regiones Voronoi reales
const regiones = generarVoronoiReal(ancho, alto, numRegiones);

// 2️⃣ Dibujar mapa base y nombres
dibujarVoronoiReal(ctx, regiones);
dibujarNombres(ctx, regiones);

// 3️⃣ Generar y dibujar caminos terrestres
const caminos = generarCaminosFinales(regiones, ancho, alto, 20, 250);
dibujarCaminosFinales(ctx, caminos);

// Función para (re)dibujar rutas especiales según checkbox
function actualizarRutasEspeciales(){
    // Limpiar canvas y volver a dibujar mapa, caminos y nombres
    ctx.clearRect(0, 0, ancho, alto);
    dibujarVoronoiReal(ctx, regiones);
    dibujarCaminosFinales(ctx, caminos);
    dibujarNombres(ctx, regiones);

    // Leer checkbox
    const activar = document.getElementById("activarRutasEspeciales").checked;
    const rutasOpcionales = generarRutasEspeciales(regiones, ancho, alto, 300, activar);
    dibujarRutasEspeciales(ctx, rutasOpcionales);
}

// Evento checkbox
document.getElementById("activarRutasEspeciales").addEventListener("change", actualizarRutasEspeciales);

// Debug opcional
console.log("Regiones generadas:", regiones);
console.log("Caminos finales generados:", caminos);