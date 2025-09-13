import { generarNombreCiudad, generarNombreNacion, generarRutasComerciales } from "./nombresCiudadesNaciones.js";

// Generar ciudades y naciones
const ciudades = [
  { x: 60, y: 80, nombre: generarNombreCiudad() },
  { x: 200, y: 50, nombre: generarNombreCiudad() },
  { x: 180, y: 220, nombre: generarNombreCiudad() },
];

const naciones = [
  { nombre: generarNombreNacion() },
  { nombre: generarNombreNacion() },
];

// Generar rutas comerciales
const rutasComerciales = generarRutasComerciales(ciudades);

// Dibujar ciudades y rutas sobre el mapa
function dibujarCiudadesYRutas() {
  // Dibujar rutas
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 2 * escala;
  rutasComerciales.forEach(ruta => {
    ctx.beginPath();
    ctx.moveTo(ruta.origen.x * escala + offsetX, ruta.origen.y * escala + offsetY);
    ctx.lineTo(ruta.destino.x * escala + offsetX, ruta.destino.y * escala + offsetY);
    ctx.stroke();
  });

  // Dibujar ciudades
  ctx.fillStyle = "purple";
  ciudades.forEach(c => {
    const px = c.x * escala + offsetX;
    const py = c.y * escala + offsetY;
    ctx.beginPath();
    ctx.arc(px, py, 4 * escala, 0, Math.PI * 2);
    ctx.fill();

    // Nombre de la ciudad
    ctx.fillStyle = "black";
    ctx.font = `${12 * escala}px Arial`;
    ctx.fillText(c.nombre, px, py - 6 * escala);
    ctx.fillStyle = "purple";
  });
}

// Modificar la función principal de dibujado
function dibujarTodo() {
  dibujarMapa();               // terreno + rutas A* + etiquetas
  dibujarCiudadesYRutas();     // ciudades + rutas comerciales
}

// Llamar a la nueva función en lugar de dibujarMapa solo
dibujarTodo();

// Actualizar eventos para zoom y arrastre
canvas.addEventListener("mousemove", e => {
  if (!arrastrando) return;
  offsetX += e.offsetX - lastX;
  offsetY += e.offsetY - lastY;
  lastX = e.offsetX;
  lastY = e.offsetY;
  dibujarTodo(); // redibujar todo
});

canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const factorZoom = 0.1;
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  const zoomAnterior = escala;
  if (e.deltaY < 0) escala *= 1 + factorZoom;
  else escala /= 1 + factorZoom;

  offsetX -= (mouseX - offsetX) * (escala / zoomAnterior - 1);
  offsetY -= (mouseY - offsetY) * (escala / zoomAnterior - 1);

  dibujarTodo(); // redibujar todo
});