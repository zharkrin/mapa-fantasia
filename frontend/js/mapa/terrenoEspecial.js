// =====================================================
// 🌋 TERRENO ESPECIAL - Generador Automático
// frontend/js/mapa/terrenoEspecial.js
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  const mapaContainer = document.getElementById('mapa-container');
  if (!mapaContainer) return;

  const ancho = mapaContainer.offsetWidth;
  const alto = mapaContainer.offsetHeight;

  // Calcular número de iconos según el tamaño del mapa
  const areaMapa = ancho * alto;
  const densidad = 0.000005; // Ajusta este valor para más o menos iconos
  const NUM_ICONOS_ESPECIALES = Math.max(3, Math.floor(areaMapa * densidad));

  // Rutas base para los iconos
  const rutaBase = 'frontend/static/img/icons/terreno_especial/';

  // Tipos de terrenos especiales disponibles
  const terrenosEspeciales = [
    { nombre: "Bosque especial", icono: "bosque_especial.png" },
    { nombre: "Desierto cálido especial", icono: "desierto_calido_especial.png" },
    { nombre: "Glaciar especial", icono: "glaciar_especial.png" },
    { nombre: "Lago especial", icono: "lago_especial.png" },
    { nombre: "Montañas especiales", icono: "montanas_especial.png" },
    { nombre: "Pantano especial", icono: "pantano_especial.png" },
    { nombre: "Volcán especial", icono: "volcan_especial.png" }
  ];

  const usados = new Set();

  for (let i = 0; i < NUM_ICONOS_ESPECIALES; i++) {
    const tipo = terrenosEspeciales[Math.floor(Math.random() * terrenosEspeciales.length)];
    const nombreUnico = `${tipo.nombre} ${i + 1}`;
    usados.add(nombreUnico);

    const icono = document.createElement('img');
    icono.src = rutaBase + tipo.icono;
    icono.alt = nombreUnico;
    icono.classList.add('icono-terreno-especial');

    // Colocar en posición aleatoria dentro del mapa
    const x = Math.random() * (ancho - 64);
    const y = Math.random() * (alto - 64);
    icono.style.left = `${x}px`;
    icono.style.top = `${y}px`;

    mapaContainer.appendChild(icono);
  }

  // Guardar los nombres generados para la leyenda
  window.terrenosEspecialesGenerados = Array.from(usados);
});