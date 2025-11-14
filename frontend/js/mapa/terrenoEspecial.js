// ======================================================================
// TerrenoEspecial – Capa de íconos especiales del mapa
// frontend/js/mapa/terrenoEspecial.js
//
// Renderiza íconos especiales sobre el mapa usando un GeoJSON externo.
// Cada ícono representa un tipo de terreno especial (acantilado, costa,
// pantano, lago, playa, meseta, etc.).
// ======================================================================


// ----------------------------------------------------------
// Ruta del archivo GeoJSON con los puntos de terrenos especiales
// ----------------------------------------------------------
const RUTA_TERR_REALES = "frontend/data/terreno_especial.geojson";


// ----------------------------------------------------------
// Definición de iconos
// ----------------------------------------------------------
const ICONOS_TERRENO = {
    acantilado: crearIcono("acantilado.png"),
    canon: crearIcono("canon.png"),
    colina: crearIcono("colina.png"),
    costa: crearIcono("costa.png"),
    humedal: crearIcono("humedal.png"),
    lago: crearIcono("lago.png"),
    mar: crearIcono("mar.png"),
    meseta: crearIcono("mesera.png"),
    montanas: crearIcono("montanas.png"),
    oceano: crearIcono("oceano.png"),
    pantano: crearIcono("pantano.png"),
    playa: crearIcono("playa.png"),
    pradera: crearIcono("pradera.png"),
    sabana: crearIcono("sabana.png"),
    estepa: crearIcono("estepa.png"),
    desierto_calido: crearIcono("desierto_calido.png"),
    desierto_frio: crearIcono("desierto_frio.png")
};


// ----------------------------------------------------------
// Helper: Crea un icono Leaflet a partir del nombre de archivo
// ----------------------------------------------------------
function crearIcono(nombreArchivo) {
    return L.icon({
        iconUrl: `frontend/static/img/icons/${nombreArchivo}`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -15]
    });
}


// ----------------------------------------------------------
// Capa global para poder activarla/desactivarla
// ----------------------------------------------------------
let capaTerrenoEspecial = null;


// ----------------------------------------------------------
// Cargar y mostrar terrenos especiales
// ----------------------------------------------------------
async function cargarTerrenoEspecial(map) {
    try {
        const respuesta = await fetch(RUTA_TERR_REALES);
        const geojson = await respuesta.json();

        capaTerrenoEspecial = L.geoJSON(geojson, {
            pointToLayer: (feature, latlng) => {
                const tipo = feature.properties.tipo;
                const icono = ICONOS_TERRENO[tipo];

                return L.marker(latlng, {
                    icon: icono || ICONOS_TERRENO["colina"] // fallback seguro
                });
            },

            onEachFeature: (feature, layer) => {
                const tipo = feature.properties.tipo;
                layer.bindPopup(`
                    <b>Terreno Especial:</b> ${formatearNombre(tipo)}
                `);
            }
        });

        capaTerrenoEspecial.addTo(map);

    } catch (err) {
        console.error("Error cargando TerrenoEspecial:", err);
    }
}


// ----------------------------------------------------------
// Helper: Capitaliza y limpia nombres
// ----------------------------------------------------------
function formatearNombre(nombre) {
    return nombre
        .replace(/_/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}


// ----------------------------------------------------------
// Funciones para activar / desactivar la capa
// ----------------------------------------------------------
function mostrarTerrenoEspecial(map) {
    if (capaTerrenoEspecial && !map.hasLayer(capaTerrenoEspecial)) {
        capaTerrenoEspecial.addTo(map);
    }
}

function ocultarTerrenoEspecial(map) {
    if (capaTerrenoEspecial && map.hasLayer(capaTerrenoEspecial)) {
        map.removeLayer(capaTerrenoEspecial);
    }
}


// ----------------------------------------------------------
// Exportación pública
// ----------------------------------------------------------
window.TerrenoEspecial = {
    cargarTerrenoEspecial,
    mostrarTerrenoEspecial,
    ocultarTerrenoEspecial
};