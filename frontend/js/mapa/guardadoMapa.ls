// ==============================
// Módulo: guardadoMapa.js
// Funciones para guardar y cargar mapas y etiquetas en JSON
// ==============================

// Guardar mapa y etiquetas en localStorage
export function guardarMapa(nombre, datosMapa, etiquetas) {
  const proyecto = {
    mapa: datosMapa,
    etiquetas: etiquetas,
    fecha: new Date().toISOString(),
  };
  localStorage.setItem(nombre, JSON.stringify(proyecto));
  alert(`Mapa "${nombre}" guardado correctamente.`);
}

// Cargar mapa desde localStorage
export function cargarMapa(nombre) {
  const proyectoJSON = localStorage.getItem(nombre);
  if (!proyectoJSON) {
    alert(`No se encontró un proyecto con el nombre "${nombre}"`);
    return null;
  }
  const proyecto = JSON.parse(proyectoJSON);
  return proyecto;
}

// Listar proyectos guardados
export function listarProyectos() {
  const proyectos = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    proyectos.push(key);
  }
  return proyectos;
}

// Eliminar proyecto
export function eliminarProyecto(nombre) {
  localStorage.removeItem(nombre);
  alert(`Proyecto "${nombre}" eliminado.`);
}