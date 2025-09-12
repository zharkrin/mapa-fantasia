// frontend/js/nombres-biomas.js
// Generador de nombres para regiones según su bioma

// Prefijos y sufijos para los nombres
const prefijos = {
  oceano: ["Mar de", "Océano de", "Aguas de", "Bahía de"],
  costa: ["Costa de", "Playas de", "Litorales de"],
  desierto: ["Desierto de", "Arenas de", "Erial de"],
  llanura: ["Llanuras de", "Praderas de", "Campos de"],
  bosque: ["Bosque de", "Bosques de", "Arboleda de"],
  selva: ["Selva de", "Jungla de"],
  tundra: ["Tundra de", "Tierras gélidas de"],
  montaña: ["Montañas de", "Cordillera de"],
  pico: ["Pico de", "Cumbres de", "Alturas de"]
};

const sufijos = [
  "Lorien", "Karghul", "Nerevar", "Thalos", "Yrkan", 
  "Elandor", "Farnor", "Veyra", "Khazrak", "Ulthar",
  "Mornak", "Zyrell", "Dorthan", "Ilmar", "Quenra"
];

// Función auxiliar: elige un elemento aleatorio de un array
function elegirAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Genera un nombre según el bioma
export function generarNombreBioma(tipo) {
  const inicio = prefijos[tipo] ? elegirAleatorio(prefijos[tipo]) : "Tierras de";
  const fin = elegirAleatorio(sufijos);
  return `${inicio} ${fin}`;
}

// Genera múltiples nombres para prueba o pre-carga
export function generarNombresBiomas(listaTipos) {
  const resultados = {};
  for (let tipo of listaTipos) {
    resultados[tipo] = generarNombreBioma(tipo);
  }
  return resultados;
}
