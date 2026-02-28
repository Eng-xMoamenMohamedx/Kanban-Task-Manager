import { refreshAllViews } from "./startButton.js";

interface Task {
  id: number;
  title: string;
  level: string;
  date: string;
  description: string;
  createdAt: number;
  status?: "todo" | "in-progress" | "completed";
}

let currentEditingId: number | null = null;

export function resetModalToCreateState(): void {
  currentEditingId = null;
  const titleModal = document.getElementById("titleModal");
  const saveBtn = document.getElementById("saveBtn");
  const submitBtn = document.getElementById("submitBtn");
  if (titleModal) titleModal.textContent = "Create New Task";
  if (saveBtn) saveBtn.classList.add("d-none");
  if (submitBtn) submitBtn.classList.remove("d-none");
}

export class editeBtnTask {
  private titleInput: HTMLInputElement | null;
  private levelInput: HTMLSelectElement | null;
  private dateInput: HTMLInputElement | null;
  private modal: HTMLElement | null;
  private descriptionInput: HTMLTextAreaElement | null;
  private submitBtn: HTMLButtonElement | null;
  private saveBtn: HTMLButtonElement | null;
  private titleModal: HTMLElement | null;

  constructor() {
    this.titleInput = document.getElementById("title") as HTMLInputElement;
    this.levelInput = document.getElementById("level") as HTMLSelectElement;
    this.dateInput = document.getElementById("date") as HTMLInputElement;
    this.descriptionInput = document.getElementById(
      "description",
    ) as HTMLTextAreaElement;
    this.modal = document.getElementById("modalContainer") as HTMLElement;
    this.submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    this.saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
    this.titleModal = document.getElementById("titleModal") as HTMLElement;
    this.init();
  }

  private init(): void {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const editBtn = target.closest(".edite-btn") as HTMLElement;
      if (!editBtn) return;

      const id = Number(editBtn.dataset.id);
      if (Number.isNaN(id)) return;
      this.openEditForm(id);
    });

    this.saveBtn?.addEventListener("click", () => {
      if (currentEditingId == null) return;
      const tasks: Task[] = JSON.parse(
        localStorage.getItem("project") || "[]",
      );
      const task = tasks.find((t) => t.id === currentEditingId);
      if (!task || !this.titleInput || !this.levelInput || !this.dateInput || !this.descriptionInput) return;

      task.title = this.titleInput.value;
      task.level = this.levelInput.value;
      task.date = this.dateInput.value;
      task.description = this.descriptionInput.value;

      localStorage.setItem("project", JSON.stringify(tasks));
      refreshAllViews();
      resetModalToCreateState();
      if (this.modal) this.modal.style.display = "none";
    });
  }

  private openEditForm(id: number): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem("project") || "[]");
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    this.titleInput!.value = task.title;
    this.descriptionInput!.value = task.description ?? "";
    this.levelInput!.value = task.level;
    this.dateInput!.value = task.date ?? "";

    currentEditingId = id;
    this.titleModal!.textContent = "Edit Task";
    this.saveBtn!.classList.remove("d-none");
    this.submitBtn!.classList.add("d-none");
    this.modal!.style.display = "block";
  }
}
