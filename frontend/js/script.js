// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// Importaciones principales
import { generarTerrenoEspecial } from './mapa/terrenoEspecial.js';
import { generarNombresTerrenoEspecial } from './mapa/nombresTerrenoEspecial.js';
import { generarLeyenda } from './mapa/leyendaTerrenoEspecial.js';

// ===============================
// Inicialización general del mapa
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🗺️ Generador de mapa fantástico iniciado');

  // Contenedor principal del mapa
  const contenedorMapa = document.getElementById('mapa');
  const listaLeyenda = document.getElementById('listaLeyenda');

  // Generar los terrenos especiales (volcanes, glaciares, bosques antiguos…)
  const terrenosEspeciales = generarTerrenoEspecial();

  // Asignar nombres únicos a los terrenos especiales
  const terrenosConNombres = generarNombresTerrenoEspecial(terrenosEspeciales);

  // Dibujar los íconos de los terrenos especiales
  terrenosConNombres.forEach((terreno) => {
    const icono = document.createElement('img');
    icono.src = `./static/img/icons/${terreno.icono}`;
    icono.alt = terreno.nombre;
    icono.title = terreno.nombre;
    icono.classList.add('icono-terreno');

    // Posicionar aleatoriamente en el mapa (temporal)
    icono.style.position = 'absolute';
    icono.style.left = `${Math.random() * 90 + 5}%`;
    icono.style.top = `${Math.random() * 90 + 5}%`;

    contenedorMapa.appendChild(icono);
  });

  // Generar leyenda visual
  generarLeyenda(terrenosConNombres);

  console.log('✅ Terrenos especiales generados:', terrenosConNombres);
});

// ===============================
// Panel de leyenda (mostrar / ocultar)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const botonLeyenda = document.getElementById('botonLeyenda');
  const panelLeyenda = document.getElementById('panelLeyenda');
  const cerrarLeyenda = document.getElementById('cerrarLeyenda');

  if (botonLeyenda && panelLeyenda && cerrarLeyenda) {
    botonLeyenda.addEventListener('click', () => {
      panelLeyenda.style.display = 'block';
    });

    cerrarLeyenda.addEventListener('click', () => {
      panelLeyenda.style.display = 'none';
    });
  }
});

// ===============================
// Fin del archivo
// ===============================