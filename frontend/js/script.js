// ===============================
// Script Principal - Generador de Mapas de Fantasía
// ===============================

// Importamos el núcleo de la generación procedural
import { GeneracionProcedural } from "./generacionProcedural.js";

// Configuración inicial (puede cambiarse según necesidad)
const configuracionInicial = {
  ancho: 250,        // ancho del mapa
  alto: 250,         // alto del mapa
  escalaRuido: 60,   // escala de ruido (detalle del terreno)
  porcentajeAgua: 0.35, // proporción de agua respecto al terreno
  semilla: Date.now(),  // semilla aleatoria
};

// Inicializamos el generador con la configuración
GeneracionProcedural.inicializar(configuracionInicial);

// Generamos el mundo
const mapa = GeneracionProcedural.generarMundo();

// Mostramos el resultado en consola (temporal para pruebas)
console.log("Mapa generado:", mapa);

// ============================================================
// Renderizado básico en un <canvas> del mapa generado
// ============================================================

// Buscamos el canvas en el HTML
const canvas = document.getElementById("mapaCanvas");
const ctx = canvas.getContext("2d");

// Ajustamos el tamaño del canvas según el mapa
canvas.width = configuracionInicial.ancho;
canvas.height = configuracionInicial.alto;

// Función para dibujar el mapa generado
function dibujarMapa(mapa) {
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      const valor = mapa[y][x];

      // Elegimos colores básicos según el valor del terreno
      let color;
      if (valor < 0.3) {
        color = "#1E90FF"; // agua
      } else if (valor < 0.5) {
        color = "#228B22"; // tierra baja
      } else if (valor < 0.7) {
        color = "#8B4513"; // colinas
      } else {
        color = "#A9A9A9"; // montañas
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// Dibujamos el mapa
dibujarMapa(mapa);

// ============================================================
// Ejemplo de cálculo de ruta usando A* sobre el mapa
// ============================================================

// Definimos inicio y destino
const inicio = { x: 10, y: 10 };
const destino = { x: 200, y: 200 };

// Calculamos ruta con A*
const ruta = GeneracionProcedural.calcularRuta(mapa, inicio, destino);
console.log("Ruta calculada:", ruta);

// Pintamos la ruta en rojo sobre el canvas
if (ruta && ruta.length > 0) {
  ctx.fillStyle = "red";
  ruta.forEach(punto => {
    ctx.fillRect(punto.x, punto.y, 1, 1);
  });
}