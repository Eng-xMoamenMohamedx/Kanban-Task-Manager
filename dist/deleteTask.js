import { refreshAllViews } from "./startButton.js";
export class DeleteTasks {
    constructor() {
        this.init();
    }
    init() {
        document.addEventListener("click", (e) => {
            const target = e.target;
            const tasks = JSON.parse(localStorage.getItem("project") || "[]");
            const deleteBtn = target.closest(".delete-btn");
            if (!deleteBtn)
                return;
            const id = Number(deleteBtn.dataset.id);
            if (Number.isNaN(id))
                return;
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
