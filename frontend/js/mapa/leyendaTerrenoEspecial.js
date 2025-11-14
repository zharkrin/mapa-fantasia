// ======================================================================
// Leyenda de Terrenos Especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
//
// Genera automáticamente una leyenda visual con todos los iconos
// definidos en TerrenoEspecial.js (ICONOS_TERRENO).
// ======================================================================


// Contenedor donde se incrustará la leyenda
const contenedorLeyendaTerrenoEspecial = document.getElementById("leyenda-terreno-especial");

// Si no existe el contenedor, no seguimos
if (!contenedorLeyendaTerrenoEspecial) {
    console.error("⚠ No existe el div #leyenda-terreno-especial en el HTML.");
}


// ------------------------------------------------------------
// Crear leyenda de Terreno Especial
// ------------------------------------------------------------
function generarLeyendaTerrenoEspecial() {
    if (!window.ICONOS_TERRENO) {
        console.error("⚠ ICONOS_TERRENO no está disponible.");
        return;
    }

    // Crear el contenedor principal
    const wrapper = document.createElement("div");
    wrapper.className = "leyenda-wrapper";

    // Título plegable
    const titulo = document.createElement("div");
    titulo.className = "leyenda-titulo";
    titulo.textContent = "Terrenos Especiales";

    // Cuerpo donde están los íconos
    const cuerpo = document.createElement("div");
    cuerpo.className = "leyenda-cuerpo";

    // Evento para plegar / desplegar
    titulo.addEventListener("click", () => {
        cuerpo.classList.toggle("oculto");
    });

    // Agregar cada icono de terreno
    Object.entries(ICONOS_TERRENO).forEach(([clave, icono]) => {
        const fila = document.createElement("div");
        fila.className = "leyenda-item";

        const img = document.createElement("img");
        img.src = icono.options.iconUrl;
        img.className = "leyenda-icono";

        const nombre = document.createElement("span");
        nombre.textContent = formatearNombre(clave);

        fila.appendChild(img);
        fila.appendChild(nombre);
        cuerpo.appendChild(fila);
    });

    wrapper.appendChild(titulo);
    wrapper.appendChild(cuerpo);
    contenedorLeyendaTerrenoEspecial.appendChild(wrapper);
}


// ------------------------------------------------------------
// Helper: Formatear nombre
// ------------------------------------------------------------
function formatearNombre(nombre) {
    return nombre.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}


// ------------------------------------------------------------
// Ejecutar generación automáticamente
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", generarLeyendaTerrenoEspecial);