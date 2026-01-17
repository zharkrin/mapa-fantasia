// ==================================================
// Generación de Terrenos Especiales
// Archivo: frontend/js/mapa/terrenoEspecial.js
// Coloca iconos especiales en el mapa según el tamaño del mundo
// ==================================================

(function () {
    "use strict";

    // Contenedor del mapa
    const MAPA_ID = "mapa-container";

    // Tamaño visual aproximado de los iconos (px)
    const ICON_SIZE = 32;

    // Terrenos especiales disponibles
    const TERRENOS_ESPECIALES = [
        { tipo: "volcan", icono: "volcan.png" },
        { tipo: "glaciar", icono: "glaciar.png" },
        { tipo: "bosque", icono: "bosque.png" },
        { tipo: "pantano", icono: "pantano.png" },
        { tipo: "lago", icono: "lago.png" },
        { tipo: "crater", icono: "crater.png" }
    ];

    const ICON_PATH = "frontend/static/img/icons/terreno/";

    /**
     * Calcula cuántos terrenos especiales generar
     * 1 = Tierra, 2 = 2x Tierra, etc.
     */
    function calcularCantidad(tamanoMundo) {
        const BASE = 6; // para 1x Tierra
        return BASE * tamanoMundo;
    }

    /**
     * Limpia los terrenos especiales existentes
     */
    function limpiarTerrenosEspeciales() {
        const mapa = document.getElementById(MAPA_ID);
        const existentes = mapa.querySelectorAll(".terreno-especial");
        existentes.forEach(e => e.remove());
    }

    /**
     * Genera terrenos especiales en el mapa
     */
    function generarTerrenosEspeciales(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        limpiarTerrenosEspeciales();

        const cantidad = calcularCantidad(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        for (let i = 0; i < cantidad; i++) {
            const terreno = TERRENOS_ESPECIALES[
                Math.floor(Math.random() * TERRENOS_ESPECIALES.length)
            ];

            const icono = document.createElement("img");
            icono.src = ICON_PATH + terreno.icono;
            icono.className = "terreno-especial";

            // Posición aleatoria dentro del mapa
            const x = Math.random() * (ancho - ICON_SIZE);
            const y = Math.random() * (alto - ICON_SIZE);

            icono.style.left = `${x}px`;
            icono.style.top = `${y}px`;

            mapa.appendChild(icono);
        }
    }

    // --------------------------------------------------
    // EXPONER FUNCIÓN GLOBAL (para index.html)
    // --------------------------------------------------
    window.generarTerrenosEspeciales = generarTerrenosEspeciales;

})();
