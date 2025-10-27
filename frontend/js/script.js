// ========================================
// Generador de mapa fantástico - Script principal
// frontend/js/script.js
// ========================================

// Configuración de rutas de iconos
const rutasIconos = {
  biomas: "static/Img/icons/biomas/",
  terreno: "static/Img/icons/terreno/",
  terrenoEspecial: "static/Img/icons/terreno_especial/"
};

// Listado de iconos disponibles
const iconos = {
  biomas: [
    "bosque_boreal.png", "bosque_tropical.png", "bosque.png",
    "desierto_calido.png", "desierto_frio.png", "estepa.png",
    "humedal.png", "pradera.png", "sabana.png", "selva_tropical.png",
    "tundra.png", "tierras_aridas.png", "chaparral.png",
    "selva.png", "manglar.png", "jungla.png", "matorral.png"
  ],
  terreno: [
    "acantilado.png", "canon.png", "colina.png", "costa.png",
    "lago.png", "mar.png", "mesera.png", "montanas.png", "oceano.png",
    "pantano.png", "playa.png", "valle.png", "volcan.png",
    "glaciar.png", "rio.png", "crater.png", "cavernas.png"
  ],
  terrenoEspecial: [
    "bosque_especial.png", "desierto_calido_especial.png",
    "glaciar_especial.png", "lago_especial.png",
    "montanas_especial.png", "pantano_especial.png",
    "volcan_especial.png"
  ]
};

// ===============================
// FUNCIONES PRINCIPALES
// ===============================

// Genera una posición aleatoria dentro del mapa
function generarPosicionAleatoria(contenedor) {
  const ancho = contenedor.offsetWidth;
  const alto = contenedor.offsetHeight;
  const x = Math.floor(Math.random() * (ancho - 48));
  const y = Math.floor(Math.random() * (alto - 48));
  return { x, y };
}

// Crea un icono en el mapa
function crearIcono(contenedor, categoria, archivo, nombre = "") {
  const { x, y } = generarPosicionAleatoria(contenedor);

  const img = document.createElement("img");
  img.src = rutasIconos[categoria] + archivo;
  img.alt = archivo;
  img.title = nombre || archivo.replace(".png", "").replaceAll("_", " ");
  img.style.position = "absolute";
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.width = "48px";
  img.style.height = "48px";
  img.style.cursor = "pointer";
  img.onerror = () => {
    img.src = rutasIconos.terreno + "placeholder.png";
    img.title = "❌ No encontrado: " + archivo;
    img.style.opacity = "0.4";
  };

  contenedor.appendChild(img);
  return img;
}

// Genera un mapa con terrenos, biomas y algunos lugares singulares
function generarMapaFantastico() {
  const contenedor = document.getElementById("mapa-container");
  contenedor.innerHTML = "";

  // Generar terrenos (cantidad moderada)
  for (let i = 0; i < 10; i++) {
    const archivo = iconos.terreno[Math.floor(Math.random() * iconos.terreno.length)];
    crearIcono(contenedor, "terreno", archivo);
  }

  // Generar biomas
  for (let i = 0; i < 8; i++) {
    const archivo = iconos.biomas[Math.floor(Math.random() * iconos.biomas.length)];
    crearIcono(contenedor, "biomas", archivo);
  }

  // Generar lugares singulares (terrenos especiales)
  for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) {
    const archivo = iconos.terrenoEspecial[Math.floor(Math.random() * iconos.terrenoEspecial.length)];
    crearIcono(contenedor, "terrenoEspecial", archivo);
  }
}

// ===============================
// INICIALIZACIÓN
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  generarMapaFantastico();

  // Botón recargar si se desea
  const botonRecargar = document.createElement("button");
  botonRecargar.textContent = "🔄 Generar nuevo mapa";
  botonRecargar.style.display = "block";
  botonRecargar.style.margin = "15px auto";
  botonRecargar.onclick = generarMapaFantastico;
  document.body.appendChild(botonRecargar);
});