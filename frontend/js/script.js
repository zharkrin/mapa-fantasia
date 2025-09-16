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

// 2️⃣ Dibujar mapa con polígonos de terreno
dibujarVoronoiReal(ctx, regiones);

// 3️⃣ Generar caminos terrestres finales
const caminos = generarCaminosFinales(regiones, ancho, alto, 20, 250);
dibujarCaminosFinales(ctx, caminos);

// 4️⃣ Generar rutas especiales opcionales (desactivadas por defecto)
const rutasOpcionales = generarRutasEspeciales(regiones, ancho, alto, 300, false);
// Para activarlas, cambiar false a true
// const rutasOpcionales = generarRutasEspeciales(regiones, ancho, alto, 300, true);

dibujarRutasEspeciales(ctx, rutasOpcionales);

// 5️⃣ Dibujar nombres de las regiones
dibujarNombres(ctx, regiones);

// Debug opcional
console.log("Regiones generadas:", regiones);
console.log("Caminos finales generados:", caminos);
console.log("Rutas especiales generadas:", rutasOpcionales);