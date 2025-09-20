// ===============================
// Leyenda dinámica de biomas
// frontend/js/ui/leyenda.js
// ===============================

// Lista de biomas y lugares singulares con su icono
const biomasYLugares = [
  { nombre: "Acantilado", icono: "acantilado.png" },
  { nombre: "Bosque Boreal", icono: "bosque_boreal.png" },
  { nombre: "Bosque Tropical", icono: "bosque_tropical.png" },
  { nombre: "Bosque", icono: "bosque.png" },
  { nombre: "Cañón", icono: "cañon.png" },
  { nombre: "Colina", icono: "colina.png" },
  { nombre: "Costa", icono: "costa.png" },
  { nombre: "Desierto Cálido", icono: "desierto_calido.png" },
  { nombre: "Desierto Frío", icono: "desierto_frio.png" },
  { nombre: "Estepa", icono: "estepa.png" },
  { nombre: "Humedal", icono: "humedal.png" },
  { nombre: "Lago", icono: "lago.png" },
  { nombre: "Mar", icono: "mar.png" },
  { nombre: "Meseta", icono: "mesera.png" }, // ojo: archivo se llama "mesera.png"
  { nombre: "Montañas", icono: "montañas.png" },
  { nombre: "Océano", icono: "oceano.png" },
  { nombre: "Pantano", icono: "pantano.png" },
  { nombre: "Playa", icono: "playa.png" },
  { nombre: "Pradera", icono: "pradera.png" },
  { nombre: "Sabana", icono: "sabana.png" },
  { nombre: "Selva Tropical", icono: "selva_tropical.png" },
  { nombre: "Tundra", icono: "tundra.png" },
  { nombre: "Valle", icono: "valle.png" },
  { nombre: "Volcán", icono: "volcan.png" }
];

/**
 * Construye la leyenda automáticamente
 */
function generarLeyenda() {
  const contenedor = document.getElementById("leyenda");

  if (!contenedor) {
    console.warn("⚠️ No se encontró el contenedor #leyenda en index.html");
    return;
  }

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Leyenda de Biomas";
  contenedor.appendChild(titulo);

  // Grid de elementos
  const grid = document.createElement("div");
  grid.classList.add("leyenda-grid");

  biomasYLugares.forEach(item => {
    const celda = document.createElement("div");

    const img = document.createElement("img");
    img.src = `/static/img/icons/${item.icono}`;
    img.alt = item.nombre;

    const texto = document.createElement("span");
    texto.textContent = item.nombre;

    celda.appendChild(img);
    celda.appendChild(texto);
    grid.appendChild(celda);
  });

  contenedor.appendChild(grid);
}

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", generarLeyenda);