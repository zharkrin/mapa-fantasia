// frontend/js/mapa/dibujarNombres.js

import { Etiquetas } from '../etiquetas.js';

/**
 * Módulo encargado de dibujar nombres en el canvas
 * Soporta nombres de:
 *  - Montañas
 *  - Ríos
 *  - Otros elementos geográficos
 */

export const DibujarNombres = (() => {

    function dibujar(ctx) {
        const etiquetas = Etiquetas.obtenerTodas();

        ctx.save();
        ctx.font = "12px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        etiquetas.forEach(etiqueta => {
            switch (etiqueta.tipo) {
                case "montañas":
                    ctx.fillStyle = "white"; // Montañas en blanco
                    ctx.fillText(etiqueta.texto, etiqueta.pos.x, etiqueta.pos.y);
                    break;

                case "rios":
                    ctx.fillStyle = "blue"; // Ríos en azul
                    ctx.fillText(etiqueta.texto, etiqueta.pos.x, etiqueta.pos.y);
                    break;

                default:
                    ctx.fillStyle = "black"; // Otros elementos en negro
                    ctx.fillText(etiqueta.texto, etiqueta.pos.x, etiqueta.pos.y);
            }
        });

        ctx.restore();
    }

    return {
        dibujar
    };
})();