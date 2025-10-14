// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// Importación de módulos
import { generarBiomas } from './mapa/biomas.js';
import { generarTerreno } from './mapa/generacionTerreno.js';
import { dibujarMapa } from './mapa/dibujarMapa.js';
import { dibujarNombres } from './mapa/dibujarNombres.js';
import { generarRutasTerrestres } from './rutas/rutas.js';
import { nombresGeograficos } from './mapa/nombresGeograficos.js';
import { terrenoEspecial } from './mapa/terrenoEspecial.js';

// ===============================
// Función principal para generar el mapa completo
// ===============================
function generarMapaCompleto() {
    // 1️⃣ Generar biomas procedurales
    const biomas = generarBiomas();

    // 2️⃣ Generar terrenos normales y especiales
    const terrenos = generarTerreno();
    const especiales = terrenoEspecial(); // volcanes, glaciares, bosques singulares

    // 3️⃣ Generar rutas terrestres procedurales
    const rutas = generarRutasTerrestres();

    // 4️⃣ Dibujar el mapa completo en el canvas
    dibujarMapa(biomas, terrenos, especiales);

    // 5️⃣ Dibujar nombres de ciudades, montañas y ríos
    dibujarNombres(nombresGeograficos, terrenos, especiales);

    // 6️⃣ Dibujar rutas terrestres en el mapa
    rutas.forEach(ruta => {
        // Cada ruta es un array de coordenadas
        // La función drawRuta está definida en frontend/js/ui/drawRutas.js
        window.drawRuta(ruta);
    });

    console.log('✅ Mapa generado automáticamente con todos los elementos.');
}

// ===============================
// Ejecutar al cargar la página
// ===============================
window.addEventListener('DOMContentLoaded', () => {
    generarMapaCompleto();
});