// =======================================================
// DIBUJAR PANTANOS 
// =======================================================

import { gridAPixel } from "../utils/coordenadas.js";

export function dibujarPantanos(pantanos, mapaContainer, tamCelda) {

    const anteriores = mapaContainer.querySelectorAll(".pantano");
    anteriores.forEach(p => p.remove());

    pantanos.forEach(celda => {

        const { x, y } = gridAPixel(celda.x, celda.y, tamCelda);

        const div = document.createElement("div");
        div.className = "pantano";

        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = `${tamCelda}px`;
        div.style.height = `${tamCelda}px`;

        mapaContainer.appendChild(div);
    });
}