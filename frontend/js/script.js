// frontend/js/script.js
import { generarVoronoiReal, dibujarVoronoiReal } from "./mapa/generacionVoronoiReal.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";
import { generarCaminosCurvos, dibujarCaminosCurvos } from "./mapa/caminosCurvos.js";

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

// 3️⃣ Generar caminos curvos avanzados
const caminos = generarCaminosCurvos(regiones, ancho, alto, 20);

// 4️⃣ Dibujar caminos sobre el mapa
dibujarCaminosCurvos(ctx, caminos);

// 5️⃣ Dibujar nombres de las regiones
dibujarNombres(ctx, regiones);

// Debug opcional
console.log("Regiones generadas:", regiones);
console.log("Caminos curvos generados:", caminos);