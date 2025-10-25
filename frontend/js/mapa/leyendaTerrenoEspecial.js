// ============================
// leyendaTerrenoEspecial.js
// ============================

const RUTA_ICONOS_ESPECIALES = "static/img/icons/terreno_especial/";

const TERRENOS_ESPECIALES = [
    { nombre: "Bosque Especial", archivo: "bosque_especial.png" },
    { nombre: "Desierto Cálido Especial", archivo: "desierto_calido_especial.png" },
    { nombre: "Glaciar Especial", archivo: "glaciar_especial.png" },
    { nombre: "Lago Especial", archivo: "lago_especial.png" },
    { nombre: "Montañas Especial", archivo: "montanas_especial.png" },
    { nombre: "Pantano Especial", archivo: "pantano_especial.png" },
    { nombre: "Volcán Especial", archivo: "volcan_especial.png" }
];

export function inicializarLeyendaTerrenoEspecial() {
    const boton = document.getElementById("btnLeyendaEspecial");
    const panel = document.getElementById("panelLeyendaEspecial");

    if (!boton || !panel) {
        console.warn("No se encontraron los elementos de la leyenda especial en el DOM.");
        return;
    }

    // Crea dinámicamente los ítems de la leyenda
    panel.innerHTML = "";
    TERRENOS_ESPECIALES.forEach(t => {
        const item = document.createElement("div");
        item.classList.add("item-leyenda");

        const img = document.createElement("img");
        img.src = RUTA_ICONOS_ESPECIALES + t.archivo;
        img.alt = t.nombre;
        img.onerror = () => { img.src = RUTA_ICONOS_ESPECIALES + "placeholder.png"; };

        const texto = document.createElement("span");
        texto.textContent = t.nombre;

        item.appendChild(img);
        item.appendChild(texto);
        panel.appendChild(item);
    });

    // Evento de mostrar / ocultar
    boton.addEventListener("click", () => {
        panel.classList.toggle("activo");
    });
}