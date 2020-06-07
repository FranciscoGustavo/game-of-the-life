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
    this.draw = this.draw.bind(this);
    this.newCycle = this.newCycle.bind(this);
    this.mutation = this.mutation.bind(this);
  }

  addNeighbors(board) {
    let neighborX;
    let neighborY;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        neighborX = (this.x + j + this.columns) % this.columns;
        neighborY = (this.y + i + this.rows) % this.rows;
        
        if (i !== 0 || j !== 0) {
          this.neighbors.push(board[neighborY][neighborX]);
        }
      }
    }
  }

  draw(ctx, sizeCellX, sizeCellY) {
    let color;

    if(this.state === 1){
      color = '#fff';
    }
    else{
      color = '#000';
    }

    ctx.fillStyle = color;
    ctx.fillRect(this.x * sizeCellX, this.y * sizeCellY, sizeCellX, sizeCellY);
  }

  newCycle() {
    //calculamos la cantidad de vecinos vivos
    let neighbors = 0;
    for(let i = 0; i < this.neighbors.length; i++){
      neighbors += this.neighbors[i].state;
    }
    console.log('TOTAL', neighbors);
    
    //APLICAMOS LAS NORMAS DE CONWAY

    //Valor por defecto lo dejamos igual
    this.nextState = this.state;

    //MUERTE: tiene menos de 2 o más de 3
    if(neighbors <2 || neighbors>3){
      this.nextState = 0;
    }

    //VIDA/REPRODUCCIÓN: tiene exactamente 3 vecinos
    if(neighbors==3){
      this.nextState = 1;
    }
  }

  mutation() {
    this.state = this.nextState;
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
        state = Math.floor(Math.random() * 2);
        this.board[y][x] = new Agent(x, y, state, this.rows, this.columns);
      }
    }

    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        this.board[y][x].addNeighbors(this.board);
      }
    }
    
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
    // console.log(this.board);
    for(let y=0; y < this.rows; y++){
      for(let x=0; x < this.columns; x++){
        this.board[y][x].draw(this.ctx, this.sizeCellX, this.sizeCellY);
      }
    }

    for(let y=0; y < this.rows; y++){
      for(let x=0; x < this.columns; x++){
        this.board[y][x].newCycle();
        
      }
    }

    for(let y=0; y < this.rows; y++){
      for(let x=0; x < this.columns; x++){
        this.board[y][x].mutation();
      }
    }
  }

  start() {
    setInterval(this.playing, 1000 / 60);
  }
}

const canvas = document.getElementById('life-game');
const fps = 30;

const canvasX = 500;
const canvasY = 500;

const rows = 50;
const columns = 50;

const white = '#FFFFFF';
const black = '#000000';
const sizeCellX = canvasX / rows;
const sizeCellY = canvasY / rows;

const lifeGame = new LifeGame(canvas, canvasX, canvasY, rows, columns);
lifeGame.start();
