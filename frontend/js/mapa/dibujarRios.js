// =======================================================
// frontend/js/mapa/dibujarRios.js
// Sistema 11 - Ríos con sprites direccionales
// =======================================================

const rutaRios = "frontend/static/img/icons/rio/";

export function dibujarRios(rios) {
  const contenedor = document.getElementById("mapa-container");

  rios.forEach(rio => {
    for (let i = 0; i < rio.length; i++) {
      const actual = rio[i];
      const anterior = rio[i - 1];
      const siguiente = rio[i + 1];

      const img = document.createElement("img");
      img.classList.add("icono-rio");

      img.src = rutaRios + obtenerSpriteRio(anterior, actual, siguiente);
      img.style.left = `${actual.x}px`;
      img.style.top = `${actual.y}px`;

      contenedor.appendChild(img);
    }
  });
}

function obtenerSpriteRio(anterior, actual, siguiente) {
  if (!anterior) return "rio_inicio.png";
  if (!siguiente) return "rio_fin.png";

  const dx1 = actual.x - anterior.x;
  const dy1 = actual.y - anterior.y;

  const dx2 = siguiente.x - actual.x;
  const dy2 = siguiente.y - actual.y;

  // Rectos
  if (dx1 === dx2 && dy1 === dy2) {
    if (dx1 !== 0) return "rio_horizontal.png";
    if (dy1 !== 0) return "rio_vertical.png";
  }

  // Curvas
  if (dx1 === 1 && dy2 === 1) return "rio_curva_se.png";
  if (dx1 === -1 && dy2 === 1) return "rio_curva_so.png";
  if (dx1 === 1 && dy2 === -1) return "rio_curva_ne.png";
  if (dx1 === -1 && dy2 === -1) return "rio_curva_no.png";

  return "rio_horizontal.png"; // fallback
}