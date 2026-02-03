import { useEffect, useState } from 'react';
import './Assignment_43.css';

// puzzle array for testing purposes
const puzzle = {
  level: 1,
  height: 3,
  width: 3,
  fixed: [
    { x: 0, y: 0, value: 1 },
    { x: 2, y: 0, value: 3 },
    { x: 1, y: 1, value: 9 },
    { x: 0, y: 2, value: 7 },
    { x: 2, y: 2, value: 5 },
  ]
};

export default function Assignment_43() {
  const [cells, setCells] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [nextValue, setNextValue] = useState(1);

  // initialize grid
  useEffect(() => {
    const initial = Array(puzzle.height * puzzle.width).fill(null);

    puzzle.fixed.forEach(f => {
      const index = f.y * puzzle.width + f.x;
      initial[index] = f.value;
    });

    setCells(initial);

    // start at the lowest missing number
    const usedValues = puzzle.fixed.map(f => f.value);
    const allValues = Array.from({ length: puzzle.height * puzzle.width }, (_, i) => i + 1);
    const missingValues = allValues.filter(v => !usedValues.includes(v));

    // start with smallest number
    setNextValue(Math.min(...missingValues));
  }, []);

  // Display number
  const displayNumber = (index) => {
    if (cells[index] !== null) return;

    const newCells = [...cells];
    newCells[index] = nextValue;
    setCells(newCells);

    let next = nextValue + 1;
    const usedValues = puzzle.fixed.map(f => f.value);
    while (usedValues.includes(next)) {
      next++;
    }
    setNextValue(next);
  };

  const handleMouseDown = (index) => {
    setDragging(true);
    displayNumber(index);
  };

  const handleMouseMove = (index) => {
    if (dragging) displayNumber(index);
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseEnter = (index) => {
    if (dragging) displayNumber(index);
  };

  return (
    <div>
      <div className="container">
        <div className="puzzle-level">Level {puzzle.level}</div>
        <div className="puzzle-outer">
          <div className="puzzle">
            {Array.from({ length: puzzle.height }).map((_, rowIndex) => (
              <div key={rowIndex} className="puzzle-row">
                {Array.from({ length: puzzle.width }).map((_, colIndex) => {
                  const linearIndex = rowIndex * puzzle.width + colIndex;
                  const fixedCell = puzzle.fixed.find(f => f.x === colIndex && f.y === rowIndex);

                  return (
                    <div
                      key={colIndex}
                      className={`puzzle-cell ${fixedCell ? 'fixed' : ''}`}
                      onMouseDown={() => handleMouseDown(linearIndex)}
                      onMouseEnter={() => handleMouseEnter(linearIndex)}
                      onMouseMove={() => handleMouseMove(linearIndex)}
                      onMouseUp={handleMouseUp}
                    >
                      {cells[linearIndex]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}