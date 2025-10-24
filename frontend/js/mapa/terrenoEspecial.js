// ==========================================================
// Terrenos Especiales
// frontend/js/mapa/terrenoEspecial.js
// ==========================================================
//
// Este archivo contiene la definición de los terrenos especiales,
// sus nombres generados proceduralmente y la ruta de sus iconos.
// Se integra con leyendaTerrenoEspecial.js para mostrar la leyenda.
//
// ==========================================================

const terrenoEspecial = [
  {
    nombre: "Bosque encantado",
    tipo: "bosque_especial",
    icono: "frontend/static/img/icons/terreno_especial/bosque_especial.png"
  },
  {
    nombre: "Desierto cálido encantado",
    tipo: "desierto_calido_especial",
    icono: "frontend/static/img/icons/terreno_especial/desierto_calido_especial.png"
  },
  {
    nombre: "Glaciar mágico",
    tipo: "glaciar_especial",
    icono: "frontend/static/img/icons/terreno_especial/glaciar_especial.png"
  },
  {
    nombre: "Lago de los sueños",
    tipo: "lago_especial",
    icono: "frontend/static/img/icons/terreno_especial/lago_especial.png"
  },
  {
    nombre: "Montañas del trueno",
    tipo: "montañas_especial",
    icono: "frontend/static/img/icons/terreno_especial/montañas_especial.png"
  },
  {
    nombre: "Pantano maldito",
    tipo: "pantano_especial",
    icono: "frontend/static/img/icons/terreno_especial/pantano_especial.png"
  },
  {
    nombre: "Volcán dormido",
    tipo: "volcan_especial",
    icono: "frontend/static/img/icons/terreno_especial/volcan_especial.png"
  }
];

// ==========================================================
// Función para obtener iconos y nombres para la leyenda
// ==========================================================
function obtenerIconosTerrenoEspecial() {
  return terrenoEspecial.map(t => ({
    nombre: t.nombre,
    src: t.icono
  }));
}

// ==========================================================
// Función de prueba: mostrar en consola los terrenos especiales
// ==========================================================
function mostrarTerrenosEspeciales() {
  console.log("Terrenos especiales disponibles:");
  terrenoEspecial.forEach(t => console.log(`${t.nombre} -> ${t.icono}`));
}

// Ejecutar prueba al cargar el documento
document.addEventListener("DOMContentLoaded", mostrarTerrenosEspeciales);