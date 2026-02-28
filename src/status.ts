class Status {
  private todo: HTMLElement | null;
  private inProgress: HTMLElement | null;
  private completed: HTMLElement | null;

  constructor() {
    this.todo = document.getElementById("parentContainer");
    this.inProgress = document.getElementById("progressContainer");
    this.completed = document.getElementById("completedContainer");
  }

  private init(): void{
    
  }
}
