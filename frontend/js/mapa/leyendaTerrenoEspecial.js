// ===========================================
// Leyenda de Terreno Especial
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===========================================

const contenedorLeyenda = document.getElementById("leyenda-terreno-especial");

const tiposTerrenoEspecial = [
  { nombre: "Bosque especial", icono: "bosque_especial.png" },
  { nombre: "Desierto cálido especial", icono: "desierto_calido_especial.png" },
  { nombre: "Glaciar especial", icono: "glaciar_especial.png" },
  { nombre: "Lago especial", icono: "lago_especial.png" },
  { nombre: "Montañas especiales", icono: "montanas_especial.png" },
  { nombre: "Pantano especial", icono: "pantano_especial.png" },
  { nombre: "Volcán especial", icono: "volcan_especial.png" }
];

const RUTA_ICONOS_ESPECIALES = "frontend/static/Img/icons/terreno_especial/";

function generarLeyendaTerrenosEspeciales() {
  if (!contenedorLeyenda) {
    console.warn("⚠️ Contenedor de leyenda no encontrado.");
    return;
  }

  contenedorLeyenda.innerHTML = ""; // limpiar leyenda existente

  tiposTerrenoEspecial.forEach((tipo) => {
    const fila = document.createElement("div");
    fila.classList.add("fila-leyenda");

    const img = document.createElement("img");
    img.src = RUTA_ICONOS_ESPECIALES + tipo.icono;
    img.alt = tipo.nombre;
    img.title = tipo.nombre;
    img.classList.add("icono-leyenda");

    const label = document.createElement("span");
    label.textContent = tipo.nombre;

    fila.appendChild(img);
    fila.appendChild(label);
    contenedorLeyenda.appendChild(fila);
  });
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  generarLeyendaTerrenosEspeciales();
});