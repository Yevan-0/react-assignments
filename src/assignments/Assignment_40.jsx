import { useEffect, useState, useRef } from "react";
import "./Assignment_40.css";


export default function Assignment_40() {
    const [playing, setPlaying] = useState(false);
    const [yAxis, setYaxis] = useState(0);

    const [ballX, setBallX] = useState(0);
    const [ballY, setBallY] = useState(0);

    const [score, setScore] = useState(0);
    const [justCaught, setJustCaught] = useState(false);

    const ballRef = useRef(null);
    const basketRef = useRef(null);
    const containerRef = useRef(null);

    const handleOrientation = (event) => {
        console.log("gamma:", event.gamma);
        const gamma = event.gamma ? Number(event.gamma).toPrecision(3) : 0;
        setYaxis(gamma);
    };

    const requestAccess = async () => {
        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            try {
                const state = await DeviceOrientationEvent.requestPermission();
                if (state === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                }
            } catch (err) {
                console.error("Permission request failed:", err);
            }
        } else if (typeof DeviceOrientationEvent !== "undefined") {
            window.addEventListener("deviceorientation", handleOrientation);
        }
    };

    // GAME LOOP: ball falls straight down
    useEffect(() => {
        if (!playing) return;

        const interval = setInterval(() => {
            setBallY((prev) => {
                const newY = prev + 5;

                if (ballRef.current && basketRef.current && containerRef.current) {

                    const ballRect = ballRef.current.getBoundingClientRect();
                    const basketRect = basketRef.current.getBoundingClientRect();
                    const containerRect = containerRef.current.getBoundingClientRect();


                    const caught =
                        ballRect.bottom >= basketRect.top &&
                        ballRect.right >= basketRect.left &&
                        ballRect.left <= basketRect.right;

                    if (caught && !justCaught) {
                        setScore(prev => prev + 1);
                        setJustCaught(true);
                        setBallX(Math.random() * (containerRect.width - 30));
                        return 0;
                    }

                    if (newY + ballRect.height > containerRect.height) {
                        setJustCaught(false);
                        setBallX(Math.random() * (containerRect.width - 30));
                        return 0;
                    }
                }
                return newY;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [playing]);

    // Reset ball when game starts
    useEffect(() => {
        if (playing && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            setBallX(Math.random() * (containerRect.width - 50));
            setBallY(0);
        }
    }, [playing]);

    return (
        <div>
            {playing ? (
                <div className="game">
                    <div className="score">
                        Score: {score}
                    </div>

                    <div
                        className="container"
                        ref={containerRef}
                    >
                        <div
                            ref={ballRef}
                            className="balls"
                            style={{
                                transform: `translate(${ballX}px, ${ballY}px)`
                            }}
                        ></div>

                        <div
                            ref={basketRef}
                            className="basket"
                            style={{
                                transform: `translateX(${yAxis * 5}px)`
                            }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="home-page">
                    <div className="header">BALL FALL</div>
                    <button
                        onClick={() => {
                            setPlaying(true);
                            requestAccess();
                        }}
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
}