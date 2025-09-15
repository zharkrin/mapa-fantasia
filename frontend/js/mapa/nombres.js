// nombres.js
// Generación de nombres procedimentales para ríos, montañas y caminos

function nombreAleatorio(prefijos, sufijos) {
  const p = prefijos[Math.floor(Math.random() * prefijos.length)];
  const s = sufijos[Math.floor(Math.random() * sufijos.length)];
  return p + s;
}

export function generarNombreRio() {
  const prefijos = ["Aru", "Bel", "Dar", "Fen", "Lor", "Mor", "Ner", "Tor", "Var"];
  const sufijos = ["na", "ion", "ar", "el", "or", "an", "um", "ir", "os"];
  return "Río " + nombreAleatorio(prefijos, sufijos);
}

export function generarNombreMontaña() {
  const prefijos = ["Kar", "Dur", "Thar", "Bryn", "Zor", "Khal", "Grim"];
  const sufijos = ["dor", "ruk", "var", "mir", "dak", "thur", "gor"];
  return "Monte " + nombreAleatorio(prefijos, sufijos);
}

export function generarNombreCamino() {
  const prefijos = ["Viejo", "Gran", "Oscuro", "Alto", "Ancho", "Recio", "Polvoriento"];
  const sufijos = [" Sendero", " Camino", " Paso", " Senderillo", " Atajo"];
  return nombreAleatorio(prefijos, sufijos);
}