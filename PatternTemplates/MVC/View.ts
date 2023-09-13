import { Controller } from "./Controller";

export class View {
    controller: Controller | null;

    constructor() {
        this.controller = null;
    }

    setController(controller: Controller) {
        this.controller = controller;
    }

    render(data: string[]) {
        console.log("Renderizando dados: ", data);
    }
}