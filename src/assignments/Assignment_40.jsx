import { useEffect, useState, useRef } from "react";
import "./Assignment_40.css";

export default function Assignment_40() {
    const [playing, setPlaying] = useState(false);
    const [yAxis, setYaxis] = useState(0);

    const [ballX, setBallX] = useState(0);
    const [ballY, setBallY] = useState(0);

    const ballRef = useRef(null);
    const basketRef = useRef(null);

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

                if (ballRef.current && basketRef.current) {
                    const ballRect = ballRef.current.getBoundingClientRect();
                    const basketRect = basketRef.current.getBoundingClientRect();

                    const caught =
                        ballRect.bottom >= basketRect.top &&
                        ballRect.right >= basketRect.left &&
                        ballRect.left <= basketRect.right;

                    if (caught || newY > window.innerHeight) {
                        setBallX(Math.random() * window.innerWidth - 50);
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
        if (playing) {
            setBallX(Math.random() * (window.innerWidth - 50));
            setBallY(0);
        }
    }, [playing]);

    return (
        <div>
            {playing ? (
                <div className="container">
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
                            transform: `translateX(${yAxis * 40}px)`
                        }}
                    ></div>
                </div>
            ) : (
                <div className="home-page">
                    <div className="header">Gyro</div>
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