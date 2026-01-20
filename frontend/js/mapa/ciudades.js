// ==================================================
// Ciudades, Capitales y Asentamientos
// Archivo: frontend/js/mapa/ciudades.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    const ICONOS = {
        capital: "frontend/static/img/icons/ciudad_capital.png",
        ciudad: "frontend/static/img/icons/ciudad.png",
        aldea: "frontend/static/img/icons/aldea.png"
    };

    let ciudades = [];

    function obtenerEscala() {
        return window.ESCALA_MUNDO || 1;
    }

    function obtenerCantidad() {
        const escala = obtenerEscala();
        return {
            ciudades: escala * 4,
            aldeas: escala * 8
        };
    }

    function esTerrenoValido(x, y) {
        if (window.terrenoBase?.esAgua(x, y)) return false;
        if (window.terrenoBase?.esMontana(x, y)) return false;
        if (window.terrenoEspecial?.esGlaciar?.(x, y)) return false;
        return true;
    }

    function crearCiudad(tipo, x, y, reino) {
        return {
            tipo,
            x,
            y,
            reino
        };
    }

    function generarCapitales() {
        const reinos = window.reinosMapa?.obtenerReinoEn;
        if (!window.reinosMapa) return;

        const listaReinos = window.reinosMapa.obtenerReinoEn
            ? window.reinosMapa
            : null;

        if (!window.reinosMapa || !window.reinosMapa.obtenerReinoEn) return;

        window.reinosMapa.generar && window.reinosMapa.generar();

        window.reinosMapa?.generar;

        const reinosData = window.reinosMapa?.obtenerReinoEn;

        if (!window.reinosMapa || !window.reinosMapa.obtenerReinoEn) return;

        // Capital = centro del reino (ya existe)
        window.reinosMapa.generar;

        // Acceso interno
        const reinosInternos = window.reinosMapa;

        if (!reinosInternos) return;

        if (!reinosInternos.obtenerReinoEn) return;

        // Hack controlado: usamos las capitales ya creadas
        const reinosList = window.reinosMapa._reinos || [];

        for (const reino of reinosList) {
            ciudades.push(
                crearCiudad("capital", reino.capital.x, reino.capital.y, reino)
            );
        }
    }

    function generarCiudades() {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        const { ciudades: numCiudades, aldeas: numAldeas } = obtenerCantidad();

        function generar(tipo, cantidad) {
            let intentos = 0;
            while (cantidad > 0 && intentos < 5000) {
                intentos++;
                const x = Math.random() * mapa.clientWidth;
                const y = Math.random() * mapa.clientHeight;

                if (!esTerrenoValido(x, y)) continue;

                const reino = window.reinosMapa.obtenerReinoEn(x, y);
                if (!reino) continue;

                ciudades.push(crearCiudad(tipo, x, y, reino));
                cantidad--;
            }
        }

        generar("ciudad", numCiudades);
        generar("aldea", numAldeas);
    }

    function dibujarCiudades() {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        document.querySelectorAll(".ciudad-icono").forEach(e => e.remove());

        for (const ciudad of ciudades) {
            const el = document.createElement("img");
            el.src = ICONOS[ciudad.tipo];
            el.className = "ciudad-icono";
            el.style.left = `${ciudad.x}px`;
            el.style.top = `${ciudad.y}px`;
            el.title = ciudad.tipo.toUpperCase();

            mapa.appendChild(el);
        }
    }

    function generarCiudadesMapa() {
        ciudades = [];
        generarCapitales();
        generarCiudades();
        dibujarCiudades();
    }

    // API pública
    window.ciudadesMapa = {
        generar: generarCiudadesMapa,
        listar: () => ciudades
    };

})();