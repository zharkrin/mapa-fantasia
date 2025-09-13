// ===============================
// Script Principal - Generador de Mapas de Fantasía
// ===============================

// Importaciones de módulos
import { GeneracionProcedural } from "./generacionProcedural.js";
import { generarNombreMontaña, generarNombreRio } from "./nombresMontañasRios.js";

// Configuración inicial del generador
const configuracionInicial = {
  ancho: 300,
  alto: 300,
  escalaRuido: 60,
  porcentajeAgua: 0.35,
  semilla: Date.now(),
};

// Inicializamos el generador
GeneracionProcedural.inicializar(configuracionInicial);

// Generamos el mundo
const mundo = GeneracionProcedural.generarMundo();

// Configuramos el canvas
const canvas = document.getElementById("mapaCanvas");
const ctx = canvas.getContext("2d");
canvas.width = configuracionInicial.ancho;
canvas.height = configuracionInicial.alto;

// Dibujar el mapa con colores según altura
for (let y = 0; y < mundo.length; y++) {
  for (let x = 0; x < mundo[y].length; x++) {
    const valor = mundo[y][x];
    let color;
    if (valor < 0.3) color = "#1E90FF"; // agua
    else if (valor < 0.5) color = "#228B22"; // tierra baja
    else if (valor < 0.7) color = "#8B4513"; // colinas
    else color = "#A9A9A9"; // montañas
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }
}

// Ejemplo de cálculo de ruta A* entre dos puntos
const inicio = { x: 10, y: 10 };
const destino = { x: 200, y: 200 };
const ruta = GeneracionProcedural.calcularRuta(mundo, inicio, destino);

// Dibujar la ruta en rojo
if (ruta && ruta.length > 0) {
  ctx.fillStyle = "red";
  ruta.forEach(punto => ctx.fillRect(punto.x, punto.y, 1, 1));
}

// ===============================
// Generación de nombres para montañas y ríos
// ===============================

// Ejemplo de puntos para montañas y ríos
const montañas = [
  { x: 150, y: 50 },
  { x: 220, y: 180 },
];

const rios = [
  { x: 50, y: 250 },
  { x: 120, y: 100 },
];

// Preparar etiquetas
const etiquetas = [];

// Montañas
montañas.forEach(m => {
  etiquetas.push({
    texto: generarNombreMontaña(),
    x: m.x,
    y: m.y,
    tipo: "montaña"
  });
});

// Ríos
rios.forEach(r => {
  etiquetas.push({
    texto: generarNombreRio(),
    x: r.x,
    y: r.y,
    tipo: "río"
  });
});

// Pintar todas las etiquetas sobre el mapa
GeneracionProcedural.pintarEtiquetas(ctx, etiquetas);