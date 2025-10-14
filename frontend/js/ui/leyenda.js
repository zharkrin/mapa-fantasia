// ================================================
// frontend/js/ui/leyenda.js
// ================================================
// Genera dinámicamente la leyenda de biomas y terrenos especiales
// usando los mismos iconos definidos en iconosTerreno.js
// ================================================

import { iconosTerreno } from '../mapa/iconosTerreno.js';

// Contenedor principal de la leyenda
export function crearLeyenda() {
  const contenedor = document.createElement('div');
  contenedor.id = 'panel-leyenda';
  contenedor.classList.add('leyenda-container');

  const titulo = document.createElement('h3');
  titulo.textContent = '🗺️ Leyenda del Mapa';
  contenedor.appendChild(titulo);

  // Contenedor de iconos
  const lista = document.createElement('div');
  lista.classList.add('leyenda-lista');

  // Iterar sobre los iconos definidos
  Object.entries(iconosTerreno).forEach(([tipo, ruta]) => {
    const item = document.createElement('div');
    item.classList.add('leyenda-item');

    const img = document.createElement('img');
    img.src = ruta;
    img.alt = tipo;
    img.classList.add('leyenda-icono');

    const texto = document.createElement('span');
    texto.textContent = formatearNombre(tipo);

    item.appendChild(img);
    item.appendChild(texto);
    lista.appendChild(item);
  });

  contenedor.appendChild(lista);
  document.body.appendChild(contenedor);
}

// ================================================
// Convierte nombres_de_iconos en texto legible
// ================================================
function formatearNombre(nombre) {
  return nombre
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
