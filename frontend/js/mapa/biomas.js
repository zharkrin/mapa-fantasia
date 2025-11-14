/* =========================================================
   GENERADOR DE BIOMAS PARA EL MAPA FANTÁSTICO
   ========================================================= */

const RUTA_BIOMAS = "frontend/static/Img/icons/biomas/";

const LISTA_BIOMAS = [
    "bosque_boreal",
    "bosque_tropical",
    "bosque",
    "desierto_calido",
    "desierto_frio",
    "estepa",
    "humedal",
    "pradera",
    "sabana",
    "selva_tropical",
    "tundra",
    "tierras_aridas",
    "chaparral",
    "selva",
    "manglar",
    "jungla",
    "matorral"
];

// Número base de iconos
const ICONOS_BIOMA_BASE = 40;

/* =========================================================
   FUNCIÓN PRINCIPAL: genera biomas según tamaño del mapa
   ========================================================= */

function generarBiomas() {

    const mapa = document.getElementById("mapa-container");
    const tamano = parseInt(document.getElementById("tamano-mapa").value);

    // Borrar biomas previos
    mapa.querySelectorAll(".bioma-icon").forEach(e => e.remove());

    // Cantidad escalada según tamaño del mundo
    const cantidadBiomas = ICONOS_BIOMA_BASE * tamano;

    for (let i = 0; i < cantidadBiomas; i++) {

        const bioma = LISTA_BIOMAS[Math.floor(Math.random() * LISTA_BIOMAS.length)];

        const x = Math.random() * (mapa.offsetWidth - 32);
        const y = Math.random() * (mapa.offsetHeight - 32);

        const icono = document.createElement("img");
        icono.src = `${RUTA_BIOMAS}${bioma}.png`;
        icono.classList.add("bioma-icon");
        icono.style.position = "absolute";
        icono.style.width = "32px";
        icono.style.left = `${x}px`;
        icono.style.top = `${y}px`;

        mapa.appendChild(icono);
    }

    // Actualizar leyenda automáticamente
    generarLeyendaBiomas();
}

/* =========================================================
   LEYENDA AUTOMÁTICA DE BIOMAS
   ========================================================= */

function generarLeyendaBiomas() {

    const cont = document.getElementById("leyenda-biomas");
    if (!cont) return;

    cont.innerHTML = "<h3>Biomas</h3>";

    LISTA_BIOMAS.forEach(b => {
        const fila = document.createElement("div");
        fila.classList.add("leyenda-item");

        fila.innerHTML = `
            <img src="${RUTA_BIOMAS}${b}.png" class="leyenda-icon">
            <span>${b.replace(/_/g, " ")}</span>
        `;

        cont.appendChild(fila);
    });
}