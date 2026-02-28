import { resetModalToCreateState } from "./editeTask.js";
export class closeIcon {
    constructor() {
        this.closeBtn = document.getElementById("closeBtn");
        this.cancelBtn = document.getElementById("cancelBtn");
        this.modal = document.getElementById("modalContainer");
        this.init();
    }
    init() {
        this.closeBtn?.addEventListener("click", () => {
            resetModalToCreateState();
            if (this.modal)
                this.modal.style.display = "none";
        });
        this.cancelBtn?.addEventListener("click", () => {
            resetModalToCreateState();
            if (this.modal)
                this.modal.style.display = "none";
        });
    }
}
