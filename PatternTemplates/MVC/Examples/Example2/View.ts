import { Observable } from "../../../Observable/Observable";

class View {
    playEvent: Observable;
    cells: any;
    message: any;

    constructor() {
      this.playEvent = new Observable();
    }
  
    render() {
      const board = document.createElement('div');
      board.className = 'board';
  
      this.cells = Array(9).fill(null).map((_, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
  
        cell.addEventListener('click', () => {
          this.playEvent.notify(i);
        });
  
        board.appendChild(cell);
  
        return cell;
      });
  
      this.message = document.createElement('div');
      this.message.className = 'message';
  
      document.body.appendChild(board);
      document.body.appendChild(this.message);
    }
  
    updateCell(data: any) {
      this.cells[data.move].innerHTML = data.player;
    }
  
    victory(winner: any) {
      this.message.innerHTML = `${winner} wins!`;
    }
  
    draw() {
      this.message.innerHTML = "It's a draw!";
    }
  }
  
  export default View;