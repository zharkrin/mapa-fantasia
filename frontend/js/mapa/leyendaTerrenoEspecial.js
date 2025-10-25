/* =========================================================
   leyendaTerrenoEspecial.js
   Muestra la leyenda visual de los terrenos especiales
   ========================================================= */

function crearLeyendaTerrenoEspecial() {
    const contenedorLeyenda = document.getElementById("leyendaTerrenoEspecial");
    if (!contenedorLeyenda) {
        console.warn("⚠️ No se encontró el contenedor #leyendaTerrenoEspecial");
        return;
    }

    contenedorLeyenda.innerHTML = ""; // limpiar antes de volver a generar

    const terrenos = obtenerTerrenosEspeciales();
    if (!terrenos || terrenos.length === 0) {
        const vacio = document.createElement("p");
        vacio.textContent = "No hay terrenos especiales generados.";
        vacio.classList.add("texto-vacio");
        contenedorLeyenda.appendChild(vacio);
        return;
    }

    terrenos.forEach(t => {
        const item = document.createElement("div");
        item.classList.add("item-leyenda");

        const icono = document.createElement("img");
        icono.src = t.icono;
        icono.alt = t.nombre;
        icono.classList.add("icono-leyenda");

        const nombre = document.createElement("span");
        nombre.textContent = formatearNombreTerrenoEspecial(t.nombre);

        item.appendChild(icono);
        item.appendChild(nombre);
        contenedorLeyenda.appendChild(item);
    });
}

/**
 * Convierte un nombre técnico como "montanas_especial"
 * en un nombre legible: "Montañas Especiales"
 */
function formatearNombreTerrenoEspecial(nombre) {
    return nombre
        .replaceAll("_", " ")
        .replace(/\b\w/g, l => l.toUpperCase())
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quitar tildes
}

/**
 * Inicializa la leyenda automáticamente si existe el contenedor
 */
document.addEventListener("DOMContentLoaded", () => {
    const btnLeyenda = document.getElementById("btnLeyendaEspecial");
    if (btnLeyenda) {
        btnLeyenda.addEventListener("click", () => {
            crearLeyendaTerrenoEspecial();
            const panel = document.getElementById("panelLeyendaEspecial");
            if (panel) panel.classList.toggle("visible");
        });
    }
});