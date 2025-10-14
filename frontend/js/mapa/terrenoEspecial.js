// ================================================
// frontend/js/mapa/terrenoEspecial.js
// ================================================
// Genera y dibuja los terrenos singulares como volcanes,
// glaciares, cavernas, cráteres, etc. usando iconos visuales.
// ================================================

import { obtenerIcono } from './iconosTerreno.js';

export function generarTerrenosEspeciales(mapa, cantidad = 20) {
  const tipos = ['volcan', 'glaciar', 'crater', 'rio', 'matorral', 'cavernas'];
  const especiales = [];

  for (let i = 0; i < cantidad; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const x = Math.floor(Math.random() * mapa[0].length);
    const y = Math.floor(Math.random() * mapa.length);

    especiales.push({ tipo, x, y });
  }

  return especiales;
}

export function dibujarTerrenosEspeciales(ctx, terrenos, opciones = {}) {
  const { anchoCelda = 64, altoCelda = 64 } = opciones;

  terrenos.forEach(terreno => {
    const iconoSrc = obtenerIcono(terreno.tipo);
    const imagen = new Image();
    imagen.src = iconoSrc;

    imagen.onload = () => {
      ctx.drawImage(imagen, terreno.x * anchoCelda, terreno.y * altoCelda, anchoCelda, altoCelda);
    };
  });
}