// frontend/js/etiquetas.js
// Sistema completo de etiquetas para ciudades, montañas, ríos y regiones en el mapa

class Etiquetas {
    constructor() {
        this.etiquetas = [];
        this.color = "#FFFFFF"; // nombres en blanco por defecto
        this.font = "14px Arial";
    }

    // Añadir etiqueta
    agregar(texto, x, y) {
        this.etiquetas.push({ texto, x, y });
    }

    // Limpiar etiquetas
    limpiar() {
        this.etiquetas = [];
    }

    // Dibujar todas las etiquetas en el canvas
    dibujar(ctx) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = "center";

        for (const et of this.etiquetas) {
            ctx.fillText(et.texto, et.x, et.y);
        }
    }

    // Generar etiquetas automáticas a partir del mapa
    generarAutomaticas(mapa) {
        if (!mapa) return;

        // Ciudades
        if (mapa.ciudades) {
            mapa.ciudades.forEach(c => this.agregar(c.nombre, c.x, c.y));
        }

        // Montañas
        if (mapa.montañas) {
            mapa.montañas.forEach(m => this.agregar(m.nombre, m.x, m.y));
        }

        // Ríos
        if (mapa.rios) {
            mapa.rios.forEach(r => {
                const px = (r.startX + r.endX) / 2;
                const py = (r.startY + r.endY) / 2;
                this.agregar(r.nombre, px, py);
            });
        }

        // Regiones
        if (mapa.regiones) {
            mapa.regiones.forEach(reg => this.agregar(reg.nombre, reg.x, reg.y));
        }
    }
}

// Exportar clase para integración
export { Etiquetas };