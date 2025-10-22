// =============================================================
// Archivo: frontend/js/mapa/leyendaTerrenoEspecial.js
// Descripción: Genera la leyenda de terrenos especiales con sus iconos
// =============================================================

// Lista base de terrenos especiales con su ruta de icono
const terrenosEspeciales = [
  {
    nombre: "Bosque Especial",
    icono: "frontend/static/Img/icons/terreno_especial/bosque_especial.png",
    descripcion: "Bosque ancestral donde la magia antigua aún respira entre los árboles."
  },
  {
    nombre: "Desierto Cálido Especial",
    icono: "frontend/static/Img/icons/terreno_especial/desierto_calido_especial.png",
    descripcion: "Un mar de dunas doradas que oculta ruinas perdidas y oasis secretos."
  },
  {
    nombre: "Glaciar Especial",
    icono: "frontend/static/Img/icons/terreno_especial/glaciar_especial.png",
    descripcion: "Una vasta extensión de hielo eterno que murmura con voces antiguas."
  },
  {
    nombre: "Lago Especial",
    icono: "frontend/static/Img/icons/terreno_especial/lago_especial.png",
    descripcion: "Aguas profundas donde habitan criaturas olvidadas por el tiempo."
  },
  {
    nombre: "Montañas Especiales",
    icono: "frontend/static/Img/icons/terreno_especial/montanas_especial.png",
    descripcion: "Cumbres sagradas donde los dioses libraron sus batallas."
  },
  {
    nombre: "Pantano Especial",
    icono: "frontend/static/Img/icons/terreno_especial/pantano_especial.png",
    descripcion: "Tierras húmedas cubiertas de niebla, morada de espíritus errantes."
  },
  {
    nombre: "Volcán Especial",
    icono: "frontend/static/Img/icons/terreno_especial/volcan_especial.png",
    descripcion: "Un coloso de fuego que despierta el poder de las profundidades."
  }
];

// =============================================================
// Función: cargarLeyendaTerrenoEspecial
// Crea dinámicamente los elementos de la leyenda
// =============================================================
function cargarLeyendaTerrenoEspecial() {
  const contenedor = document.getElementById("contenido-leyenda");
  if (!contenedor) {
    console.error("❌ No se encontró el contenedor de la leyenda.");
    return;
  }

  // Limpiar contenido previo
  contenedor.innerHTML = "";

  // Crear cada entrada de terreno especial
  terrenosEspeciales.forEach(terreno => {
    const item = document.createElement("div");
    item.className = "leyenda-item";

    const icono = document.createElement("img");
    icono.src = terreno.icono;
    icono.alt = terreno.nombre;
    icono.className = "icono-terreno-especial";

    // Si la imagen falla, simplemente ocúltala
    icono.onerror = () => {
      console.warn(`⚠️ No se pudo cargar el icono para: ${terreno.nombre}`);
      icono.style.display = "none";
    };

    const nombre = document.createElement("h3");
    nombre.textContent = terreno.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = terreno.descripcion;

    item.appendChild(icono);
    item.appendChild(nombre);
    item.appendChild(descripcion);

    contenedor.appendChild(item);
  });
}

// =============================================================
// Funciones auxiliares
// =============================================================

// Muestra los terrenos especiales dentro del mapa visualmente
function generarTerrenosEspeciales() {
  const mapa = document.getElementById("mapa");
  if (!mapa) {
    console.error("❌ No se encontró el contenedor del mapa.");
    return;
  }

  limpiarTerrenosEspeciales();

  // Generar iconos dispersos en el mapa
  terrenosEspeciales.forEach((terreno) => {
    const icono = document.createElement("img");
    icono.src = terreno.icono;
    icono.alt = terreno.nombre;
    icono.className = "icono-terreno-especial";
    icono.style.position = "absolute";
    icono.style.width = "48px";
    icono.style.height = "48px";
    icono.style.left = Math.random() * 90 + "%";
    icono.style.top = Math.random() * 80 + "%";

    // Si falla la carga, se elimina automáticamente
    icono.onerror = () => {
      console.warn(`⚠️ No se pudo cargar el icono para: ${terreno.nombre}`);
      icono.remove();
    };

    mapa.appendChild(icono);
  });
}

// Limpia los iconos actuales del mapa
function limpiarTerrenosEspeciales() {
  const mapa = document.getElementById("mapa");
  if (!mapa) return;
  const iconos = mapa.querySelectorAll(".icono-terreno-especial");
  iconos.forEach((icono) => icono.remove());
}