import { useEffect, useState } from "react"
import './Assignment_44.css';


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

// filters numbers randomly to hide 
const filterGrid = (solution) => {
  console.log('For testing Corerct solution:', solution);

  let grid = solution.map(row => [...row]);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (Math.random() < 0.5) {
        grid[row][col] = null;
      }
    }
  }
  return grid
}

const randomExample = createRandomGrid()
console.table(randomExample)

const validation_1 = validateGrid(exampleValidGrid)
console.log("validation_1", validation_1)

const validation_2 = validateGrid(exampleInvalidGrid)
console.log("validation_2", validation_2)

const createSudoku = () => {
  let grid = createRandomGrid()
  while (!validateGrid(grid)) {
    grid = createRandomGrid()
  }
  return grid
}

export default function Assignment_44() {
  const [grid, setGrid] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState([]);
  const [correct, SetCorrect] = useState([]);
  const [cellState, setCellState] = useState(Array(4).fill(null).map(() => Array(4).fill(null)));
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const solution = createSudoku();
    SetCorrect(solution);
    setGrid(filterGrid(solution));
    setNumbers([1, 2, 3, 4]);
    setComplete(false);
  }, []);

  const handleClick = (rowIndex, cellIndex) => {
    if (selectedNumber) {
      setGrid(prev => {
        const newGrid = prev.map(r => [...r]);
        newGrid[rowIndex][cellIndex] = selectedNumber;
        return newGrid;
      });
    }
    setCellState(prev => {
      const newState = prev.map(r => [...r]);
      newState[rowIndex][cellIndex] = selectedNumber === correct[rowIndex][cellIndex];
      return newState;
    });
  };

  useEffect(() => {
    if (grid.length === 0 || correct.length === 0) return;

    let solved = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === null || grid[row][col] !== correct[row][col]) {
          solved = false;
          break;
        }
      }
      if (!solved) break;
    }

    setComplete(solved);
  }, [grid, correct]);

  const restart = () => {
    setComplete(false);
    setSelectedNumber(null);
    const solution = createSudoku();
    SetCorrect(solution);
    setGrid(filterGrid(solution));
    setCellState(Array(4).fill(null).map(() => Array(4).fill(null)));
  };

  return (
    <div>
      <div className="container">
        <div className="grid-outer">
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <div
                    className="cell"
                    key={cellIndex}
                    onClick={() => handleClick(rowIndex, cellIndex)}
                    data-color={
                      cellState[rowIndex][cellIndex] === null
                        ? ""
                        : cellState[rowIndex][cellIndex]
                          ? "true"
                          : "false"
                    }
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="palette-outer">
          <div className="p-text">Select a number and click on a space</div>
          <div className="palette">
            {numbers.map(num => (
              <button
                key={num}
                className={`palette-btn ${selectedNumber === num ? "active" : ""}`}
                onClick={() => setSelectedNumber(num)}
                disabled={complete}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {complete && (
        <div className="restart">
          <div className="r-text">Congratulations!</div>
          <button
            className="restart-btn"
            onClick={restart}>Restart</button>
        </div>
      )}

    </div>
  );
}