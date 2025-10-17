// ==================================================
// Script principal del generador de mapa
// frontend/js/script.js
// ==================================================

// === Importaciones ===
import { generarTerreno, dibujarTerreno } from './mapa/terreno.js';
import { generarBiomas, dibujarBiomas } from './mapa/biomas.js';
import { generarTerrenoEspecial, dibujarTerrenoEspecial } from './mapa/terrenoEspecial.js';
import { inicializarLeyenda } from './mapa/leyenda.js';

// === Inicialización ===
document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.getElementById("mapaCanvas");
  const ctx = canvas.getContext("2d");
  const ancho = canvas.width;
  const alto = canvas.height;

  // Mensaje de carga
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, ancho, alto);
  ctx.fillStyle = "#fff";
  ctx.font = "20px sans-serif";
  ctx.fillText("Generando mapa...", ancho / 2 - 100, alto / 2);

  // === 1️⃣ Generar datos de terreno base ===
  const terreno = generarTerreno(ancho, alto);
  dibujarTerreno(ctx, terreno);

  // === 2️⃣ Generar y dibujar biomas ===
  const biomas = generarBiomas(terreno);
  dibujarBiomas(ctx, biomas);

  // === 3️⃣ Generar y dibujar terrenos especiales ===
  const terrenosEspeciales = generarTerrenoEspecial(terreno);
  await dibujarTerrenoEspecial(ctx, terrenosEspeciales);

  // === 4️⃣ Inicializar leyenda ===
  inicializarLeyenda(terrenosEspeciales);

  console.log("✅ Mapa generado correctamente.");
});