import { useEffect, useState } from 'react';
import './Assignment_43.css';

const puzzle = {
  level: 1,
  rows: [
    [
      { fixed: true, value: 1, drawn: false, match: false },
      { fixed: false, value: null, drawn: false },
      { fixed: true, value: 3, drawn: false, match: false }
    ],
    [
      { fixed: false, value: null, drawn: false },
      { fixed: true, value: 9, drawn: false, match: false },
      { fixed: false, value: null, drawn: false }
    ],
    [
      { fixed: true, value: 7, drawn: false, match: false },
      { fixed: false, value: null, drawn: false },
      { fixed: true, value: 5, drawn: false, match: false }
    ]
  ]
};


export default function Assignment_43() {
  const [cells, setCells] = useState([]);
  const [dragging, setDragging] = useState(false);

  // render boxes
  useEffect(() => {
    const initialBoxes = puzzle.rows.flat().map(cell =>
      cell.fixed ? cell.value : null
    );
    setCells(initialBoxes);

    const maxFixed = Math.max(...initialBoxes.filter(v => v !== null));
  }, []);

  // display number on drag
const displayNumber = (index) => {
  const rowLength = puzzle.rows[0].length;
  const rowIndex = Math.floor(index / rowLength);
  const cellIndex = index % rowLength;
  const cell = puzzle.rows[rowIndex][cellIndex];

  if (cells[index] !== null || cell.fixed) return;

  const maxValue = Math.max(...cells.filter(v => v !== null));
  const nextValue = maxValue + 1;

  const newCells = [...cells];
  newCells[index] = nextValue;

  setCells(newCells);
};

  // display numberon mouse down on any cell
  const handleMouseDown = (index) => {
    setDragging(true);
    displayNumber(index);
  }

  // display number on drag
  const handleMouseMove = (index) => {
    if (!dragging) return;
    displayNumber(index);
  }

  // stop drag
  const handleMouseUp = () => {
    setDragging(false);
  }

  // on entering cell display number
  const handleMouseEnter = (index) => {
    if (dragging) {
      displayNumber(index);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="puzzle-level"> Level {puzzle.level}</div>
        <div className="puzzle-outer">
          <div className="puzzle">
            {puzzle.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="puzzle-row">
                {row.map((cell, cellIndex) => {
                  const linearIndex = rowIndex * puzzle.rows[0].length + cellIndex;
                  return (
                    <div
                      key={cellIndex}
                      className="puzzle-cell"
                      data-fixed={cell.fixed}
                      onMouseDown={() => handleMouseDown(linearIndex)}
                      onMouseEnter={() => handleMouseEnter(linearIndex)}
                      onMouseMove={() => handleMouseMove(linearIndex)}
                      onMouseUp={handleMouseUp}
                    >
                      {cells[linearIndex] ?? cell.value}
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