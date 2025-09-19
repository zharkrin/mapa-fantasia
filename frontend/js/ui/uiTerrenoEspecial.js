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

        // Conectar el checkbox con el estado de dibujado
        this.toggle.addEventListener("change", () => {
            this.mostrar = this.toggle.checked;
            this.redibujar();
        });
    }

    redibujar() {
        if (this.mostrar) {
            this.dibujarTerrenoEspecial.dibujar(this.ctx);
        } else {
            // No se dibujan los lugares singulares
            console.log("Terreno especial oculto");
        }
    }
}