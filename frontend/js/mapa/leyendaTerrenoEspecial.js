// ==================================================
// Leyenda de Terrenos Especiales
// Archivo: frontend/js/mapa/leyendaTerrenoEspecial.js
// Se encarga ÚNICAMENTE de construir la leyenda visual
// de lugares singulares (terreno especial).
// ==================================================

(function () {
    "use strict";

    // Lista base de terrenos especiales disponibles
    // (los nombres son genéricos, los mapas darán nombres propios después)
    const TERRENOS_ESPECIALES = [
        { id: "volcan_especial", nombre: "Volcán especial", icono: "volcan.png" },
        { id: "glaciar_especial", nombre: "Glaciar especial", icono: "glaciar.png" },
        { id: "bosque_especial", nombre: "Bosque especial", icono: "bosque.png" },
        { id: "pantano_especial", nombre: "Pantano especial", icono: "pantano.png" },
        { id: "lago_especial", nombre: "Lago especial", icono: "lago.png" },
        { id: "crater_especial", nombre: "Cráter especial", icono: "crater.png" }
    ];

    // Ruta base de iconos de terreno especial
    const ICON_PATH = "frontend/static/img/icons/terreno/";

    /**
     * Crea la leyenda de terrenos especiales
     */
    function crearLeyendaTerrenoEspecial() {
        const contenedor = document.getElementById("leyenda-terreno-especial");

        if (!contenedor) {
            console.warn("No se encontró el contenedor de la leyenda de terreno especial");
            return;
        }

        // Limpiar contenido previo
        contenedor.innerHTML = "";

        // Crear título
        const titulo = document.createElement("h3");
        titulo.textContent = "Terrenos especiales";
        contenedor.appendChild(titulo);

        // Crear lista
        const lista = document.createElement("ul");

        TERRENOS_ESPECIALES.forEach(terreno => {
            const item = document.createElement("li");

            const img = document.createElement("img");
            img.src = ICON_PATH + terreno.icono;
            img.alt = terreno.nombre;

            const texto = document.createElement("span");
            texto.textContent = terreno.nombre;

            item.appendChild(img);
            item.appendChild(texto);
            lista.appendChild(item);
        });

        contenedor.appendChild(lista);
    }

    // Crear leyenda al cargar el documento
    document.addEventListener("DOMContentLoaded", crearLeyendaTerrenoEspecial);

})();