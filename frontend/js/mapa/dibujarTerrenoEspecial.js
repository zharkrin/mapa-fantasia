// ===============================
// Dibujo de Terreno Especial
// frontend/js/mapa/dibujarTerrenoEspecial.js
// ===============================
//
// Aquí se dibujan en el canvas los lugares singulares:
// - Volcanes
// - Glaciares
// - Bosques singulares
// - Montañas legendarias
// - Valles especiales
//
// Estos se sobreponen al mapa base
// ===============================

// -------------------------------
// Función principal de dibujo
// -------------------------------
export function dibujarTerrenoEspecial(ctx, terrenosEspeciales) {
    if (!terrenosEspeciales || terrenosEspeciales.length === 0) return;

    terrenosEspeciales.forEach(especial => {
        ctx.fillStyle = especial.color;

        // Dibujar cada tipo con un estilo diferenciado
        switch (especial.tipo) {
            case "volcan":
                dibujarVolcan(ctx, especial.x, especial.y, especial.nombre, especial.color);
                break;
            case "glaciar":
                dibujarGlaciar(ctx, especial.x, especial.y, especial.nombre, especial.color);
                break;
            case "bosque_singular":
                dibujarBosqueSingular(ctx, especial.x, especial.y, especial.nombre, especial.color);
                break;
            case "montaña_singular":
                dibujarMontañaSingular(ctx, especial.x, especial.y, especial.nombre, especial.color);
                break;
            case "valle_singular":
                dibujarValleSingular(ctx, especial.x, especial.y, especial.nombre, especial.color);
                break;
            default:
                // fallback: un simple círculo
                ctx.beginPath();
                ctx.arc(especial.x, especial.y, 4, 0, 2 * Math.PI);
                ctx.fill();
        }
    });
}

// -------------------------------
// Estilos por tipo
// -------------------------------
function dibujarVolcan(ctx, x, y, nombre, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - 6);
    ctx.lineTo(x - 5, y + 5);
    ctx.lineTo(x + 5, y + 5);
    ctx.closePath();
    ctx.fill();

    dibujarNombre(ctx, x, y, nombre, "#FF4500");
}

function dibujarGlaciar(ctx, x, y, nombre, color) {
    ctx.beginPath();
    ctx.rect(x - 5, y - 5, 10, 10);
    ctx.fill();

    dibujarNombre(ctx, x, y, nombre, "#ADD8E6");
}

function dibujarBosqueSingular(ctx, x, y, nombre, color) {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();

    dibujarNombre(ctx, x, y, nombre, "#228B22");
}

function dibujarMontañaSingular(ctx, x, y, nombre, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - 7);
    ctx.lineTo(x - 6, y + 6);
    ctx.lineTo(x + 6, y + 6);
    ctx.closePath();
    ctx.fill();

    dibujarNombre(ctx, x, y, nombre, "#A9A9A9");
}

function dibujarValleSingular(ctx, x, y, nombre, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, 8, 4, 0, 0, 2 * Math.PI);
    ctx.fill();

    dibujarNombre(ctx, x, y, nombre, "#32CD32");
}

// -------------------------------
// Función auxiliar: nombres
// -------------------------------
function dibujarNombre(ctx, x, y, nombre, colorTexto) {
    ctx.fillStyle = colorTexto || "#FFFFFF";
    ctx.font = "10px serif";
    ctx.textAlign = "center";
    ctx.fillText(nombre, x, y - 10);
}