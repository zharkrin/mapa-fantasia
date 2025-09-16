// frontend/js/script.js
import { generarVoronoiReal, dibujarVoronoiReal } from "./mapa/generacionVoronoiReal.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";

// Configuración inicial
const ancho = 800;
const alto = 600;
const numRegiones = 12;

// Obtener referencia al canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
canvas.width = ancho;
canvas.height = alto;

// Generar regiones Voronoi reales
const regiones = generarVoronoiReal(ancho, alto, numRegiones);

// Dibujar mapa con polígonos naturales
dibujarVoronoiReal(ctx, regiones);

// Dibujar nombres sobre las regiones
dibujarNombres(ctx, regiones);

// Debug opcional
console.log("Regiones generadas (Voronoi real):", regiones);