// frontend/js/mapa/generacionTerreno.js
// Generación de terreno y biomas para el mapa de fantasía

import { Biomas } from "./biomas.js";
import { perlin } from "../perlin.js"; // ruido procedural para altura y temperatura

export function generarTerreno(width, height) {
    // Matrices de datos
    const alturas = [];
    const temperaturas = [];
    const volcanes = [];
    const glaciares = [];

    // Generar alturas y temperaturas usando ruido Perlin
    for (let y = 0; y < height; y++) {
        alturas[y] = [];
        temperaturas[y] = [];
        volcanes[y] = [];
        glaciares[y] = [];
        for (let x = 0; x < width; x++) {
            const nx = x / width - 0.5;
            const ny = y / height - 0.5;

            // Altura normalizada
            const h = (perlin.noise(nx * 3, ny * 3, 0) + 1) / 2;
            alturas[y][x] = h;

            // Temperatura simulada
            const t = (perlin.noise(nx * 2, ny * 2, 100) + 1) / 2;
            temperaturas[y][x] = t;

            // Marcar volcanes: altura alta + ruido extra
            volcanes[y][x] = h > 0.75 && perlin.noise(nx * 5, ny * 5, 50) > 0.6 ? true : false;

            // Marcar glaciares: altura alta + temperatura baja
            glaciares[y][x] = h > 0.6 && t < 0.3 ? true : false;
        }
    }

    // Integrar biomas
    const biomas = new Biomas(width, height);
    const mapaBiomas = biomas.generarMapaBiomas(alturas, temperaturas);

    // Construir mapa final
    const mapa = {
        width,
        height,
        alturas,
        temperaturas,
        biomas: mapaBiomas,
        volcanes,
        glaciares
    };

    return mapa;
}