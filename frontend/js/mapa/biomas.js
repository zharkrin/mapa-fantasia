// ==================================================
// Generación de Biomas
// Archivo: frontend/js/mapa/biomas.js
// Coloca iconos de biomas según el tamaño del mundo
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";
    const ICON_SIZE = 32;

    // Biomas disponibles
    const BIOMAS = [
        { tipo: "bosque", icono: "bosque.png" },
        { tipo: "bosque_boreal", icono: "bosque_boreal.png" },
        { tipo: "bosque_tropical", icono: "bosque_tropical.png" },
        { tipo: "desierto_calido", icono: "desierto_calido.png" },
        { tipo: "desierto_frio", icono: "desierto_frio.png" },
        { tipo: "estepa", icono: "estepa.png" },
        { tipo: "pradera", icono: "pradera.png" },
        { tipo: "humedal", icono: "humedal.png" },
        { tipo: "pantano", icono: "pantano.png" }
    ];

    const ICON_PATH = "frontend/static/img/icons/";

    /**
     * Cantidad de biomas según tamaño del mundo
     * 1x Tierra = base
     */
    function calcularCantidadBiomas(tamanoMundo) {
        const BASE = 20; // para 1x Tierra
        return BASE * tamanoMundo;
    }

    /**
     * Limpia biomas existentes
     */
    function limpiarBiomas() {
        const mapa = document.getElementById(MAPA_ID);
        const existentes = mapa.querySelectorAll(".bioma");
        existentes.forEach(b => b.remove());
    }

    /**
     * Genera biomas en el mapa
     */
    function generarBiomas(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        limpiarBiomas();

        const cantidad = calcularCantidadBiomas(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        for (let i = 0; i < cantidad; i++) {
            const bioma = BIOMAS[
                Math.floor(Math.random() * BIOMAS.length)
            ];

            const icono = document.createElement("img");
            icono.src = ICON_PATH + bioma.icono;
            icono.className = "bioma";

            const x = Math.random() * (ancho - ICON_SIZE);
            const y = Math.random() * (alto - ICON_SIZE);

            icono.style.left = `${x}px`;
            icono.style.top = `${y}px`;

            mapa.appendChild(icono);
        }
    }

    // --------------------------------------------------
    // FUNCIÓN GLOBAL
    // --------------------------------------------------
    window.generarBiomas = generarBiomas;

})();