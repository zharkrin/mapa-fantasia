/**
 * leyendaTerrenoEspecial.js
 * Genera automáticamente la leyenda visual leyendo los terrenos desde terrenoEspecial.js
 */

document.addEventListener("DOMContentLoaded", () => {
  const contenedorLeyenda = document.getElementById("leyenda-terreno-especial");

  if (!contenedorLeyenda) {
    console.error("❌ No se encontró el contenedor de la leyenda (#leyenda-terreno-especial)");
    return;
  }

  // 🔹 Verificamos si el script terrenoEspecial.js está cargado
  if (typeof window.terrenosEspeciales === "undefined") {
    console.error("❌ No se encontró la variable global 'terrenosEspeciales' de terrenoEspecial.js");
    return;
  }

  // 🔹 Título de la leyenda
  const titulo = document.createElement("h2");
  titulo.textContent = "Leyenda de Terrenos Especiales";
  contenedorLeyenda.appendChild(titulo);

  // 🔹 Generar los ítems automáticamente
  window.terrenosEspeciales.forEach(terreno => {
    const item = document.createElement("div");
    item.classList.add("leyenda-item");

    const img = document.createElement("img");
    img.src = `frontend/static/Img/icons/terreno_especial/${terreno.icono}`;
    img.alt = terreno.nombre;
    img.onerror = () => {
      console.warn(`⚠️ No se pudo cargar la imagen ${terreno.icono}, usando placeholder.`);
      img.src = "frontend/static/Img/icons/placeholder.png";
    };

    const texto = document.createElement("span");
    texto.textContent = terreno.nombre;

    item.appendChild(img);
    item.appendChild(texto);
    contenedorLeyenda.appendChild(item);
  });
});