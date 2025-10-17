// ===============================
// Leyenda visual de terrenos especiales
// frontend/js/mapa/leyendaTerrenoEspecial.js
// ===============================

export function generarLeyenda(terrenosEspeciales) {
  const listaLeyenda = document.getElementById('listaLeyenda');
  listaLeyenda.innerHTML = '';

  terrenosEspeciales.forEach((terreno) => {
    const item = document.createElement('li');
    item.classList.add('item-leyenda');

    const icono = document.createElement('img');
    icono.src = `./static/img/icons/${terreno.icono}`;
    icono.alt = terreno.nombre;
    icono.classList.add('icono-leyenda');

    const texto = document.createElement('span');
    texto.textContent = terreno.nombre;

    item.appendChild(icono);
    item.appendChild(texto);
    listaLeyenda.appendChild(item);
  });
}