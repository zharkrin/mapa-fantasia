// frontend/js/script.js
import { generarTerreno } from "./mapa/generacionTerreno.js";
import { dibujarMapa } from "./mapa/dibujarMapa.js";
import { dibujarNombres } from "./mapa/dibujarNombres.js";

// configuración inicial
const ancho = 800;
const alto = 600;
const numRegiones = 12;

// obtener referencia al canvas
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
canvas.width = ancho;
canvas.height = alto;

// generar las regiones del terreno
const regiones = generarTerreno(ancho, alto, numRegiones);

// dibujar mapa
dibujarMapa(ctx, regiones);

// dibujar nombres
dibujarNombres(ctx, regiones);

// debug opcional en consola
console.log("Regiones generadas:", regiones);