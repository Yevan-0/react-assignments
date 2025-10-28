import { useEffect, useState } from "react"
import "./Assignment_34.css"


export default function Assignment_34() {
    const [array, setArray] = useState([]);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [snake, setSnake] = useState([
        { x: 6, y: 7 },
        { x: 6, y: 6 },
        { x: 6, y: 5 },
        { x: 6, y: 4 },
        { x: 6, y: 3 },
        { x: 6, y: 2 },
        { x: 6, y: 1 }
    ]);

    useEffect(() => {
        const generateBoard = () => {
            const rows = 13;
            const cols = 13;

            setArray(Array(rows).fill().map(() => Array(cols).fill()));
        }
        generateBoard();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSnake(prev => {
                const head = prev[0];
                const newHead = {
                    x: (head.x + direction.x + 13) % 13,
                    y: (head.y + direction.y + 13) % 13,
                }

                const newSnake = [newHead, ...prev.slice(0, -1)];
                return newSnake;
            });
        }, 60);
        return () => clearInterval(interval);
    }, [direction])

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "w":
                    setDirection({ x: 0, y: -1 });
                    break;
                case "s":
                    setDirection({ x: 0, y: 1 });
                    break;
                case "a":
                    setDirection({ x: -1, y: 0 });
                    break;
                case  "d":
                    setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [])


    return (
        <div>
            <div className="container">
                <div
                    className="board"
                >
                    {array.map((row, index) => (
                        <div
                            className="row"
                            key={index}
                        >
                            {row.map((cell, cellIndex) => (
                                <div
                                    className="cell"
                                    key={cellIndex}
                                    data-snake={snake.some(event => event.x === cellIndex && event.y === index) ? "1" : "0"}
                                >
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <span style={{fontStyle:"italic"}}>Use A,W,S,D for movement</span>
            </div>
        </div>
    )
}