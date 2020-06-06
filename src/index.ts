class Agent {
  constructor() {
    this.board = board;
    this.rows = rows
    this.columns = columns
    this.x = x;
    this.y = y;
    this.state = state;
    this.nextSatate = this.state;
    this.neighbors = [];
    this.addNeighbors = this.addNeighbors.bind(this);
  }

  addNeighbors() {
    let neighborX;
    let neighborY;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        neighborX = (this.x + j + this.columns) % this.columns;
        neighborX = (this.y + i + this.rows) % this.rows;

        if (i !== 0 || j !== 0) {
          this.neighbors.push(this.board[neighborY][neighborX]);
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
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.width = width;
    this.canvas.height = height

    this.sizeCellX = Math.floor(canvasX / rows);
    this.sizeCellY = Math.floor(canvasX / columns);

    this.board = this.createMatrix2D(rows, columns);
    console.log(this.board);
    

    this.playing = this.playing.bind(this);
  }

  createMatrix2D(row,column){
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

  }

  start() {
    setInterval(this.playing, 1000 / 5);
  }
}

const canvas = document.getElementById('life-game');
const fps = 30;

const canvasX = 500;
const canvasY = 500;

const rows = 100;
const columns = 100;

const white = '#FFFFFF';
const black = '#000000';

const lifeGame = new LifeGame(canvas, canvasX, canvasY, rows, columns);
lifeGame.start();