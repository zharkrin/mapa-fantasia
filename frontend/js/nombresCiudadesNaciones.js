// ===============================
// Generador de Nombres para Ciudades y Naciones
// ===============================

// Prefijos y sufijos para ciudades
const prefijosCiudad = ["Port", "San", "Nuevo", "Villa", "Monte"];
const sufijosCiudad = ["del Norte", "del Sol", "de la Luna", "de los Valles", "del Río"];

// Prefijos y sufijos para naciones
const prefijosNacion = ["Reino", "Imperio", "Confederación", "Ducado", "Principado"];
const sufijosNacion = ["de Eldoria", "del Norte", "de Auria", "de Valdoria", "de Drakmor"];

// Función para generar nombre de ciudad
export function generarNombreCiudad() {
  const prefijo = prefijosCiudad[Math.floor(Math.random() * prefijosCiudad.length)];
  const sufijo = sufijosCiudad[Math.floor(Math.random() * sufijosCiudad.length)];
  return `${prefijo} ${sufijo}`;
}

// Función para generar nombre de nación
export function generarNombreNacion() {
  const prefijo = prefijosNacion[Math.floor(Math.random() * prefijosNacion.length)];
  const sufijo = sufijosNacion[Math.floor(Math.random() * sufijosNacion.length)];
  return `${prefijo} ${sufijo}`;
}

// Función para generar rutas comerciales entre ciudades
// cities: array de objetos {x, y, nombre}
// devuelve array de rutas [{origen, destino}]
export function generarRutasComerciales(cities) {
  const rutas = [];
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      if (Math.random() < 0.5) { // probabilidad de tener ruta
        rutas.push({
          origen: cities[i],
          destino: cities[j]
        });
      }
    }
  }
  return rutas;
}
