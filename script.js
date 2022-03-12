import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.querySelector("#game-board");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();
console.log(grid.cells);
function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(e) {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    default:
      setupInput();
      break;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  setupInput();
}

function moveUp() {
  const cells = grid.cellsByColumn;
  return slideTiles(cells);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}
function slideTiles(cells) {
  cells.forEach((group) => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i];
      if (cell.tile == null) continue;
      let lastValideCell;
      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j];
        if (!moveToCell.canAccept(cell.tile)) break;
        lastValideCell = moveToCell;
      }

      if (lastValideCell != null) {
        if (lastValideCell.tile != null) {
          lastValideCell.mergeTile = cell.tile;
        } else {
          lastValideCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
  });
}
