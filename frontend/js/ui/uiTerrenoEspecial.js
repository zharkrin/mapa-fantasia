// ===============================
// Control UI Terreno Especial
// frontend/ui/uiTerrenoEspecial.js
// ===============================

export class UITerrenoEspecial {
    constructor(toggleId, dibujarTerrenoEspecial, ctx) {
        this.toggle = document.getElementById(toggleId);
        this.dibujarTerrenoEspecial = dibujarTerrenoEspecial;
        this.ctx = ctx;

        this.mostrar = true;

        this.toggle.addEventListener("change", () => {
            this.mostrar = this.toggle.checked;
            this.redibujar();
        });
    }

    redibujar() {
        if (this.mostrar) {
            this.dibujarTerrenoEspecial.dibujar(this.ctx);
        } else {
            // Si se desactiva, simplemente no se dibujan encima.
            // El mapa base ya está dibujado, así que no borramos nada.
            console.log("Terreno especial oculto");
        }
    }
}