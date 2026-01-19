// ==================================================
// Generación de Ríos (tierra → mar)
// Archivo: frontend/js/mapa/rios.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";
    const MAX_RIOS_POR_ESCALA = 6;
    const PASO = 12;
    const MAX_LONGITUD = 120;

    function calcularCantidadRios(tamanoMundo) {
        return Math.max(2, Math.floor(tamanoMundo * MAX_RIOS_POR_ESCALA));
    }

    function limpiarRios() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".rio-svg").forEach(r => r.remove());
    }

    function generarRios(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa || !window.terrenoBase) return;

        limpiarRios();

        const cantidad = calcularCantidadRios(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        for (let i = 0; i < cantidad; i++) {
            const inicio = buscarInicioEnTierra(ancho, alto);
            if (!inicio) continue;

            const puntos = trazarRio(inicio.x, inicio.y, ancho, alto);
            if (puntos.length > 3) {
                dibujarRio(puntos);
            }
        }
    }

    function buscarInicioEnTierra(ancho, alto) {
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * ancho;
            const y = Math.random() * alto;

            if (window.terrenoBase.esTierra(x, y)) {
                return { x, y };
            }
        }
        return null;
    }

    function trazarRio(x, y, ancho, alto) {
        const puntos = [];
        let dirX = (Math.random() - 0.5) * 2;
        let dirY = Math.random();

        for (let i = 0; i < MAX_LONGITUD; i++) {
            if (!window.terrenoBase.esTierra(x, y)) break;

            puntos.push({ x, y });

            // ligera variación natural
            dirX += (Math.random() - 0.5) * 0.3;
            dirY += Math.random() * 0.4;

            const mag = Math.hypot(dirX, dirY) || 1;
            dirX /= mag;
            dirY /= mag;

            x += dirX * PASO;
            y += dirY * PASO;

            if (x < 0 || y < 0 || x > ancho || y > alto) break;
        }

        return puntos;
    }

    function dibujarRio(puntos) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("rio-svg");
        svg.style.position = "absolute";
        svg.style.left = 0;
        svg.style.top = 0;
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        let d = `M ${puntos[0].x} ${puntos[0].y}`;
        for (let i = 1; i < puntos.length; i++) {
            d += ` L ${puntos[i].x} ${puntos[i].y}`;
        }

        path.setAttribute("d", d);
        path.setAttribute("stroke", "#2b6cff");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("opacity", "0.9");

        svg.appendChild(path);
        document.getElementById(MAPA_ID).appendChild(svg);
    }

    // Exponer función pública
    window.generarRios = generarRios;

})();