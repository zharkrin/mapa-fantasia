// frontend/js/script.js

// --- Lista de terrenos especiales ---
// Solo terrenos naturales o singulares (sin mágicos ni marítimos)
const terrenosEspeciales = [
  { nombre: "Bosque Ancestral", icono: "bosque_ancestral.png", descripcion: "Un bosque antiguo, lleno de árboles colosales y secretos olvidados." },
  { nombre: "Montañas del Trueno", icono: "montanas_trueno.png", descripcion: "Picos imponentes donde las tormentas nunca cesan." },
  { nombre: "Desierto de Cristal", icono: "desierto_cristal.png", descripcion: "Arenas que reflejan la luz como espejos bajo el sol ardiente." },
  { nombre: "Ciénaga Sombría", icono: "cienaga_sombría.png", descripcion: "Pantanos densos donde el aire parece pesado y el suelo traicionero." },
  { nombre: "Llanuras Doradas", icono: "llanuras_doradas.png", descripcion: "Campos interminables de hierba alta que brillan al atardecer." },
  { nombre: "Bosque Carmesí", icono: "bosque_carmesi.png", descripcion: "Árboles de hojas rojas perpetuas, hogar de criaturas misteriosas." },
  { nombre: "Montañas Heladas", icono: "montanas_heladas.png", descripcion: "Cordilleras eternamente cubiertas de nieve y hielo." },
  { nombre: "Desfiladero del Eco", icono: "desfiladero_eco.png", descripcion: "Gargantas profundas donde cada sonido resuena mil veces." },
  { nombre: "Colinas Verdes", icono: "colinas_verdes.png", descripcion: "Suaves lomas que se pierden en la distancia." },
  { nombre: "Bosque de Niebla", icono: "bosque_niebla.png", descripcion: "Un bosque perpetuamente cubierto por una neblina mágica." },
  { nombre: "Cañón Rojo", icono: "canon_rojo.png", descripcion: "Gigantescas formaciones rocosas teñidas de rojo por los minerales." },
  { nombre: "Tierras Áridas", icono: "tierras_aridas.png", descripcion: "Zonas resecas donde solo las criaturas más resistentes sobreviven." },
  { nombre: "Praderas del Alba", icono: "praderas_alba.png", descripcion: "Llanuras floridas donde el amanecer pinta los colores más bellos." },
  { nombre: "Bosque Esmeralda", icono: "bosque_esmeralda.png", descripcion: "Un vasto bosque de tonos verdes intensos y vida abundante." },
  { nombre: "Acantilados del Viento", icono: "acantilados_viento.png", descripcion: "Moles de piedra que se alzan sobre el horizonte, azotadas por el viento." },
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

    // Posiciones aleatorias (simple ejemplo)
    const x = Math.random() * 90 + 5; // margen de 5%
    const y = Math.random() * 80 + 10; // margen de 10%
    icono.style.position = "absolute";
    icono.style.left = `${x}%`;
    icono.style.top = `${y}%`;

    mapa.appendChild(icono);
  });

  // --- Crear la lista de la leyenda ---
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