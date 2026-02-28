export class count {
    constructor() {
        this.letter = document.getElementById("count");
        this.desc = document.getElementById("description");
        this.init();
    }
    init() {
        this.desc?.addEventListener("input", () => {
            const maxLength = 500;
            const num = this.desc?.value.length;
            this.letter.textContent = `${num} / ${maxLength}`;
        });
    }
}
