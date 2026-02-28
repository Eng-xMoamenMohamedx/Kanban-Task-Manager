import { Clear } from "./clearModal.js";
import { DueDateValidator } from "./date.js";
import { Validation } from "./validtion.js";
import { refreshAllViews } from "./startButton.js";

interface Project {
  id: number;
  title: string;
  level: string;
  date: string;
  description: string;
  createdAt: number;
  status: "todo" | "in-progress" | "completed";
}

export class getData {
  private titleInput: HTMLInputElement | null;
  private levelInput: HTMLSelectElement | null;
  private dateInput: HTMLInputElement | null;
  private descriptionInput: HTMLTextAreaElement | null;
  private modal: HTMLElement | null;
  private submitBtn: HTMLButtonElement | null;

  constructor() {
 
    this.titleInput = document.getElementById("title") as HTMLInputElement;
    this.levelInput = document.getElementById("level") as HTMLSelectElement;
    this.dateInput = document.getElementById("date") as HTMLInputElement;
    this.descriptionInput = document.getElementById(
      "description",
    ) as HTMLTextAreaElement;
    this.modal = document.getElementById("modalContainer") as HTMLElement;
    this.submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    new DueDateValidator().dateState();
    new Validation().titleLive();
    this.init();
  }

  private init(): void {
    this.submitBtn?.addEventListener("click", () => {
      if (new DueDateValidator().validateDate() && new Validation().validateTitle()) {
        this.createProject();
        new Clear().clearing();
         this.modal!.style.display = "none";
        refreshAllViews();
      }
    });
  }

  private createProject(): void {
    const saved: Project[] = JSON.parse(
      localStorage.getItem("project") || "[]",
    );

    const newId = saved.length > 0 
    ? saved[saved.length - 1]!.id + 1 
  : 1;

    const project: Project = {
      id: newId,
      title: this.titleInput!.value,
      level: this.levelInput!.value,
      date: this.dateInput!.value,
      description: this.descriptionInput!.value,
      createdAt: Date.now(),
      status: "todo",
    };

    saved.push(project);
    localStorage.setItem("project", JSON.stringify(saved));
  }

  public formatId(id: number): string {
  return "#" + id.toString().padStart(3, "0");
}
}
