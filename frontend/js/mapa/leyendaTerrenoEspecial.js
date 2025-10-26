// ===========================================
// Leyenda de Terreno Especial
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===========================================

// Lista de terrenos especiales (vinculados a sus íconos en frontend/static/Img/icons/terreno_especial)
const terrenosEspeciales = [
  { nombre: "Bosque especial", icono: "bosque_especial.png" },
  { nombre: "Desierto cálido especial", icono: "desierto_calido_especial.png" },
  { nombre: "Glaciar especial", icono: "glaciar_especial.png" },
  { nombre: "Lago especial", icono: "lago_especial.png" },
  { nombre: "Montañas especiales", icono: "montanas_especial.png" },
  { nombre: "Pantano especial", icono: "pantano_especial.png" },
  { nombre: "Volcán especial", icono: "volcan_especial.png" }
];

// Ruta base de los íconos
const RUTA_ICONOS_ESPECIALES = "frontend/static/Img/icons/terreno_especial/";

/**
 * Crea la lista de elementos de la leyenda de terrenos especiales
 */
function crearLeyendaTerrenoEspecial() {
  const listaLeyenda = document.getElementById("leyenda-lista");
  if (!listaLeyenda) return;

  listaLeyenda.innerHTML = ""; // Limpiar lista previa

  terrenosEspeciales.forEach((terreno) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = `${RUTA_ICONOS_ESPECIALES}${terreno.icono}`;
    img.alt = terreno.nombre;
    img.onerror = () => {
      // Si no se encuentra el icono, usar un placeholder sencillo CSS
      img.style.background = "linear-gradient(135deg, #333 25%, #666 100%)";
      img.title = "Icono no disponible";
    };

    const nombre = document.createElement("span");
    nombre.textContent = terreno.nombre;

    li.appendChild(img);
    li.appendChild(nombre);
    listaLeyenda.appendChild(li);
  });
}

/**
 * Inicializa el comportamiento de abrir/cerrar la leyenda
 */
function inicializarLeyenda() {
  const botonLeyenda = document.getElementById("boton-leyenda");
  const contenedorLeyenda = document.getElementById("leyenda-container");
  const botonCerrar = document.getElementById("boton-cerrar-leyenda");

  if (!botonLeyenda || !contenedorLeyenda || !botonCerrar) {
    console.warn("⚠️ Elementos de la leyenda no encontrados en el DOM.");
    return;
  }

  botonLeyenda.addEventListener("click", () => {
    crearLeyendaTerrenoEspecial();
    contenedorLeyenda.style.display = "block";
  });

  botonCerrar.addEventListener("click", () => {
    contenedorLeyenda.style.display = "none";
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarLeyenda);