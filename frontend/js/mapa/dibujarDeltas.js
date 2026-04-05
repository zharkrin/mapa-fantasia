// =======================================================
// DIBUJAR DELTAS
// =======================================================

import { gridAPixel } from "../utils/coordenadas.js";

export function dibujarDeltas(deltas, mapaContainer, tamCelda) {

    const anteriores = mapaContainer.querySelectorAll(".delta");
    anteriores.forEach(d => d.remove());

    deltas.forEach(brazo => {
        brazo.forEach(celda => {

            const { x, y } = gridAPixel(celda.x, celda.y, tamCelda);

            const div = document.createElement("div");
            div.className = "delta";

            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            div.style.width = `${tamCelda}px`;
            div.style.height = `${tamCelda}px`;

            mapaContainer.appendChild(div);
        });
    });
}