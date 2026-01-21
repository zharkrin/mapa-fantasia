/**************************************************
 * DIBUJAR RÍOS
 * Renderiza los ríos generados sobre el mapa
 **************************************************/

/**
 * Dibuja todos los ríos
 * @param {Array} rios
 * @param {HTMLElement} mapaContainer
 * @param {number} tamCelda
 */
function dibujarRios(rios, mapaContainer, tamCelda) {
  // Eliminar ríos anteriores
  const anteriores = mapaContainer.querySelectorAll(".rio");
  anteriores.forEach(r => r.remove());

  rios.forEach(rio => {
    dibujarRio(rio, mapaContainer, tamCelda);
  });
}

/**
 * Dibuja un solo río
 */
function dibujarRio(rio, mapaContainer, tamCelda) {
  for (let i = 0; i < rio.length - 1; i++) {
    const actual = rio[i];
    const siguiente = rio[i + 1];

    const segmento = document.createElement("div");
    segmento.className = "rio";

    const x1 = actual.x * tamCelda + tamCelda / 2;
    const y1 = actual.y * tamCelda + tamCelda / 2;
    const x2 = siguiente.x * tamCelda + tamCelda / 2;
    const y2 = siguiente.y * tamCelda + tamCelda / 2;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const longitud = Math.sqrt(dx * dx + dy * dy);
    const angulo = Math.atan2(dy, dx) * (180 / Math.PI);

    segmento.style.width = `${longitud}px`;
    segmento.style.height = "4px";
    segmento.style.left = `${x1}px`;
    segmento.style.top = `${y1}px`;
    segmento.style.transform = `rotate(${angulo}deg)`;
    segmento.style.transformOrigin = "0 50%";

    mapaContainer.appendChild(segmento);
  }
}

// Exposición global
window.dibujarRios = dibujarRios;