class LifeGame {

  canvas;
  ctx;

  constructor(canvas, width, height, rows, columns) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.width = width;
    this.canvas.height = height

    this.sizeCellX = Math.floor(canvasX / rows);
    this.sizeCellY = Math.floor(canvasX / columns);


    this.playing = this.playing.bind(this);
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