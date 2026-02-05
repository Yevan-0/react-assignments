import React, { useEffect, useState, useRef } from 'react';
import './Assignment_43.css';

export default function Assignment_43() {
  const levels = useRef([]);
  const [level, setLevel] = useState(0);
  const [data, setData] = useState({ rows: [], fixed: [] });
  const [path, setPath] = useState({});
  const [active, setActive] = useState(false);
  const [result, setResult] = useState(null);

  const loadLevel = (index) => {
    if (!levels.current[index]) return;
    
    setLevel(index);
    setPath({});
    const levelData = levels.current[index];

    // Build the grid structure
    const rows = Array(levelData.height).fill(null).map((_, y) => {
      return Array(levelData.width).fill(null).map((_, x) => {
        const fixed = levelData.fixed.find(item => item.x === x && item.y === y);
        return { x, y, node: `${x}-${y}`, fixed };
      });
    });

    setData({ rows, fixed: levelData.fixed });
  };

  const onStart = (item) => {
    if (result) return;
    setActive(true);
    setPath({ [item.node]: 1 });
  };

  const onMove = (item) => {
    if (!active || result) return;
    
    const nodes = Object.keys(path);
    const index = nodes.indexOf(item.node);

    if (index > -1) {
      // If user moves back to a previous cell, re-define the path
      const slice = nodes.slice(0, index + 1);
      const newPath = {};
      slice.forEach(key => {
        newPath[key] = path[key];
      });
      setPath(newPath);
    } else {
      // Add new cell to path
      const value = nodes.length + 1;
      setPath(prev => ({ ...prev, [item.node]: value }));
    }
  };

  const onStop = () => {
    if (!active || result) return;
    setActive(false);

    const size = data.rows.length * data.rows[0].length;
    const isCovered = Object.keys(path).length === size;
    
    // checks if path values =  fixEd values
    const isMatched = data.fixed.every(item => (
      path[`${item.x}-${item.y}`] === item.value
    ));

    const isSuccess = isCovered && isMatched;
    setResult({ success: isSuccess });

    // Reset
    setTimeout(() => {
      setResult(null);
      if (isSuccess) {
        const nextIdx = levels.current[level + 1] ? level + 1 : 0;
        loadLevel(nextIdx);
      } else {
        setPath({}); //clear path if failed
      }
    }, 1200);
  };

  // fetch data for levels
  useEffect(() => {
    fetch("./Assignment_43.json")
      .then(resp => resp.json())
      .then(json => {
        levels.current = json;
        loadLevel(0);
      })
      .catch(err => console.error("Failed to load levels:", err));
  }, []);

  return (
    <div className="container">
      <div className="puzzle-level">Level {level + 1}</div>
      <div className="puzzle-outer">
        <div
          className="puzzle"
          onPointerUp={onStop}
          onPointerLeave={onStop}
          data-result={!!result}
          data-success={result?.success}
        >
          {data.rows.map((row, rIndex) => (
            <div key={rIndex} className="puzzle-row">
              {row.map((item, cIndex) => {
                const currentVal = path[item.node];
                const isFixed = !!item.fixed;
                const match = isFixed && item.fixed.value === currentVal;

                return (
                  <div
                    key={cIndex}
                    onPointerDown={() => onStart(item)}
                    onPointerEnter={() => onMove(item)}
                    className="puzzle-cell"
                    data-fixed={isFixed}
                    data-drawn={item.node in path}
                    data-match={match}
                  >
                    {isFixed ? item.fixed.value : currentVal}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
