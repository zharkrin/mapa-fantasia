// ======================================
// Terrenos Especiales
// frontend/js/mapa/terrenoEspecial.js
// ======================================

// Tipos de terrenos especiales disponibles
const tiposTerrenoEspecial = [
  "bosque_especial",
  "desierto_calido_especial",
  "glaciar_especial",
  "lago_especial",
  "montanas_especial",
  "pantano_especial",
  "volcan_especial"
];

// Genera una lista aleatoria de terrenos especiales
function generarTerrenoEspecial() {
  const cantidad = Math.floor(Math.random() * 3) + 3; // entre 3 y 5 terrenos
  const contenedor = document.getElementById("mapa-container");
  const generados = [];

  for (let i = 0; i < cantidad; i++) {
    const tipo = tiposTerrenoEspecial[Math.floor(Math.random() * tiposTerrenoEspecial.length)];
    const nombre = generarNombreTerreno(tipo);
    const x = Math.random() * (contenedor.clientWidth - 64);
    const y = Math.random() * (contenedor.clientHeight - 64);

    const icono = document.createElement("img");
    icono.src = `frontend/static/Img/icons/terreno_especial/${tipo}.png`;
    icono.alt = nombre;
    icono.title = nombre;
    icono.style.position = "absolute";
    icono.style.left = `${x}px`;
    icono.style.top = `${y}px`;
    icono.style.width = "48px";
    icono.style.height = "48px";
    icono.style.transition = "transform 0.3s ease";
    icono.addEventListener("mouseenter", () => (icono.style.transform = "scale(1.2)"));
    icono.addEventListener("mouseleave", () => (icono.style.transform = "scale(1)"));

    contenedor.appendChild(icono);

    generados.push({ tipo, nombre, icono });
  }

  return generados;
}

// Genera nombres simples con un toque fantástico
function generarNombreTerreno(tipo) {
  const nombres = {
    bosque_especial: ["Bosque Antiguo", "Bosque del Crepúsculo", "Bosque de Sombras"],
    desierto_calido_especial: ["Dunas del Sol", "Desierto Carmesí", "Arenas Eternas"],
    glaciar_especial: ["Glaciar Azul", "Hielos Eternos", "Campos Helados"],
    lago_especial: ["Lago del Alba", "Aguas Escondidas", "Lago Sombrío"],
    montanas_especial: ["Montañas del Trueno", "Cumbres Grises", "Picos del Amanecer"],
    pantano_especial: ["Pantano de las Almas", "Tierras Enlodadas", "Humedal Esmeralda"],
    volcan_especial: ["Monte del Destino", "Volcán Carmesí", "Cráter del Sol"]
  };

  const lista = nombres[tipo] || ["Terreno Misterioso"];
  return lista[Math.floor(Math.random() * lista.length)];
}