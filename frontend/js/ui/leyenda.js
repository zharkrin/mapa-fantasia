// ===========================================
// Leyenda del mapa
// frontend/js/ui/leyenda.js
// ===========================================

/**
 * Leyenda de biomas y terrenos especiales
 * Cada clave corresponde al nombre del archivo en /static/img/icons/
 * Todas las imágenes deben estar en minúsculas
 */
const leyendaIconos = {
    "acantilado": "Acantilado",
    "bosque_boreal": "Bosque boreal",
    "bosque_tropical": "Bosque tropical",
    "bosque": "Bosque",
    "cañon": "Cañón",
    "colina": "Colina",
    "costa": "Costa",
    "desierto_calido": "Desierto cálido",
    "desierto_frio": "Desierto frío",
    "estepa": "Estepa",
    "humedal": "Humedal",
    "lago": "Lago",
    "mar": "Mar",
    "mesera": "Mesera",
    "montañas": "Montañas",
    "oceano": "Océano",
    "pantano": "Pantano",
    "playa": "Playa",
    "pradera": "Pradera",
    "sabana": "Sabana",
    "selva_tropical": "Selva tropical",
    "tundra": "Tundra",
    "valle": "Valle",
    "volcan": "Volcán"
};

/**
 * Genera dinámicamente el HTML de la leyenda
 */
function renderLeyenda() {
    const contenedor = document.createElement("div");
    contenedor.id = "map-legend";
    contenedor.style.position = "absolute";
    contenedor.style.bottom = "10px";
    contenedor.style.right = "10px";
    contenedor.style.padding = "10px";
    contenedor.style.backgroundColor = "rgba(0,0,0,0.6)";
    contenedor.style.color = "#fff";
    contenedor.style.borderRadius = "6px";
    contenedor.style.fontFamily = "sans-serif";
    contenedor.style.fontSize = "13px";
    contenedor.style.maxHeight = "250px";
    contenedor.style.overflowY = "auto";

    const titulo = document.createElement("h4");
    titulo.innerText = "Leyenda";
    titulo.style.margin = "0 0 10px 0";
    titulo.style.fontSize = "14px";
    titulo.style.textAlign = "center";
    contenedor.appendChild(titulo);

    for (const [clave, nombre] of Object.entries(leyendaIconos)) {
        const fila = document.createElement("div");
        fila.style.display = "flex";
        fila.style.alignItems = "center";
        fila.style.marginBottom = "4px";

        const img = document.createElement("img");
        img.src = `/static/img/icons/${clave}.png`;
        img.alt = nombre;
        img.style.width = "20px";
        img.style.height = "20px";
        img.style.marginRight = "6px";

        const label = document.createElement("span");
        label.innerText = nombre;

        fila.appendChild(img);
        fila.appendChild(label);
        contenedor.appendChild(fila);
    }

    document.body.appendChild(contenedor);
}

// Ejecutar la leyenda al cargar
document.addEventListener("DOMContentLoaded", renderLeyenda);