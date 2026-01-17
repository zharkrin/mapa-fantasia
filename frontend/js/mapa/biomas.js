// ==================================================
// Generación de Biomas con colisiones y reglas lógicas
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";
    const ICON_SIZE = 32;
    const MAX_INTENTOS = 40;
    const RADIO_INFLUENCIA = 80;

    const BIOMAS = [
        { tipo: "bosque", icono: "bosque.png" },
        { tipo: "bosque_boreal", icono: "bosque_boreal.png" },
        { tipo: "bosque_tropical", icono: "bosque_tropical.png" },
        { tipo: "desierto_calido", icono: "desierto_calido.png" },
        { tipo: "desierto_frio", icono: "desierto_frio.png" },
        { tipo: "tundra", icono: "tundra.png" },
        { tipo: "sabana", icono: "sabana.png" },
        { tipo: "pradera", icono: "pradera.png" },
        { tipo: "humedal", icono: "humedal.png" },
        { tipo: "pantano", icono: "pantano.png" },
        { tipo: "selva_tropical", icono: "selva_tropical.png" },
        { tipo: "manglar", icono: "manglar.png" },
        { tipo: "glaciar", icono: "glaciar.png" }
    ];

    const ICON_PATH = "frontend/static/img/icons/biomas/";

    function calcularCantidadBiomas(tamanoMundo) {
        return 18 * tamanoMundo;
    }

    function limpiarBiomas() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".bioma").forEach(b => b.remove());
    }

    function distancia(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function biomaCompatibleConVecinos(tipo, x, y, existentes) {
        for (const otro of existentes) {
            if (distancia({ x, y }, otro) < RADIO_INFLUENCIA) {
                if (!window.reglasBiomas.biomasCompatibles(tipo, otro.tipo)) {
                    return false;
                }
            }
        }
        return true;
    }

    function generarBiomas(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        limpiarBiomas();

        const existentes = [];
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

                if (
                    window.colisionesMapa.posicionLibre(x, y, ICON_SIZE, ICON_SIZE) &&
                    biomaCompatibleConVecinos(bioma.tipo, x, y, existentes)
                ) {
                    const icono = document.createElement("img");
                    icono.src = ICON_PATH + bioma.icono;
                    icono.className = "bioma";
                    icono.dataset.tipo = bioma.tipo;
                    icono.style.left = `${x}px`;
                    icono.style.top = `${y}px`;

                    mapa.appendChild(icono);

                    window.colisionesMapa.registrarOcupado(
                        x, y, ICON_SIZE, ICON_SIZE
                    );

                    existentes.push({ tipo: bioma.tipo, x, y });
                    colocado = true;
                }

                intentos++;
            }
        }
    }

    window.generarBiomas = generarBiomas;

})();