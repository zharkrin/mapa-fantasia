// ==============================
// Módulo: nombresGeograficos.js
// Generación de nombres para montañas, ríos y ciudades
// ==============================

// Sílabas base para nombres
const silabasMontana = ["Kar", "Dur", "Mor", "Thal", "Brun", "Gor", "Zar", "Tor", "Krag", "Rhun"];
const silabasRio = ["Al", "Bel", "Nor", "Ser", "Tur", "Val", "Eld", "Lum", "Mar", "Orin"];
const silabasCiudad = ["Ar", "Bel", "Cor", "Dor", "El", "Fen", "Gal", "Har", "Lor", "Mir"];

// Función auxiliar para componer un nombre
function combinarSilabas(lista, longitudMin = 2, longitudMax = 3) {
  const longitud = Math.floor(Math.random() * (longitudMax - longitudMin + 1)) + longitudMin;
  let nombre = "";
  for (let i = 0; i < longitud; i++) {
    nombre += lista[Math.floor(Math.random() * lista.length)];
  }
  return nombre;
}

// Generar nombres con sufijos adecuados
export function generarNombreMontaña() {
  const base = combinarSilabas(silabasMontana);
  const sufijos = ["-dor", "-kar", "-drim", "holl", " peak", " mount"];
  return base + sufijos[Math.floor(Math.random() * sufijos.length)];
}

export function generarNombreRio() {
  const base = combinarSilabas(silabasRio);
  const sufijos = ["-en", "-ir", "-or", "-el", "os", "as"];
  return "Río " + base + sufijos[Math.floor(Math.random() * sufijos.length)];
}

export function generarNombreCiudad() {
  const base = combinarSilabas(silabasCiudad);
  const sufijos = ["grad", "heim", "port", "del", "dor", "ton"];
  return base + sufijos[Math.floor(Math.random() * sufijos.length)];
}