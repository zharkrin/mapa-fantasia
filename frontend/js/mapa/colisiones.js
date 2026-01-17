// ==================================================
// Sistema de colisiones del mapa
// Archivo: frontend/js/mapa/colisiones.js
// Evita solapamientos entre iconos
// ==================================================

(function () {
    "use strict";

    const ocupados = [];

    /**
     * Comprueba si dos rectángulos colisionan
     */
    function colisionan(a, b) {
        return !(
            a.x + a.w <= b.x ||
            a.x >= b.x + b.w ||
            a.y + a.h <= b.y ||
            a.y >= b.y + b.h
        );
    }

    /**
     * Comprueba si una posición está libre
     */
    function posicionLibre(x, y, w, h) {
        const rect = { x, y, w, h };
        for (const o of ocupados) {
            if (colisionan(rect, o)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Registra una posición como ocupada
     */
    function registrarOcupado(x, y, w, h) {
        ocupados.push({ x, y, w, h });
    }

    /**
     * Limpia todas las colisiones registradas
     * (se llama al regenerar mapa)
     */
    function limpiarColisiones() {
        ocupados.length = 0;
    }

    // --------------------------------------------------
    // EXPONER FUNCIONES
    // --------------------------------------------------
    window.colisionesMapa = {
        posicionLibre,
        registrarOcupado,
        limpiarColisiones
    };

})();