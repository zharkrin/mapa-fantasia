/* =========================================================
   terrenoEspecial.js
   Genera y gestiona los terrenos especiales del mapa
   ========================================================= */

const TERRENOS_ESPECIALES = [
    "bosque_especial",
    "desierto_calido_especial",
    "glaciar_especial",
    "lago_especial",
    "montanas_especial",
    "pantano_especial",
    "volcan_especial"
];

let terrenosEspecialesGenerados = [];

/**
 * Devuelve una ruta de imagen válida según el nombre del terreno especial
 * Ejemplo: frontend/static/img/icons/terreno_especial/bosque_especial.png
 */
function obtenerIconoTerrenoEspecial(nombre) {
    return `static/img/icons/terreno_especial/${nombre}.png`;
}

/**
 * Genera una cantidad limitada de terrenos especiales (por defecto entre 3 y 4)
 * y los almacena en el arreglo global `terrenosEspecialesGenerados`.
 */
function generarTerrenoEspecial(cantidad = 3 + Math.floor(Math.random() * 2)) {
    terrenosEspecialesGenerados = [];

    // Evitar generar más de lo necesario
    const seleccion = [...TERRENOS_ESPECIALES]
        .sort(() => Math.random() - 0.5)
        .slice(0, cantidad);

    seleccion.forEach(nombre => {
        const x = Math.floor(Math.random() * 1024);
        const y = Math.floor(Math.random() * 768);
        const icono = obtenerIconoTerrenoEspecial(nombre);

        terrenosEspecialesGenerados.push({ nombre, x, y, icono });
    });

    console.log(`🌋 Terrenos especiales generados:`, terrenosEspecialesGenerados);

    // Si existe el canvas principal, dibujarlos
    if (typeof dibujarTerrenosEspeciales === "function") {
        dibujarTerrenosEspeciales();
    }
}

/**
 * Dibuja los terrenos especiales generados sobre el canvas principal del mapa
 */
function dibujarTerrenosEspeciales() {
    const canvas = document.getElementById("mapaCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    terrenosEspecialesGenerados.forEach(t => {
        const img = new Image();
        img.src = t.icono;
        img.onload = () => {
            ctx.drawImage(img, t.x - 16, t.y - 16, 32, 32);
        };
    });
}

/**
 * Devuelve la lista actual de terrenos especiales generados
 */
function obtenerTerrenosEspeciales() {
    return terrenosEspecialesGenerados;
}