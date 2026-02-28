
export class count{
    private letter: HTMLElement | null;
    private desc: HTMLTextAreaElement | null;
    constructor(){
        this.letter = document.getElementById("count") as HTMLElement ;
       this.desc = document.getElementById("description") as HTMLTextAreaElement ;
       this.init()
    }

    private init():void{
        this.desc?.addEventListener("input" , () => {
          const maxLength = 500
          const num =  this.desc?.value.length
          this.letter!.textContent = `${num} / ${maxLength}`
          
        })
    }
}