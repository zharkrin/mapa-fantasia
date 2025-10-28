// ======================================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ======================================

function inicializarLeyendaTerrenoEspecial(terrenos) {
  const leyenda = document.getElementById("leyenda-terreno-especial");

  // Crear botón para abrir/cerrar la leyenda
  const boton = document.createElement("button");
  boton.textContent = "Leyenda";
  boton.classList.add("boton-leyenda");
  leyenda.appendChild(boton);

  // Contenedor del contenido de la leyenda
  const contenido = document.createElement("div");
  contenido.classList.add("contenido-leyenda");
  leyenda.appendChild(contenido);

  // Llenar la leyenda con los terrenos generados
  terrenos.forEach((terreno) => {
    const item = document.createElement("div");
    item.classList.add("item-leyenda");

    const icono = document.createElement("img");
    icono.src = terreno.icono.src;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-leyenda");

    const nombre = document.createElement("span");
    nombre.textContent = terreno.nombre;

    item.appendChild(icono);
    item.appendChild(nombre);
    contenido.appendChild(item);
  });

  // Mostrar / ocultar la leyenda al pulsar el botón
  boton.addEventListener("click", () => {
    contenido.style.display = contenido.style.display === "block" ? "none" : "block";
  });
}