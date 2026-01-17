// ==================================================
// Reglas de compatibilidad entre biomas
// Archivo: frontend/js/mapa/reglasBiomas.js
// ==================================================

(function () {
    "use strict";

    /**
     * Cada bioma define con qué otros puede convivir cerca
     * Si un bioma NO está en la lista, se considera incompatible
     */

    const reglasBiomas = {
        bosque: [
            "bosque",
            "bosque_boreal",
            "bosque_tropical",
            "pradera",
            "humedal"
        ],

        bosque_boreal: [
            "bosque_boreal",
            "bosque",
            "tundra"
        ],

        bosque_tropical: [
            "bosque_tropical",
            "selva_tropical",
            "jungla",
            "manglar"
        ],

        desierto_calido: [
            "desierto_calido",
            "sabana",
            "tierras_aridas"
        ],

        desierto_frio: [
            "desierto_frio",
            "tundra"
        ],

        tundra: [
            "tundra",
            "bosque_boreal",
            "desierto_frio",
            "glaciar"
        ],

        selva_tropical: [
            "selva_tropical",
            "jungla",
            "bosque_tropical",
            "manglar"
        ],

        sabana: [
            "sabana",
            "pradera",
            "desierto_calido"
        ],

        pradera: [
            "pradera",
            "sabana",
            "bosque"
        ],

        humedal: [
            "humedal",
            "pantano",
            "bosque"
        ],

        pantano: [
            "pantano",
            "humedal",
            "manglar"
        ],

        manglar: [
            "manglar",
            "pantano",
            "selva_tropical"
        ],

        glaciar: [
            "glaciar",
            "tundra"
        ]
    };

    /**
     * Comprueba si dos biomas son compatibles
     */
    function biomasCompatibles(a, b) {
        if (!reglasBiomas[a]) return true;
        return reglasBiomas[a].includes(b);
    }

    window.reglasBiomas = {
        biomasCompatibles
    };

})();