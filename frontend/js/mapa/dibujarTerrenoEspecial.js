// ===============================
// Dibujar Terreno Especial
// frontend/js/mapa/dibujarTerrenoEspecial.js
// ===============================
// Este archivo se encarga únicamente de
// representar visualmente los lugares singulares
// como volcanes, glaciares, bosques únicos, etc.
// ===============================

import { TerrenoEspecial } from "./terrenoEspecial.js";

export class DibujarTerrenoEspecial {
    constructor(terrenoEspecial) {
        if (!(terrenoEspecial instanceof TerrenoEspecial)) {
            throw new Error("Se requiere una instancia de TerrenoEspecial");
        }
        this.terrenoEspecial = terrenoEspecial;
    }

    // -------------------------------
    // Método principal de dibujado
    // -------------------------------
    dibujar(ctx) {
        const dibujarIcono = (punto, simbolo, color) => {
            ctx.fillStyle = color;
            ctx.font = "bold 14px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(simbolo, punto.x, punto.y);
        };

        this.terrenoEspecial.volcanes.forEach(v => dibujarIcono(v, "🌋", "red"));
        this.terrenoEspecial.glaciares.forEach(g => dibujarIcono(g, "❄️", "cyan"));
        this.terrenoEspecial.bosquesUnicos.forEach(b => dibujarIcono(b, "🌲", "green"));
        this.terrenoEspecial.montesLegendarios.forEach(m => dibujarIcono(m, "⛰️", "gray"));
        this.terrenoEspecial.vallesEspeciales.forEach(v => dibujarIcono(v, "🏞️", "blue"));
    }
}