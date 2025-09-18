// frontend/js/mapa/dibujarNombres.js
// Dibujo completo de nombres de ciudades, ríos, montañas y regiones en el canvas

class DibujarNombres {
    constructor(color = "#FFFFFF", font = "14px Arial") {
        this.color = color;  // Color de los nombres
        this.font = font;    // Fuente de los nombres
    }

    // Dibuja todos los nombres del mapa en el canvas
    dibujar(ctx, mapa, etiquetas = null) {
        if (!ctx || !mapa) return;

        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = "center";

        // Dibujar nombres geográficos si existen
        if (mapa.montañas) {
            mapa.montañas.forEach(m => {
                if (m.nombre) ctx.fillText(m.nombre, m.x, m.y);
            });
        }

        if (mapa.rios) {
            mapa.rios.forEach(r => {
                if (r.nombre) {
                    const px = (r.startX + r.endX) / 2;
                    const py = (r.startY + r.endY) / 2;
                    ctx.fillText(r.nombre, px, py);
                }
            });
        }

        if (mapa.regiones) {
            mapa.regiones.forEach(reg => {
                if (reg.nombre) ctx.fillText(reg.nombre, reg.x, reg.y);
            });
        }

        // Dibujar nombres de ciudades y otras etiquetas si se pasa el objeto Etiquetas
        if (etiquetas && etiquetas.etiquetas) {
            etiquetas.etiquetas.forEach(et => {
                ctx.fillText(et.texto, et.x, et.y);
            });
        }
    }
}

// Exportar clase
export { DibujarNombres };