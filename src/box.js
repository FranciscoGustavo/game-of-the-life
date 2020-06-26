class Box {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.nextState = this.state;
    this.neighbors = [];

    this.addNeighbors = this.addNeighbors.bind(this);
    this.newCycle = this.newCycle.bind(this);
    this.mutation = this.mutation.bind(this);
  }

  addNeighbors(board, rows, columns) {
    let neighborX;
    let neighborY;

    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        neighborY = (this.y + y + columns) % columns; 
        neighborX = (this.x + x + rows) % rows;
        
        if (y !== 0 || x !== 0) {
          this.neighbors.push(board[neighborY][neighborX]);
        }
      }
    }
  }

  newCycle() {
    let neighbors = 0;
    for(let i = 0; i < this.neighbors.length; i++){
      neighbors += this.neighbors[i].state;
    }
    
    // MUERTE: tiene menos de 2 o más de 3
    if(neighbors < 2 || neighbors > 3){      
      this.nextState = 0;
    }
    
    // VIDA/REPRODUCCIÓN: tiene exactamente 3 vecinos
    if(neighbors == 3){
      this.nextState = 1;
    }
  }

  mutation() {
    this.state = this.nextState;
  }
}
