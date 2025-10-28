/**
 * leyendaTerrenoEspecial.js
 * Genera automáticamente la leyenda visual de los terrenos especiales
 * usando las imágenes de la carpeta frontend/static/Img/icons/terreno_especial/
 */

document.addEventListener("DOMContentLoaded", () => {
  const contenedorLeyenda = document.getElementById("leyenda-terreno-especial");

  if (!contenedorLeyenda) {
    console.error("No se encontró el contenedor de la leyenda (#leyenda-terreno-especial)");
    return;
  }

  // 🔹 Título de la leyenda
  const titulo = document.createElement("h2");
  titulo.textContent = "Leyenda de Terrenos Especiales";
  contenedorLeyenda.appendChild(titulo);

  // 🔹 Lista de terrenos especiales
  const terrenosEspeciales = [
    { nombre: "Bosque Especial", icono: "bosque_especial.png" },
    { nombre: "Desierto Cálido Especial", icono: "desierto_calido_especial.png" },
    { nombre: "Glaciar Especial", icono: "glaciar_especial.png" },
    { nombre: "Lago Especial", icono: "lago_especial.png" },
    { nombre: "Montañas Especiales", icono: "montanas_especial.png" },
    { nombre: "Pantano Especial", icono: "pantano_especial.png" },
    { nombre: "Volcán Especial", icono: "volcan_especial.png" }
  ];

  // 🔹 Crear cada entrada de leyenda
  terrenosEspeciales.forEach(t => {
    const item = document.createElement("div");
    item.classList.add("leyenda-item");

    const img = document.createElement("img");
    img.src = `frontend/static/Img/icons/terreno_especial/${t.icono}`;
    img.alt = t.nombre;
    img.onerror = () => {
      console.warn(`⚠️ No se pudo cargar la imagen de ${t.icono}, usando placeholder.`);
      img.src = "frontend/static/Img/icons/placeholder.png";
    };

    const texto = document.createElement("span");
    texto.textContent = t.nombre;

    item.appendChild(img);
    item.appendChild(texto);
    contenedorLeyenda.appendChild(item);
  });
});