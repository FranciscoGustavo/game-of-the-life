function Board(rows, columns, initialState) { 
  let board = new Array(rows);

  for (let y = 0; y < columns; y++) {
    board[y] = new Array(columns);

    for (let x = 0; x < columns; x++) {

      try {
        if(initialState[y][x] === 1) {
          board[y][x] = new Box(x, y, 1);
        } else {
          board[y][x] = new Box(x, y, 0);
        }
      } catch (error) {
        board[y][x] = new Box(x, y, 0);
      }
    }
  }

  for (let y = 0; y < columns; y++) {
    for (let x = 0; x < rows; x++) {
      board[y][x].addNeighbors(board, rows, columns);
    }
  }

  return board;
};