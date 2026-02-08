/**************************************************
 * DIBUJAR AFLUENTES
 **************************************************/

function dibujarAfluentes(afluentes, mapaContainer, tamCelda) {
  const anteriores = mapaContainer.querySelectorAll(".afluente");
  anteriores.forEach(a => a.remove());

  afluentes.forEach(afluente => {
    afluente.forEach(celda => {
      const div = document.createElement("div");
      div.className = "afluente";
      div.style.left = `${celda.x * tamCelda}px`;
      div.style.top = `${celda.y * tamCelda}px`;
      div.style.width = `${tamCelda}px`;
      div.style.height = `${tamCelda}px`;
      mapaContainer.appendChild(div);
    });
  });
}

window.dibujarAfluentes = dibujarAfluentes;