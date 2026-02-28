import { refreshAllViews } from "./startButton.js";

interface Task {
  id: number;
  createdAt: number;
  [key: string]: unknown;
}

export class DeleteTasks {
  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const tasks: Task[] = JSON.parse(
        localStorage.getItem("project") || "[]",
      );

      const deleteBtn = target.closest(".delete-btn") as HTMLElement | null;
      if (!deleteBtn) return;

      const id = Number(deleteBtn.dataset.id);
      if (Number.isNaN(id)) return;

      const remaining = tasks.filter((task) => task.id !== id);

      // Reindex IDs so they stay sequential: #001, #002, ...
      const reindexed = remaining
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((task, index) => ({
          ...task,
          id: index + 1,
        }));

      localStorage.setItem("project", JSON.stringify(reindexed));
      refreshAllViews();
    });
  }
}
