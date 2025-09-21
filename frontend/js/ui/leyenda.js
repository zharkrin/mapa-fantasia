// ===========================================
// Leyenda del mapa (solo terrenos especiales)
// frontend/js/ui/leyenda.js
// ===========================================

/**
 * Genera y dibuja la leyenda del mapa en el contenedor #leyenda
 * Usa los datos de frontend/js/mapa/nombresTerrenoEspecial.js
 */
function generarLeyenda() {
    const contenedor = document.getElementById("leyenda");
    if (!contenedor) {
        console.warn("⚠️ No se encontró el contenedor #leyenda en el HTML.");
        return;
    }

    // Limpiar contenido previo
    contenedor.innerHTML = "";

    // Crear título
    const titulo = document.createElement("h3");
    titulo.textContent = "Terrenos Especiales";
    contenedor.appendChild(titulo);

    // Obtener terrenos especiales
    const listaTerrenos = obtenerTerrenosEspeciales();

    if (listaTerrenos.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "No hay terrenos especiales definidos.";
        contenedor.appendChild(aviso);
        return;
    }

    // Crear lista
    const ul = document.createElement("ul");
    ul.classList.add("leyenda-lista");

    listaTerrenos.forEach(terreno => {
        const li = document.createElement("li");
        li.classList.add("leyenda-item");

        const icono = document.createElement("img");
        icono.src = terreno.icono;
        icono.alt = terreno.nombre;
        icono.classList.add("leyenda-icono");

        const texto = document.createElement("span");
        texto.textContent = terreno.nombre;

        li.appendChild(icono);
        li.appendChild(texto);
        ul.appendChild(li);
    });

    contenedor.appendChild(ul);
}

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", generarLeyenda);