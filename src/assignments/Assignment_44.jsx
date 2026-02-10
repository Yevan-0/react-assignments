const exampleValidGrid = [
  [2, 1, 4, 3],
  [3, 4, 1, 2],
  [1, 3, 2, 4],
  [4, 2, 3, 1]
]

const exampleInvalidGrid = [
  [2, 1, 3, 4],
  [3, 4, 1, 2],
  [1, 3, 2, 4],
  [4, 2, 3, 1]
]



export default function Assignment_44() {
  // STEP #1 : Create Randomized Puzzle

  const createRandomRow = () => {
    return [1, 2, 3, 4].sort(() => Math.random() - 0.5)
  }

  const createRandomGrid = () => {
    // returns a 2D array (grid) using createRandomRow()
    const grid = []
    for (let i = 0; i < 4; i++) {
      grid.push(createRandomRow())
    }
    return grid;
  }

  // STEP #2 : Create Randomized Puzzle

const validateGrid = grid => {
  // check: no repeat in any column
  for (let col = 0; col < 4; col++) {
    const colVals = [];
    for (let row = 0; row < 4; row++) {
      const value = grid[row][col];
      if (colVals.includes(value)) {
        return false; 
      }
      colVals.push(value);
    }
  }

  // check: no repeat in any 2x2 subgrid
  for (let rowBlock = 0; rowBlock < 4; rowBlock += 2) {
    for (let colBlock = 0; colBlock < 4; colBlock += 2) {
      const blockVals = [];
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          const value = grid[rowBlock + r][colBlock + c];
          if (blockVals.includes(value)) {
            return false;
          }
          blockVals.push(value);
        }
      }
    }
  }

  return true; // valid grid
};

  // STEP #3 : Create correct puzzle solution

  const createSudoku = () => {
    let grid = createRandomGrid()
    while (!validateGrid(grid)) {
      grid = createRandomGrid()
    }
    return grid
  }

  // TODO : STEP #1 + STEP #2

  const randomExample = createRandomGrid()
  console.table(randomExample)

  const validation_1 = validateGrid(exampleValidGrid)
  console.log("validation_1", validation_1)

  const validation_2 = validateGrid(exampleInvalidGrid)
  console.log("validation_2", validation_2)
}