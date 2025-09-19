// ===============================
// Dibujar Terreno Especial
// frontend/js/mapa/dibujarTerrenoEspecial.js
// ===============================
// Representa visualmente los lugares singulares
// y muestra sus nombres.
// ===============================

import { TerrenoEspecial } from "./terrenoEspecial.js";

export class DibujarTerrenoEspecial {
    constructor(terrenoEspecial) {
        if (!(terrenoEspecial instanceof TerrenoEspecial)) {
            throw new Error("Se requiere una instancia de TerrenoEspecial");
        }
        this.terrenoEspecial = terrenoEspecial;
    }

    dibujar(ctx) {
        const dibujarIcono = (punto, simbolo, color) => {
            ctx.fillStyle = color;
            ctx.font = "bold 14px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(simbolo, punto.x, punto.y);

            // Dibujar el nombre debajo
            ctx.fillStyle = "white";
            ctx.font = "10px serif";
            ctx.fillText(punto.nombre, punto.x, punto.y + 15);
        };

        this.terrenoEspecial.volcanes.forEach(v => dibujarIcono(v, "🌋", "red"));
        this.terrenoEspecial.glaciares.forEach(g => dibujarIcono(g, "❄️", "cyan"));
        this.terrenoEspecial.bosquesUnicos.forEach(b => dibujarIcono(b, "🌲", "green"));
        this.terrenoEspecial.montesLegendarios.forEach(m => dibujarIcono(m, "⛰️", "gray"));
        this.terrenoEspecial.vallesEspeciales.forEach(v => dibujarIcono(v, "🏞️", "blue"));
    }
}