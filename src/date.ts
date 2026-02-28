export class DueDateValidator {
  private dateInput: HTMLInputElement;
  private errorMsg: HTMLElement | null;

  constructor() {
    this.dateInput = document.getElementById("date") as HTMLInputElement;
    this.errorMsg = document.getElementById("errorMsg");
  }

  validateDate(): boolean {
    const selectedDate = new Date(this.dateInput.value);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return false;
    }

    return true;
  }

  dateState(): void {
    this.dateInput.addEventListener("input", () => {
      if (!this.validateDate()) {
        this.errorMsg?.classList.remove("d-none");
        this.dateInput.style.border = "1px solid red";
      } else {
        this.errorMsg?.classList.add("d-none");
        this.dateInput.style.border = "1px solid #dee2e6";
      }
    });
  }

  onChangeDate(): void {
    const savedDate: any[] = JSON.parse(
      localStorage.getItem("project") || "[]",
    );

    savedDate.forEach((saved) => {
      if (savedDate) {
        const selectedDate: Date = new Date(saved.date);

        let formattedDate: string = selectedDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        });

       
          document.querySelectorAll(`.date-formated${saved.id}`)!.forEach((el) => {
            (el as HTMLElement).innerHTML = formattedDate;
          });
       
      }
    });
  }
}
