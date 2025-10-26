// ===========================================
// Terreno Especial
// frontend/js/mapa/terrenoEspecial.js
// ===========================================

// Esta función genera lugares únicos como volcanes, glaciares o bosques legendarios.
// Cada terreno especial se asocia a un icono y coordenadas dentro del mapa.

export const terrenosEspeciales = [
    {
        nombre: "Bosque Encantado",
        tipo: "bosque_especial",
        descripcion: "Un bosque antiguo donde la magia aún respira.",
        icono: "frontend/static/img/icons/terreno_especial/bosque_especial.png"
    },
    {
        nombre: "Desierto de las Almas",
        tipo: "desierto_calido_especial",
        descripcion: "Dunas infinitas donde el viento canta historias olvidadas.",
        icono: "frontend/static/img/icons/terreno_especial/desierto_calido_especial.png"
    },
    {
        nombre: "Glaciar del Silencio",
        tipo: "glaciar_especial",
        descripcion: "Una extensión helada donde el tiempo parece detenido.",
        icono: "frontend/static/img/icons/terreno_especial/glaciar_especial.png"
    },
    {
        nombre: "Lago de los Ecos",
        tipo: "lago_especial",
        descripcion: "Sus aguas reflejan no solo el cielo, sino también el alma.",
        icono: "frontend/static/img/icons/terreno_especial/lago_especial.png"
    },
    {
        nombre: "Montañas Eternas",
        tipo: "montanas_especial",
        descripcion: "Gigantes de piedra que guardan secretos antiguos.",
        icono: "frontend/static/img/icons/terreno_especial/montanas_especial.png"
    },
    {
        nombre: "Pantano de las Sombras",
        tipo: "pantano_especial",
        descripcion: "Tierras húmedas donde la niebla nunca se levanta.",
        icono: "frontend/static/img/icons/terreno_especial/pantano_especial.png"
    },
    {
        nombre: "Volcán del Destino",
        tipo: "volcan_especial",
        descripcion: "Un coloso de fuego que moldea el mundo a su voluntad.",
        icono: "frontend/static/img/icons/terreno_especial/volcan_especial.png"
    }
];

// ===========================================
// Función generadora
// ===========================================

// Crea un conjunto limitado de terrenos especiales de forma aleatoria
export function generarTerrenosEspeciales(cantidad = 3) {
    const seleccionados = [];
    const indicesUsados = new Set();

    while (seleccionados.length < cantidad && indicesUsados.size < terrenosEspeciales.length) {
        const indice = Math.floor(Math.random() * terrenosEspeciales.length);
        if (!indicesUsados.has(indice)) {
            const base = terrenosEspeciales[indice];
            seleccionados.push({
                ...base,
                x: Math.random() * 1280, // posición dentro del canvas
                y: Math.random() * 720
            });
            indicesUsados.add(indice);
        }
    }
    return seleccionados;
}