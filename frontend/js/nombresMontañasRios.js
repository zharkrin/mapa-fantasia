// frontend/js/nombresMontañasRios.js

/**
 * Módulo para generar nombres de montañas y ríos
 * Utiliza patrones fonéticos simples para variedad y realismo
 */

export const NombresGeograficos = (() => {

    const prefMontanas = ["Alto", "Pico", "Monte", "Cima", "Cordillera", "Sierra"];
    const sufMontanas = ["del Fuego", "del Viento", "de la Niebla", "Oscura", "Nevada", "Sagrada"];
    
    const prefRios = ["Río", "Arroyo", "Canal", "Quebrada", "Torrent"];
    const sufRios = ["de Plata", "del Norte", "de la Luna", "Oscuro", "Serpenteante", "Claro"];

    // Generar nombre de montaña
    function generarMontana() {
        const pref = prefMontanas[Math.floor(Math.random() * prefMontanas.length)];
        const suf = sufMontanas[Math.floor(Math.random() * sufMontanas.length)];
        return `${pref} ${suf}`;
    }

    // Generar nombre de río
    function generarRio() {
        const pref = prefRios[Math.floor(Math.random() * prefRios.length)];
        const suf = sufRios[Math.floor(Math.random() * sufRios.length)];
        return `${pref} ${suf}`;
    }

    return {
        generarMontana,
        generarRio
    };
})();