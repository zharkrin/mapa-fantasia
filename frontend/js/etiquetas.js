// frontend/js/etiquetas.js
// Gestión de etiquetas para el mapa (ciudades, regiones, biomas, ríos, montañas, etc.)

class Etiquetas {
    constructor(ctx) {
        this.ctx = ctx;
        this.etiquetas = [];
        this.config = {
            fuente: "12px Arial",
            color: "#FFFFFF",
            borde: "#000000",
            alineacion: "center"
        };
    }

    // Añadir una etiqueta
    agregarEtiqueta(texto, x, y, opciones = {}) {
        const etiqueta = {
            texto,
            x,
            y,
            fuente: opciones.fuente || this.config.fuente,
            color: opciones.color || this.config.color,
            borde: opciones.borde || this.config.borde,
            alineacion: opciones.alineacion || this.config.alineacion
        };
        this.etiquetas.push(etiqueta);
    }

    // Dibujar todas las etiquetas
    dibujar() {
        for (const etiqueta of this.etiquetas) {
            this.ctx.font = etiqueta.fuente;
            this.ctx.textAlign = etiqueta.alineacion;
            this.ctx.lineWidth = 3;

            // Borde
            this.ctx.strokeStyle = etiqueta.borde;
            this.ctx.strokeText(etiqueta.texto, etiqueta.x, etiqueta.y);

            // Texto
            this.ctx.fillStyle = etiqueta.color;
            this.ctx.fillText(etiqueta.texto, etiqueta.x, etiqueta.y);
        }
    }

    // Limpiar etiquetas
    limpiar() {
        this.etiquetas = [];
    }
}

// Exportar para su uso en otros módulos
export { Etiquetas };