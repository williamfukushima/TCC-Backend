import { Observable } from "../Observable/Observable";

export class View {

    //#region Update Model Events
    updateDataEvent: Observable;
    //#endregion

    constructor() {
        this.updateDataEvent = new Observable();
    }

    render() {
        console.log("Primeira renderização");
        document.addEventListener('DOMContentLoaded', () => {        
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                // Display the key code in the HTML element
                this.updateData(event);
            });
        });    }


    updateData(data: KeyboardEvent){
        console.log("Dados atualizados: ", data.key);
    }
}