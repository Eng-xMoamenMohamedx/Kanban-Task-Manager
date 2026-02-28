export class Clear {
    constructor() {
        this.titleInput = document.getElementById("title");
        this.levelInput = document.getElementById("level");
        this.dateInput = document.getElementById("date");
        this.descriptionInput = document.getElementById("description");
        this.modal = document.getElementById("modalContainer");
        this.submitBtn = document.getElementById("submitBtn");
        this.clearing();
    }
    clearing() {
        this.titleInput.value = "";
        this.levelInput.value = "";
        this.dateInput.value = "";
        this.descriptionInput.value = "";
    }
}
