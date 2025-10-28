// ============================================================
// frontend/js/mapa/terrenoEspecial.js
// ------------------------------------------------------------
// Define los terrenos especiales del mapa fantástico
// Cada terreno tiene un nombre y un icono asociado
// La lista es usada automáticamente por leyendaTerrenoEspecial.js
// ============================================================

window.terrenosEspeciales = [
  {
    nombre: "Bosque Especial",
    descripcion: "Un bosque antiguo lleno de árboles colosales y misteriosas criaturas.",
    icono: "bosque_especial.png"
  },
  {
    nombre: "Desierto Cálido Especial",
    descripcion: "Una vasta extensión de dunas doradas donde soplan vientos abrasadores.",
    icono: "desierto_calido_especial.png"
  },
  {
    nombre: "Glaciar Especial",
    descripcion: "Una masa de hielo eterno que guarda secretos en su interior.",
    icono: "glaciar_especial.png"
  },
  {
    nombre: "Lago Especial",
    descripcion: "Un lago cristalino cuyas aguas reflejan los cielos más profundos.",
    icono: "lago_especial.png"
  },
  {
    nombre: "Montañas Especiales",
    descripcion: "Picos majestuosos que se alzan hacia los cielos, hogar de dragones y leyendas.",
    icono: "montanas_especial.png"
  },
  {
    nombre: "Pantano Especial",
    descripcion: "Tierras húmedas envueltas en niebla, donde el aire es espeso y misterioso.",
    icono: "pantano_especial.png"
  },
  {
    nombre: "Volcán Especial",
    descripcion: "Una montaña rugiente que exhala fuego y humo, símbolo de poder y destrucción.",
    icono: "volcan_especial.png"
  }
];

// ============================================================
// Función opcional: Generar terrenos especiales en el mapa
// (puede invocarse desde el script principal)
// ============================================================

function generarTerrenosEspeciales(mapaContainer) {
  if (!mapaContainer) {
    console.error("❌ No se encontró el contenedor del mapa para generar los terrenos especiales.");
    return;
  }

  window.terrenosEspeciales.forEach(terreno => {
    const icono = document.createElement("img");
    icono.src = `frontend/static/Img/icons/terreno_especial/${terreno.icono}`;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-terreno-especial");

    // Si la imagen falla, se usa el placeholder
    icono.onerror = () => {
      console.warn(`⚠️ No se pudo cargar ${terreno.icono}, usando placeholder.`);
      icono.src = "frontend/static/Img/icons/placeholder.png";
    };

    // Posición aleatoria dentro del contenedor
    const posX = Math.random() * (mapaContainer.clientWidth - 64);
    const posY = Math.random() * (mapaContainer.clientHeight - 64);

    icono.style.position = "absolute";
    icono.style.left = `${posX}px`;
    icono.style.top = `${posY}px`;
    icono.style.width = "64px";
    icono.style.height = "64px";
    icono.title = `${terreno.nombre}\n${terreno.descripcion}`;

    mapaContainer.appendChild(icono);
  });
}

// ============================================================
// Exportar la función globalmente (para usarla desde index.html)
// ============================================================
window.generarTerrenosEspeciales = generarTerrenosEspeciales;