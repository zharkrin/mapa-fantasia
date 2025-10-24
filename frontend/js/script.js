// ===============================================
// Script principal - Generador de Mapa Fantástico
// frontend/js/script.js
// ===============================================

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mapa");
  const ctx = canvas.getContext("2d");
  const btnGenerar = document.getElementById("btn-generar");
  const btnLeyenda = document.getElementById("btn-leyenda");
  const panelLeyenda = document.getElementById("panel-leyenda");
  const btnCerrarLeyenda = document.getElementById("cerrar-leyenda");

  // Tamaño del mapa
  const ancho = canvas.width;
  const alto = canvas.height;

  // ===============================================
  // FUNCIONES PRINCIPALES
  // ===============================================

  function generarMapa() {
    ctx.clearRect(0, 0, ancho, alto);

    // 1. Generar mapa base con ruido Perlin (terreno)
    const mapaAltura = generarTerrenoPerlin(ancho, alto);

    // 2. Clasificar biomas según altura y humedad simulada
    const mapaBiomas = generarMapaBiomas(mapaAltura);

    // 3. Dibujar biomas
    dibujarMapa(ctx, mapaBiomas, ancho, alto);

    // 4. Añadir terrenos especiales (volcanes, glaciares, etc.)
    const especiales = generarTerrenoEspecial(mapaBiomas);

    // 5. Dibujar terrenos especiales sobre el mapa
    dibujarTerrenoEspecial(ctx, especiales);

    // 6. Mostrar nombres geográficos
    dibujarNombres(ctx, especiales);

    console.log("✅ Mapa generado correctamente");
  }

  // ===============================================
  // FUNCIONES DE LEYENDA
  // ===============================================

  function mostrarLeyenda() {
    const leyendaDiv = document.getElementById("leyenda");
    leyendaDiv.innerHTML = "";

    const iconos = obtenerIconosTerrenoEspecial();

    iconos.forEach(icono => {
      const item = document.createElement("div");
      item.classList.add("leyenda-item");

      const img = document.createElement("img");
      img.src = icono.src;
      img.alt = icono.nombre;

      const texto = document.createElement("span");
      texto.textContent = icono.nombre;

      item.appendChild(img);
      item.appendChild(texto);
      leyendaDiv.appendChild(item);
    });

    panelLeyenda.classList.remove("oculto");
  }

  function cerrarLeyenda() {
    panelLeyenda.classList.add("oculto");
  }

  // ===============================================
  // EVENTOS DE BOTONES
  // ===============================================

  btnGenerar.addEventListener("click", generarMapa);
  btnLeyenda.addEventListener("click", mostrarLeyenda);
  btnCerrarLeyenda.addEventListener("click", cerrarLeyenda);

  // ===============================================
  // GENERACIÓN AUTOMÁTICA INICIAL
  // ===============================================

  generarMapa();
});


// ===============================================
// FUNCIONES AUXILIARES DE TERRENO Y BIOMAS
// ===============================================

// Genera un mapa de altura básico usando Perlin noise
function generarTerrenoPerlin(ancho, alto) {
  const mapa = [];
  const escala = 0.015;

  for (let x = 0; x < ancho; x++) {
    mapa[x] = [];
    for (let y = 0; y < alto; y++) {
      const altura = noise.perlin2(x * escala, y * escala);
      mapa[x][y] = (altura + 1) / 2; // Normalizar entre 0 y 1
    }
  }
  return mapa;
}

// Clasifica biomas según altura
function generarMapaBiomas(mapaAltura) {
  const ancho = mapaAltura.length;
  const alto = mapaAltura[0].length;
  const biomas = [];

  for (let x = 0; x < ancho; x++) {
    biomas[x] = [];
    for (let y = 0; y < alto; y++) {
      const h = mapaAltura[x][y];

      let tipo = "oceano";

      if (h < 0.35) tipo = "mar";
      else if (h < 0.4) tipo = "costa";
      else if (h < 0.45) tipo = "pradera";
      else if (h < 0.55) tipo = "bosque";
      else if (h < 0.65) tipo = "colina";
      else if (h < 0.75) tipo = "montanas";
      else tipo = "nieve";

      biomas[x][y] = tipo;
    }
  }
  return biomas;
}

// Dibuja los biomas según su tipo
function dibujarMapa(ctx, biomas, ancho, alto) {
  const colores = {
    oceano: "#1d3557",
    mar: "#457b9d",
    costa: "#a8dadc",
    pradera: "#8ecae6",
    bosque: "#219ebc",
    colina: "#ffb703",
    montanas: "#fb8500",
    nieve: "#f1faee"
  };

  const imgData = ctx.createImageData(ancho, alto);
  const data = imgData.data;

  for (let x = 0; x < ancho; x++) {
    for (let y = 0; y < alto; y++) {
      const color = colores[biomas[x][y]] || "#000";
      const i = (y * ancho + x) * 4;
      const rgb = hexToRgb(color);

      data[i] = rgb.r;
      data[i + 1] = rgb.g;
      data[i + 2] = rgb.b;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

// Convierte color HEX a RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}