// ===========================================
// Leyenda del mapa con panel plegable
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
 * Genera dinámicamente el panel de la leyenda
 */
function renderLeyendaPanel() {
    // Botón flotante
    const boton = document.createElement("button");
    boton.id = "toggle-legend";
    boton.innerText = "📜 Leyenda";
    boton.style.position = "absolute";
    boton.style.bottom = "10px";
    boton.style.right = "10px";
    boton.style.zIndex = "1000";
    boton.style.padding = "6px 10px";
    boton.style.backgroundColor = "#333";
    boton.style.color = "#fff";
    boton.style.border = "none";
    boton.style.borderRadius = "4px";
    boton.style.cursor = "pointer";
    boton.style.fontSize = "13px";

    // Panel oculto
    const panel = document.createElement("div");
    panel.id = "map-legend";
    panel.style.position = "absolute";
    panel.style.bottom = "50px";
    panel.style.right = "10px";
    panel.style.width = "200px";
    panel.style.maxHeight = "300px";
    panel.style.overflowY = "auto";
    panel.style.padding = "10px";
    panel.style.backgroundColor = "rgba(0,0,0,0.8)";
    panel.style.color = "#fff";
    panel.style.borderRadius = "6px";
    panel.style.fontFamily = "sans-serif";
    panel.style.fontSize = "13px";
    panel.style.display = "none"; // Oculto por defecto
    panel.style.zIndex = "999";

    const titulo = document.createElement("h4");
    titulo.innerText = "Leyenda del mapa";
    titulo.style.margin = "0 0 10px 0";
    titulo.style.fontSize = "14px";
    titulo.style.textAlign = "center";
    panel.appendChild(titulo);

    // Entradas de la leyenda
    for (const [clave, nombre] of Object.entries(leyendaIconos)) {
        const fila = document.createElement("div");
        fila.style.display = "flex";
        fila.style.alignItems = "center";
        fila.style.marginBottom = "5px";

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
        panel.appendChild(fila);
    }

    // Añadir a la página
    document.body.appendChild(boton);
    document.body.appendChild(panel);

    // Alternar mostrar/ocultar
    boton.addEventListener("click", () => {
        panel.style.display = panel.style.display === "none" ? "block" : "none";
    });
}

// Ejecutar la leyenda al cargar
document.addEventListener("DOMContentLoaded", renderLeyendaPanel);