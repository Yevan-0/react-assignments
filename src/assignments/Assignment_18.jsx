import { useState, useEffect, useRef } from "react"


function GamePage({ setPlaying }) {
    const [colors, setColors] = useState([]);
    const intervalReff = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        intervalReff.interval = setInterval(() => {
            const randomNum = Math.random();
            const newColor = randomNum <= 0.5 ? 'blue' : 'red';

            setColors(prevColor => {
                const updated = [...prevColor];
                updated.unshift(newColor);
                const limit = updated.length;
                if (limit > 5) {
                    clearInterval(intervalReff.interval);
                    setGameOver(true);
                }
                return updated.slice(0, 6)
            })
            console.log(randomNum);

        }, 1000)
        return () => clearInterval(intervalReff.interval)
    }, [])

    const clickColors = (color) => {
        const lastIndex = colors.length - 1;
        const lastColor = colors[lastIndex];

        if (lastColor === color) {
            console.log(`${color}=located`);
            const selection = colors.slice(0, lastIndex);
            setColors(selection);
        } else {
            setGameOver(true);
            clearInterval(intervalReff.interval)
        }
        setScore(score + 1);
    }

    const retry = () => {
        setColors([]);
        setScore(0);
        setGameOver(false);

        intervalReff.interval = setInterval(() => {
            const randomNum = Math.random().toFixed(2);
            const newColor = randomNum <= 0.5 ? 'blue' : 'red';

            setColors(prevColor => {
                const updated = [...prevColor];
                updated.unshift(newColor);
                const limit = updated.length;
                if (limit > 5) {
                    clearInterval(intervalReff.interval);
                    setGameOver(true);
                }
                return updated.slice(0, 6)
            })
            console.log(randomNum);

        }, 1000)
    }

    return (
        <div>
            {
                gameOver ? (
                    <GameOver
                        retry={retry}
                        score={score}
                    />
                ) : (
                    <div>

                        <h4>Score : {score}</h4>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px"
                            }}>
                            {colors.map((color, i) => (
                                <div key={i}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        backgroundColor: color,
                                    }}
                                ><span style={{ visibility: "hidden" }} >{color}</span></div>
                            ))}
                        </div>

                        <button
                            style={{
                                margin: "10px",
                                color: 'red'
                            }}
                            onClick={() => clickColors('red')}
                        >
                            Red
                        </button>
                        <button
                            style={{
                                margin: "10px",
                                color: 'blue'
                            }}
                            onClick={() => clickColors('blue')}
                        >
                            Blue
                        </button>
                    </div>
                )

            }
        </div>
    )
}

function FrontPage({ setPlaying }) {
    return (
        <div>
            <h1><span style={{color:"#E55451"}}>COLOR</span>

             <span style={{color:'#3061EF'}}> PUZZLE</span></h1>
            <button
                onClick={() => setPlaying(true)}>
                Start
            </button>
        </div>
    )
}

function GameOver({ retry,score }) {
    const [gameMessage, setGameMessage] = useState(``);

    useEffect(() => {
        setGameMessage(`GAME OVER :(`)
    }, [])

    return (
        <div>
            <h1
                style={{ color: 'red' }}
            >
                {gameMessage}
            </h1>
            <h3>YOUR SCORE: {score}</h3>
            <button onClick={retry}>Retry</button>
        </div>
    )

}

export default function Assignment_18() {
    const [playing, setPlaying] = useState(false);

    return playing ? <GamePage setPlaying={setPlaying} /> : <FrontPage setPlaying={setPlaying} />
}