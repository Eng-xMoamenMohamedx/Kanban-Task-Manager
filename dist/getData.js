import { Clear } from "./clearModal.js";
import { DueDateValidator } from "./date.js";
import { Validation } from "./validtion.js";
import { refreshAllViews } from "./startButton.js";
export class getData {
    constructor() {
        this.titleInput = document.getElementById("title");
        this.levelInput = document.getElementById("level");
        this.dateInput = document.getElementById("date");
        this.descriptionInput = document.getElementById("description");
        this.modal = document.getElementById("modalContainer");
        this.submitBtn = document.getElementById("submitBtn");
        new DueDateValidator().dateState();
        new Validation().titleLive();
        this.init();
    }
    init() {
        this.submitBtn?.addEventListener("click", () => {
            if (new DueDateValidator().validateDate() && new Validation().validateTitle()) {
                this.createProject();
                new Clear().clearing();
                this.modal.style.display = "none";
                refreshAllViews();
            }
        });
    }
    createProject() {
        const saved = JSON.parse(localStorage.getItem("project") || "[]");
        const newId = saved.length > 0
            ? saved[saved.length - 1].id + 1
            : 1;
        const project = {
            id: newId,
            title: this.titleInput.value,
            level: this.levelInput.value,
            date: this.dateInput.value,
            description: this.descriptionInput.value,
            createdAt: Date.now(),
            status: "todo",
        };
        saved.push(project);
        localStorage.setItem("project", JSON.stringify(saved));
    }
    formatId(id) {
        return "#" + id.toString().padStart(3, "0");
    }
}
