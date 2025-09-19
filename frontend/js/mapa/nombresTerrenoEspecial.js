// ===============================
// Nombres para Terreno Especial
// frontend/js/mapa/nombresTerrenoEspecial.js
// ===============================
// Se encarga de generar nombres únicos para
// volcanes, glaciares, bosques legendarios,
// montes y valles especiales.
// ===============================

export class NombresTerrenoEspecial {
    constructor() {
        // Listas base, neutrales
        this.volcanes = ["Monte de Fuego", "La Garganta Ardiente", "Pico de Ceniza", "El Yelmo Llameante"];
        this.glaciares = ["Valle Helado", "Lengua de Hielo", "La Corona Blanca", "Grieta Glacial"];
        this.bosques = ["Bosque Viejo", "El Robledal Oscuro", "Selva Susurrante", "Arboleda Perdida"];
        this.montes = ["Monte del Destino", "Pico de la Tormenta", "La Cumbre Solitaria", "Colmillo de Piedra"];
        this.valles = ["Valle del Viento Helado", "Quebrada Sombría", "Las Lomas Verdes", "Desfiladero Silente"];
    }

    // Devuelve un nombre aleatorio de la lista indicada
    generarNombre(tipo) {
        let lista;
        switch (tipo) {
            case "volcan":
                lista = this.volcanes;
                break;
            case "glaciar":
                lista = this.glaciares;
                break;
            case "bosque":
                lista = this.bosques;
                break;
            case "monte":
                lista = this.montes;
                break;
            case "valle":
                lista = this.valles;
                break;
            default:
                lista = ["Lugar Desconocido"];
        }
        return lista[Math.floor(Math.random() * lista.length)];
    }
}