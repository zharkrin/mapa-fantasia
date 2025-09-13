// ===============================
// Generador de Nombres para Montañas y Ríos
// ===============================

// Prefijos y sufijos para montañas
const prefijosMontaña = ["Monte", "Pico", "Cima", "Sierra", "Cerro"];
const sufijosMontaña = ["del Fuego", "de la Niebla", "de la Sombra", "del Norte", "de Cristal"];

// Prefijos y sufijos para ríos
const prefijosRio = ["Río", "Arroyo", "Curso", "Cauce"];
const sufijosRio = ["Serpenteante", "Tranquilo", "Oscuro", "Rápido", "Eterno"];

// Función para generar nombre de montaña
export function generarNombreMontaña() {
  const prefijo = prefijosMontaña[Math.floor(Math.random() * prefijosMontaña.length)];
  const sufijo = sufijosMontaña[Math.floor(Math.random() * sufijosMontaña.length)];
  return `${prefijo} ${sufijo}`;
}

// Función para generar nombre de río
export function generarNombreRio() {
  const prefijo = prefijosRio[Math.floor(Math.random() * prefijosRio.length)];
  const sufijo = sufijosRio[Math.floor(Math.random() * sufijosRio.length)];
  return `${prefijo} ${sufijo}`;
}

// Ejemplo de uso
/*
for (let i = 0; i < 5; i++) {
  console.log(generarNombreMontaña());
  console.log(generarNombreRio());
}
*/
