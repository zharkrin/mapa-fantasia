export function dibujarNombres(ctx, regiones) {
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    regiones.forEach(region => {
        let colorTexto = "white";
        let borde = false;

        if (region.tipo === "helada" || region.tipo === "glaciar") {
            colorTexto = "black";
            borde = true;
        }

        if (borde) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.strokeText(region.nombre, region.centro.x, region.centro.y);
        }

        ctx.fillStyle = colorTexto;
        ctx.fillText(region.nombre, region.centro.x, region.centro.y);
    });
}