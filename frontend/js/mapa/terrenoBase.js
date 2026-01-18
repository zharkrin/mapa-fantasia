// ==================================================
// Terreno base: océanos y continentes
// Archivo: frontend/js/mapa/terrenoBase.js
// ==================================================

(function () {
    "use strict";

    const MAPA_ID = "mapa-container";

    // Resolución lógica del mapa (no visual)
    const GRID_X = 100;
    const GRID_Y = 60;

    // Probabilidad base de tierra
    const TIERRA_BASE = 0.42;

    let gridTerreno = [];

    /**
     * Inicializa el grid como océano
     */
    function crearGridVacio() {
        gridTerreno = [];
        for (let y = 0; y < GRID_Y; y++) {
            const fila = [];
            for (let x = 0; x < GRID_X; x++) {
                fila.push("oceano");
            }
            gridTerreno.push(fila);
        }
    }

    /**
     * Genera masas de tierra simples
     */
    function generarContinentes(tamanoMundo) {
        const semillas = 3 + tamanoMundo;

        for (let i = 0; i < semillas; i++) {
            const cx = Math.floor(Math.random() * GRID_X);
            const cy = Math.floor(Math.random() * GRID_Y);
            expandirTierra(cx, cy, 6 + tamanoMundo * 2);
        }
    }

    /**
     * Expande tierra desde un punto central
     */
    function expandirTierra(cx, cy, radio) {
        for (let y = -radio; y <= radio; y++) {
            for (let x = -radio; x <= radio; x++) {
                const nx = cx + x;
                const ny = cy + y;
                if (
                    nx >= 0 && ny >= 0 &&
                    nx < GRID_X && ny < GRID_Y
                ) {
                    const dist = Math.sqrt(x * x + y * y);
                    if (dist < radio * Math.random()) {
                        gridTerreno[ny][nx] = "tierra";
                    }
                }
            }
        }
    }

    /**
     * Suaviza bordes tierra/agua
     */
    function suavizarTerreno() {
        const copia = JSON.parse(JSON.stringify(gridTerreno));

        for (let y = 1; y < GRID_Y - 1; y++) {
            for (let x = 1; x < GRID_X - 1; x++) {
                let tierraVecina = 0;

                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (gridTerreno[y + dy][x + dx] === "tierra") {
                            tierraVecina++;
                        }
                    }
                }

                if (tierraVecina >= 5) copia[y][x] = "tierra";
                if (tierraVecina <= 2) copia[y][x] = "oceano";
            }
        }

        gridTerreno = copia;
    }

    /**
     * Dibuja visualmente el terreno base
     */
    function dibujarTerrenoBase() {
        const mapa = document.getElementById(MAPA_ID);
        mapa.querySelectorAll(".terreno-base").forEach(e => e.remove());

        const ancho = mapa.clientWidth;
        const alto = mapa.clientHeight;

        const cellW = ancho / GRID_X;
        const cellH = alto / GRID_Y;

        for (let y = 0; y < GRID_Y; y++) {
            for (let x = 0; x < GRID_X; x++) {
                const celda = document.createElement("div");
                celda.className = "terreno-base";
                celda.style.position = "absolute";
                celda.style.left = `${x * cellW}px`;
                celda.style.top = `${y * cellH}px`;
                celda.style.width = `${cellW}px`;
                celda.style.height = `${cellH}px`;

                celda.style.background =
                    gridTerreno[y][x] === "tierra"
                        ? "#c2b280"
                        : "#3a6ea5";

                mapa.appendChild(celda);
            }
        }
    }

    /**
     * Función pública principal
     */
    function generarTerrenoBase(tamanoMundo) {
        crearGridVacio();
        generarContinentes(tamanoMundo);
        suavizarTerreno();
        suavizarTerreno();
        dibujarTerrenoBase();
    }

    /**
     * Permite consultar si una posición es tierra
     */
    function esTierra(px, py) {
        const mapa = document.getElementById(MAPA_ID);
        const x = Math.floor((px / mapa.clientWidth) * GRID_X);
        const y = Math.floor((py / mapa.clientHeight) * GRID_Y);
        if (!gridTerreno[y]) return false;
        return gridTerreno[y][x] === "tierra";
    }

    window.terrenoBase = {
        generarTerrenoBase,
        esTierra
    };

})();