const MAX_DEAD_TIME = 140;

let grid;
let cols;
let rows;
const cellSize = 7;
let lastDragged = [undefined, undefined];
let generateNextGrid = false;

let playButton;
let clearButton;
let spawnButton;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("conway");
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = generateGrid(cols, rows);

  playButton = createButton("START");
  playButton.class("start");
  playButton.parent("buttonContainer");
  playButton.mouseClicked(handlePlay);

  spawnButton = createButton("SPAWN");
  spawnButton.class("spawn");
  spawnButton.parent("buttonContainer");
  spawnButton.mouseClicked(handleSpawn);

  clearButton = createButton("CLEAR");
  clearButton.parent("buttonContainer");
  clearButton.mouseClicked(handleClear);

  noLoop();
}

function handleSpawn() {
  grid = spawn(grid);
  draw();
}

function handleClear() {
  grid = generateGrid(cols, rows);
  playButton.html("START");
  playButton.class("start");
  draw();
  noLoop();
  generateNextGrid = false;
}

function handlePlay() {
  if (isLooping()) {
    noLoop();
    playButton.html("START");
    playButton.class("start");
    generateNextGrid = false;
  } else {
    loop();
    playButton.html("PAUSE");
    playButton.class("pause");
    generateNextGrid = true;
  }
}

function handleMouse(type) {
  const colIdx = floor(mouseX / cellSize);
  const rowIdx = floor(mouseY / cellSize);

  const x = colIdx * cellSize;
  const y = rowIdx * cellSize;

  const cell = grid[colIdx][rowIdx];

  if (
    type === "drag" &&
    lastDragged[0] === colIdx &&
    lastDragged[1] === rowIdx
  ) {
    return;
  }

  if (cell.state === 1) {
    grid[colIdx][rowIdx] = new Cell(0);

    fill(0);
    stroke(0, 0);
    rect(x, y, cellSize, cellSize);
  } else {
    grid[colIdx][rowIdx] = new Cell(1);

    fill(255);
    stroke(0, 0);
    rect(x, y, cellSize, cellSize);
  }

  lastDragged = [colIdx, rowIdx];
}

function mousePressed(event) {
  if (event.target.id === "conway") {
    handleMouse();
  }
}

function mouseDragged() {
  handleMouse("drag");
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cellSize;
      const y = j * cellSize;

      const cell = grid[i][j];

      if (cell.state == 1) {
        fill(255);
        stroke(0, 0);
        rect(x, y, cellSize, cellSize);
      } else {
        const deadTime = cell.deadTime;

        if (deadTime > 0 && deadTime < MAX_DEAD_TIME) {
          let hue = 255;
          let saturation = 26;
          let brightness = 200;

          hue = constrain(hue - deadTime * 3, 0, hue);
          saturation = constrain(saturation - deadTime * 1.3, 0, saturation);
          brightness = constrain(brightness - deadTime * 1.3, 0, brightness);

          fill(hue, saturation, brightness);
          stroke(0, 0);
          rect(x, y, cellSize, cellSize);
        }
      }
    }
  }

  if (generateNextGrid) {
    grid = nextGrid(grid);
  }
}
