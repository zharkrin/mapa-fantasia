// =====================================================
// 📘 LEYENDA DE TERRENOS ESPECIALES
// Genera automáticamente la leyenda según las imágenes
// disponibles en la carpeta de terreno especial.
// =====================================================

// Ruta base de los iconos de terreno especial
const RUTA_TERRENO_ESPECIAL = "frontend/static/img/icons/terreno_especial/";

// Lista de terrenos especiales existentes
// Puedes añadir más manualmente si se crean nuevos iconos
const TERRENOS_ESPECIALES = [
  "bosque_especial",
  "desierto_calido_especial",
  "glaciar_especial",
  "lago_especial",
  "montanas_especial",
  "pantano_especial",
  "volcan_especial"
];

// Generar la leyenda al cargar la página
document.addEventListener("DOMContentLoaded", generarLeyendaTerrenoEspecial);

function generarLeyendaTerrenoEspecial() {
  const contenedor = document.getElementById("leyenda-terreno-especial");
  if (!contenedor) {
    console.error("❌ No se encontró el contenedor de la leyenda.");
    return;
  }

  contenedor.innerHTML = "<h3>🌋 Terrenos Especiales</h3>";

  const lista = document.createElement("div");
  lista.classList.add("leyenda-lista");

  TERRENOS_ESPECIALES.forEach(nombre => {
    const item = document.createElement("div");
    item.classList.add("leyenda-item");

    // Imagen del icono
    const img = document.createElement("img");
    img.src = `${RUTA_TERRENO_ESPECIAL}${nombre}.png`;
    img.alt = nombre.replace(/_/g, " ");
    img.classList.add("leyenda-icono");

    // Texto del nombre (más legible)
    const texto = document.createElement("span");
    texto.textContent = formatearNombre(nombre);

    // Añadir a la leyenda
    item.appendChild(img);
    item.appendChild(texto);
    lista.appendChild(item);
  });

  contenedor.appendChild(lista);
}

/**
 * Convierte un nombre tipo 'desierto_calido_especial'
 * en 'Desierto Cálido Especial'
 */
function formatearNombre(nombre) {
  return nombre
    .split("_")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}