const nextGrid = (grid) => {
  const newGrid = generateGrid(grid.length, grid[0].length);

  for (let colIdx = 0; colIdx < grid.length; colIdx++) {
    for (let rowIdx = 0; rowIdx < grid[0].length; rowIdx++) {
      const currentCell = grid[colIdx][rowIdx];
      const newCell = new Cell(
        currentCell.state,
        currentCell.prevState,
        currentCell.deadTime
      );
      const neighbours = getNeighbours(grid, colIdx, rowIdx);
      const nSum = neighbours.reduce((a, b) => a + b, 0);

      if (currentCell.state === 1) {
        if (nSum < 2 || nSum > 3) {
          newCell.state = 0;
        } else {
          newCell.state = 1;
        }
      } else {
        if (nSum === 3) {
          newCell.state = 1;
        } else {
          newCell.state = 0;
        }
      }
      newGrid[colIdx][rowIdx] = newCell;
    }
  }

  return newGrid;
};

const getNeighbours = (grid, colIdx, rowIdx) => {
  const cols = grid.length;
  const rows = grid[0].length;
  const neighbours = [];
  const actions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  for (const action of actions) {
    const [colOffset, rowOffset] = action;
    const newColIdx = (colIdx + colOffset).mod(cols);
    const newRowIdx = (rowIdx + rowOffset).mod(rows);

    const neighbour = grid[newColIdx][newRowIdx].state;
    neighbours.push(neighbour);
  }
  return neighbours;
};

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};
