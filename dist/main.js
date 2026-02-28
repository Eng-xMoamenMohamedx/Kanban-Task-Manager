import { ModalController } from "./openModal.js";
import { closeIcon } from "./closeModal.js";
import { getData } from "./getData.js";
import { count } from "./count.js";
import { TasksGeneration } from "./tasksGeneration.js";
import { editeBtnTask } from "./editeTask.js";
import { countOfTasks } from "./countTasks.js";
import { DeleteTasks } from "./deleteTask.js";
import { Progress } from "./progress.js";
import { Completed } from "./completed.js";
import { startButton } from "./startButton.js";
new count();
document.addEventListener("DOMContentLoaded", () => {
    new ModalController();
});
new closeIcon();
document.addEventListener("DOMContentLoaded", () => {
    new getData();
});
new count();
new TasksGeneration().displayTasks();
new Progress().displayTasks();
new Completed().displayTasks();
document.addEventListener("DOMContentLoaded", () => {
    new editeBtnTask();
});
new countOfTasks().updateCount();
new DeleteTasks();
new startButton();
