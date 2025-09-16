// frontend/js/mapa/dibujarNombres.js

export function dibujarNombres(ctx, regiones) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px serif";

    regiones.forEach(region => {
        if (!region.nombre || !region.centro) return;

        const { x, y } = region.centro;

        // Estilo por defecto: nombres en blanco
        let colorRelleno = "white";
        let colorBorde = "black";

        // Si la región es helada, invertimos: negro con borde blanco
        if (region.tipo === "helada" || region.tipo === "glaciar") {
            colorRelleno = "black";
            colorBorde = "white";
        }

        // Primero borde
        ctx.lineWidth = 3;
        ctx.strokeStyle = colorBorde;
        ctx.strokeText(region.nombre, x, y);

        // Después relleno
        ctx.fillStyle = colorRelleno;
        ctx.fillText(region.nombre, x, y);
    });
}