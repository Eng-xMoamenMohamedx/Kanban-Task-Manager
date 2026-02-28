import { Timer } from "./timer.js";
import { DueDateValidator } from "./date.js";
import { countOfTasks } from "./countTasks.js";
export class Progress {
    constructor() {
        this.container = document.getElementById("progressContainer");
        this.timer = new Timer();
        this.formated = new DueDateValidator();
        this.init();
    }
    init() {
        this.displayTasks();
    }
    displayTasks() {
        if (!this.container)
            return;
        const tasks = JSON.parse(localStorage.getItem("project") || "[]");
        const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
        this.container.innerHTML = "";
        if (inProgressTasks.length === 0) {
            this.container.innerHTML = Progress.EMPTY_HTML;
            new countOfTasks().updateCount();
            return;
        }
        inProgressTasks.forEach((task) => {
            const taskCard = `
                     <div id="tasksContainer" class="row gap-3">
                     
                      <div class="col ">
                                        <div class="p-3 w-100 task-card ring">
                                            <div class="d-flex justify-content-between align-items-center top-part">
                                                <div
                                                    class="d-flex justify-content-center align-items-center flex-row-reverse gap-2">
                                                    <div class="num-task">${this.formatId(task.id)}</div>
                                                    <div class="state-spot state-spot-progress"></div>
                                                </div>

                                                <div
                                                    class="d-flex justify-content-center align-items-center gap-1 hide">
                                                    <button class="btn edite-btn" data-id="${task.id}"><i
                                                            class="fa-solid fa-pen fa-xs"></i></button>
                                                    <button class="btn delete-btn" data-id="${task.id}"><i
                                                            class="fa-solid fa-trash-can fa-xs"></i></button>
                                                </div>

                                            </div>

                                            <h3 class="title-part mb-2">${task.title}</h3>
                                            <p class="desc-part mb-3">${task.description}</p>

                                            <div class="d-flex align-items-center gap-2 mb-3">
                                                <span class="d-flex justify-content-center align-items-center ${this.getBadgeClass(task.level)}">
                                                    <div class="point-state"></div>${this.getNameState(task.level)}
                                                </span>
                                                <span
                                                    class="d-flex justify-content-center align-items-center lable-2"><i
                                                        class="fa-solid fa-triangle-exclamation"></i>Overdue</span>
                                            </div>

                                            <div class="d-flex align-items-center border-bottom gap-3 mb-6 pb-6">
                                                <div
                                                    class="d-flex justify-content-center align-items-center gap-1 date-part">
                                                    <i class="fa-regular fa-calendar"></i>
                                                    <span class="date-formated${task.id}"></span>
                                                </div>
                                                <div
                                                    class="d-flex justify-content-center align-items-center gap-1 time-part">
                                                    <i class="fa-regular fa-clock"></i>
                                                    <span class="live-time" data-time="${task.createdAt}"></span>
                                                </div>
                                            </div>

                                            <div class="d-flex  align-items-center gap-2">
                                                <button
                                                        class="btn todo-btn" data-id="${task.id}"><i class="fa-solid fa-rotate-left"></i>To Do</button>
                                                <button class="btn done-btn" data-id="${task.id}"><i
                                                        class="fa-solid fa-check"></i>Complete</button>
                                            </div>

                                        </div>
                                    </div>
                     
                     </div>
      `;
            this.container.innerHTML += taskCard;
        });
        this.timer.startLiveTimer(this.container);
        this.formated.onChangeDate();
        new countOfTasks().updateCount();
    }
    getBadgeClass(level) {
        switch (level.toLowerCase()) {
            case "high":
                return "lable-red";
            case "medium":
                return "lable-yellow";
            case "low":
                return "lable-blue";
            default:
                return "bg-secondary";
        }
    }
    getNameState(level) {
        switch (level.toLowerCase()) {
            case "high":
                return "High Priority";
            case "medium":
                return "Medium";
            case "low":
                return "Low";
            default:
                return "None";
        }
    }
    formatId(id) {
        return "#" + id.toString().padStart(3, "0");
    }
}
Progress.EMPTY_HTML = `
    <div class="d-flex justify-content-center align-items-center flex-column">
      <i style="color: #90a1b9;" class="fa-solid fa-folder-open fa-3x opacity-50"></i>
      <p class="m-0 mt-2 st-inner1">No tasks yet</p>
      <p class="m-0 st-inner2">Click + to add one</p>
    </div>
  `;
