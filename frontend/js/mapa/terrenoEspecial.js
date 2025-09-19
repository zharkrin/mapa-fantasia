// ===============================
// Terreno Especial
// frontend/js/mapa/terrenoEspecial.js
// ===============================
// Genera lugares singulares (volcanes, glaciares,
// bosques únicos, montes legendarios, valles).
// Ahora con nombres integrados.
// ===============================

import { NombresTerrenoEspecial } from "./nombresTerrenoEspecial.js";

export class TerrenoEspecial {
    constructor() {
        this.nombres = new NombresTerrenoEspecial();

        // Cada elemento será un objeto { x, y, nombre }
        this.volcanes = [];
        this.glaciares = [];
        this.bosquesUnicos = [];
        this.montesLegendarios = [];
        this.vallesEspeciales = [];
    }

    // -------------------------------
    // Métodos de generación
    // -------------------------------

    generarVolcanes(celdas, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const celda = celdas[Math.floor(Math.random() * celdas.length)];
            this.volcanes.push({
                x: celda.x,
                y: celda.y,
                nombre: this.nombres.generarNombre("volcan")
            });
        }
    }

    generarGlaciares(celdas, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const celda = celdas[Math.floor(Math.random() * celdas.length)];
            this.glaciares.push({
                x: celda.x,
                y: celda.y,
                nombre: this.nombres.generarNombre("glaciar")
            });
        }
    }

    generarBosquesUnicos(celdas, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const celda = celdas[Math.floor(Math.random() * celdas.length)];
            this.bosquesUnicos.push({
                x: celda.x,
                y: celda.y,
                nombre: this.nombres.generarNombre("bosque")
            });
        }
    }

    generarMontesLegendarios(celdas, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const celda = celdas[Math.floor(Math.random() * celdas.length)];
            this.montesLegendarios.push({
                x: celda.x,
                y: celda.y,
                nombre: this.nombres.generarNombre("monte")
            });
        }
    }

    generarVallesEspeciales(celdas, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const celda = celdas[Math.floor(Math.random() * celdas.length)];
            this.vallesEspeciales.push({
                x: celda.x,
                y: celda.y,
                nombre: this.nombres.generarNombre("valle")
            });
        }
    }
}