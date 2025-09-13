// ===============================
// Generación Procedural - Módulo Central
// ===============================

// Importamos el módulo de terreno y A*
import { GeneracionTerreno } from "./mapa/generacionTerreno.js";
import { aStar } from "./aStar.js";
import { dibujarEtiquetas } from "./etiquetas.js";

export const GeneracionProcedural = {
  configuracion: {
    ancho: 200,
    alto: 200,
    semilla: Date.now(),
    escalaRuido: 50,
    porcentajeAgua: 0.3,
  },

  // Inicializa parámetros de generación
  inicializar(config = {}) {
    this.configuracion = { ...this.configuracion, ...config };
    console.log("⚙️ Configuración aplicada:", this.configuracion);
  },

  // Genera el mundo completo
  generarMundo() {
    console.log("🌍 Generando mundo...");

    const { ancho, alto, semilla, escalaRuido, porcentajeAgua } =
      this.configuracion;

    // Generar el terreno base usando mapa/generacionTerreno.js
    const mapaTerreno = GeneracionTerreno.generarMapa(
      ancho,
      alto,
      escalaRuido,
      semilla
    );

    // Podemos agregar pasos extra luego:
    // - biomas
    // - ciudades
    // - ríos
    // - recursos
    console.log("✅ Mundo generado.");
    return mapaTerreno;
  },

  // Calcula ruta con A* entre dos puntos del mapa
  calcularRuta(mapa, inicio, destino) {
    console.log("🧭 Calculando ruta entre", inicio, "y", destino);
    return aStar(mapa, inicio, destino);
  },

  // Dibuja etiquetas en el mapa (opcional)
  pintarEtiquetas(ctx, etiquetas) {
    dibujarEtiquetas(ctx, etiquetas);
  },
};