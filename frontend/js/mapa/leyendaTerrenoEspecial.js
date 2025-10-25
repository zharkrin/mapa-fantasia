// ==========================================================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const btnToggle = document.getElementById("toggle-leyenda");
  const btnCerrar = document.getElementById("cerrar-leyenda");
  const leyenda = document.getElementById("leyenda");
  const listaLeyenda = document.getElementById("lista-leyenda");

  // Mostrar/ocultar la leyenda
  btnToggle.addEventListener("click", () => {
    leyenda.classList.toggle("oculta");
  });

  btnCerrar.addEventListener("click", () => {
    leyenda.classList.add("oculta");
  });

  // Cargar iconos desde terrenoEspecial.js
  if (typeof obtenerIconosTerrenoEspecial === "function") {
    const iconos = obtenerIconosTerrenoEspecial();
    listaLeyenda.innerHTML = "";

    iconos.forEach(item => {
      const elemento = document.createElement("div");
      elemento.classList.add("item-leyenda");

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.nombre;
      img.onerror = () => {
        img.src = "frontend/static/img/icons/terreno_especial/placeholder.png";
      };

      const texto = document.createElement("span");
      texto.textContent = item.nombre;

      elemento.appendChild(img);
      elemento.appendChild(texto);
      listaLeyenda.appendChild(elemento);
    });
  }
});