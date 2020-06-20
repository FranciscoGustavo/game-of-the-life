function startGame(ctx) {  
  const columns = 50;
  const rows = 50;
  
  const canvasX = 500;
  const canvasY = 500;
  canvas.width = canvasX;
  canvas.height = canvasY;
  
  const sizeCellX = canvasX / rows;
  const sizeCellY = canvasY / columns;

  const initialState = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
  ];
  
  const board = new Board(rows, columns, initialState);

  setInterval(() => {
    canvas.width = canvas.width;
    canvas.height = canvas.height;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if(board[y][x].state === 1){
          ctx.fillStyle = '#fff';
        } else {
          ctx.fillStyle = '#000 ';
        }
  
        ctx.fillRect(y * sizeCellY, x * sizeCellX, sizeCellY, sizeCellX,);
      }
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        board[y][x].newCycle();
      }
    }
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        board[y][x].mutation();
      }
    }


  }, 15 / 1000);
}

const canvas = document.getElementById('life-game');
const ctx = canvas.getContext('2d');
startGame(ctx);