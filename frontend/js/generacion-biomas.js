// frontend/js/generacion-biomas.js
// Generación procedimental de biomas en base a altura, humedad y temperatura

import { perlin2 } from "./perlin.js";

// Configuración de biomas
const biomas = [
  { nombre: "oceano", color: "#1d3557" },     // Azul marino
  { nombre: "costa", color: "#457b9d" },      // Azul claro
  { nombre: "desierto", color: "#f1c40f" },   // Amarillo arena
  { nombre: "llanura", color: "#2ecc71" },    // Verde claro
  { nombre: "bosque", color: "#27ae60" },     // Verde oscuro
  { nombre: "selva", color: "#006400" },      // Verde intenso
  { nombre: "tundra", color: "#95a5a6" },     // Gris frío
  { nombre: "montaña", color: "#7f8c8d" },    // Gris oscuro
  { nombre: "pico", color: "#ecf0f1" }        // Blanco nieve
];

// Función para generar el mapa de biomas
export function generarBiomas(ctx, width, height, escala = 0.01) {
  const dataBiomas = [];

  for (let y = 0; y < height; y++) {
    dataBiomas[y] = [];
    for (let x = 0; x < width; x++) {
      // Altura con ruido Perlin
      const altura = perlin2(x * escala, y * escala);

      // Humedad (otro ruido perlin desplazado)
      const humedad = perlin2((x + 500) * escala, (y + 500) * escala);

      // Temperatura (basada en latitud + ruido)
      const latitud = 1 - Math.abs((y / height) * 2 - 1); // 1 = ecuador, 0 = polos
      const temperatura = latitud - 0.3 + perlin2((x + 1000) * escala, (y + 1000) * escala);

      // Selección de bioma en base a reglas
      let bioma = biomas[0]; // por defecto océano

      if (altura < -0.1) {
        bioma = biomas[0]; // océano
      } else if (altura < 0) {
        bioma = biomas[1]; // costa
      } else if (altura < 0.3) {
        if (humedad < -0.2) {
          bioma = biomas[2]; // desierto
        } else {
          bioma = biomas[3]; // llanura
        }
      } else if (altura < 0.5) {
        if (humedad > 0.2) {
          bioma = biomas[5]; // selva
        } else {
          bioma = biomas[4]; // bosque
        }
      } else if (altura < 0.7) {
        if (temperatura < 0) {
          bioma = biomas[6]; // tundra
        } else {
          bioma = biomas[7]; // montaña
        }
      } else {
        bioma = biomas[8]; // pico nevado
      }

      dataBiomas[y][x] = bioma;

      // Dibujar píxel en el canvas
      ctx.fillStyle = bioma.color;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return dataBiomas;
}
