// ==========================================================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ==========================================================
//
// Este script genera y controla el panel desplegable de leyenda
// que muestra los iconos y nombres de los terrenos especiales.
//
// Está sincronizado con el archivo:
// frontend/js/mapa/terrenoEspecial.js
// ==========================================================

function crearLeyendaTerrenoEspecial() {
  const leyendaContenedor = document.createElement("div");
  leyendaContenedor.id = "leyendaTerrenoEspecial";
  leyendaContenedor.classList.add("leyenda-contenedor");

  const botonToggle = document.createElement("button");
  botonToggle.textContent = "Leyenda del terreno especial";
  botonToggle.classList.add("btn-leyenda");

  const contenido = document.createElement("div");
  contenido.classList.add("leyenda-contenido");
  contenido.style.display = "none";

  const lista = document.createElement("ul");
  lista.classList.add("leyenda-lista");

  // ======================================================
  // Obtener lista de iconos desde el generador
  // ======================================================
  const iconos = obtenerIconosTerrenoEspecial();

  iconos.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("leyenda-item");

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.nombre;
    img.classList.add("leyenda-icono");

    const nombre = document.createElement("span");
    nombre.textContent = item.nombre;
    nombre.classList.add("leyenda-nombre");

    li.appendChild(img);
    li.appendChild(nombre);
    lista.appendChild(li);
  });

  contenido.appendChild(lista);
  leyendaContenedor.appendChild(botonToggle);
  leyendaContenedor.appendChild(contenido);
  document.body.appendChild(leyendaContenedor);

  // ======================================================
  // Evento de mostrar/ocultar leyenda
  // ======================================================
  botonToggle.addEventListener("click", () => {
    if (contenido.style.display === "none") {
      contenido.style.display = "block";
      botonToggle.textContent = "Cerrar leyenda";
    } else {
      contenido.style.display = "none";
      botonToggle.textContent = "Leyenda del terreno especial";
    }
  });
}

// ==========================================================
// Inicialización automática al cargar el documento
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  crearLeyendaTerrenoEspecial();
});