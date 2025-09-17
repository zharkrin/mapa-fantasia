// frontend/js/script.js

import { Etiquetas } from './etiquetas.js';
import { Rutas } from './rutas/rutas.js';
import { DrawRutas } from './ui/drawRutas.js';
import { Biomas } from './mapa/biomas.js';
import { CaminosFinales } from './mapa/caminosFinales.js';
import { GeneracionTerreno } from './mapa/generacionTerreno.js';

// Inicializar mapa
function inicializarMapa() {
    // 1. Generar terreno
    GeneracionTerreno.generar();

    // 2. Generar biomas
    Biomas.asignarBiomas();

    // 3. Generar nombres geográficos
    Etiquetas.agregar('ciudades', 'CiudadEjemplo', { x: 100, y: 150 });
    Etiquetas.agregar('montañas', 'MontañaEjemplo', { x: 300, y: 200 });
    Etiquetas.agregar('rios', 'RíoEjemplo', { x: 50, y: 400 });

    // 4. Generar rutas terrestres
    const ciudades = Etiquetas.obtener('ciudades');
    Rutas.generarTerrestres(ciudades);

    // Opcional: rutas marinas/mágicas si activadas
    const puertos = []; // ejemplo
    Rutas.generarMarinas(puertos);

    const puntosMagicos = []; // ejemplo
    Rutas.generarMagicas(puntosMagicos);

    // 5. Dibujar todo en canvas
    DrawRutas.inicializar('canvasMapa');
    DrawRutas.dibujarMapaCompleto();
}

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarMapa();
});