// frontend/js/etiquetas.js

/**
 * Módulo para gestionar etiquetas en el mapa
 * Tipos de etiquetas: ciudades, naciones, montañas, ríos, biomas
 */

export const Etiquetas = (() => {

    // Listado de etiquetas por tipo
    const etiquetas = {
        ciudades: [],
        naciones: [],
        montañas: [],
        rios: [],
        biomas: []
    };

    // Añadir una etiqueta
    function agregar(tipo, nombre, coordenadas) {
        if (!etiquetas[tipo]) {
            console.warn(`Tipo de etiqueta desconocido: ${tipo}`);
            return;
        }
        etiquetas[tipo].push({
            nombre,
            x: coordenadas.x,
            y: coordenadas.y
        });
    }

    // Obtener todas las etiquetas de un tipo
    function obtener(tipo) {
        return etiquetas[tipo] || [];
    }

    // Limpiar etiquetas de un tipo
    function limpiar(tipo) {
        if (etiquetas[tipo]) {
            etiquetas[tipo] = [];
        }
    }

    // Limpiar todas las etiquetas
    function limpiarTodo() {
        for (const tipo in etiquetas) {
            etiquetas[tipo] = [];
        }
    }

    // Exportar funciones públicas
    return {
        agregar,
        obtener,
        limpiar,
        limpiarTodo
    };
})();