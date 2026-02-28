export class countOfTasks {
    constructor() {
        this.totalTasks = document.getElementById("totalTasks");
        this.progressTasks = document.getElementById("progressTasks");
        this.completedTasks = document.getElementById("completedTasks");
        this.updateCount();
    }
    updateCount() {
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const todoCount = tasks.filter((t) => !t.status || t.status === "todo").length;
        const progressCount = tasks.filter((t) => t.status === "in-progress").length;
        const completedCount = tasks.filter((t) => t.status === "completed").length;
        if (this.totalTasks)
            this.totalTasks.textContent =
                todoCount === 1 ? "1 task" : `${todoCount} tasks`;
        if (this.progressTasks)
            this.progressTasks.textContent =
                progressCount === 1 ? "1 task" : `${progressCount} tasks`;
        if (this.completedTasks)
            this.completedTasks.textContent =
                completedCount === 1 ? "1 task" : `${completedCount} tasks`;
    }
}
