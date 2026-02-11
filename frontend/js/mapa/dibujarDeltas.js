/**************************************************
 * DIBUJAR DELTAS
 **************************************************/

function dibujarDeltas(deltas, mapaContainer, tamCelda) {
  const anteriores = mapaContainer.querySelectorAll(".delta");
  anteriores.forEach(d => d.remove());

  deltas.forEach(brazo => {
    brazo.forEach(celda => {
      const div = document.createElement("div");
      div.className = "delta";
      div.style.left = `${celda.x * tamCelda}px`;
      div.style.top = `${celda.y * tamCelda}px`;
      div.style.width = `${tamCelda}px`;
      div.style.height = `${tamCelda}px`;
      mapaContainer.appendChild(div);
    });
  });
}

window.dibujarDeltas = dibujarDeltas;