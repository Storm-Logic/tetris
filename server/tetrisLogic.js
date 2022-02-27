const COLS = 10;
const ROWS = 20;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const PIECES = Object.keys(SHAPES);

function randomPiece() {
  const type = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    type,
    shape: SHAPES[type],
    x: Math.floor((COLS - SHAPES[type][0].length) / 2),
    y: 0,   
  }
}

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotate(shape) {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

function collide(board, piece) {
  return piece.shape.some((row, y) =>
    row.some((value, x) => {
      if (!value) return false;
      const nx = piece.x + x;
      const ny = piece.y + y;
      return (
        nx < 0 ||
        nx >= COLS ||
        ny >= ROWS ||
        (ny >= 0 && board[ny][nx])
      );
    })
  );
}

module.exports = {
  COLS,
  ROWS,
  randomPiece,  
  createBoard,
  rotate,
  collide
};