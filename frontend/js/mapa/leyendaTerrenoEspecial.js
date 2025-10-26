// =============================================================
// Leyenda del Terreno y Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// =============================================================

const LeyendaTerreno = (() => {
    const iconPaths = {
        terreno: "frontend/static/img/icons/terreno/",
        biomas: "frontend/static/img/icons/biomas/",
        terrenoEspecial: "frontend/static/img/icons/terreno_especial/"
    };

    const terrenos = [
        "acantilado", "canon", "colina", "costa", "lago", "mar",
        "mesera", "montanas", "oceano", "pantano", "playa", "valle",
        "volcan", "glaciar", "rio", "crater", "cavernas"
    ];

    const biomas = [
        "bosque_boreal", "bosque_tropical", "bosque",
        "desierto_calido", "desierto_frio", "estepa", "humedal",
        "pradera", "sabana", "selva_tropical", "tundra",
        "tierras_aridas", "chaparral", "selva", "manglar",
        "jungla", "matorral"
    ];

    const terrenosEspeciales = [
        "bosque_especial", "desierto_calido_especial",
        "glaciar_especial", "lago_especial", "montanas_especial",
        "pantano_especial", "volcan_especial"
    ];

    function crearElemento(nombre, tipo) {
        const contenedor = document.createElement("div");
        contenedor.classList.add("leyenda-item");

        const img = document.createElement("img");
        img.src = `${iconPaths[tipo]}${nombre}.png`;
        img.alt = nombre;
        img.onerror = () => {
            console.warn(`⚠️ No se pudo cargar el icono: ${nombre}.png`);
            img.style.display = "none";
        };

        const label = document.createElement("span");
        label.textContent = nombre.replace(/_/g, " ");

        contenedor.appendChild(img);
        contenedor.appendChild(label);
        return contenedor;
    }

    function generarLeyenda() {
        const contenedor = document.getElementById("leyenda-contenido");
        if (!contenedor) return;

        contenedor.innerHTML = ""; // limpia todo

        const secciones = [
            { titulo: "Terrenos", lista: terrenos, tipo: "terreno" },
            { titulo: "Biomas", lista: biomas, tipo: "biomas" },
            { titulo: "Terrenos Especiales", lista: terrenosEspeciales, tipo: "terrenoEspecial" }
        ];

        secciones.forEach(seccion => {
            const titulo = document.createElement("h3");
            titulo.textContent = seccion.titulo;
            contenedor.appendChild(titulo);

            const grid = document.createElement("div");
            grid.classList.add("leyenda-grid");

            seccion.lista.forEach(nombre => {
                grid.appendChild(crearElemento(nombre, seccion.tipo));
            });

            contenedor.appendChild(grid);
        });
    }

    function inicializarBoton() {
        const boton = document.getElementById("leyenda-toggle");
        const panel = document.getElementById("leyenda");

        if (boton && panel) {
            boton.addEventListener("click", () => {
                panel.classList.toggle("visible");
            });
        }
    }

    function init() {
        generarLeyenda();
        inicializarBoton();
    }

    return { init };
})();

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", LeyendaTerreno.init);