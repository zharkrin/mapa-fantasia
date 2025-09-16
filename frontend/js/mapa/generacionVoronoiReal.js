import { coloresTerreno } from "./coloresTerreno.js";

export function generarVoronoiReal(ancho, alto, numRegiones) {
    const puntos = [];
    for (let i = 0; i < numRegiones; i++) {
        puntos.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            tipo: asignarTipo(),
            nombre: `Región ${i + 1}`,
            centro: { x: Math.random() * ancho, y: Math.random() * alto }
        });
    }

    const voronoi = d3.Delaunay.from(
        puntos,
        d => d.x,
        d => d.y
    ).voronoi([0, 0, ancho, alto]);

    const regiones = puntos.map((p, i) => {
        const poligono = voronoi.cellPolygon(i);
        return {
            ...p,
            poligono: poligono || [
                [p.x - 10, p.y - 10],
                [p.x + 10, p.y - 10],
                [p.x + 10, p.y + 10],
                [p.x - 10, p.y + 10]
            ]
        };
    });

    return regiones;
}

function asignarTipo() {
    const r = Math.random();
    if (r < 0.1) return "montaña";
    if (r < 0.2) return "desierto";
    if (r < 0.35) return "bosque";
    if (r < 0.45) return "helada";
    if (r < 0.55) return "glaciar";
    return "llanura";
}

export function dibujarVoronoiReal(ctx, regiones) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    regiones.forEach(region => {
        const color = coloresTerreno[region.tipo] || "#cccccc";
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(region.poligono[0][0], region.poligono[0][1]);
        for (let i = 1; i < region.poligono.length; i++) {
            ctx.lineTo(region.poligono[i][0], region.poligono[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}