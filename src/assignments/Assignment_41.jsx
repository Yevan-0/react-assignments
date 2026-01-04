import { useEffect, useState } from "react"
import "./Assignment_41.css"

const maxCapacity = 4;

export default function Assignment_41() {
    const [bottles, setBottles] = useState([]);
    const [selectedBottle, setSelectedBottle] = useState(null);
    const [completed, setCompleted] = useState([]);
    const [win, setWin] = useState(false);

    useEffect(() => {
        setBottles([
            ["#0da863", "#ff4f58", "#4da3ff"],
            ["#4da3ff", "#9e4eff", "#7f353d"],
            ["#ff782a", "#7f353d", "#0da863"],
            ["#7f353d", "#9e4eff", "#4da3ff"],
            ["#ff4f58", "#ff782a", "#7f353d"],
            ["#9e4eff", "#0da863", "#ff4f58"],
            ["#9e4eff", "#ff782a", "#4da3ff"],
            ["#0da863", "#ff4f58", "#ff782a"]
        ]);
    }, []);


    const handleBottleClick = (index) => {
        if (selectedBottle === null) {
            setSelectedBottle(index);
        } else {
            if (selectedBottle !== index) {
                pourLiquid(selectedBottle, index)
            }
            setSelectedBottle(null)
        }
    }

    const pourLiquid = (fromIndex, toIndex) => {
        const newBottles = [...bottles];
        const from = [...newBottles[fromIndex]];
        const to = [...newBottles[toIndex]];

        if (from.length === 0 || to.length === maxCapacity) return;

        const topColor = from[from.length - 1];
        let count = 1;

        for (let i = from.length - 2; i >= 0; i--) {
            if (from[i] === topColor) count++;
            else break;
        }

        const targetTop = to[to.length - 1];
        const space = maxCapacity - to.length;

        if (to.length === 0 || targetTop === topColor) {
            const pourCount = Math.min(count, space);
            for (let i = 0; i < pourCount; i++) {
                to.push(topColor);
                from.pop();
            }
            newBottles[fromIndex] = from;
            newBottles[toIndex] = to;
            setBottles(newBottles);
        }
    };

    const resetGame = () => {
        setBottles([
            ["#0da863", "#ff4f58", "#4da3ff"],
            ["#4da3ff", "#9e4eff", "#7f353d"],
            ["#ff782a", "#7f353d", "#0da863"],
            ["#7f353d", "#9e4eff", "#4da3ff"],
            ["#ff4f58", "#ff782a", "#7f353d"],
            ["#9e4eff", "#0da863", "#ff4f58"],
            ["#9e4eff", "#ff782a", "#4da3ff"],
            ["#0da863", "#ff4f58", "#ff782a"]
        ]);
        setWin(false);
        setCompleted([]);
        setSelectedBottle(null);
    };

    useEffect(() => {
        // Complete only if the bottle is full and all colors match
        const newCompleted = bottles.map(
            b => b.length === maxCapacity && b.every(color => color === b[0])
        );
        setCompleted(newCompleted);

        // Win: every non-empty bottle is complete; empties are allowed
        const nonEmptyIndices = bottles
            .map((b, i) => ({ b, i }))
            .filter(({ b }) => b.length > 0)
            .map(({ i }) => i);

        const finishedGame =
            nonEmptyIndices.length > 0 &&
            nonEmptyIndices.every(i => newCompleted[i] === true);

        setWin(finishedGame);
    }, [bottles]);


    return (
        <div>
            <div className="container">
                {bottles.map((bottle, index) => {
                    const isComplete = completed[index];
                    const isEmpty = bottle.length === 0;
                    const isDisabled = isComplete || (win && isEmpty);

                    return (
                        <div
                            className={`bottle ${isComplete ? "complete" : ""} ${win && isEmpty ? "empty-disabled" : ""}`}
                            key={index}
                            data-holding={selectedBottle === index ? "true" : "false"}
                            onClick={() => !isDisabled && handleBottleClick(index)}
                        >
                            {bottle.map((color, i) => (
                                <div
                                    key={i}
                                    className="color"
                                    style={{
                                        backgroundColor: color,
                                        height: `${160 / maxCapacity}px`
                                    }}
                                ></div>
                            ))}

                            {isComplete && <div className="done-label">Done</div>}
                        </div>
                    );
                })}

                {
                    win && (
                        <div className="footer">
                            <div>Congratulations !</div>
                            <button className="reset" onClick={()=> resetGame()}>Restart Puzzle</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}