import { useEffect, useRef, useState } from "react";
import "./Assignment_35.css";
import { col } from "framer-motion/client";


const rows = 3;
const cols = 3;

export default function Assignment_34() {
    const [grid, setGrid] = useState([]);
    const [hidden, setHidden] = useState(null);
    const [solved, setSolved] = useState();

    useEffect(() => {
        setGrid(Array(rows).fill().map(() => Array(cols).fill()));
    }, []);

    //shuffle logic 
    useEffect(() => {
        const used = new Set();
        const total = rows * cols;
        const newGrid = [];

        const getUniqueRandom = () => {
            let rand;
            do {
                rand = Math.floor(Math.random() * total);
            } while (used.has(rand));
            used.add(rand);
            return rand;
        };

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(getUniqueRandom());
            }
            newGrid.push(row);
        }

        setGrid(newGrid);

        const hiddenIndex = Math.floor(Math.random() * total);
        setHidden(hiddenIndex);
        setSolved(false);

    }, []);

    // Track the hidden tile
    const findPosition = () => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === hidden) {
                    return {
                        row: r, col: c
                    }
                }
            }
        }
        return null;
    }

    // check solved state
    const checkSolved = (grid) => {
        const flat = grid.flat();

        for (let i = 0; i < flat.length - 1; i++) {
            if (flat[i] !== i) return false;
        }
        return true;
    }

    // Controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            const pos = findPosition();
            if (!pos) return;

            const { row, col } = pos;
            const newGrid = grid.map(row => [...row]);

            const swap = (r1, c1, r2, c2) => {
                [newGrid[r1][c1], newGrid[r2][c2]] = [newGrid[r2][c2], newGrid[r1][c1]];

                setGrid(newGrid);
                setHidden(newGrid[r2][c2]);
                setSolved(checkSolved(newGrid));
            }

          
            switch (event.key.toLowerCase()) {
                case "arrowup":
                case "w":
                    if (row < rows - 1) swap(row, col, row + 1, col);
                    break;
                case "arrowdown":
                case "s":
                    if (row > 0) swap(row, col, row - 1, col);
                    break;
                case "arrowleft":
                case "a":
                    if (col < cols - 1) swap(row, col, row, col + 1);
                    break;
                case "arrowright":
                case "d":
                    if (col > 0) swap(row, col, row, col - 1);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [grid]);

    const retry = () => {
        console.log("Retry button clicked");
        setSolved(false);
    }

    return (
        <div>
            <div className="container">
                <div className="puzzle" data-solved={solved ? "true" : "false"}>
                    {grid.map((row, rowIndex) => (
                        <div
                            className="row"
                            key={rowIndex}
                        >
                            {row.map((tile, tileIndex) => {
                                const x = (tile % cols) * (400 / cols);
                                const y = Math.floor(tile / cols) * (400 / rows);
                                return (
                                    <div
                                        className="tile"
                                        key={tileIndex}
                                        style={{
                                            backgroundPosition: `-${x}px -${y}px`,
                                            visibility: tile === hidden ? "hidden" : "visible"
                                        }}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                    ))}

                    {solved && (
                        <div className="image-overlay">
                            <img src="./sliding-puzzle.jpg" />
                            <button
                                className="retry-button"
                                onClick={retry}
                            >Retry</button>
                        </div>
                    )

                    }
                </div>
            </div>
        </div>
    )
}