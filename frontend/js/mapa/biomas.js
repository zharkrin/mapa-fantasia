// frontend/js/mapa/biomas.js
// Generación y manejo de biomas para el mapa de fantasía

export const BIOMAS = {
    BOSQUE: { nombre: "Bosque", color: "#2E8B57" },
    DESIERTO: { nombre: "Desierto", color: "#EDC9Af" },
    TUNDRA: { nombre: "Tundra", color: "#C0C0C0" },
    MONTAÑA: { nombre: "Montaña", color: "#8B8B83" },
    GLACIAR: { nombre: "Glaciar", color: "#FFFFFF" },
    SABANA: { nombre: "Sabana", color: "#E4A672" },
    PANTANO: { nombre: "Pantano", color: "#556B2F" },
    LLANURA: { nombre: "Llanura", color: "#7CFC00" },
};

export class Biomas {
    constructor(anchura, altura) {
        this.anchura = anchura;
        this.altura = altura;
        this.mapaBiomas = [];
    }

    generarMapaBiomas(alturas, temperaturas) {
        // Generar matriz de biomas basada en altura y temperatura
        for (let y = 0; y < this.altura; y++) {
            this.mapaBiomas[y] = [];
            for (let x = 0; x < this.anchura; x++) {
                const h = alturas[y][x];
                const t = temperaturas[y][x];
                this.mapaBiomas[y][x] = this.definirBioma(h, t);
            }
        }
        return this.mapaBiomas;
    }

    definirBioma(altura, temperatura) {
        // Altura y temperatura determinan bioma
        if (altura > 0.8) return BIOMAS.MONTAÑA;
        if (altura > 0.6 && temperatura < 0.3) return BIOMAS.TUNDRA;
        if (altura < 0.3 && temperatura > 0.7) return BIOMAS.DESIERTO;
        if (altura < 0.4 && temperatura < 0.3) return BIOMAS.GLACIAR;
        if (temperatura > 0.5 && altura < 0.6) return BIOMAS.SABANA;
        if (temperatura > 0.4 && altura < 0.5) return BIOMAS.BOSQUE;
        if (temperatura < 0.4 && altura < 0.5) return BIOMAS.PANTANO;
        return BIOMAS.LLANURA;
    }

    obtenerColor(x, y) {
        const bioma = this.mapaBiomas[y][x];
        return bioma ? bioma.color : "#000000";
    }
}