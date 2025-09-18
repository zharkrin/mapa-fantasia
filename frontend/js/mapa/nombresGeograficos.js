// frontend/js/mapa/nombresGeograficos.js
// Generación procedimental de nombres geográficos: montañas, ríos y regiones

class NombresGeograficos {
    constructor() {
        this.prefMontañas = ["Monte", "Pico", "Cerro", "Cordillera", "Alto"];
        this.sufMontañas = ["dor", "an", "en", "or", "ar", "im", "um"];

        this.prefRios = ["Rio", "Río", "Arroyo", "Canal"];
        this.sufRios = ["del Norte", "del Sur", "Grande", "Claro", "Serpenteante", "Oscuro"];

        this.prefRegiones = ["Valle", "Llanura", "Bosque", "Desierto", "Altiplano"];
        this.sufRegiones = ["Eterna", "Sombrío", "Luminoso", "Profundo", "Misterioso"];

        this.vocales = ["a", "e", "i", "o", "u"];
        this.consonantes = ["b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "r", "s", "t", "v", "z"];
    }

    // Genera un nombre de montaña
    generarMontaña() {
        const pref = this.prefMontañas[Math.floor(Math.random() * this.prefMontañas.length)];
        const suf = this.sufMontañas[Math.floor(Math.random() * this.sufMontañas.length)];
        return `${pref} ${suf}`;
    }

    // Genera un nombre de río
    generarRio() {
        const pref = this.prefRios[Math.floor(Math.random() * this.prefRios.length)];
        const suf = this.sufRios[Math.floor(Math.random() * this.sufRios.length)];
        return `${pref} ${suf}`;
    }

    // Genera un nombre de región
    generarRegion() {
        const pref = this.prefRegiones[Math.floor(Math.random() * this.prefRegiones.length)];
        const suf = this.sufRegiones[Math.floor(Math.random() * this.sufRegiones.length)];
        return `${pref} ${suf}`;
    }

    // Generar nombres de forma aleatoria para un mapa completo
    generarNombresMapa(mapa) {
        if (!mapa) return;

        if (mapa.montañas) {
            mapa.montañas.forEach(m => m.nombre = this.generarMontaña());
        }

        if (mapa.rios) {
            mapa.rios.forEach(r => r.nombre = this.generarRio());
        }

        if (mapa.regiones) {
            mapa.regiones.forEach(reg => reg.nombre = this.generarRegion());
        }

        return mapa;
    }
}

// Exportar clase
export { NombresGeograficos };