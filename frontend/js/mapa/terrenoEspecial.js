// ===============================
// Terrenos Especiales sobre el Mapa
// frontend/js/mapa/terrenoEspecial.js
// ===============================

// Lista de terrenos especiales con propiedades
const terrenosEspeciales = [
    { nombre: "Bosque Especial", icono: "frontend/static/img/icons/terreno_especial/bosque_especial.png", x: null, y: null },
    { nombre: "Desierto Cálido Especial", icono: "frontend/static/img/icons/terreno_especial/desierto_calido_especial.png", x: null, y: null },
    { nombre: "Glaciar Especial", icono: "frontend/static/img/icons/terreno_especial/glaciar_especial.png", x: null, y: null },
    { nombre: "Lago Especial", icono: "frontend/static/img/icons/terreno_especial/lago_especial.png", x: null, y: null },
    { nombre: "Montañas Especiales", icono: "frontend/static/img/icons/terreno_especial/montanas_especial.png", x: null, y: null },
    { nombre: "Pantano Especial", icono: "frontend/static/img/icons/terreno_especial/pantano_especial.png", x: null, y: null },
    { nombre: "Volcán Especial", icono: "frontend/static/img/icons/terreno_especial/volcan_especial.png", x: null, y: null }
];

// Función para generar posiciones aleatorias dentro del mapa
function asignarPosicionesEspeciales(mapaWidth, mapaHeight) {
    terrenosEspeciales.forEach(terreno => {
        // Genera coordenadas aleatorias dentro del mapa
        terreno.x = Math.floor(Math.random() * (mapaWidth - 50)) + 25;
        terreno.y = Math.floor(Math.random() * (mapaHeight - 50)) + 25;
    });
}

// Función para dibujar los terrenos especiales en el canvas del mapa
function dibujarTerrenosEspeciales(ctx) {
    terrenosEspeciales.forEach(terreno => {
        const img = new Image();
        img.src = terreno.icono;
        img.alt = terreno.nombre;
        img.onload = () => {
            ctx.drawImage(img, terreno.x - 16, terreno.y - 16, 32, 32); // Ajuste tamaño icono 32x32
        };
        img.onerror = () => {
            console.warn(`No se pudo cargar el icono de ${terreno.nombre}`);
        };
    });
}

// Inicializar terrenos especiales cuando el mapa esté listo
function inicializarTerrenosEspeciales(canvas) {
    const ctx = canvas.getContext("2d");
    asignarPosicionesEspeciales(canvas.width, canvas.height);
    dibujarTerrenosEspeciales(ctx);
}

// Exportar función para que script principal pueda invocarla
export { inicializarTerrenosEspeciales, terrenosEspeciales };