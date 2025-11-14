// ===============================================================
// Leyenda de Biomas
// frontend/js/mapa/leyendaBiomas.js
// Genera automáticamente la leyenda de biomas usando los iconos
// ubicados en frontend/static/img/icons/biomas/
// ===============================================================

// Lista oficial de biomas con su icono correspondiente
// (las imágenes deben existir en la carpeta definida)
const BIOMAS_ICONOS = {
    bosque_boreal: "bosque_boreal.png",
    bosque_tropical: "bosque_tropical.png",
    bosque: "bosque.png",
    desierto_calido: "desierto_calido.png",
    desierto_frio: "desierto_frio.png",
    estepa: "estepa.png",
    humedal: "humedal.png",
    pradera: "pradera.png",
    sabana: "sabana.png",
    selva_tropical: "selva_tropical.png",
    tundra: "tundra.png",
    tierras_aridas: "tierras_aridas.png",
    chaparral: "chaparral.png",
    selva: "selva.png",
    manglar: "manglar.png",
    jungla: "jungla.png",
    matorral: "matorral.png"
};


// Ruta base hacia los iconos
const RUTA_BIOMAS = "frontend/static/img/icons/biomas/";


// ===============================================================
// Función para generar la leyenda
// ===============================================================
function generarLeyendaBiomas() {
    const contenedor = document.getElementById("leyenda-biomas");
    contenedor.innerHTML = ""; // Limpia por si se regenera

    const titulo = document.createElement("h3");
    titulo.textContent = "Biomas";
    contenedor.appendChild(titulo);

    // Crear cada entrada de la leyenda
    for (const [bioma, archivo] of Object.entries(BIOMAS_ICONOS)) {
        const item = document.createElement("div");
        item.className = "leyenda-item";

        const img = document.createElement("img");
        img.src = RUTA_BIOMAS + archivo;
        img.alt = bioma;
        img.className = "icono-leyenda";

        const label = document.createElement("span");
        label.textContent = formatearNombre(bioma);

        item.appendChild(img);
        item.appendChild(label);
        contenedor.appendChild(item);
    }
}


// ===============================================================
// Función para embellecer los nombres
// bosque_boreal -> "Bosque Boreal"
// ===============================================================
function formatearNombre(nombre) {
    return nombre
        .replace(/_/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}


// ===============================================================
// Autoactivar cuando la página cargue
// ===============================================================
document.addEventListener("DOMContentLoaded", generarLeyendaBiomas);