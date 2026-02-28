export class DueDateValidator {
    constructor() {
        this.dateInput = document.getElementById("date");
        this.errorMsg = document.getElementById("errorMsg");
    }
    validateDate() {
        const selectedDate = new Date(this.dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return false;
        }
        return true;
    }
    dateState() {
        this.dateInput.addEventListener("input", () => {
            if (!this.validateDate()) {
                this.errorMsg?.classList.remove("d-none");
                this.dateInput.style.border = "1px solid red";
            }
            else {
                this.errorMsg?.classList.add("d-none");
                this.dateInput.style.border = "1px solid #dee2e6";
            }
        });
    }
    onChangeDate() {
        const savedDate = JSON.parse(localStorage.getItem("project") || "[]");
        savedDate.forEach((saved) => {
            if (savedDate) {
                const selectedDate = new Date(saved.date);
                let formattedDate = selectedDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                });
                document.querySelectorAll(`.date-formated${saved.id}`).forEach((el) => {
                    el.innerHTML = formattedDate;
                });
            }
        });
    }
}
