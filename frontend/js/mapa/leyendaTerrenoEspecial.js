// ===============================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===============================

// Rutas de las imágenes
const rutaIconos = {
    biomas: "frontend/static/img/icons/biomas/",
    terreno: "frontend/static/img/icons/terreno/",
    terrenoEspecial: "frontend/static/img/icons/terreno_especial/"
};

// Lista de biomas
const biomas = [
    { nombre: "Bosque Boreal", icono: rutaIconos.biomas + "bosque_boreal.png" },
    { nombre: "Bosque Tropical", icono: rutaIconos.biomas + "bosque_tropical.png" },
    { nombre: "Bosque", icono: rutaIconos.biomas + "bosque.png" },
    { nombre: "Desierto Cálido", icono: rutaIconos.biomas + "desierto_calido.png" },
    { nombre: "Desierto Frío", icono: rutaIconos.biomas + "desierto_frio.png" },
    { nombre: "Estepa", icono: rutaIconos.biomas + "estepa.png" },
    { nombre: "Humedal", icono: rutaIconos.biomas + "humedal.png" },
    { nombre: "Pradera", icono: rutaIconos.biomas + "pradera.png" },
    { nombre: "Sabana", icono: rutaIconos.biomas + "sabana.png" },
    { nombre: "Selva Tropical", icono: rutaIconos.biomas + "selva_tropical.png" },
    { nombre: "Tundra", icono: rutaIconos.biomas + "tundra.png" },
    { nombre: "Tierras Áridas", icono: rutaIconos.biomas + "tierras_aridas.png" },
    { nombre: "Chaparral", icono: rutaIconos.biomas + "chaparral.png" },
    { nombre: "Selva", icono: rutaIconos.biomas + "selva.png" },
    { nombre: "Manglar", icono: rutaIconos.biomas + "manglar.png" },
    { nombre: "Jungla", icono: rutaIconos.biomas + "jungla.png" },
    { nombre: "Matorral", icono: rutaIconos.biomas + "matorral.png" }
];

// Lista de terrenos
const terrenos = [
    { nombre: "Acantilado", icono: rutaIconos.terreno + "acantilado.png" },
    { nombre: "Cañón", icono: rutaIconos.terreno + "canon.png" },
    { nombre: "Colina", icono: rutaIconos.terreno + "colina.png" },
    { nombre: "Costa", icono: rutaIconos.terreno + "costa.png" },
    { nombre: "Lago", icono: rutaIconos.terreno + "lago.png" },
    { nombre: "Mar", icono: rutaIconos.terreno + "mar.png" },
    { nombre: "Meseta", icono: rutaIconos.terreno + "mesera.png" },
    { nombre: "Montañas", icono: rutaIconos.terreno + "montanas.png" },
    { nombre: "Océano", icono: rutaIconos.terreno + "oceano.png" },
    { nombre: "Pantano", icono: rutaIconos.terreno + "pantano.png" },
    { nombre: "Playa", icono: rutaIconos.terreno + "playa.png" },
    { nombre: "Valle", icono: rutaIconos.terreno + "valle.png" },
    { nombre: "Volcán", icono: rutaIconos.terreno + "volcan.png" },
    { nombre: "Glaciar", icono: rutaIconos.terreno + "glaciar.png" },
    { nombre: "Río", icono: rutaIconos.terreno + "rio.png" },
    { nombre: "Crater", icono: rutaIconos.terreno + "crater.png" },
    { nombre: "Cavernas", icono: rutaIconos.terreno + "cavernas.png" }
];

// Lista de terrenos especiales (fantasía)
const terrenosEspeciales = [
    { nombre: "Bosque Especial", icono: rutaIconos.terrenoEspecial + "bosque_especial.png" },
    { nombre: "Desierto Cálido Especial", icono: rutaIconos.terrenoEspecial + "desierto_calido_especial.png" },
    { nombre: "Glaciar Especial", icono: rutaIconos.terrenoEspecial + "glaciar_especial.png" },
    { nombre: "Lago Especial", icono: rutaIconos.terrenoEspecial + "lago_especial.png" },
    { nombre: "Montañas Especiales", icono: rutaIconos.terrenoEspecial + "montanas_especial.png" },
    { nombre: "Pantano Especial", icono: rutaIconos.terrenoEspecial + "pantano_especial.png" },
    { nombre: "Volcán Especial", icono: rutaIconos.terrenoEspecial + "volcan_especial.png" }
];

// Función para generar la leyenda en la página
function generarLeyenda() {
    const listaLeyenda = document.getElementById("lista-leyenda");
    if (!listaLeyenda) return;

    // Limpiar lista
    listaLeyenda.innerHTML = "";

    // Función auxiliar para añadir items
    function agregarItems(array) {
        array.forEach(item => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = item.icono;
            img.alt = item.nombre;
            img.width = 32;
            img.height = 32;
            li.appendChild(img);
            li.appendChild(document.createTextNode(" " + item.nombre));
            listaLeyenda.appendChild(li);
        });
    }

    // Agregar todas las categorías
    agregarItems(biomas);
    agregarItems(terrenos);
    agregarItems(terrenosEspeciales);
}

// Ejecutar la función al cargar la página
window.addEventListener("DOMContentLoaded", generarLeyenda);