import { Model } from "./Model";
import { View } from "./View";

export class Controller {
    private model: Model;
    private view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;

        //#region Updating Model on View input events
        
        //#endregion

        //#region Updating View on Model raising events
        
        //#endregion
    }
    
    run(){
        this.view.render();
    }
}
