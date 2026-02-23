import { useEffect, useState } from "react";
import "./Assignment_44.css";

const createRandomRow = () => {
  return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
};

const createRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < 4; i++) {
    grid.push(createRandomRow());
  }
  return grid;
};

const validateGrid = (grid) => {
  // check columns
  for (let col = 0; col < 4; col++) {
    const colVals = [];
    for (let row = 0; row < 4; row++) {
      const value = grid[row][col];
      if (colVals.includes(value)) return false;
      colVals.push(value);
    }
  }

  // check 2x2 subgrids
  for (let rowBlock = 0; rowBlock < 4; rowBlock += 2) {
    for (let colBlock = 0; colBlock < 4; colBlock += 2) {
      const blockVals = [];
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          const value = grid[rowBlock + r][colBlock + c];
          if (blockVals.includes(value)) return false;
          blockVals.push(value);
        }
      }
    }
  }
  return true;
};

const filterGrid = (solution) => {
  let grid = solution.map((row) => [...row]);

  const availableCols = [0, 1, 2, 3];
  for (let row = 0; row < 4; row++) {
    const randomIndex = Math.floor(Math.random() * availableCols.length);
    const chosenCol = availableCols.splice(randomIndex, 1)[0];

    for (let col = 0; col < 4; col++) {
      if (col !== chosenCol) {
        grid[row][col] = null;
      }
    }
  }

  return grid;
};

const createSudoku = () => {
  let grid = createRandomGrid();
  while (!validateGrid(grid)) {
    grid = createRandomGrid();
  }
  return grid;
};

export default function Assignment_44() {
  const [grid, setGrid] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [cellState, setCellState] = useState(
    Array(4).fill(null).map(() => Array(4).fill(null))
  );
  const [complete, setComplete] = useState(false);
  const [fixedCells, setFixedCells] = useState([]);

  useEffect(() => {
    const solution = createSudoku();
    setCorrect(solution);

    const puzzle = filterGrid(solution);
    setGrid(puzzle);

    const fixed = puzzle.map((row) => row.map((cell) => cell !== null));
    setFixedCells(fixed);

    setComplete(false);
  }, []);

  const clickNumber = (row, col) => {
    if (fixedCells[row]?.[col]) return;
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      const currentValue = newGrid[row][col] || 0;
      newGrid[row][col] = currentValue === 4 ? 1 : currentValue + 1;
      return newGrid;
    });
  };

  const restart = () => {
    setComplete(false);
    const solution = createSudoku();
    setCorrect(solution);

    const puzzle = filterGrid(solution);
    setGrid(puzzle);

    const fixed = puzzle.map((row) => row.map((cell) => cell !== null));
    setFixedCells(fixed);

    setCellState(Array(4).fill(null).map(() => Array(4).fill(null)));
  };

  const checkValidity = () => {
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

    const newState = grid.map((row) =>
      row.map(() => (solved ? true : false))
    );

    setCellState(newState);
    setComplete(solved);
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
                    className={`cell ${fixedCells[rowIndex][cellIndex] ? "fixedCell" : "editableCell"
                      }`}
                    key={cellIndex}
                    data-color={
                      cellState[rowIndex][cellIndex] === null
                        ? ""
                        : cellState[rowIndex][cellIndex]
                          ? "true"
                          : "false"
                    }
                    onClick={() => clickNumber(rowIndex, cellIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={checkValidity}>Check Validity</button>
        <button className="restart-btn" onClick={restart}>Restart</button>
      </div>

      {complete && (
        <div className="restart">
          <div className="r-text">Congratulations!</div>
        </div>
      )}
    </div>
  );
}