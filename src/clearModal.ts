export class Clear {
  private titleInput: HTMLInputElement | null;
  private levelInput: HTMLSelectElement | null;
  private dateInput: HTMLInputElement | null;
  private descriptionInput: HTMLTextAreaElement | null;
  private submitBtn: HTMLButtonElement | null;
  private modal: HTMLElement | null;

  constructor() {
    this.titleInput = document.getElementById("title") as HTMLInputElement;
    this.levelInput = document.getElementById("level") as HTMLSelectElement;
    this.dateInput = document.getElementById("date") as HTMLInputElement;
    this.descriptionInput = document.getElementById(
      "description",
    ) as HTMLTextAreaElement;
    this.modal = document.getElementById("modalContainer");
    this.submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    this.clearing();
  }

  clearing(): void {
    this.titleInput!.value = "";
    this.levelInput!.value = "";
    this.dateInput!.value = "";
    this.descriptionInput!.value = "";
  }
}
