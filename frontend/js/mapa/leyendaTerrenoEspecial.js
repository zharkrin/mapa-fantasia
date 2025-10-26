// --- leyendaTerrenoEspecial.js ---
// Genera la leyenda visual a partir de los iconos disponibles

document.addEventListener("DOMContentLoaded", () => {
    const btnMostrarLeyenda = document.getElementById("btnMostrarLeyenda");
    const btnCerrarLeyenda = document.getElementById("btnCerrarLeyenda");
    const leyenda = document.getElementById("leyenda");
    const contenedorLeyenda = document.getElementById("leyenda-contenido");

    // Categorías con sus rutas
    const categorias = {
        "Terrenos": "static/img/icons/terreno/",
        "Biomas": "static/img/icons/biomas/",
        "Terrenos Especiales": "static/img/icons/terreno_especial/"
    };

    // Archivos conocidos por categoría
    const iconos = {
        "Terrenos": [
            "acantilado.png", "canon.png", "colina.png", "costa.png", "lago.png",
            "mar.png", "meseta.png", "montanas.png", "oceano.png", "pantano.png",
            "playa.png", "valle.png", "volcan.png", "glaciar.png", "rio.png",
            "crater.png", "cavernas.png"
        ],
        "Biomas": [
            "bosque_boreal.png", "bosque_tropical.png", "bosque.png", "desierto_calido.png",
            "desierto_frio.png", "estepa.png", "humedal.png", "pradera.png", "sabana.png",
            "selva_tropical.png", "tundra.png", "tierras_aridas.png", "chaparral.png",
            "selva.png", "manglar.png", "jungla.png", "matorral.png"
        ],
        "Terrenos Especiales": [
            "bosque_especial.png", "desierto_calido_especial.png", "glaciar_especial.png",
            "lago_especial.png", "montanas_especial.png", "pantano_especial.png", "volcan_especial.png"
        ]
    };

    // --- Construir la leyenda ---
    function construirLeyenda() {
        contenedorLeyenda.innerHTML = ""; // limpiar
        for (const categoria in categorias) {
            const ruta = categorias[categoria];

            // Título de categoría
            const titulo = document.createElement("h3");
            titulo.textContent = categoria;
            contenedorLeyenda.appendChild(titulo);

            const gridCategoria = document.createElement("div");
            gridCategoria.classList.add("categoria-grid");

            // Crear ítems
            iconos[categoria].forEach(nombreArchivo => {
                const item = document.createElement("div");
                item.classList.add("leyenda-item");

                const img = document.createElement("img");
                img.src = ruta + nombreArchivo;
                img.alt = nombreArchivo.replace(".png", "").replace(/_/g, " ");
                img.onerror = () => {
                    img.src = "static/img/icons/placeholder.png";
                };

                const etiqueta = document.createElement("span");
                etiqueta.textContent = img.alt;

                item.appendChild(img);
                item.appendChild(etiqueta);
                gridCategoria.appendChild(item);
            });

            contenedorLeyenda.appendChild(gridCategoria);
        }
    }

    // Mostrar / ocultar
    btnMostrarLeyenda.addEventListener("click", () => {
        construirLeyenda();
        leyenda.classList.remove("oculto");
    });

    btnCerrarLeyenda.addEventListener("click", () => {
        leyenda.classList.add("oculto");
    });
});