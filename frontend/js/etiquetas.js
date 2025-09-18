// frontend/js/etiquetas.js
// Gestiona las etiquetas y nombres en el mapa (ciudades, montañas, ríos, regiones, etc.)

export function dibujarEtiqueta(ctx, texto, x, y, opciones = {}) {
    const {
        fuente = "12px serif",
        color = "#ffffff",
        borde = "#000000",
        anchoBorde = 2,
        alineacion = "center",
        baseline = "middle"
    } = opciones;

    ctx.font = fuente;
    ctx.textAlign = alineacion;
    ctx.textBaseline = baseline;

    // Borde
    ctx.strokeStyle = borde;
    ctx.lineWidth = anchoBorde;
    ctx.strokeText(texto, x, y);

    // Texto
    ctx.fillStyle = color;
    ctx.fillText(texto, x, y);
}

export function dibujarNombreCiudad(ctx, ciudad) {
    dibujarEtiqueta(ctx, ciudad.nombre, ciudad.x, ciudad.y, {
        fuente: "bold 14px serif",
        color: "#ffffff",
        borde: "#000000"
    });
}

export function dibujarNombreRegion(ctx, region) {
    dibujarEtiqueta(ctx, region.nombre, region.x, region.y, {
        fuente: "bold 18px serif",
        color: "#ffffff",
        borde: "#000000"
    });
}