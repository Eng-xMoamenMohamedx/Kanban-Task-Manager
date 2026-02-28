import { Timer } from "./timer.js";
import { DueDateValidator } from "./date.js";
import { countOfTasks } from "./countTasks.js";
export class TasksGeneration {
  private container: HTMLElement | null;
  private submitBtn: HTMLButtonElement | null;
  private timer: Timer;
  private formated: DueDateValidator;

  constructor() {
    this.container = document.getElementById("parentContainer");
    this.submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    this.timer = new Timer();
    this.formated = new DueDateValidator();

    this.init();
  }

  private init(): void {
    this.displayTasks();
  }

  private static readonly EMPTY_HTML = `
    <div class="d-flex justify-content-center align-items-center flex-column">
      <i style="color: #90a1b9;" class="fa-solid fa-folder-open fa-3x opacity-50"></i>
      <p class="m-0 mt-2 st-inner1">No tasks yet</p>
      <p class="m-0 st-inner2">Click + to add one</p>
    </div>
  `;

  public displayTasks(): void {
    if (!this.container) return;
    const tasks: any[] = JSON.parse(localStorage.getItem("project") || "[]");
    const todoTasks = tasks.filter(
      (task) => !task.status || task.status === "todo",
    );
    this.container.innerHTML = "";

    if (todoTasks.length === 0) {
      this.container.innerHTML = TasksGeneration.EMPTY_HTML;
      new countOfTasks().updateCount();
      return;
    }

    todoTasks.forEach((task) => {
      const taskCard = `
                     <div id="tasksContainer" class="row gap-3">
                     
                      <div class="col ">
                                        <div class="p-3 w-100 task-card ring">
                                            <div class="d-flex justify-content-between align-items-center top-part">
                                                <div
                                                    class="d-flex justify-content-center align-items-center flex-row-reverse gap-2">
                                                    <div class="num-task">${this.formatId(task.id)}</div>
                                                    <div class="state-spot state-spot-todo"></div>
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
                                                        class="btn start-btn" data-id="${task.id}"><i
                                                        class="fa-solid fa-play"></i>Start</button>
                                                <button class="btn done-btn" data-id="${task.id}"><i
                                                        class="fa-solid fa-check"></i>Complete</button>
                                            </div>

                                        </div>
                                    </div>
                     
                     </div>
      `;
      this.container!.innerHTML += taskCard;
    });

    this.timer.startLiveTimer(this.container);
    this.formated.onChangeDate();
    new countOfTasks().updateCount();
  }

  private formatId(id: number): string {
    return "#" + id.toString().padStart(3, "0");
  }

  private getBadgeClass(level: string): string {
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

  private getNameState(level: string): string {
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
}
