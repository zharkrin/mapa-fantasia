// ======================================
// Leyenda del mapa
// frontend/js/ui/leyenda.js
// ======================================

export function inicializarLeyenda() {
  const leyendaContainer = document.getElementById("leyenda");

  if (!leyendaContainer) {
    console.error("⚠️ No se encontró el contenedor #leyenda en el HTML");
    return;
  }

  // Definición de iconos (biomas + lugares singulares)
  const iconosTerreno = {
    acantilado: "Acantilado",
    bosque_boreal: "Bosque Boreal",
    bosque_tropical: "Bosque Tropical",
    bosque: "Bosque",
    cañon: "Cañón",
    colina: "Colina",
    costa: "Costa",
    desierto_calido: "Desierto Cálido",
    desierto_frio: "Desierto Frío",
    estepa: "Estepa",
    humedal: "Humedal",
    lago: "Lago",
    mar: "Mar",
    mesera: "Meseta",
    montañas: "Montañas",
    oceano: "Océano",
    pantano: "Pantano",
    playa: "Playa",
    pradera: "Pradera",
    sabana: "Sabana",
    selva_tropical: "Selva Tropical",
    tundra: "Tundra",
    valle: "Valle",
    volcan: "Volcán",
    glaciar: "Glaciar",
    bosque_viejo: "Bosque Viejo",
    monte_destino: "Monte del Destino",
    valle_viento_helado: "Valle del Viento Helado"
  };

  // Creamos la cuadrícula de la leyenda
  const grid = document.createElement("div");
  grid.classList.add("leyenda-grid");

  Object.entries(iconosTerreno).forEach(([clave, nombre]) => {
    const item = document.createElement("div");
    item.classList.add("leyenda-item");

    const img = document.createElement("img");
    img.src = `/static/img/icons/${clave}.png`;
    img.alt = nombre;
    img.title = nombre;

    const label = document.createElement("span");
    label.textContent = nombre;

    item.appendChild(img);
    item.appendChild(label);
    grid.appendChild(item);
  });

  leyendaContainer.innerHTML = ""; // limpiar si ya había algo
  leyendaContainer.appendChild(grid);
}