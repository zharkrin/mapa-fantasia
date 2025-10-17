// ===============================
// Script principal
// frontend/js/script.js
// ===============================

// --- Lista de terrenos especiales ---
// Solo terrenos naturales o singulares (sin mágicos ni marítimos)
const terrenosEspeciales = [
  { nombre: "Bosque ancestral", icono: "bosque.png", descripcion: "Un bosque antiguo, lleno de árboles colosales y secretos olvidados." },
  { nombre: "Montañas del trueno", icono: "montanas.png", descripcion: "Picos imponentes donde las tormentas nunca cesan." },
  { nombre: "Desierto de cristal", icono: "desierto_calido.png", descripcion: "Arenas que reflejan la luz como espejos bajo el sol ardiente." },
  { nombre: "Ciénaga sombría", icono: "pantano.png", descripcion: "Pantanos densos donde el aire parece pesado y el suelo traicionero." },
  { nombre: "Llanuras doradas", icono: "pradera.png", descripcion: "Campos interminables de hierba alta que brillan al atardecer." },
  { nombre: "Bosque carmesí", icono: "bosque_tropical.png", descripcion: "Árboles de hojas rojas perpetuas, hogar de criaturas misteriosas." },
  { nombre: "Montañas heladas", icono: "montanas.png", descripcion: "Cordilleras eternamente cubiertas de nieve y hielo." },
  { nombre: "Desfiladero del eco", icono: "canon.png", descripcion: "Gargantas profundas donde cada sonido resuena mil veces." },
  { nombre: "Colinas verdes", icono: "colina.png", descripcion: "Suaves lomas que se pierden en la distancia." },
  { nombre: "Bosque de niebla", icono: "bosque_boreal.png", descripcion: "Un bosque perpetuamente cubierto por una neblina misteriosa." },
  { nombre: "Cañón rojo", icono: "canon.png", descripcion: "Gigantescas formaciones rocosas teñidas de rojo por los minerales." },
  { nombre: "Tierras áridas", icono: "tierras_aridas.png", descripcion: "Zonas resecas donde solo las criaturas más resistentes sobreviven." },
  { nombre: "Praderas del alba", icono: "sabana.png", descripcion: "Llanuras floridas donde el amanecer pinta los colores más bellos." },
  { nombre: "Bosque esmeralda", icono: "bosque.png", descripcion: "Un vasto bosque de tonos verdes intensos y vida abundante." },
  { nombre: "Acantilados del viento", icono: "acantilado.png", descripcion: "Moles de piedra que se alzan sobre el horizonte, azotadas por el viento." },
  { nombre: "Glaciar eterno", icono: "glaciar.png", descripcion: "Una vasta extensión de hielo antiguo y grietas azules." },
  { nombre: "Río plateado", icono: "rio.png", descripcion: "Un ancho río que brilla con reflejos plateados bajo la luna." },
  { nombre: "Crater del sol", icono: "crater.png", descripcion: "Un enorme cráter formado por un antiguo impacto celeste." },
  { nombre: "Cavernas profundas", icono: "cavernas.png", descripcion: "Sistemas de cuevas donde la oscuridad parece tener vida." },
  { nombre: "Matorral seco", icono: "matorral.png", descripcion: "Tierras áridas cubiertas de arbustos retorcidos y resistentes." },
  { nombre: "Manglar del alba", icono: "manglar.png", descripcion: "Bosque costero donde las raíces emergen del agua como esculturas." },
  { nombre: "Selva brumosa", icono: "selva.png", descripcion: "Una jungla densa donde el aire está cargado de humedad y vida." },
  { nombre: "Jungla primigenia", icono: "jungla.png", descripcion: "Vegetación tan espesa que apenas entra la luz." },
];

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa");
  const listaLeyenda = document.getElementById("listaLeyenda");
  const botonLeyenda = document.getElementById("botonLeyenda");
  const panelLeyenda = document.getElementById("panelLeyenda");
  const cerrarLeyenda = document.getElementById("cerrarLeyenda");

  // --- Mostrar íconos de terrenos especiales ---
  terrenosEspeciales.forEach(terreno => {
    const icono = document.createElement("img");
    icono.src = `./static/img/icons/${terreno.icono}`;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-terreno");

    // Posición aleatoria simple
    const x = Math.random() * 90 + 5;
    const y = Math.random() * 80 + 10;
    icono.style.position = "absolute";
    icono.style.left = `${x}%`;
    icono.style.top = `${y}%`;

    mapa.appendChild(icono);
  });

  // --- Crear lista de leyenda ---
  terrenosEspeciales.forEach(terreno => {
    const li = document.createElement("li");
    li.classList.add("item-leyenda");

    const icono = document.createElement("img");
    icono.src = `./static/img/icons/${terreno.icono}`;
    icono.alt = terreno.nombre;
    icono.classList.add("icono-leyenda");

    const texto = document.createElement("span");
    texto.textContent = terreno.nombre;

    li.appendChild(icono);
    li.appendChild(texto);
    listaLeyenda.appendChild(li);
  });

  // --- Mostrar / ocultar panel de leyenda ---
  botonLeyenda.addEventListener("click", () => {
    panelLeyenda.style.display = "block";
  });

  cerrarLeyenda.addEventListener("click", () => {
    panelLeyenda.style.display = "none";
  });
});