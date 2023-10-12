import TicTacToe from "./Model";
import View from "./View";

export class Controller {
    model: TicTacToe;
    view: View;
    constructor() {
      this.model = new TicTacToe();
      this.view = new View();
  
      // Add view input events
      this.view.playEvent.subscribe((move: any) => { this.model.play(move); });

      // Add model events
      this.model.updateCellEvent.subscribe((data: any) => { this.view.updateCell(data); });
      this.model.victoryEvent.subscribe((winner: any) => { this.view.victory(winner); });
      this.model.drawEvent.subscribe(() => { this.view.draw(); });
    }
    
      run() {
      this.view.render();
    }
  }
  