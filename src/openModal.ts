import { Clear } from "./clearModal.js";
import { resetModalToCreateState } from "./editeTask.js";

export class ModalController {
  private button: HTMLElement | null;
  private modal: HTMLElement | null;
  private clear: Clear;

  constructor() {
    this.button = document.getElementById("addBtn");
    this.modal = document.getElementById("modalContainer");
    this.clear = new Clear();
    this.init();
  }

  private init(): void {
    this.button?.addEventListener("click", () => {
      resetModalToCreateState();
      this.clear.clearing();
      if (this.modal) this.modal.style.display = "block";
    });
  }
}