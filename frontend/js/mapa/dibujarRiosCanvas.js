// =======================================================
// RÍOS CANVAS 
// =======================================================

import { gridAPixel } from "../utils/coordenadas.js";

export function dibujarRiosCanvas(rios, canvas, tamCelda) {

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rios.forEach(rio => {
        dibujarRio(ctx, rio, tamCelda);
    });
}

function dibujarRio(ctx, puntos, tamCelda) {

    if (!puntos || puntos.length < 2) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 0; i < puntos.length - 1; i++) {

        const p1 = gridAPixel(puntos[i].x, puntos[i].y, tamCelda);
        const p2 = gridAPixel(puntos[i + 1].x, puntos[i + 1].y, tamCelda);

        const grosor = 4 + (i / puntos.length) * 12;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        ctx.lineWidth = grosor;
        ctx.strokeStyle = "#3a7bd5";
        ctx.stroke();
    }
}