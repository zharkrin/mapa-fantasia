// ===============================
// Script principal
// frontend/js/script.js
// ===============================

import { generarTerreno } from './mapa/generacionTerreno.js';
import { dibujarMapa } from './mapa/dibujarMapa.js';
import { dibujarNombres } from './mapa/dibujarNombres.js';
import { nombresTerrenoEspecial } from './mapa/nombresTerrenoEspecial.js';
import { nombresGeograficos } from './mapa/nombresGeograficos.js';
import { drawRutas } from './ui/drawRutas.js';
import { rutasTerrestres } from './rutas/rutas.js';

// ===============================
// VARIABLES PRINCIPALES
// ===============================
const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');

let mapaDatos = null;
let mostrarTerrenosEspeciales = true;
let mostrarRutas = false;

// ===============================
// CONFIGURACIÓN DEL CANVAS
// ===============================
function ajustarCanvas() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.85;
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

// ===============================
// GENERAR MAPA
// ===============================
function generarMapa() {
  // 1. Generar terreno procedimental
  mapaDatos = generarTerreno(canvas.width, canvas.height);

  // 2. Dibujar mapa base
  dibujarMapa(ctx, mapaDatos);

  // 3. Dibujar nombres geográficos: ciudades, ríos, montañas
  nombresGeograficos.forEach(nombre => {
    ctx.fillStyle = nombre.color || 'white';
    ctx.font = nombre.tamano || '14px Arial';
    ctx.fillText(nombre.texto, nombre.x, nombre.y);
  });

  // 4. Dibujar nombres de terrenos especiales
  nombresTerrenoEspecial.forEach(terreno => {
    const img = new Image();
    img.src = `static/img/icons/${terreno.icono}.png`;
    img.onload = () => {
      ctx.drawImage(img, terreno.x, terreno.y, 32, 32);
    };
  });

  // 5. Dibujar rutas terrestres
  if (mostrarRutas) {
    rutasTerrestres.forEach(ruta => {
      drawRutas(ctx, ruta);
    });
  }
}

// ===============================
// EVENTOS DE BOTONES
// ===============================
document.getElementById('generar-mapa').addEventListener('click', () => {
  generarMapa();
});

document.getElementById('guardar-mapa').addEventListener('click', () => {
  if (!mapaDatos) return alert('Genera un mapa primero.');
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'mapa_fantasia.png';
  link.click();
});

// ===============================
// CHECKBOX DE OPCIONES
// ===============================
document.getElementById('mostrar-terrenos-especiales').addEventListener('change', (e) => {
  mostrarTerrenosEspeciales = e.target.checked;
  generarMapa();
});

document.getElementById('mostrar-rutas').addEventListener('change', (e) => {
  mostrarRutas = e.target.checked;
  generarMapa();
});

// ===============================
// BOTÓN MOSTRAR/OCULTAR LEYENDA
// ===============================
const leyenda = document.getElementById('leyenda');
const toggleLeyenda = document.getElementById('toggle-leyenda');

toggleLeyenda.addEventListener('click', () => {
  if (leyenda.classList.contains('visible')) {
    leyenda.classList.remove('visible');
    leyenda.classList.add('oculta');
  } else {
    leyenda.classList.remove('oculta');
    leyenda.classList.add('visible');
  }
});

// ===============================
// INICIALIZACIÓN
// ===============================
window.addEventListener('load', () => {
  generarMapa();
});