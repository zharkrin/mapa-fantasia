/**************************************************
 * DIBUJAR PANTANOS
 **************************************************/

function dibujarPantanos(pantanos, mapaContainer, tamCelda) {
  const anteriores = mapaContainer.querySelectorAll(".pantano");
  anteriores.forEach(p => p.remove());

  pantanos.forEach(celda => {
    const div = document.createElement("div");
    div.className = "pantano";
    div.style.left = `${celda.x * tamCelda}px`;
    div.style.top = `${celda.y * tamCelda}px`;
    div.style.width = `${tamCelda}px`;
    div.style.height = `${tamCelda}px`;
    mapaContainer.appendChild(div);
  });
}

window.dibujarPantanos = dibujarPantanos;