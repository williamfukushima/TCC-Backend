import { Model } from "./Model";
import { View } from "./View";
import { Controller } from "./Controller";

export class MVC{
    private model: Model;
    private view: View;
    private controller: Controller;
    
    constructor(){
        this.model =  new Model();
        this.view = new View();
        this.controller = new Controller(this.model, this.view);
    }
   
    public Start(){
        this.controller.run();
    }
}
