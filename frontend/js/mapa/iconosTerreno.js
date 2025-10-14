// ================================================
// frontend/js/mapa/iconosTerreno.js
// ================================================
// Mapa centralizado de iconos para biomas, terrenos
// y lugares especiales. Permite que todos los módulos
// accedan fácilmente a las imágenes desde una sola fuente.
// ================================================

export const iconosTerreno = {
  // ==== BIOMAS ====
  acantilado: '/static/img/icons/acantilado.png',
  bosque: '/static/img/icons/bosque.png',
  bosque_boreal: '/static/img/icons/bosque_boreal.png',
  bosque_tropical: '/static/img/icons/bosque_tropical.png',
  cañon: '/static/img/icons/cañon.png',
  chaparral: '/static/img/icons/chaparral.png',
  colina: '/static/img/icons/colina.png',
  costa: '/static/img/icons/costa.png',
  desierto_calido: '/static/img/icons/desierto_calido.png',
  desierto_frio: '/static/img/icons/desierto_frio.png',
  estepa: '/static/img/icons/estepa.png',
  humedal: '/static/img/icons/humedal.png',
  jungla: '/static/img/icons/jungla.png',
  lago: '/static/img/icons/lago.png',
  manglar: '/static/img/icons/manglar.png',
  mar: '/static/img/icons/mar.png',
  meseta: '/static/img/icons/meseta.png',
  montañas: '/static/img/icons/montañas.png',
  oceano: '/static/img/icons/oceano.png',
  pantano: '/static/img/icons/pantano.png',
  playa: '/static/img/icons/playa.png',
  pradera: '/static/img/icons/pradera.png',
  sabana: '/static/img/icons/sabana.png',
  selva: '/static/img/icons/selva.png',
  selva_tropical: '/static/img/icons/selva_tropical.png',
  tundra: '/static/img/icons/tundra.png',
  valle: '/static/img/icons/valle.png',
  tierra_arida: '/static/img/icons/tierra_arida.png',

  // ==== TERRENOS ESPECIALES ====
  volcan: '/static/img/icons/volcan.png',
  glaciar: '/static/img/icons/glaciar.png',
  crater: '/static/img/icons/crater.png',
  rio: '/static/img/icons/rio.png',
  matorral: '/static/img/icons/matorral.png',
  cavernas: '/static/img/icons/cavernas.png',

  // ==== RESERVA / DEFAULT ====
  default: '/static/img/icons/valle.png' // usado si falta un icono
};

// ================================================
// Función auxiliar para obtener la ruta de un icono
// ================================================
export function obtenerIcono(nombre) {
  nombre = nombre?.toLowerCase().trim();
  return iconosTerreno[nombre] || iconosTerreno.default;
}