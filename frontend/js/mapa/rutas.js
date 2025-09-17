// rutas.js
// Control y generación de rutas en el mapa

// Opciones para activar/desactivar rutas especiales
const opcionesRutas = {
    marinas: false,  // rutas marítimas, desactivadas por defecto
    magicas: false   // rutas mágicas, desactivadas por defecto
};

// =============================
// RUTAS TERRESTRES
// =============================

let rutasTerrestres = [];

function generarRutasTerrestres(asentamientos) {
    rutasTerrestres = [];

    for (let i = 0; i < asentamientos.length - 1; i++) {
        const inicio = asentamientos[i];
        const fin = asentamientos[i + 1];

        rutasTerrestres.push({
            inicio: inicio,
            fin: fin,
            dificultad: calcularDificultadTerreno(inicio, fin)
        });
    }
}

function calcularDificultadTerreno(inicio, fin) {
    const dx = fin.x - inicio.x;
    const dy = fin.y - inicio.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 50) return "fácil";
    if (distancia < 150) return "media";
    return "difícil";
}

// =============================
// RUTAS MARINAS (opcionales)
// =============================

let rutasMarinas = [];

function generarRutasMarinas(puertos) {
    if (!opcionesRutas.marinas) return;

    rutasMarinas = [];

    for (let i = 0; i < puertos.length - 1; i++) {
        rutasMarinas.push({
            inicio: puertos[i],
            fin: puertos[i + 1],
            distancia: calcularDistancia(puertos[i], puertos[i + 1])
        });
    }
}

// =============================
// RUTAS MÁGICAS (opcionales)
// =============================

let rutasMagicas = [];

function generarRutasMagicas(nodos) {
    if (!opcionesRutas.magicas) return;

    rutasMagicas = [];

    for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
            if (Math.random() > 0.5) {
                rutasMagicas.push({
                    inicio: nodos[i],
                    fin: nodos[j],
                    estabilidad: Math.random() > 0.7 ? "inestable" : "estable"
                });
            }
        }
    }
}

// =============================
// AUXILIARES
// =============================

function calcularDistancia(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// =============================
// FUNCIÓN PRINCIPAL
// =============================

function generarTodasLasRutas(asentamientos, puertos, nodosMagicos) {
    generarRutasTerrestres(asentamientos);
    generarRutasMarinas(puertos);
    generarRutasMagicas(nodosMagicos);

    return {
        terrestres: rutasTerrestres,
        marinas: rutasMarinas,
        magicas: rutasMagicas
    };
}

// =============================
// EXPORTACIÓN
// =============================

export {
    rutasTerrestres,
    rutasMarinas,
    rutasMagicas,
    opcionesRutas,
    generarTodasLasRutas,
    generarRutasTerrestres,
    generarRutasMarinas,
    generarRutasMagicas
};
