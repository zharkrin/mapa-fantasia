// ==================================================
// Generación de Caminos Terrestres
// Archivo: frontend/js/mapa/caminos.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";
    const MAX_CAMINOS_POR_ESCALA = 4;
    const PASO = 10;
    const MAX_LONGITUD = 140;

    const BIOMAS_HOSTILES = [
        "desierto_calido",
        "desierto_frio",
        "pantano",
        "montanas"
    ];

    function calcularCantidadCaminos(tamanoMundo) {
        return Math.max(2, Math.floor(tamanoMundo * MAX_CAMINOS_POR_ESCALA));
    }

    function limpiarCaminos() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".camino-svg").forEach(c => c.remove());
    }

    function generarCaminos(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa || !window.terrenoBase || !window.generarRios) return;

        limpiarCaminos();

        const cantidad = calcularCantidadCaminos(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        for (let i = 0; i < cantidad; i++) {
            const inicio = buscarPuntoTierra(ancho, alto);
            const destino = buscarPuntoTierra(ancho, alto);
            if (!inicio || !destino) continue;

            const puntos = trazarCamino(inicio, destino, ancho, alto);
            if (puntos.length > 5) {
                dibujarCamino(puntos);
            }
        }
    }

    function buscarPuntoTierra(ancho, alto) {
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * ancho;
            const y = Math.random() * alto;

            if (window.terrenoBase.esTierra(x, y)) {
                return { x, y };
            }
        }
        return null;
    }

    function trazarCamino(origen, destino, ancho, alto) {
        const puntos = [];
        let x = origen.x;
        let y = origen.y;

        let dirX = destino.x - x;
        let dirY = destino.y - y;

        for (let i = 0; i < MAX_LONGITUD; i++) {
            if (!window.terrenoBase.esTierra(x, y)) break;

            const bioma = window.biomas?.obtenerBioma(x, y);
            if (BIOMAS_HOSTILES.includes(bioma)) break;

            puntos.push({ x, y });

            // vector hacia destino
            dirX = destino.x - x;
            dirY = destino.y - y;

            // atracción hacia ríos
            if (window.esCercaDeRio?.(x, y)) {
                dirX += (Math.random() - 0.5) * 4;
                dirY += (Math.random() - 0.5) * 4;
            }

            // normalizar
            const mag = Math.hypot(dirX, dirY) || 1;
            dirX /= mag;
            dirY /= mag;

            // ligera variación natural
            dirX += (Math.random() - 0.5) * 0.2;
            dirY += (Math.random() - 0.5) * 0.2;

            x += dirX * PASO;
            y += dirY * PASO;

            if (x < 0 || y < 0 || x > ancho || y > alto) break;
        }

        return puntos;
    }

    function dibujarCamino(puntos) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("camino-svg");
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
        path.setAttribute("stroke", "#8b6b3e");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("opacity", "0.8");
        path.setAttribute("stroke-dasharray", "3 2");

        svg.appendChild(path);
        document.getElementById(MAPA_ID).appendChild(svg);
    }

    // Exponer función pública
    window.generarCaminos = generarCaminos;

})();