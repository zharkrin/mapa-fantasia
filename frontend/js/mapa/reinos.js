// ==================================================
// Reinos, Territorios y Fronteras
// Archivo: frontend/js/mapa/reinos.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    const COLORES_REINOS = [
        "#c0392b",
        "#2980b9",
        "#27ae60",
        "#8e44ad",
        "#d35400",
        "#16a085",
        "#7f8c8d"
    ];

    let reinos = [];

    function obtenerNumeroReinos() {
        const escala = window.ESCALA_MUNDO || 1;

        if (escala <= 1) return 3;
        if (escala === 2) return 5;
        if (escala === 3) return 6;
        if (escala === 4) return 8;
        return 10;
    }

    function crearCapital(mapa) {
        return {
            x: Math.random() * mapa.clientWidth,
            y: Math.random() * mapa.clientHeight
        };
    }

    function generarReinos() {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        reinos = [];

        const total = obtenerNumeroReinos();

        for (let i = 0; i < total; i++) {
            reinos.push({
                id: i,
                nombre: `Reino ${i + 1}`,
                color: COLORES_REINOS[i % COLORES_REINOS.length],
                capital: crearCapital(mapa)
            });
        }
    }

    function distanciaPonderada(x1, y1, x2, y2) {
        let d = Math.hypot(x1 - x2, y1 - y2);

        // Penalización por montañas
        if (window.terrenoBase?.esMontana(x1, y1)) {
            d *= 1.6;
        }

        // Penalización por agua
        if (window.terrenoBase?.esAgua(x1, y1)) {
            d *= 2.0;
        }

        return d;
    }

    function obtenerReinoEn(x, y) {
        let mejor = null;
        let distanciaMin = Infinity;

        for (const reino of reinos) {
            const d = distanciaPonderada(x, y, reino.capital.x, reino.capital.y);
            if (d < distanciaMin) {
                distanciaMin = d;
                mejor = reino;
            }
        }

        return mejor;
    }

    function dibujarFronteras() {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        // Limpieza previa
        document.querySelectorAll(".frontera-reino").forEach(e => e.remove());

        const paso = 40;

        for (let x = 0; x < mapa.clientWidth; x += paso) {
            for (let y = 0; y < mapa.clientHeight; y += paso) {
                const reino = obtenerReinoEn(x, y);
                if (!reino) continue;

                const punto = document.createElement("div");
                punto.className = "frontera-reino";
                punto.style.left = `${x}px`;
                punto.style.top = `${y}px`;
                punto.style.backgroundColor = reino.color;

                mapa.appendChild(punto);
            }
        }
    }

    function generarMapaPolitico() {
        generarReinos();
        dibujarFronteras();
    }

    // API pública
    window.reinosMapa = {
        generar: generarMapaPolitico,
        obtenerReinoEn
    };

})();