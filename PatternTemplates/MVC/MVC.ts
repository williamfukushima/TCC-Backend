import { Model } from "./Model";
import { View } from "./View";
import { Controller } from "./Controller";

export class MVC{
    private model: Model;
    private view: View;
    private controller: Controller;
    
    constructor(){
        this.model =  new Model('Dados iniciais');
        this.view = new View();
        this.controller = new Controller(this.model, this.view);
    }
   
    public Start(){
        this.controller.updateView();
        this.controller.setData('Novos dados');
        this.controller.updateView();
    }
}
