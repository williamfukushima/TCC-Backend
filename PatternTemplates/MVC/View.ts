import { Observable } from "../Observable/Observable";

export class View {

    updateDataEvent: Observable;

    constructor() {
        this.updateDataEvent = new Observable();
    }

    render() {
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