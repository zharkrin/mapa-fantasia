// frontend/js/mapa/caminosCurvos.js
import { coloresTerreno } from "./coloresTerreno.js";

/**
 * Genera caminos curvos usando A* simplificado sobre una cuadrícula
 * @param {Array} regiones - lista de regiones con {centro, tipo}
 * @param {number} ancho - ancho del mapa
 * @param {number} alto - alto del mapa
 * @param {number} gridSize - tamaño de la cuadrícula
 * @returns {Array} caminos con lista de puntos [{origen, destino, ruta:[{x,y}], tipo}]
 */
export function generarCaminosCurvos(regiones, ancho, alto, gridSize = 20) {
    const caminos = [];

    // Convertir mapa a cuadrícula de costos
    const cols = Math.ceil(ancho / gridSize);
    const rows = Math.ceil(alto / gridSize);
    const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(1));

    // Obstáculos: montañas y glaciares
    regiones.forEach(r => {
        if (r.tipo === "montaña" || r.tipo === "glaciar") {
            const col = Math.floor(r.centro.x / gridSize);
            const row = Math.floor(r.centro.y / gridSize);
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                grid[row][col] = 9999; // muy alto costo
            }
        }
    });

    // Generar caminos entre regiones cercanas
    for (let i = 0; i < regiones.length; i++) {
        for (let j = i + 1; j < regiones.length; j++) {
            const r1 = regiones[i];
            const r2 = regiones[j];
            const dx = r1.centro.x - r2.centro.x;
            const dy = r1.centro.y - r2.centro.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= 250) {
                const tipo = (r1.tipo === "montaña" || r2.tipo === "montaña") ? "militar" : "comercial";

                const ruta = aStarRuta(r1.centro, r2.centro, grid, gridSize);
                caminos.push({ origen: r1, destino: r2, ruta, tipo });
            }
        }
    }

    return caminos;
}

/**
 * Dibuja caminos curvos en canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} caminos
 */
export function dibujarCaminosCurvos(ctx, caminos) {
    caminos.forEach(c => {
        switch (c.tipo) {
            case "comercial":
                ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 2; break;
            case "militar":
                ctx.strokeStyle = "#FF4500"; ctx.lineWidth = 2.5; break;
            case "magico":
                ctx.strokeStyle = "#4B0082"; ctx.lineWidth = 3; ctx.setLineDash([5,5]); break;
            default:
                ctx.strokeStyle = "#AAAAAA"; ctx.lineWidth = 1.5;
        }

        ctx.beginPath();
        const ruta = c.ruta;
        if (ruta.length > 0) {
            ctx.moveTo(ruta[0].x, ruta[0].y);
            for (let i = 1; i < ruta.length; i++) {
                ctx.lineTo(ruta[i].x, ruta[i].y);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
    });
}

/**
 * A* simplificado en cuadrícula
 */
function aStarRuta(start, end, grid, gridSize) {
    const cols = grid[0].length;
    const rows = grid.length;

    function heuristic(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    const startNode = { x: Math.floor(start.x / gridSize), y: Math.floor(start.y / gridSize), g:0, f:0, parent:null };
    const endNode = { x: Math.floor(end.x / gridSize), y: Math.floor(end.y / gridSize) };

    const open = [startNode];
    const closed = new Set();

    while(open.length > 0) {
        open.sort((a,b) => a.f - b.f);
        const current = open.shift();
        const key = `${current.x},${current.y}`;
        closed.add(key);

        if(current.x === endNode.x && current.y === endNode.y) {
            // reconstruir ruta
            const path = [];
            let node = current;
            while(node) {
                path.push({x: node.x*gridSize + gridSize/2, y: node.y*gridSize + gridSize/2});
                node = node.parent;
            }
            return path.reverse();
        }

        const vecinos = [
            {x: current.x+1, y: current.y},
            {x: current.x-1, y: current.y},
            {x: current.x, y: current.y+1},
            {x: current.x, y: current.y-1},
        ];

        vecinos.forEach(v => {
            if(v.x < 0 || v.x >= cols || v.y < 0 || v.y >= rows) return;
            const k = `${v.x},${v.y}`;
            if(closed.has(k)) return;
            const g = current.g + grid[v.y][v.x];
            const f = g + heuristic(v, endNode);
            const existing = open.find(n => n.x===v.x && n.y===v.y);
            if(!existing || g < existing.g) {
                if(existing){ existing.g = g; existing.f = f; existing.parent = current; }
                else open.push({x:v.x, y:v.y, g, f, parent:current});
            }
        });
    }

    return []; // sin ruta encontrada
}
