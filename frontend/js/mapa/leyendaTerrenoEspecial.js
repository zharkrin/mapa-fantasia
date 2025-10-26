// ======================================================
// leyendaTerrenoEspecial.js
// ------------------------------------------------------
// Muestra la leyenda de los elementos del mapa:
// terrenos, biomas y terrenos especiales
// ======================================================

const botonLeyenda = document.getElementById("botonLeyenda");
const contenedorLeyenda = document.getElementById("contenedorLeyenda");

botonLeyenda.addEventListener("click", () => {
  contenedorLeyenda.classList.toggle("visible");
});

// ======================================================
// ACTUALIZAR LEYENDA COMPLETA
// ======================================================
function actualizarLeyenda(terrenos, biomas, terrenosEspeciales) {
  contenedorLeyenda.innerHTML = `
    <h3>Leyenda del terreno</h3>
    <ul class="leyenda-lista">
      ${generarListaLeyenda("Terrenos", terrenos, "terreno")}
      ${generarListaLeyenda("Biomas", biomas, "biomas")}
      ${generarListaLeyenda("Terrenos Especiales", terrenosEspeciales, "terreno_especial")}
    </ul>
  `;
}

// ======================================================
// Genera cada sección de la leyenda
// ======================================================
function generarListaLeyenda(titulo, elementos, carpeta) {
  if (!elementos || elementos.length === 0) return "";

  const tiposUnicos = [...new Set(elementos.map(e => e.tipo))];

  const lista = tiposUnicos
    .map(tipo => {
      const ruta = `static/img/icons/${carpeta}/${tipo}.png`;
      return `
        <li>
          <img src="${ruta}" alt="${tipo}" onerror="this.src='static/img/icons/placeholder.png'">
          <span>${tipo.replace(/_/g, " ")}</span>
        </li>
      `;
    })
    .join("");

  return `
    <li class="leyenda-seccion">
      <h4>${titulo}</h4>
      <ul>${lista}</ul>
    </li>
  `;
}