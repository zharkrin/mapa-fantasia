// ==================================================
// Rutas terrestres entre ciudades
// Archivo: frontend/js/rutas/rutas.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    let rutas = [];

    function obtenerEscala() {
        return window.ESCALA_MUNDO || 1;
    }

    function distancia(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function esTerrenoTransitable(x, y) {
        if (window.terrenoBase?.esAgua(x, y)) return false;
        if (window.terrenoBase?.esMontana(x, y)) return false;
        if (window.terrenoEspecial?.esGlaciar?.(x, y)) return false;
        return true;
    }

    function generarCurva(origen, destino) {
        const puntos = [];
        const pasos = 12;

        for (let i = 0; i <= pasos; i++) {
            const t = i / pasos;
            let x = origen.x + (destino.x - origen.x) * t;
            let y = origen.y + (destino.y - origen.y) * t;

            // ligera desviación orgánica
            const ruido = (Math.random() - 0.5) * 20;
            x += ruido;
            y -= ruido;

            if (esTerrenoTransitable(x, y)) {
                puntos.push({ x, y });
            }
        }
        return puntos;
    }

    function conectar(origen, destino) {
        const puntos = generarCurva(origen, destino);
        if (puntos.length > 2) {
            rutas.push(puntos);
        }
    }

    function generarRutas() {
        rutas = [];

        const ciudades = window.ciudadesMapa?.listar();
        if (!ciudades || ciudades.length === 0) return;

        const escala = obtenerEscala();
        const distanciaMaxima = 300 * escala;

        for (const ciudad of ciudades) {
            const cercanas = ciudades
                .filter(c => c !== ciudad)
                .sort((a, b) => distancia(ciudad, a) - distancia(ciudad, b))
                .slice(0, ciudad.tipo === "capital" ? 4 : 2);

            for (const destino of cercanas) {
                if (distancia(ciudad, destino) < distanciaMaxima) {
                    conectar(ciudad, destino);
                }
            }
        }
    }

    function dibujarRutas() {
        const mapa = document.getElementById(MAPA_ID);
        if (!mapa) return;

        document.querySelectorAll(".ruta-terrestre").forEach(e => e.remove());

        for (const ruta of rutas) {
            for (let i = 0; i < ruta.length - 1; i++) {
                const a = ruta[i];
                const b = ruta[i + 1];

                const linea = document.createElement("div");
                linea.className = "ruta-terrestre";

                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const longitud = Math.sqrt(dx * dx + dy * dy);
                const angulo = Math.atan2(dy, dx) * (180 / Math.PI);

                linea.style.width = `${longitud}px`;
                linea.style.left = `${a.x}px`;
                linea.style.top = `${a.y}px`;
                linea.style.transform = `rotate(${angulo}deg)`;

                mapa.appendChild(linea);
            }
        }
    }

    function generarRutasMapa() {
        generarRutas();
        dibujarRutas();
    }

    // API pública
    window.rutasMapa = {
        generar: generarRutasMapa,
        listar: () => rutas
    };

})();