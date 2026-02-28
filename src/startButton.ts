
import { TasksGeneration } from "./tasksGeneration.js";
import { Progress } from "./progress.js";
import { Completed } from "./completed.js";
import { countOfTasks } from "./countTasks.js";

interface Task {
  id: number;
  title: string;
  level: string;
  date: string;
  description: string;
  createdAt: number;
  status?: "todo" | "in-progress" | "completed";
}

export class startButton {
  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      const startBtn = target.closest(".start-btn") as HTMLButtonElement | null;
      const doneBtn = target.closest(".done-btn") as HTMLButtonElement | null;
      const todoBtn = target.closest(".todo-btn") as HTMLButtonElement | null;

      if (startBtn) {
        this.handleStart(startBtn);
      }

      if (doneBtn) {
        this.handleComplete(doneBtn);
      }

      if (todoBtn) {
        this.handleToDo(todoBtn);
      }
    });
  }

  private handleStart(button: HTMLButtonElement): void {
    const id = Number(button.dataset.id);
    if (Number.isNaN(id)) return;

    const tasks: Task[] = JSON.parse(localStorage.getItem("project") || "[]");
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    // Start always sends a task to "in-progress"
    task.status = "in-progress";

    localStorage.setItem("project", JSON.stringify(tasks));
    refreshAllViews();
  }

  private handleComplete(button: HTMLButtonElement): void {
    const id = Number(button.dataset.id);
    if (Number.isNaN(id)) return;

    const tasks: Task[] = JSON.parse(localStorage.getItem("project") || "[]");
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    task.status = "completed";

    localStorage.setItem("project", JSON.stringify(tasks));
    refreshAllViews();
  }

  private handleToDo(button: HTMLButtonElement): void {
    const id = Number(button.dataset.id);
    if (Number.isNaN(id)) return;

    const tasks: Task[] = JSON.parse(localStorage.getItem("project") || "[]");
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    task.status = "todo";

    localStorage.setItem("project", JSON.stringify(tasks));
    refreshAllViews();
  }
}

export function refreshAllViews(): void {
  new TasksGeneration().displayTasks();
  new Progress().displayTasks();
  new Completed().displayTasks();
  new countOfTasks().updateCount();
}

