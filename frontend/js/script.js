// frontend/js/script.js
// Script final del generador de mapas de fantasía

import { generarTerreno } from './mapa/generacionTerreno.js';
import { generarCaminos, dibujarCaminos } from './mapa/caminos.js';
import { generarRutasMarinas, generarRutasMagicas, limpiarRutasEspeciales, rutasEspeciales } from './mapa/rutasEspeciales.js';
import { asentamientos } from './mapa/asentamientos.js';

// Canvas principal
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const ancho = canvas.width;
const alto = canvas.height;

// Variables globales
let terrenoMapa = null;
let caminosMapa = [];
let opcionesRutasEspeciales = {
  activarMarinas: false,
  activarMagicas: false
};

/* ---------------------------
   Inicialización del mapa
----------------------------*/
export function inicializarMapa() {
  // 1. Generar terreno
  terrenoMapa = generarTerreno(ancho, alto);

  // 2. Generar caminos terrestres
  caminosMapa = generarCaminos(asentamientos, ancho, alto);

  // 3. Limpiar rutas especiales por si existían
  limpiarRutasEspeciales();

  // 4. Dibujar todo
  dibujarMapa();
}

/* ---------------------------
   Dibujar todo en canvas
----------------------------*/
function dibujarMapa() {
  // Limpiar canvas
  ctx.clearRect(0, 0, ancho, alto);

  // Dibujar terreno
  terrenoMapa.forEach(celda => {
    ctx.fillStyle = celda.color;
    ctx.fillRect(celda.x, celda.y, celda.w, celda.h);
  });

  // Dibujar caminos terrestres
  dibujarCaminos(ctx, caminosMapa);

  // Dibujar rutas especiales si están activas
  if (opcionesRutasEspeciales.activarMarinas) {
    dibujarCaminos(ctx, rutasEspeciales.marinas.map(r => ({ ...r, tipo: 'marina', ruta: [r.desde.centro, r.hasta.centro] })));
  }

  if (opcionesRutasEspeciales.activarMagicas) {
    dibujarCaminos(ctx, rutasEspeciales.magicas.map(r => ({ ...r, tipo: 'magico', ruta: [r.desde.centro, r.hasta.centro] })));
  }

  // Dibujar asentamientos
  asentamientos.forEach(a => {
    ctx.fillStyle = "#FFFFFF"; // color base para asentamientos
    ctx.beginPath();
    ctx.arc(a.centro.x, a.centro.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ---------------------------
   Activar rutas especiales
----------------------------*/
export function activarRutasMarinas() {
  generarRutasMarinas();
  opcionesRutasEspeciales.activarMarinas = true;
  dibujarMapa();
}

export function activarRutasMagicas() {
  generarRutasMagicas();
  opcionesRutasEspeciales.activarMagicas = true;
  dibujarMapa();
}

export function desactivarRutasEspeciales() {
  limpiarRutasEspeciales();
  opcionesRutasEspeciales.activarMarinas = false;
  opcionesRutasEspeciales.activarMagicas = false;
  dibujarMapa();
}

/* ---------------------------
   Reseteo del mapa
----------------------------*/
export function resetMapa() {
  caminosMapa = [];
  limpiarRutasEspeciales();
  inicializarMapa();
}

/* ---------------------------
   Inicializar al cargar
----------------------------*/
window.onload = () => {
  inicializarMapa();

  // Ejemplo: activar rutas especiales manualmente
  // activarRutasMarinas();
  // activarRutasMagicas();
};