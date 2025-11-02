// =====================================================
// 🗺️ LEYENDA DE TERRENOS ESPECIALES
// frontend/js/mapa/leyendaTerrenoEspecial.js
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  const contenedorLeyenda = document.getElementById('leyenda-terreno-especial');
  if (!contenedorLeyenda) return;

  // Esperar a que los terrenos especiales se hayan generado
  setTimeout(() => {
    if (!window.terrenosEspecialesGenerados || window.terrenosEspecialesGenerados.length === 0) {
      contenedorLeyenda.innerHTML = `
        <h3>LEYENDA DEL TERRENO</h3>
        <p>No hay terrenos especiales generados aún.</p>
      `;
      return;
    }

    // Crear contenedor principal
    const leyenda = document.createElement('div');
    leyenda.classList.add('leyenda-contenido');

    const titulo = document.createElement('h3');
    titulo.textContent = 'LEYENDA DEL TERRENO';
    leyenda.appendChild(titulo);

    // Crear lista visual con los iconos realmente usados
    const lista = document.createElement('ul');
    lista.classList.add('lista-leyenda');

    // Ruta base de iconos
    const rutaBase = 'frontend/static/img/icons/terreno_especial/';

    // Diccionario base (para asociar el nombre con el icono real)
    const iconosDisponibles = {
      "Bosque especial": "bosque_especial.png",
      "Desierto cálido especial": "desierto_calido_especial.png",
      "Glaciar especial": "glaciar_especial.png",
      "Lago especial": "lago_especial.png",
      "Montañas especiales": "montanas_especial.png",
      "Pantano especial": "pantano_especial.png",
      "Volcán especial": "volcan_especial.png"
    };

    // Evitar duplicados en leyenda
    const usados = new Set();

    window.terrenosEspecialesGenerados.forEach(nombreCompleto => {
      const tipoBase = Object.keys(iconosDisponibles).find(tipo => nombreCompleto.startsWith(tipo));
      if (!tipoBase || usados.has(tipoBase)) return;

      usados.add(tipoBase);

      const li = document.createElement('li');
      li.classList.add('item-leyenda');

      const img = document.createElement('img');
      img.src = rutaBase + iconosDisponibles[tipoBase];
      img.alt = tipoBase;
      img.classList.add('icono-leyenda');

      const texto = document.createElement('span');
      texto.textContent = tipoBase;

      li.appendChild(img);
      li.appendChild(texto);
      lista.appendChild(li);
    });

    leyenda.appendChild(lista);
    contenedorLeyenda.innerHTML = ''; // Limpia cualquier texto previo
    contenedorLeyenda.appendChild(leyenda);

  }, 500); // medio segundo para asegurar carga de terrenos
});