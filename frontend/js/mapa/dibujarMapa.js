// =======================================================
// DIBUJAR MAPA
// =======================================================

import { dibujarRiosCanvas } from "./dibujarRiosCanvas.js";
import { gridAPixel } from "../utils/coordenadas.js";

const rutaTerrenos = "frontend/static/img/icons/terreno/";
const rutaBiomas = "frontend/static/img/icons/biomas/";
const rutaEspeciales = "frontend/static/img/icons/terreno_especial/";

export function dibujarMapa(terrenos, biomas, especiales, rios, tamCelda) {

    const contenedor = document.getElementById("mapa-container");

    // SOLO limpiar iconos, no todo
    contenedor.querySelectorAll(".icono-terreno, .icono-bioma, .icono-especial")
        .forEach(e => e.remove());

    // =============================
    // CANVAS RÍOS
    // =============================
    let canvas = document.getElementById("capa-rutas");

    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "capa-rutas";
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "3";

        contenedor.appendChild(canvas);
    }

    canvas.width = contenedor.clientWidth;
    canvas.height = contenedor.clientHeight;

    // =============================
    // TERRENOS
    // =============================
    terrenos.forEach(t => {

        const { x, y } = gridAPixel(t.x, t.y, tamCelda);

        const img = document.createElement("img");
        img.src = `${rutaTerrenos}${t.tipo}.png`;
        img.classList.add("icono-terreno");

        img.style.position = "absolute";
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.width = `${tamCelda}px`;
        img.style.height = `${tamCelda}px`;

        contenedor.appendChild(img);
    });

    // =============================
    // BIOMAS
    // =============================
    biomas.forEach(b => {

        const { x, y } = gridAPixel(b.x, b.y, tamCelda);

        const img = document.createElement("img");
        img.src = `${rutaBiomas}${b.tipo}.png`;
        img.classList.add("icono-bioma");

        img.style.position = "absolute";
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.width = `${tamCelda}px`;
        img.style.height = `${tamCelda}px`;

        contenedor.appendChild(img);
    });

    // =============================
    // ESPECIALES
    // =============================
    if (especiales && Array.isArray(especiales)) {
        especiales.forEach(e => {

            const { x, y } = gridAPixel(e.x, e.y, tamCelda);

            const img = document.createElement("img");
            img.src = `${rutaEspeciales}${e.tipo}.png`;
            img.classList.add("icono-especial");

            img.style.position = "absolute";
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            img.style.width = `${tamCelda}px`;
            img.style.height = `${tamCelda}px`;

            contenedor.appendChild(img);
        });
    }

    // =============================
    // RÍOS
    // =============================
    if (rios && rios.length > 0) {
        dibujarRiosCanvas(rios, canvas, tamCelda);
    }
}