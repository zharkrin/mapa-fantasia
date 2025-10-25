// ===============================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===============================

const terrenoEspecial = [
    { nombre: "Bosque Especial", icono: "frontend/static/img/icons/terreno_especial/bosque_especial.png" },
    { nombre: "Desierto Cálido Especial", icono: "frontend/static/img/icons/terreno_especial/desierto_calido_especial.png" },
    { nombre: "Glaciar Especial", icono: "frontend/static/img/icons/terreno_especial/glaciar_especial.png" },
    { nombre: "Lago Especial", icono: "frontend/static/img/icons/terreno_especial/lago_especial.png" },
    { nombre: "Montañas Especiales", icono: "frontend/static/img/icons/terreno_especial/montanas_especial.png" },
    { nombre: "Pantano Especial", icono: "frontend/static/img/icons/terreno_especial/pantano_especial.png" },
    { nombre: "Volcán Especial", icono: "frontend/static/img/icons/terreno_especial/volcan_especial.png" }
];

// Función para renderizar la leyenda
function renderLeyendaTerrenoEspecial() {
    const contenedor = document.getElementById("leyendaTerrenoEspecial");
    contenedor.innerHTML = ""; // Limpiar contenido

    terrenoEspecial.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-leyenda";

        const img = document.createElement("img");
        img.src = item.icono;
        img.alt = item.nombre;
        img.onerror = () => { img.src = "frontend/static/img/icons/placeholder.png"; }; // placeholder si falla

        const span = document.createElement("span");
        span.textContent = item.nombre;

        div.appendChild(img);
        div.appendChild(span);
        contenedor.appendChild(div);
    });
}

// Inicializar leyenda al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderLeyendaTerrenoEspecial();

    // Toggle panel
    const btn = document.getElementById("btnLeyendaEspecial");
    const panel = document.getElementById("panelLeyendaEspecial");
    btn.addEventListener("click", () => {
        panel.classList.toggle("activo");
    });
});