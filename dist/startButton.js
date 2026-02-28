import { TasksGeneration } from "./tasksGeneration.js";
import { Progress } from "./progress.js";
import { Completed } from "./completed.js";
import { countOfTasks } from "./countTasks.js";
export class startButton {
    constructor() {
        this.init();
    }
    init() {
        document.addEventListener("click", (e) => {
            const target = e.target;
            const startBtn = target.closest(".start-btn");
            const doneBtn = target.closest(".done-btn");
            const todoBtn = target.closest(".todo-btn");
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
    handleStart(button) {
        const id = Number(button.dataset.id);
        if (Number.isNaN(id))
            return;
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        // Start always sends a task to "in-progress"
        task.status = "in-progress";
        localStorage.setItem("project", JSON.stringify(tasks));
        refreshAllViews();
    }
    handleComplete(button) {
        const id = Number(button.dataset.id);
        if (Number.isNaN(id))
            return;
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        task.status = "completed";
        localStorage.setItem("project", JSON.stringify(tasks));
        refreshAllViews();
    }
    handleToDo(button) {
        const id = Number(button.dataset.id);
        if (Number.isNaN(id))
            return;
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        task.status = "todo";
        localStorage.setItem("project", JSON.stringify(tasks));
        refreshAllViews();
    }
}
export function refreshAllViews() {
    new TasksGeneration().displayTasks();
    new Progress().displayTasks();
    new Completed().displayTasks();
    new countOfTasks().updateCount();
}
