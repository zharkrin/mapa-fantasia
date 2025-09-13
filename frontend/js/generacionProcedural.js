// ===============================
// Generación Procedural - Módulo Central
// ===============================

// Importaciones de otros módulos
import { generarTerreno } from "./generacionTerreno.js";
import { aStar } from "./aStar.js";

// Objeto principal que orquesta la generación
export const GeneracionProcedural = {
  configuracion: {
    ancho: 200,
    alto: 200,
    semilla: Date.now(),
    escalaRuido: 50,
    porcentajeAgua: 0.3,
  },

  // Inicializa la generación del mundo
  inicializar(config = {}) {
    this.configuracion = { ...this.configuracion, ...config };
    console.log("⚙️ Configuración aplicada:", this.configuracion);
  },

  // Genera un mundo completo (mapa base + características)
  generarMundo() {
    console.log("🌍 Generando mundo...");

    const { ancho, alto, semilla, escalaRuido, porcentajeAgua } =
      this.configuracion;

    // Generar el terreno base
    const mapaTerreno = generarTerreno(ancho, alto, {
      semilla,
      escala: escalaRuido,
      agua: porcentajeAgua,
    });

    // Aquí podemos agregar pasos adicionales:
    // - generación de biomas
    // - colocación de recursos
    // - distribución de ciudades, etc.

    console.log("✅ Mundo generado.");
    return mapaTerreno;
  },

  // Ejemplo de cómo usar el algoritmo de caminos
  calcularRuta(mapa, inicio, destino) {
    console.log("🧭 Calculando ruta entre", inicio, "y", destino);
    return aStar(mapa, inicio, destino);
  },
};