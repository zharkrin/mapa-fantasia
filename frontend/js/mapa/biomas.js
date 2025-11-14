// ======================================================================
// Biomas – Capa de polígonos sobre el mapa Leaflet
// frontend/js/mapa/biomas.js
//
// Renderiza los biomas sobre el mapa usando un GeoJSON externo, aplica
// estilos específicos por tipo de bioma y expone funciones para activar
// o desactivar la capa desde la interfaz.
// ======================================================================

// ----------------------------------------------------------
// Ruta del archivo GeoJSON con los polígonos de biomas
// ----------------------------------------------------------
const RUTA_GEOJSON_BIOMAS = "frontend/data/biomas.geojson";


// ----------------------------------------------------------
// Estilos por bioma (colores suaves, diferenciados)
// ----------------------------------------------------------
const ESTILOS_BIOMAS = {
    bosque:            { color: "#2E8B57", fillColor: "#3CB371", fillOpacity: 0.45 },
    bosque_boreal:     { color: "#1B4D3E", fillColor: "#2E8B57", fillOpacity: 0.45 },
    bosque_tropical:   { color: "#228B22", fillColor: "#32CD32", fillOpacity: 0.45 },
    desierto_calido:   { color: "#C9A645", fillColor: "#E4C76F", fillOpacity: 0.45 },
    desierto_frio:     { color: "#D1D1C0", fillColor: "#E8E8D9", fillOpacity: 0.45 },
    estepa:            { color: "#A08F56", fillColor: "#CBB87A", fillOpacity: 0.45 },
    humedal:           { color: "#4A90E2", fillColor: "#7EB6F5", fillOpacity: 0.45 },
    pradera:           { color: "#6DA544", fillColor: "#8ED26B", fillOpacity: 0.45 },
    sabana:            { color: "#C9903C", fillColor: "#E3B76A", fillOpacity: 0.45 },
    selva:             { color: "#0F6B1A", fillColor: "#1CA72E", fillOpacity: 0.45 },
    selva_tropical:    { color: "#0E7A22", fillColor: "#29B93F", fillOpacity: 0.45 },
    tundra:            { color: "#A8BDD0", fillColor: "#C6D8E5", fillOpacity: 0.45 },
    tierras_aridas:    { color: "#D9B878", fillColor: "#EED9A4", fillOpacity: 0.45 },
    chaparral:         { color: "#7A6E42", fillColor: "#A4976A", fillOpacity: 0.45 },
    manglar:           { color: "#2F5D3A", fillColor: "#4F8F52", fillOpacity: 0.45 },
    jungla:            { color: "#0C5E21", fillColor: "#148B32", fillOpacity: 0.45 },
    matorral:          { color: "#7B8D42", fillColor: "#A0B76A", fillOpacity: 0.45 }
};


// ----------------------------------------------------------
// Variable global donde se guardará la capa Leaflet
// ----------------------------------------------------------
let capaBiomas = null;


// ----------------------------------------------------------
// Función principal para cargar y renderizar los biomas
// ----------------------------------------------------------
async function cargarBiomas(map) {
    try {
        const respuesta = await fetch(RUTA_GEOJSON_BIOMAS);
        const geojson = await respuesta.json();

        capaBiomas = L.geoJSON(geojson, {
            style: (feature) => {
                const tipo = feature.properties.bioma;
                return ESTILOS_BIOMAS[tipo] || {
                    color: "#555",
                    fillColor: "#999",
                    fillOpacity: 0.3
                };
            },

            onEachFeature: (feature, layer) => {
                layer.bindPopup(`
                    <b>Bioma:</b> ${formatearNombre(feature.properties.bioma)}
                `);
            }
        });

        capaBiomas.addTo(map);

    } catch (err) {
        console.error("Error cargando biomas:", err);
    }
}


// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------
function formatearNombre(nombre) {
    return nombre
        .replace(/_/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}


// ----------------------------------------------------------
// Funciones para activar / desactivar la capa
// ----------------------------------------------------------
function mostrarBiomas(map) {
    if (capaBiomas && !map.hasLayer(capaBiomas)) {
        capaBiomas.addTo(map);
    }
}

function ocultarBiomas(map) {
    if (capaBiomas && map.hasLayer(capaBiomas)) {
        map.removeLayer(capaBiomas);
    }
}


// ----------------------------------------------------------
// Exportación pública
// ----------------------------------------------------------
window.Biomas = {
    cargarBiomas,
    mostrarBiomas,
    ocultarBiomas
};