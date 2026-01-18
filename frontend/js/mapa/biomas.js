// ==================================================
// Generación de Biomas (solo sobre tierra)
// Archivo: frontend/js/mapa/biomas.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";
    const ICON_SIZE = 32;
    const MAX_INTENTOS = 40;

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

    const ICON_PATH = "frontend/static/img/icons/biomas/";

    function calcularCantidadBiomas(tamanoMundo) {
        return 18 * tamanoMundo;
    }

    function limpiarBiomas() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".bioma").forEach(b => b.remove());
    }

    function generarBiomas(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa || !window.terrenoBase) return;

        limpiarBiomas();

        const cantidad = calcularCantidadBiomas(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        for (let i = 0; i < cantidad; i++) {
            const bioma = BIOMAS[Math.floor(Math.random() * BIOMAS.length)];
            let colocado = false;
            let intentos = 0;

            while (!colocado && intentos < MAX_INTENTOS) {
                const x = Math.random() * (ancho - ICON_SIZE);
                const y = Math.random() * (alto - ICON_SIZE);

                // 🔴 CONDICIÓN CLAVE: solo tierra
                if (!window.terrenoBase.esTierra(x, y)) {
                    intentos++;
                    continue;
                }

                // 🔵 Colisiones
                if (window.colisionesMapa.posicionLibre(x, y, ICON_SIZE, ICON_SIZE)) {
                    const icono = document.createElement("img");
                    icono.src = ICON_PATH + bioma.icono;
                    icono.className = "bioma";
                    icono.title = bioma.tipo.replace("_", " ");

                    icono.style.position = "absolute";
                    icono.style.left = `${x}px`;
                    icono.style.top = `${y}px`;
                    icono.style.width = `${ICON_SIZE}px`;
                    icono.style.height = `${ICON_SIZE}px`;

                    mapa.appendChild(icono);

                    window.colisionesMapa.registrarOcupado(
                        x, y, ICON_SIZE, ICON_SIZE
                    );

                    colocado = true;
                }

                intentos++;
            }
        }
    }

    // Exponer función pública
    window.generarBiomas = generarBiomas;

})();