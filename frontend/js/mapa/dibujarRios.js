/**************************************************
 * DIBUJAR RÍOS CON ANCHURA PROGRESIVA
 **************************************************/

function dibujarRios(rios, mapaContainer, tamCelda) {
  const anteriores = mapaContainer.querySelectorAll(".rio");
  anteriores.forEach(r => r.remove());

  rios.forEach(rio => {
    const longitud = rio.length;

    rio.forEach((celda, index) => {

      // Cálculo de grosor progresivo
      const factor = index / longitud; // 0 → 1
      const grosor = 1 + Math.floor(factor * 2); 
      // mínimo 1 celda, máximo 3

      pintarCeldaRio(celda, mapaContainer, tamCelda);

      // Expandimos lateralmente según grosor
      if (grosor > 1) {
        const vecinos = obtenerVecinos(celda);
        vecinos.slice(0, grosor - 1).forEach(v => {
          pintarCeldaRio(v, mapaContainer, tamCelda);
        });
      }
    });
  });
}

function pintarCeldaRio(celda, mapaContainer, tamCelda) {
  const div = document.createElement("div");
  div.className = "rio";
  div.style.left = `${celda.x * tamCelda}px`;
  div.style.top = `${celda.y * tamCelda}px`;
  div.style.width = `${tamCelda}px`;
  div.style.height = `${tamCelda}px`;
  mapaContainer.appendChild(div);
}

window.dibujarRios = dibujarRios;