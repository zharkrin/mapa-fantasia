// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// Importa los módulos necesarios
import { terrenosEspeciales } from './mapa/nombresTerrenoEspecial.js';
import { generarLeyenda } from './mapa/leyenda.js';

// ===============================
// INICIALIZACIÓN
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌍 Generador de mapa cargado correctamente');

  // Inicializar el canvas (aunque aún no dibuja mapa)
  const canvas = document.getElementById('mapaCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#cfe3f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px serif';
  ctx.fillStyle = '#333';
  ctx.fillText('Mapa base en desarrollo...', 20, 40);

  // ===============================
  // GENERAR LEYENDA DE TERRENOS ESPECIALES
  // ===============================
  generarLeyenda(terrenosEspeciales);

  // ===============================
  // CONTROL DE PANELES DE LEYENDA
  // ===============================
  const panelLeyenda = document.getElementById('panel-leyenda');
  const btnAbrirLeyenda = document.getElementById('btnAbrirLeyenda');
  const btnCerrarLeyenda = document.getElementById('btnCerrarLeyenda');

  btnAbrirLeyenda.addEventListener('click', () => {
    panelLeyenda.classList.remove('cerrado');
    btnAbrirLeyenda.style.display = 'none';
  });

  btnCerrarLeyenda.addEventListener('click', () => {
    panelLeyenda.classList.add('cerrado');
    btnAbrirLeyenda.style.display = 'block';
  });
});