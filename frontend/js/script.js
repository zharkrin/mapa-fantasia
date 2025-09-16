import { generarVoronoiReal, dibujarVoronoiReal } from "./mapa/generacionVoronoiReal.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";
import { generarCaminosAvanzados, dibujarCaminosAvanzados } from "./mapa/caminosAvanzados.js";

// Configuración inicial
const ancho = 800;
const alto = 600;
const numRegiones = 12;

// Canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
canvas.width = ancho;
canvas.height = alto;

// 1. Generar regiones Voronoi reales
const regiones = generarVoronoiReal(ancho, alto, numRegiones);

// 2. Dibujar mapa
dibujarVoronoiReal(ctx, regiones);

// 3. Generar caminos avanzados
const caminos = generarCaminosAvanzados(regiones, 250);

// 4. Dibujar caminos
dibujarCaminosAvanzados(ctx, caminos);

// 5. Dibujar nombres
dibujarNombres(ctx, regiones);

// Debug
console.log("Regiones generadas:", regiones);
console.log("Caminos generados:", caminos);