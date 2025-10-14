// ===============================
// Rutas terrestres generadas automáticamente
// frontend/js/rutas/rutas.js
// ===============================

import { nombresGeograficos } from '../mapa/nombresGeograficos.js';

// Función para generar rutas conectando ciudades automáticamente
export function generarRutasTerrestres() {
  const ciudades = nombresGeograficos.filter(n => n.texto.includes('Ciudad'));
  const rutas = [];

  for (let i = 0; i < ciudades.length; i++) {
    for (let j = i + 1; j < ciudades.length; j++) {
      // Se puede ajustar la lógica: por ejemplo, distancia máxima
      const dx = ciudades[i].x - ciudades[j].x;
      const dy = ciudades[i].y - ciudades[j].y;
      const distancia = Math.sqrt(dx*dx + dy*dy);

      if (distancia < 400) { // solo conectar ciudades cercanas
        rutas.push({
          inicio: { x: ciudades[i].x, y: ciudades[i].y },
          fin: { x: ciudades[j].x, y: ciudades[j].y },
          tipo: 'comercial'
        });
      }
    }
  }

  return rutas;
}