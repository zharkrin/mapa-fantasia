// =======================================================
// DIBUJAR LAGOS
// =======================================================

import { gridAPixel } from "../utils/coordenadas.js";

export function dibujarLagos(lagos, mapaContainer, tamCelda) {

    const anteriores = mapaContainer.querySelectorAll(".lago");
    anteriores.forEach(l => l.remove());

    lagos.forEach(lago => {
        lago.forEach(celda => {

            const { x, y } = gridAPixel(celda.x, celda.y, tamCelda);

            const div = document.createElement("div");
            div.className = "lago";

            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            div.style.width = `${tamCelda}px`;
            div.style.height = `${tamCelda}px`;

            mapaContainer.appendChild(div);
        });
    });
}