/**
 * terrenoEspecial.js
 * -----------------------------------------------------
 * Genera y coloca terrenos especiales en el mapa.
 * Usa los datos y nombres definidos en leyendaTerrenoEspecial.js.
 * -----------------------------------------------------
 */

// Aseguramos dependencia con leyendaTerrenoEspecial.js
if (typeof obtenerTerrenosEspeciales !== "function") {
  console.error(
    "⚠️ No se encontró la función obtenerTerrenosEspeciales(). Asegúrate de cargar 'leyendaTerrenoEspecial.js' antes de este archivo."
  );
}

const cantidadTerrenosEspeciales = 10; // número de terrenos especiales a generar
let terrenosEspecialesGenerados = [];

/**
 * Genera un nombre aleatorio ligeramente distinto al base,
 * añadiendo un 25 % de fantasía (títulos, elementos mágicos, etc.).
 */
function generarNombreFantasia(baseNombre) {
  const prefijos = [
    "Antiguo ",
    "Sagrado ",
    "Perdido ",
    "Brillante ",
    "Sombrío ",
    "Eterno ",
    "Oculto ",
    "Maldito ",
    "Místico ",
    "Resplandeciente ",
  ];

  const sufijos = [
    " del Alba",
    " del Ocaso",
    " del Destino",
    " del Silencio",
    " de los Susurros",
    " de las Sombras",
    " del Eco",
    " del Trueno",
    " del Dragón",
    " de los Dioses",
  ];

  // 25% de probabilidad de alterar el nombre
  if (Math.random() < 0.25) {
    const prefijo = Math.random() < 0.5 ? prefijos[Math.floor(Math.random() * prefijos.length)] : "";
    const sufijo = Math.random() < 0.5 ? sufijos[Math.floor(Math.random() * sufijos.length)] : "";
    return `${prefijo}${baseNombre}${sufijo}`;
  }

  return baseNombre;
}

/**
 * Genera posiciones aleatorias para los terrenos especiales
 * dentro de los límites visibles del mapa.
 */
function generarPosicionAleatoria(mapaAncho, mapaAlto) {
  const margen = 50; // margen para no colocar iconos fuera del mapa
  return {
    x: Math.floor(Math.random() * (mapaAncho - margen * 2)) + margen,
    y: Math.floor(Math.random() * (mapaAlto - margen * 2)) + margen,
  };
}

/**
 * Crea y coloca visualmente los terrenos especiales en el mapa.
 * Debe llamarse después de que el contenedor del mapa esté disponible.
 */
function generarTerrenosEspeciales() {
  const contenedorMapa = document.getElementById("mapa");
  if (!contenedorMapa) {
    console.error("No se encontró el elemento #mapa en el DOM.");
    return;
  }

  const anchoMapa = contenedorMapa.offsetWidth;
  const altoMapa = contenedorMapa.offsetHeight;

  const tipos = obtenerTerrenosEspeciales();
  terrenosEspecialesGenerados = [];

  for (let i = 0; i < cantidadTerrenosEspeciales; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const nombre = generarNombreFantasia(tipo.nombre);
    const posicion = generarPosicionAleatoria(anchoMapa, altoMapa);

    const icono = document.createElement("img");
    icono.src = tipo.icono;
    icono.alt = nombre;
    icono.classList.add("icono-terreno-especial");
    icono.title = nombre;

    // Posicionamiento absoluto sobre el mapa
    icono.style.position = "absolute";
    icono.style.left = `${posicion.x}px`;
    icono.style.top = `${posicion.y}px`;
    icono.style.width = "32px";
    icono.style.height = "32px";
    icono.style.zIndex = "10";
    icono.style.transition = "transform 0.2s ease";

    // Pequeña animación interactiva
    icono.addEventListener("mouseenter", () => {
      icono.style.transform = "scale(1.3)";
    });
    icono.addEventListener("mouseleave", () => {
      icono.style.transform = "scale(1)";
    });

    contenedorMapa.appendChild(icono);

    terrenosEspecialesGenerados.push({
      nombre,
      tipo: tipo.id,
      x: posicion.x,
      y: posicion.y,
    });
  }

  console.info(`✅ Generados ${terrenosEspecialesGenerados.length} terrenos especiales.`);
}

/**
 * Limpia los terrenos especiales generados del mapa.
 */
function limpiarTerrenosEspeciales() {
  const contenedorMapa = document.getElementById("mapa");
  if (!contenedorMapa) return;

  const iconos = contenedorMapa.querySelectorAll(".icono-terreno-especial");
  iconos.forEach((icono) => icono.remove());
  terrenosEspecialesGenerados = [];
  console.info("🧹 Terrenos especiales eliminados.");
}

/**
 * Devuelve la lista de terrenos especiales actualmente en el mapa.
 */
function obtenerTerrenosEspecialesGenerados() {
  return terrenosEspecialesGenerados;
}

// Exportaciones globales
window.generarTerrenosEspeciales = generarTerrenosEspeciales;
window.limpiarTerrenosEspeciales = limpiarTerrenosEspeciales;
window.obtenerTerrenosEspecialesGenerados = obtenerTerrenosEspecialesGenerados;