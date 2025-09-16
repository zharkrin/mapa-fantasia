export function generarCaminosAvanzados(regiones, maxDist = 250) {
    const caminos = [];

    for (let i = 0; i < regiones.length; i++) {
        for (let j = i + 1; j < regiones.length; j++) {
            const r1 = regiones[i];
            const r2 = regiones[j];
            const dx = r1.centro.x - r2.centro.x;
            const dy = r1.centro.y - r2.centro.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= maxDist) {
                let tipo = "comercial";
                if (r1.tipo === "montaña" || r2.tipo === "montaña") tipo = "militar";
                if (Math.random() < 0.1) tipo = "magico";

                caminos.push({ origen: r1, destino: r2, tipo });
            }
        }
    }

    return caminos;
}

export function dibujarCaminosAvanzados(ctx, caminos) {
    caminos.forEach(c => {
        switch (c.tipo) {
            case "comercial":
                ctx.strokeStyle = "#FFD700";
                ctx.lineWidth = 2;
                break;
            case "militar":
                ctx.strokeStyle = "#FF4500";
                ctx.lineWidth = 2.5;
                break;
            case "magico":
                ctx.strokeStyle = "#4B0082";
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);
                break;
            default:
                ctx.strokeStyle = "#AAAAAA";
                ctx.lineWidth = 1.5;
        }

        ctx.beginPath();
        ctx.moveTo(c.origen.centro.x, c.origen.centro.y);
        ctx.lineTo(c.destino.centro.x, c.destino.centro.y);
        ctx.stroke();
        ctx.setLineDash([]);
    });
}