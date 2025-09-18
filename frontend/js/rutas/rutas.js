// frontend/js/rutas/rutas.js
// Sistema de rutas principal (terrestres automáticas y rutas principales)

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
        for (const ruta of this.rutasTerrestres) {
            ctx.beginPath();

            // Color diferente según si es ruta principal o secundaria
            ctx.strokeStyle = ruta.principal ? "#FF3300" : "#FFCC00";
            ctx.lineWidth = ruta.principal ? 3 : 2;

            for (let i = 0; i < ruta.length - 1; i++) {
                const p1 = ruta[i];
                const p2 = ruta[i + 1];
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
        }
    }

    // Generar automáticamente rutas entre ciudades cercanas
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

        // Calcular rutas secundarias (ciudades cercanas en serie)
        for (let i = 0; i < ciudades.length - 1; i++) {
            const ruta = this.calcularRuta(ciudades[i], ciudades[i + 1]);
            if (ruta) {
                ruta.principal = false;
                this.guardarRuta(ruta);
            }
        }
    }

    // Generar rutas principales entre capitales
    generarRutasPrincipales(ciudades) {
        if (!ciudades || ciudades.length < 2) return;

        const capitales = ciudades.filter(c => c.capital || c.tipo === "capital");

        // Si no hay capitales definidas, elegimos las primeras 3 ciudades como capitales
        if (capitales.length === 0) {
            capitales.push(...ciudades.slice(0, Math.min(3, ciudades.length)));
        }

        for (let i = 0; i < capitales.length; i++) {
            for (let j = i + 1; j < capitales.length; j++) {
                const ruta = this.calcularRuta(capitales[i], capitales[j]);
                if (ruta) {
                    ruta.principal = true; // marcar como ruta principal
                    this.guardarRuta(ruta);
                }
            }
        }
    }

    // Limpiar rutas almacenadas
    limpiar() {
        this.rutasTerrestres = [];
        this.grafo = new Grafo();
    }
}

export { Rutas };