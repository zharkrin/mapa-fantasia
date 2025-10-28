/**
 * @file leyendaTerrenoEspecial.js
 * @description Crea y actualiza la leyenda visual del mapa con los terrenos especiales generados.
 */

/**
 * Inicializa la leyenda de terrenos especiales con los iconos y nombres generados.
 * @param {Array<Object>} terrenos - Lista de objetos con propiedades `tipo` y `nombre`.
 */
function inicializarLeyendaTerrenoEspecial(terrenos) {
  const leyendaContainer = document.getElementById("leyenda-terreno-especial");
  if (!leyendaContainer) {
    console.warn("⚠️ No se encontró el contenedor de la leyenda.");
    return;
  }

  leyendaContainer.innerHTML = ""; // Limpia contenido previo

  terrenos.forEach(({ tipo, nombre }) => {
    const item = document.createElement("div");
    item.className = "leyenda-item";
    item.innerHTML = `
      <img src="frontend/static/img/icons/terreno_especial/${tipo}.png" alt="${tipo}">
      <span>${nombre}</span>
    `;
    leyendaContainer.appendChild(item);
  });
}