// ===============================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===============================

const basePath = "./static/img/icons/"; // ruta relativa a index.html
const botonLeyenda = document.getElementById("abrirLeyenda");
const cerrarLeyenda = document.getElementById("cerrarLeyenda");
const contenedorLeyenda = document.getElementById("leyenda");
const listaLeyenda = document.getElementById("listaLeyenda");

const terrenosEspeciales = [
  { nombre: "Volcán", icono: "volcan.png" },
  { nombre: "Glaciar", icono: "glaciar.png" },
  { nombre: "Crater", icono: "crater.png" },
  { nombre: "Tierras Áridas", icono: "tierras_aridas.png" },
  { nombre: "Chaparral", icono: "chaparral.png" },
  { nombre: "Selva", icono: "selva.png" },
  { nombre: "Manglar", icono: "manglar.png" },
  { nombre: "Jungla", icono: "jungla.png" },
  { nombre: "Matorral", icono: "matorral.png" },
  { nombre: "Cavernas", icono: "cavernas.png" },
  { nombre: "Montañas del trueno", icono: "montanas.png" },
  { nombre: "Montañas heladas", icono: "montanas.png" },
  { nombre: "Desfiladero del eco", icono: "desfiladero.png" },
  { nombre: "Cañón rojo", icono: "canon.png" },
  { nombre: "Crater del sol", icono: "crater.png" }
];

// Evitar recargar la leyenda varias veces
let leyendaGenerada = false;

botonLeyenda.addEventListener("click", () => {
  contenedorLeyenda.classList.add("visible");

  if (leyendaGenerada) return;

  listaLeyenda.innerHTML = "";
  terrenosEspeciales.forEach(terreno => {
    const item = document.createElement("div");
    item.classList.add("item-leyenda");

    const img = document.createElement("img");
    img.src = `${basePath}${terreno.icono}`;
    img.alt = terreno.nombre;
    img.classList.add("icono-leyenda");

    // fallback si el icono no existe
    img.onerror = () => {
      img.src = `${basePath}tierras_aridas.png`;
      console.warn(`No se encontró icono: ${terreno.icono}`);
    };

    const label = document.createElement("span");
    label.textContent = terreno.nombre;

    item.appendChild(img);
    item.appendChild(label);
    listaLeyenda.appendChild(item);
  });

  leyendaGenerada = true;
});

cerrarLeyenda.addEventListener("click", () => {
  contenedorLeyenda.classList.remove("visible");
});