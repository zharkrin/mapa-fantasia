/**************************************************
 * DIBUJAR LAGOS
 **************************************************/

function dibujarLagos(lagos, mapaContainer, tamCelda) {
  const anteriores = mapaContainer.querySelectorAll(".lago");
  anteriores.forEach(l => l.remove());

  lagos.forEach(lago => {
    lago.forEach(celda => {
      const div = document.createElement("div");
      div.className = "lago";
      div.style.left = `${celda.x * tamCelda}px`;
      div.style.top = `${celda.y * tamCelda}px`;
      div.style.width = `${tamCelda}px`;
      div.style.height = `${tamCelda}px`;
      mapaContainer.appendChild(div);
    });
  });
}

window.dibujarLagos = dibujarLagos;

