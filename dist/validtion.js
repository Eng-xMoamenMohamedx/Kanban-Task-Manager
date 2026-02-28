export class Validation {
    constructor() {
        this.titleInput = document.getElementById("title");
        this.error = document.getElementById("titleError");
    }
    validateTitle() {
        if (this.titleInput?.value === "") {
            this.error?.classList.remove("d-none");
            this.titleInput.style.border = "1px solid red";
            return false;
        }
        else {
            this.error?.classList.add("d-none");
            this.titleInput.style.border = "1px solid #dee2e6";
            return true;
        }
    }
    titleLive() {
        this.titleInput?.addEventListener('input', () => {
            this.titleInput?.value === "" ? this.error?.classList.remove("d-none") : this.error?.classList.add("d-none");
            this.titleInput.style.border = "1px solid #dee2e6";
        });
    }
}
