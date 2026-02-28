import { refreshAllViews } from "./startButton.js";
let currentEditingId = null;
export function resetModalToCreateState() {
    currentEditingId = null;
    const titleModal = document.getElementById("titleModal");
    const saveBtn = document.getElementById("saveBtn");
    const submitBtn = document.getElementById("submitBtn");
    if (titleModal)
        titleModal.textContent = "Create New Task";
    if (saveBtn)
        saveBtn.classList.add("d-none");
    if (submitBtn)
        submitBtn.classList.remove("d-none");
}
export class editeBtnTask {
    constructor() {
        this.titleInput = document.getElementById("title");
        this.levelInput = document.getElementById("level");
        this.dateInput = document.getElementById("date");
        this.descriptionInput = document.getElementById("description");
        this.modal = document.getElementById("modalContainer");
        this.submitBtn = document.getElementById("submitBtn");
        this.saveBtn = document.getElementById("saveBtn");
        this.titleModal = document.getElementById("titleModal");
        this.init();
    }
    init() {
        document.addEventListener("click", (e) => {
            const target = e.target;
            const editBtn = target.closest(".edite-btn");
            if (!editBtn)
                return;
            const id = Number(editBtn.dataset.id);
            if (Number.isNaN(id))
                return;
            this.openEditForm(id);
        });
        this.saveBtn?.addEventListener("click", () => {
            if (currentEditingId == null)
                return;
            const tasks = JSON.parse(localStorage.getItem("project") || "[]");
            const task = tasks.find((t) => t.id === currentEditingId);
            if (!task || !this.titleInput || !this.levelInput || !this.dateInput || !this.descriptionInput)
                return;
            task.title = this.titleInput.value;
            task.level = this.levelInput.value;
            task.date = this.dateInput.value;
            task.description = this.descriptionInput.value;
            localStorage.setItem("project", JSON.stringify(tasks));
            refreshAllViews();
            resetModalToCreateState();
            if (this.modal)
                this.modal.style.display = "none";
        });
    }
    openEditForm(id) {
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        this.titleInput.value = task.title;
        this.descriptionInput.value = task.description ?? "";
        this.levelInput.value = task.level;
        this.dateInput.value = task.date ?? "";
        currentEditingId = id;
        this.titleModal.textContent = "Edit Task";
        this.saveBtn.classList.remove("d-none");
        this.submitBtn.classList.add("d-none");
        this.modal.style.display = "block";
    }
}
