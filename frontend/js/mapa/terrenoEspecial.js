// ======================================================
// terrenoEspecial.js
// ------------------------------------------------------
// Módulo para la creación de terrenos especiales.
// Estos son lugares únicos o destacados del mapa,
// como volcanes, bosques encantados, lagos místicos, etc.
// ======================================================

/**
 * Lista base de tipos de terrenos especiales.
 * Se pueden ampliar manualmente en el futuro.
 */
const TIPOS_TERRENOS_ESPECIALES = [
  "bosque_especial",
  "desierto_calido_especial",
  "glaciar_especial",
  "lago_especial",
  "montanas_especial",
  "pantano_especial",
  "volcan_especial"
];

/**
 * Genera un número aleatorio de terrenos especiales (por defecto 3–4)
 * dentro de los límites del mapa.
 * @param {number} ancho - Ancho del mapa en píxeles.
 * @param {number} alto - Alto del mapa en píxeles.
 * @param {number} cantidad - Cantidad de lugares especiales a generar.
 * @returns {Array<Object>} Lista de terrenos especiales generados.
 */
function generarTerrenosEspeciales(ancho, alto, cantidad = 3 + Math.floor(Math.random() * 2)) {
  const terrenosEspeciales = [];

  for (let i = 0; i < cantidad; i++) {
    const tipo = TIPOS_TERRENOS_ESPECIALES[Math.floor(Math.random() * TIPOS_TERRENOS_ESPECIALES.length)];

    const x = Math.floor(Math.random() * ancho);
    const y = Math.floor(Math.random() * alto);

    const especial = {
      tipo,
      x,
      y,
      nombre: generarNombreTerrenoEspecial(tipo)
    };

    terrenosEspeciales.push(especial);
  }

  return terrenosEspeciales;
}

/**
 * Devuelve un nombre temático para cada tipo de terreno especial.
 * @param {string} tipo - Tipo de terreno especial.
 * @returns {string} Nombre generado.
 */
function generarNombreTerrenoEspecial(tipo) {
  const prefijos = ["Antiguo", "Místico", "Olvidado", "Sagrado", "Perdido", "Sombrío", "Eterno"];
  const sufijos = ["de las Sombras", "de la Luna", "del Fuego", "de los Espíritus", "del Silencio", "de la Bruma", "del Alba"];

  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];

  const nombres = {
    "bosque_especial": `${prefijo} Bosque ${sufijo}`,
    "desierto_calido_especial": `${prefijo} Desierto ${sufijo}`,
    "glaciar_especial": `${prefijo} Glaciar ${sufijo}`,
    "lago_especial": `${prefijo} Lago ${sufijo}`,
    "montanas_especial": `${prefijo} Cumbres ${sufijo}`,
    "pantano_especial": `${prefijo} Pantano ${sufijo}`,
    "volcan_especial": `${prefijo} Volcán ${sufijo}`
  };

  return nombres[tipo] || `${prefijo} Lugar ${sufijo}`;
}

/**
 * Dibuja los terrenos especiales sobre el mapa.
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas.
 * @param {Array<Object>} terrenosEspeciales - Lista de terrenos especiales.
 */
function dibujarTerrenosEspeciales(ctx, terrenosEspeciales) {
  terrenosEspeciales.forEach(especial => {
    const icono = new Image();
    icono.src = `static/img/icons/terreno_especial/${especial.tipo}.png`;

    icono.onload = () => {
      ctx.drawImage(icono, especial.x - 16, especial.y - 16, 32, 32);
    };

    icono.onerror = () => {
      // En caso de que falte la imagen, dibuja un marcador genérico
      ctx.fillStyle = "#f9d65c";
      ctx.beginPath();
      ctx.arc(especial.x, especial.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "10px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText("?", especial.x - 3, especial.y + 3);
    };
  });
}