// ===============================
// Terreno Especial
// frontend/js/mapa/terrenoEspecial.js
// ===============================
// Define lugares singulares del mapa:
// volcanes, glaciares, bosques únicos,
// montes legendarios, valles, etc.
// ===============================

export class TerrenoEspecial {
    constructor() {
        this.volcanes = [];
        this.glaciares = [];
        this.bosquesUnicos = [];
        this.montesLegendarios = [];
        this.vallesEspeciales = [];
    }

    // -------------------------------
    // Métodos de generación
    // -------------------------------

    generarVolcanes(celdas, cantidad = 3) {
        this.volcanes = this._seleccionarAleatorio(celdas, cantidad)
            .map(celda => ({ ...celda, tipo: "volcán" }));
    }

    generarGlaciares(celdas, cantidad = 2) {
        this.glaciares = this._seleccionarAleatorio(celdas, cantidad)
            .map(celda => ({ ...celda, tipo: "glaciar" }));
    }

    generarBosquesUnicos(celdas, cantidad = 2) {
        this.bosquesUnicos = this._seleccionarAleatorio(celdas, cantidad)
            .map(celda => ({ ...celda, tipo: "bosque único" }));
    }

    generarMontesLegendarios(celdas, cantidad = 2) {
        this.montesLegendarios = this._seleccionarAleatorio(celdas, cantidad)
            .map(celda => ({ ...celda, tipo: "monte legendario" }));
    }

    generarVallesEspeciales(celdas, cantidad = 2) {
        this.vallesEspeciales = this._seleccionarAleatorio(celdas, cantidad)
            .map(celda => ({ ...celda, tipo: "valle especial" }));
    }

    // -------------------------------
    // Dibujado
    // -------------------------------

    dibujar(ctx) {
        const dibujarIcono = (punto, simbolo, color) => {
            ctx.fillStyle = color;
            ctx.font = "bold 14px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(simbolo, punto.x, punto.y);
        };

        this.volcanes.forEach(v => dibujarIcono(v, "🌋", "red"));
        this.glaciares.forEach(g => dibujarIcono(g, "❄️", "cyan"));
        this.bosquesUnicos.forEach(b => dibujarIcono(b, "🌲", "green"));
        this.montesLegendarios.forEach(m => dibujarIcono(m, "⛰️", "gray"));
        this.vallesEspeciales.forEach(v => dibujarIcono(v, "🏞️", "blue"));
    }

    // -------------------------------
    // Utilidad
    // -------------------------------

    _seleccionarAleatorio(lista, cantidad) {
        if (!lista || lista.length === 0) return [];
        const copia = [...lista];
        const seleccionados = [];
        for (let i = 0; i < cantidad && copia.length > 0; i++) {
            const index = Math.floor(Math.random() * copia.length);
            seleccionados.push(copia.splice(index, 1)[0]);
        }
        return seleccionados;
    }

    // -------------------------------
    // Obtener todos los elementos
    // -------------------------------

    obtenerTodos() {
        return [
            ...this.volcanes,
            ...this.glaciares,
            ...this.bosquesUnicos,
            ...this.montesLegendarios,
            ...this.vallesEspeciales
        ];
    }
}
