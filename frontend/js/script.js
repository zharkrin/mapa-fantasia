// ===============================
// Script principal
// frontend/js/script.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mapa");
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ===============================
    // Terrenos especiales: volcán, glaciar, bosque singular
    // ===============================
    // Aquí importamos o simulamos los datos desde terrenoEspecial.js
    const terrenosEspeciales = [
        { nombre: "Volcán", icono: "volcan.png" },
        { nombre: "Glaciar", icono: "glaciar.png" },
        { nombre: "Bosque singular", icono: "bosque.png" }
        // Puedes añadir más elementos según tu terrenoEspecial.js
    ];

    // ===============================
    // Función para generar la leyenda automáticamente
    // ===============================
    function generarLeyenda() {
        const leyendaContainer = document.getElementById("leyenda-container");
        leyendaContainer.innerHTML = "<h3>Leyenda</h3>";

        terrenosEspeciales.forEach(terreno => {
            const item = document.createElement("div");
            item.classList.add("leyenda-item");

            const img = document.createElement("img");
            img.src = `static/img/icons/${terreno.icono}`;
            img.alt = terreno.nombre;

            const span = document.createElement("span");
            span.textContent = terreno.nombre;

            item.appendChild(img);
            item.appendChild(span);
            leyendaContainer.appendChild(item);
        });
    }

    // Generar leyenda al cargar
    generarLeyenda();

    // ===============================
    // Función principal del mapa
    // ===============================
    function dibujarMapa() {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aquí se llamarían las funciones de biomas, ríos, ciudades, caminos, etc.
        // Ejemplo:
        // dibujarBiomas(ctx);
        // dibujarRios(ctx);
        // dibujarCiudades(ctx);
        // dibujarTerrenosEspeciales(ctx);

        // Por ahora solo un fondo gris de prueba
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Dibujar mapa inicial
    dibujarMapa();

    // ===============================
    // Ajustar canvas al redimensionar ventana
    // ===============================
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        dibujarMapa();
    });
});