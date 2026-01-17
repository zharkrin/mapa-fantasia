// ==================================================
// Zonas climáticas por latitud
// Archivo: frontend/js/mapa/zonasClimaticas.js
// ==================================================

(function () {
    "use strict";

    /**
     * Devuelve la zona climática según la posición Y
     * @param {number} y Posición vertical
     * @param {number} altoMapa Altura total del mapa
     */
    function obtenerZonaClimatica(y, altoMapa) {
        const franja = altoMapa / 5;

        if (y < franja || y > altoMapa - franja) {
            return "polar";
        }

        if (y < franja * 2 || y > altoMapa - franja * 2) {
            return "templada";
        }

        return "tropical";
    }

    /**
     * Zonas climáticas permitidas por bioma
     */
    const zonasPorBioma = {
        glaciar: ["polar"],
        tundra: ["polar", "templada"],
        bosque_boreal: ["templada"],
        desierto_frio: ["templada", "polar"],

        bosque: ["templada"],
        pradera: ["templada"],
        humedal: ["templada"],
        pantano: ["templada", "tropical"],

        sabana: ["tropical", "templada"],
        desierto_calido: ["tropical"],
        tierras_aridas: ["tropical"],

        selva_tropical: ["tropical"],
        jungla: ["tropical"],
        manglar: ["tropical"],
        bosque_tropical: ["tropical"]
    };

    /**
     * Comprueba si un bioma puede existir en una zona climática
     */
    function biomaCompatibleConZona(bioma, zona) {
        if (!zonasPorBioma[bioma]) return true;
        return zonasPorBioma[bioma].includes(zona);
    }

    window.zonasClimaticas = {
        obtenerZonaClimatica,
        biomaCompatibleConZona
    };

})();