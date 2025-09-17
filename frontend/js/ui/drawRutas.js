// frontend/js/ui/drawRutas.js

/**
 * Módulo para dibujar rutas en el mapa
 * Compatible con el módulo Rutas y Etiquetas
 * Permite visualizar rutas terrestres, marinas y mágicas
 */

import { Rutas } from '../rutas/rutas.js';
import { Etiquetas } from '../etiquetas.js';

export const DrawRutas = (() => {

    // Canvas o contexto de dibujo
    let canvas;
    let ctx;

    function inicializar(canvasId) {
        canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas con id "${canvasId}" no encontrado.`);
            return;
        }
        ctx = canvas.getContext('2d');
    }

    // Dibujar todas las rutas de un tipo
    function dibujarRutas(tipo = 'terrestres', color = 'brown') {
        if (!ctx) return;
        const rutas = Rutas.obtener(tipo);
        ctx.lineWidth = 2;

        rutas.forEach(camino => {
            if (!camino || camino.length < 2) return;

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(camino[0].x, camino[0].y);
            for (let i = 1; i < camino.length; i++) {
                ctx.lineTo(camino[i].x, camino[i].y);
            }
            ctx.stroke();
        });
    }

    // Dibujar etiquetas asociadas a rutas
    function dibujarEtiquetas() {
        if (!ctx) return;

        const tipos = ['ciudades', 'naciones', 'montañas', 'rios', 'biomas'];
        tipos.forEach(tipo => {
            const etiquetas = Etiquetas.obtener(tipo);
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            etiquetas.forEach(etiqueta => {
                ctx.fillText(etiqueta.nombre, etiqueta.x + 3, etiqueta.y - 3);
            });
        });
    }

    // Limpiar el canvas
    function limpiarCanvas() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Dibujar mapa completo: rutas + etiquetas
    function dibujarMapaCompleto() {
        limpiarCanvas();
        dibujarRutas('terrestres', 'brown');
        if (Rutas.opcionesRutas.marinas) dibujarRutas('marinas', 'blue');
        if (Rutas.opcionesRutas.magicas) dibujarRutas('magicas', 'purple');
        dibujarEtiquetas();
    }

    return {
        inicializar,
        dibujarRutas,
        dibujarEtiquetas,
        dibujarMapaCompleto,
        limpiarCanvas
    };
})();
