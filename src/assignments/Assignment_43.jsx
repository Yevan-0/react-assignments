import { useEffect, useState } from 'react';
import './Assignment_43.css';

export default function Assignment_43() {
  const [cells, setCells] = useState([]);
  const [count, setCount] = useState(1);
  const [dragging, setDragging] = useState(false);

  // render boxes
  useEffect(() => {
    const initialBoxes = Array(9).fill(null);
    setCells(initialBoxes);

    const handleMouseUpGlobal = () => setDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };

  }, []);

  // display number on drag
  const displayNumber = (index) => {
    if (cells[index] !== null) return;

    const newCells = [...cells];
    newCells[index] = count;

    setCells(newCells);
    setCount(count + 1);
  }

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
        {cells.map((value, index) => (
          <div
            key={index}
            className="box"
            onClick={() => displayNumber(index)}
            onMouseDown={() => handleMouseDown(index)}
            onMouseMove={() => handleMouseMove(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}