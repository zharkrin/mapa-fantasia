// ===============================
// Generación de Terreno Especial
// frontend/js/mapa/terrenoEspecial.js
// ===============================
//
// Aquí se generan los elementos singulares del mapa:
// - Volcanes
// - Glaciares
// - Bosques legendarios
// - Montañas/valle con nombre propio
//
// Estos NO son biomas generales, sino hitos únicos del mapa
// ===============================

// -------------------------------
// Definición de tipos de terreno especial
// -------------------------------
const TIPOS_TERRENO_ESPECIAL = [
    {
        tipo: "volcan",
        probabilidad: 0.02, // 2% de probabilidad por región
        color: "#8B0000", // rojo oscuro
        nombresEjemplo: ["Monte del Destino", "Fuegoeterno", "Krag’Thar", "Volcán del Olvido"]
    },
    {
        tipo: "glaciar",
        probabilidad: 0.03, // 3% de probabilidad por región
        color: "#000000", // negro (regiones heladas según tu preferencia)
        nombresEjemplo: ["Glaciar de Hielo Negro", "Campos Eternos", "Lengua Helada", "Valle del Hielo"]
    },
    {
        tipo: "bosque_singular",
        probabilidad: 0.04, // 4%
        color: "#013220", // verde oscuro
        nombresEjemplo: ["Bosque Viejo", "Bosque Susurrante", "Selva del Silencio", "Arboleda Sagrada"]
    },
    {
        tipo: "montaña_singular",
        probabilidad: 0.02, // 2%
        color: "#696969", // gris oscuro
        nombresEjemplo: ["Monte Alto", "Roca del Trueno", "Colmillo del Dragón", "Cumbre Solitaria"]
    },
    {
        tipo: "valle_singular",
        probabilidad: 0.02, // 2%
        color: "#228B22", // verde valle
        nombresEjemplo: ["Valle del Viento Helado", "Valle Oscuro", "Llanura Encantada", "Refugio del Alba"]
    }
];

// -------------------------------
// Función generadora
// -------------------------------
export function generarTerrenoEspecial(terrenoBase) {
    const especiales = [];

    // Recorremos las celdas del terreno para ubicar lugares singulares
    for (let i = 0; i < terrenoBase.length; i++) {
        const celda = terrenoBase[i];

        TIPOS_TERRENO_ESPECIAL.forEach(tipo => {
            if (Math.random() < tipo.probabilidad) {
                const especial = {
                    tipo: tipo.tipo,
                    x: celda.x,
                    y: celda.y,
                    color: tipo.color,
                    nombre: tipo.nombresEjemplo[Math.floor(Math.random() * tipo.nombresEjemplo.length)]
                };
                especiales.push(especial);
            }
        });
    }

    return especiales;
}

// -------------------------------
// Función auxiliar para obtener todos los tipos disponibles
// -------------------------------
export function obtenerTiposTerrenoEspecial() {
    return TIPOS_TERRENO_ESPECIAL.map(t => t.tipo);
}