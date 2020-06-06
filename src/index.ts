class Agent {
  constructor(x, y,state, rows, columns) {
    console.log('New Agent');
    
    this.x = x;
    this.y = y;
    this.state = state;
    this.nextSatate = this.state;

    this.rows = rows
    this.columns = columns

    this.neighbors = [];
    
    this.addNeighbors = this.addNeighbors.bind(this);
  }

  addNeighbors(board) {
    let neighborX;
    let neighborY;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        neighborX = (this.x + j + this.columns) % this.columns;
        neighborY = (this.y + i + this.rows) % this.rows;
        console.log(neighborX, neighborY);
        
        if (i !== 0 || j !== 0) {
          this.neighbors.push(board[neighborY][neighborX]);
        }
      }
    }
  }


}

class LifeGame {

  canvas;
  ctx;
  board

  constructor(canvas, width, height, rows, columns) {
    this.columns = columns;
    this.rows = rows;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.width = width;
    this.canvas.height = height

    this.sizeCellX = Math.floor(canvasX / rows);
    this.sizeCellY = Math.floor(canvasX / columns);

    this.board = this.createMatrix2D(rows, columns);    
    this.initBoard()

    this.playing = this.playing.bind(this);
  }

  initBoard() {
    console.log('INIT');
    
    let state;
    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        console.log('INIT AGENT', y, x);
        
        state = Math.floor(Math.random());
        this.board[y][x] = new Agent(x, y, state, this.rows, this.columns);
      }
    }

    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        this.board[y][x].addNeighbors(this.board);
      }
    }
    console.log(this.board[9][9].addNeighbors(this.board));
    
  }

  createMatrix2D(row, column){
    const matrix = new Array(row);
    for(let i = 0; i < row; i++){
      matrix[i]= new Array(column);
    }
  
    return matrix;
  }

  playing() {
    this.cleanScreen();
    this.draw();
  }

  cleanScreen() {
    this.canvas.width = this.canvas.width;
    this.canvas.height = this.canvas.height;
  }

  draw() {
    console.log(this.board);
    
  }

  start() {
    setInterval(this.playing, 1000 / 1);
  }
}

const canvas = document.getElementById('life-game');
const fps = 30;

const canvasX = 500;
const canvasY = 500;

const rows = 10;
const columns = 10;

const white = '#FFFFFF';
const black = '#000000';

const lifeGame = new LifeGame(canvas, canvasX, canvasY, rows, columns);
lifeGame.start();