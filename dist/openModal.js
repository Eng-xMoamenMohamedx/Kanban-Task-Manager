import { Clear } from "./clearModal.js";
import { resetModalToCreateState } from "./editeTask.js";
export class ModalController {
    constructor() {
        this.button = document.getElementById("addBtn");
        this.modal = document.getElementById("modalContainer");
        this.clear = new Clear();
        this.init();
    }
    init() {
        this.button?.addEventListener("click", () => {
            resetModalToCreateState();
            this.clear.clearing();
            if (this.modal)
                this.modal.style.display = "block";
        });
    }
}
