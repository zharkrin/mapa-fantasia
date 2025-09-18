// frontend/js/mapa/dibujarMapa.js
// Dibuja el mapa con biomas, volcanes y glaciares

import { coloresBiomas } from "./coloresTerreno.js";

export function dibujarMapa(ctx, mapa, cellSize = 4) {
    const { width, height, biomas, volcanes, glaciares } = mapa;

    ctx.clearRect(0, 0, width * cellSize, height * cellSize);

    // Dibujar biomas como fondo
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const bioma = biomas[y][x];
            const color = coloresBiomas[bioma] || "#808080";

            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    // Dibujar volcanes (rojo intenso con borde negro)
    ctx.font = `${cellSize * 2}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (volcanes[y][x]) {
                ctx.fillStyle = "red";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.fillText("🌋", x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                ctx.strokeText("🌋", x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
            }
        }
    }

    // Dibujar glaciares (copos de nieve en azul)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (glaciares[y][x]) {
                ctx.fillStyle = "lightblue";
                ctx.strokeStyle = "navy";
                ctx.lineWidth = 1;
                ctx.fillText("❄️", x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                ctx.strokeText("❄️", x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
            }
        }
    }
}