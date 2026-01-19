// ==================================================
// Generación de Ciudades y Asentamientos
// Archivo: frontend/js/mapa/ciudades.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    const BIOMAS_HOSTILES = [
        "desierto_calido",
        "desierto_frio",
        "pantano",
        "montanas"
    ];

    const ICONOS = {
        ciudad: "frontend/static/img/icons/ciudad.png",
        pueblo: "frontend/static/img/icons/pueblo.png",
        aldea: "frontend/static/img/icons/aldea.png"
    };

    function calcularCantidad(tamanoMundo) {
        return {
            ciudades: Math.max(1, Math.floor(tamanoMundo * 1)),
            pueblos: Math.max(2, Math.floor(tamanoMundo * 2)),
            aldeas: Math.max(3, Math.floor(tamanoMundo * 3))
        };
    }

    function limpiarAsentamientos() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".asentamiento").forEach(e => e.remove());
        window.asentamientos = [];
    }

    function generarCiudades(tamanoMundo) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa || !window.terrenoBase) return;

        limpiarAsentamientos();

        const cantidad = calcularCantidad(tamanoMundo);
        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        generarTipo("ciudad", cantidad.ciudades, ancho, alto);
        generarTipo("pueblo", cantidad.pueblos, ancho, alto);
        generarTipo("aldea", cantidad.aldeas, ancho, alto);
    }

    function generarTipo(tipo, cantidad, ancho, alto) {
        for (let i = 0; i < cantidad; i++) {
            const punto = buscarPuntoValido(ancho, alto);
            if (!punto) continue;

            crearIcono(tipo, punto.x, punto.y);
        }
    }

    function buscarPuntoValido(ancho, alto) {
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * ancho;
            const y = Math.random() * alto;

            if (!window.terrenoBase.esTierra(x, y)) continue;

            const bioma = window.biomas?.obtenerBioma(x, y);
            if (BIOMAS_HOSTILES.includes(bioma)) continue;

            const cercaRio = window.esCercaDeRio?.(x, y);
            const cercaCamino = window.document
                .querySelectorAll(".camino-svg path")
                .length > 0;

            if (cercaRio || cercaCamino) {
                return { x, y };
            }
        }
        return null;
    }

    function crearIcono(tipo, x, y) {
        const mapa = document.getElementById(MAPA_ID);

        const icono = document.createElement("img");
        icono.src = ICONOS[tipo];
        icono.className = `asentamiento ${tipo}`;
        icono.style.position = "absolute";
        icono.style.left = `${x - 12}px`;
        icono.style.top = `${y - 12}px`;
        icono.style.width = "24px";
        icono.style.height = "24px";
        icono.style.pointerEvents = "none";

        mapa.appendChild(icono);

        window.asentamientos.push({ tipo, x, y });
    }

    // Exponer función pública
    window.generarCiudades = generarCiudades;

})();
