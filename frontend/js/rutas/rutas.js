// frontend/js/rutas/rutas.js
// Manejo de rutas terrestres (y más adelante opcionales: mágicas, marítimas)

export class Ruta {
    constructor(origen, destino, tipo = "terrestre") {
        this.origen = origen;
        this.destino = destino;
        this.tipo = tipo; // "terrestre", "maritima", "magica"
    }
}

export function dibujarRuta(ctx, ruta) {
    ctx.beginPath();
    ctx.moveTo(ruta.origen.x, ruta.origen.y);
    ctx.lineTo(ruta.destino.x, ruta.destino.y);

    switch (ruta.tipo) {
        case "terrestre":
            ctx.strokeStyle = "#8B4513"; // marrón caminos
            ctx.setLineDash([]);
            break;
        case "maritima":
            ctx.strokeStyle = "#1E90FF"; // azul marino
            ctx.setLineDash([5, 5]);
            break;
        case "magica":
            ctx.strokeStyle = "#9932CC"; // púrpura
            ctx.setLineDash([2, 4]);
            break;
        default:
            ctx.strokeStyle = "#000000";
            ctx.setLineDash([]);
    }

    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // reset
}