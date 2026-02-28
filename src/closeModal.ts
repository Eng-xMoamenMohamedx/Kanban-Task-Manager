import { resetModalToCreateState } from "./editeTask.js";

export class closeIcon {
  private closeBtn: HTMLElement | null;
  private cancelBtn: HTMLButtonElement | null;
  private modal: HTMLElement | null;

  constructor() {
    this.closeBtn = document.getElementById("closeBtn");
    this.cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
    this.modal = document.getElementById("modalContainer");
    this.init();
  }

  private init(): void {
    this.closeBtn?.addEventListener("click", () => {
      resetModalToCreateState();
      if (this.modal) this.modal.style.display = "none";
    });

    this.cancelBtn?.addEventListener("click", () => {
      resetModalToCreateState();
      if (this.modal) this.modal.style.display = "none";
    });
  }
}
