export class Validation {
  private titleInput: HTMLInputElement | null;
  private error: HTMLElement | null;


  constructor() {
    this.titleInput = document.getElementById("title") as HTMLInputElement;
    this.error = document.getElementById("titleError");
  }

  validateTitle(): boolean {
    if (this.titleInput?.value === "") {
      this.error?.classList.remove("d-none");
      this.titleInput!.style.border = "1px solid red";
      return false;
    
      
    } else {
      this.error?.classList.add("d-none");
      this.titleInput!.style.border = "1px solid #dee2e6";
      return true;
    }
  }

  titleLive():void{
    this.titleInput?.addEventListener('input' , () => {
      this.titleInput?.value === "" ? this.error?.classList.remove("d-none") : this.error?.classList.add("d-none");
      this.titleInput!.style.border = "1px solid #dee2e6";
    })
  }
}
