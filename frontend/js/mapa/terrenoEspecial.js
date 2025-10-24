// ==========================================================
// Terrenos Especiales - Generador de accidentes fantásticos
// frontend/js/mapa/terrenoEspecial.js
// ==========================================================

// Este módulo genera elementos singulares (volcanes, glaciares, bosques sagrados, etc.)
// según el relieve y los biomas del mapa base.

function generarTerrenoEspecial(mapaBiomas) {
  const ancho = mapaBiomas.length;
  const alto = mapaBiomas[0].length;
  const terrenos = [];

  const tiposEspeciales = [
    { nombre: "bosque_especial", biomas: ["bosque", "bosque_boreal", "bosque_tropical"], probabilidad: 0.002 },
    { nombre: "desierto_calido_especial", biomas: ["desierto_calido", "tierras_aridas"], probabilidad: 0.002 },
    { nombre: "glaciar_especial", biomas: ["nieve", "tundra"], probabilidad: 0.002 },
    { nombre: "lago_especial", biomas: ["costa", "pradera", "pantano"], probabilidad: 0.002 },
    { nombre: "montanas_especial", biomas: ["montanas", "colina"], probabilidad: 0.002 },
    { nombre: "pantano_especial", biomas: ["pantano", "humedal"], probabilidad: 0.002 },
    { nombre: "volcan_especial", biomas: ["montanas", "desierto_calido"], probabilidad: 0.002 },
  ];

  for (let x = 0; x < ancho; x++) {
    for (let y = 0; y < alto; y++) {
      const bioma = mapaBiomas[x][y];

      tiposEspeciales.forEach(tipo => {
        if (tipo.biomas.includes(bioma) && Math.random() < tipo.probabilidad) {
          terrenos.push({
            tipo: tipo.nombre,
            x,
            y,
            nombreFantasia: generarNombreFantasia(tipo.nombre),
            icono: obtenerIconoTerrenoEspecial(tipo.nombre)
          });
        }
      });
    }
  }

  return terrenos;
}

// ==========================================================
// Función para generar nombres fantásticos automáticos
// ==========================================================
function generarNombreFantasia(tipo) {
  const prefijos = [
    "Montañas",
    "Valle",
    "Bosque",
    "Cráter",
    "Desierto",
    "Lago",
    "Ruinas",
    "Ciénaga",
    "Cumbre",
    "Agujero",
    "Fortaleza",
    "Santuario"
  ];

  const sufijos = [
    "del Trueno",
    "de los Ecos",
    "del Sol",
    "de la Luna",
    "de las Sombras",
    "del Dragón",
    "del Silencio",
    "del Alba",
    "del Viento",
    "de Fuego",
    "del Invierno",
    "de Cristal"
  ];

  let base = tipo.split("_")[0];
  let prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  let sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];

  // Combina de forma más natural con un toque de fantasía
  if (base === "volcan") base = "Volcán";
  else if (base === "bosque") base = "Bosque";
  else if (base === "glaciar") base = "Glaciar";
  else if (base === "pantano") base = "Pantano";
  else if (base === "lago") base = "Lago";
  else if (base === "montanas") base = "Montañas";
  else if (base === "desierto_calido") base = "Desierto";

  return `${base} ${sufijo}`;
}

// ==========================================================
// Función para obtener iconos coherentes de terreno especial
// ==========================================================
function obtenerIconoTerrenoEspecial(tipo) {
  const rutaBase = "frontend/static/Img/icons/terreno_especial/";
  const iconos = {
    bosque_especial: `${rutaBase}bosque_especial.png`,
    desierto_calido_especial: `${rutaBase}desierto_calido_especial.png`,
    glaciar_especial: `${rutaBase}glaciar_especial.png`,
    lago_especial: `${rutaBase}lago_especial.png`,
    montanas_especial: `${rutaBase}montanas_especial.png`,
    pantano_especial: `${rutaBase)pantano_especial.png`,
    volcan_especial: `${rutaBase}volcan_especial.png`
  };

  return iconos[tipo] || `${rutaBase}placeholder.png`;
}

// ==========================================================
// Dibuja los iconos de los terrenos especiales en el mapa
// ==========================================================
function dibujarTerrenoEspecial(ctx, terrenos) {
  terrenos.forEach(t => {
    const img = new Image();
    img.src = t.icono;
    img.onload = () => {
      ctx.drawImage(img, t.x - 8, t.y - 8, 24, 24);
    };
  });
}

// ==========================================================
// Genera la lista visible de la leyenda
// ==========================================================
function obtenerIconosTerrenoEspecial() {
  const rutaBase = "frontend/static/Img/icons/terreno_especial/";
  return [
    { nombre: "Bosque mágico", src: `${rutaBase}bosque_especial.png` },
    { nombre: "Desierto ardiente", src: `${rutaBase}desierto_calido_especial.png` },
    { nombre: "Glaciar ancestral", src: `${rutaBase}glaciar_especial.png` },
    { nombre: "Lago encantado", src: `${rutaBase}lago_especial.png` },
    { nombre: "Montañas sagradas", src: `${rutaBase}montanas_especial.png` },
    { nombre: "Pantano maldito", src: `${rutaBase}pantano_especial.png` },
    { nombre: "Volcán dormido", src: `${rutaBase}volcan_especial.png` }
  ];
}

// ==========================================================
// Muestra los nombres en el mapa (textos flotantes)
// ==========================================================
function dibujarNombres(ctx, terrenos) {
  ctx.font = "12px 'Uncial Antiqua', serif";
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.textAlign = "center";

  terrenos.forEach(t => {
    ctx.strokeText(t.nombreFantasia, t.x, t.y - 12);
    ctx.fillText(t.nombreFantasia, t.x, t.y - 12);
  });
}