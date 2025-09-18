// frontend/js/rutas/rutas.js
// Sistema de rutas principal (terrestres automáticas)

import { aStar } from "./aStar.js";
import { Grafo } from "./grafo.js";

class Rutas {
    constructor() {
        this.rutasTerrestres = [];
        this.grafo = new Grafo();
    }

    // Añadir conexión entre dos nodos (ciudades, pueblos, etc.)
    agregarConexion(nodoA, nodoB, peso = 1) {
        this.grafo.agregarArista(nodoA, nodoB, peso);
    }

    // Calcular ruta más corta con A*
    calcularRuta(origen, destino) {
        return aStar(this.grafo, origen, destino);
    }

    // Guardar ruta calculada
    guardarRuta(ruta) {
        if (ruta && ruta.length > 0) {
            this.rutasTerrestres.push(ruta);
        }
    }

    // Dibujar rutas en el canvas
    dibujar(ctx) {
        ctx.strokeStyle = "#FFCC00";
        ctx.lineWidth = 2;

        for (const ruta of this.rutasTerrestres) {
            ctx.beginPath();
            for (let i = 0; i < ruta.length - 1; i++) {
                const p1 = ruta[i];
                const p2 = ruta[i + 1];
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
        }
    }

    // Generar automáticamente rutas entre ciudades
    generarAutomaticas(ciudades) {
        if (!ciudades || ciudades.length < 2) return;

        // Crear grafo con todas las ciudades
        for (let i = 0; i < ciudades.length; i++) {
            for (let j = i + 1; j < ciudades.length; j++) {
                const dx = ciudades[i].x - ciudades[j].x;
                const dy = ciudades[i].y - ciudades[j].y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                // Conectar solo si están relativamente cerca
                if (distancia < 300) {
                    this.agregarConexion(ciudades[i], ciudades[j], distancia);
                }
            }
        }

        // Calcular rutas principales
        for (let i = 0; i < ciudades.length - 1; i++) {
            const ruta = this.calcularRuta(ciudades[i], ciudades[i + 1]);
            this.guardarRuta(ruta);
        }
    }

    // Limpiar rutas almacenadas
    limpiar() {
        this.rutasTerrestres = [];
        this.grafo = new Grafo();
    }
}

export { Rutas };