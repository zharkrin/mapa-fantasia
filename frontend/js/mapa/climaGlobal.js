// ==================================================
// Clima Global por Latitud
// Archivo: frontend/js/mapa/climaGlobal.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    const ZONAS = [
        { nombre: "polar", min: 0.0, max: 0.15, temp: -30 },
        { nombre: "subpolar", min: 0.15, max: 0.25, temp: -10 },
        { nombre: "templado", min: 0.25, max: 0.40, temp: 10 },
        { nombre: "subtropical", min: 0.40, max: 0.50, temp: 25 },
        { nombre: "tropical", min: 0.45, max: 0.55, temp: 32 },
        { nombre: "subtropical", min: 0.50, max: 0.60, temp: 25 },
        { nombre: "templado", min: 0.60, max: 0.75, temp: 10 },
        { nombre: "subpolar", min: 0.75, max: 0.85, temp: -10 },
        { nombre: "polar", min: 0.85, max: 1.0, temp: -30 }
    ];

    function obtenerZonaClimatica(y, altoMapa) {
        const latitud = y / altoMapa;

        for (const zona of ZONAS) {
            if (latitud >= zona.min && latitud < zona.max) {
                return zona;
            }
        }
        return ZONAS[4]; // tropical por defecto
    }

    function obtenerTemperatura(x, y) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return 15;

        const zona = obtenerZonaClimatica(y, mapa.clientHeight);

        let temp = zona.temp;

        // Ajuste por altitud (montañas enfrían)
        if (window.terrenoBase?.esMontana(x, y)) {
            temp -= 8;
        }

        // Ajuste por proximidad al mar
        if (window.terrenoBase?.esCosta(x, y)) {
            temp += (temp < 0 ? 2 : -2);
        }

        return temp;
    }

    function obtenerClima(x, y) {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return "templado";

        const zona = obtenerZonaClimatica(y, mapa.clientHeight);
        return zona.nombre;
    }

    // API pública
    window.climaGlobal = {
        obtenerZona: obtenerClima,
        obtenerTemperatura
    };

})();