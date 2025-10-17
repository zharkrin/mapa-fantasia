// --- LEYENDA TERRENOS ESPECIALES ---

document.addEventListener("DOMContentLoaded", () => {
  const botonLeyenda = document.getElementById("abrirLeyenda");
  const contenedorLeyenda = document.getElementById("leyenda");
  const botonCerrar = document.getElementById("cerrarLeyenda");
  const listaLeyenda = document.getElementById("listaLeyenda");

  // --- MAPEADO DE TERRENOS A IMÁGENES ---
  const basePath = "/frontend/img/terrenos/"; // Carpeta donde están tus imágenes PNG

  const terrenosEspeciales = [
    { nombre: "Montañas del Trueno", icono: "montaña.png" },
    { nombre: "Montañas Heladas", icono: "montaña_nieve.png" },
    { nombre: "Desfiladero del Eco", icono: "desfiladero.png" },
    { nombre: "Cañón Rojo", icono: "cañon.png" },
    { nombre: "Cráter del Sol", icono: "crater.png" },
    { nombre: "Río de Plata", icono: "rio.png" },
    { nombre: "Glaciar del Norte", icono: "glaciar.png" },
    { nombre: "Tierras Áridas", icono: "tierras_aridas.png" },
    { nombre: "Chaparral del Oeste", icono: "chaparral.png" },
    { nombre: "Selva Profunda", icono: "selva.png" },
    { nombre: "Manglar Sombrío", icono: "manglar.png" },
    { nombre: "Jungla Esmeralda", icono: "jungla.png" },
    { nombre: "Matorral Seco", icono: "matorral.png" },
    { nombre: "Cavernas Antiguas", icono: "cavernas.png" }
  ];

  // --- FUNCIONES DE LEYENDA ---
  botonLeyenda.addEventListener("click", () => {
    contenedorLeyenda.classList.add("visible");
    listaLeyenda.innerHTML = ""; // Limpia antes de generar

    terrenosEspeciales.forEach(terreno => {
      const item = document.createElement("div");
      item.classList.add("item-leyenda");

      const img = document.createElement("img");
      img.src = `${basePath}${terreno.icono}`;
      img.alt = terreno.nombre;
      img.classList.add("icono-leyenda");

      // Manejo de error si no se carga el icono
      img.onerror = () => {
        img.src = `${basePath}tierras_aridas.png`;
        console.warn(`⚠️ No se encontró el icono: ${terreno.icono}, usando imagen por defecto.`);
      };

      const label = document.createElement("span");
      label.textContent = terreno.nombre;

      item.appendChild(img);
      item.appendChild(label);
      listaLeyenda.appendChild(item);
    });
  });

  botonCerrar.addEventListener("click", () => {
    contenedorLeyenda.classList.remove("visible");
  });
});