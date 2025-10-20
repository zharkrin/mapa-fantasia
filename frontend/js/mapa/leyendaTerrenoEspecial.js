/**
 * leyendaTerrenoEspecial.js
 * -------------------------------------------
 * Genera dinámicamente la lista de terrenos especiales con sus iconos.
 * Los iconos se cargan desde:
 *    frontend/static/img/icons/terreno_especial/
 * -------------------------------------------
 */

const listaTerrenosEspeciales = [
  {
    id: "bosque_especial",
    nombre: "Bosque Encantado",
    icono: "frontend/static/img/icons/terreno_especial/bosque_especial.png",
  },
  {
    id: "desierto_calido_especial",
    nombre: "Desierto del Eco Eterno",
    icono: "frontend/static/img/icons/terreno_especial/desierto_calido_especial.png",
  },
  {
    id: "glaciar_especial",
    nombre: "Glaciar del Silencio",
    icono: "frontend/static/img/icons/terreno_especial/glaciar_especial.png",
  },
  {
    id: "lago_especial",
    nombre: "Lago del Alba Espectral",
    icono: "frontend/static/img/icons/terreno_especial/lago_especial.png",
  },
  {
    id: "montanas_especial",
    nombre: "Montañas del Trueno",
    icono: "frontend/static/img/icons/terreno_especial/montanas_especial.png",
  },
  {
    id: "pantano_especial",
    nombre: "Pantano de las Sombras",
    icono: "frontend/static/img/icons/terreno_especial/pantano_especial.png",
  },
  {
    id: "volcan_especial",
    nombre: "Volcán del Corazón Ígneo",
    icono: "frontend/static/img/icons/terreno_especial/volcan_especial.png",
  },
];

/**
 * Crea y muestra la leyenda de terrenos especiales en el panel.
 */
function cargarLeyendaTerrenoEspecial() {
  const lista = document.getElementById("lista-terrenos-especiales");
  if (!lista) {
    console.error("No se encontró el elemento #lista-terrenos-especiales");
    return;
  }

  lista.innerHTML = ""; // Limpia contenido previo

  listaTerrenosEspeciales.forEach((terreno) => {
    const item = document.createElement("li");
    item.classList.add("item-terreno-especial");

    const icono = document.createElement("img");
    icono.src = terreno.icono;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-terreno-especial");

    const texto = document.createElement("span");
    texto.textContent = terreno.nombre;

    item.appendChild(icono);
    item.appendChild(texto);
    lista.appendChild(item);
  });
}

/**
 * Permite obtener la lista para otros módulos del mapa.
 */
function obtenerTerrenosEspeciales() {
  return listaTerrenosEspeciales;
}

// Exportación global para otros scripts
window.cargarLeyendaTerrenoEspecial = cargarLeyendaTerrenoEspecial;
window.obtenerTerrenosEspeciales = obtenerTerrenosEspeciales;