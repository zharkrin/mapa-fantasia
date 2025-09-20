// ===========================================
// Nombres de terrenos especiales con iconos
// frontend/js/mapa/nombresTerrenoEspecial.js
// ===========================================

/**
 * Diccionario de terrenos especiales
 * - clave: nombre en minúsculas (coincide con archivo en /static/img/icons/)
 * - nombre: nombre visible para mostrar al jugador
 * - icono: ruta al archivo PNG en /static/img/icons/
 */
const terrenosEspeciales = {
    "volcan": {
        nombre: "Volcán",
        icono: "/static/img/icons/volcan.png"
    },
    "glaciar": {
        nombre: "Glaciar",
        icono: "/static/img/icons/glaciar.png"
    },
    "bosque_ancestral": {
        nombre: "Bosque ancestral",
        icono: "/static/img/icons/bosque.png"
    },
    "pantano_mistico": {
        nombre: "Pantano místico",
        icono: "/static/img/icons/pantano.png"
    },
    "valle_sagrado": {
        nombre: "Valle sagrado",
        icono: "/static/img/icons/valle.png"
    },
    "montaña_perdida": {
        nombre: "Montaña perdida",
        icono: "/static/img/icons/montañas.png"
    }
};

/**
 * Devuelve todos los terrenos especiales disponibles
 */
function obtenerTerrenosEspeciales() {
    return Object.values(terrenosEspeciales);
}

/**
 * Devuelve un terreno especial por su clave
 * @param {string} clave
 * @returns {object|null}
 */
function obtenerTerrenoEspecial(clave) {
    return terrenosEspeciales[clave] || null;
}

// Exportar si usamos módulos ES6
// export { terrenosEspeciales, obtenerTerrenosEspeciales, obtenerTerrenoEspecial };