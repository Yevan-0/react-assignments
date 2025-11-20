import { useEffect, useRef, useState } from "react"
import "./Assignment_37.css"


export default function Assignment_37() {
    const rotationRef = useRef(0);
    const speedRef = useRef(0.2);
    const baseRef = useRef();
    const [knives, setKnives] = useState([]);
    const [throwing, setThrowing] = useState(false);
    const [score, setScore] = useState(0);

    // Base rotation logic
    useEffect(() => {
        let animationFrameID = null;
        let prevTime = performance.now();
        const speed = speedRef.current;
        const targetBase = baseRef.current;

        const rotateBase = (currTime) => {
            const delta = currTime - prevTime;
            prevTime = currTime;

            rotationRef.current = (rotationRef.current + (speed * delta)) % 360;

            if (targetBase) {
                targetBase.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
            }

            animationFrameID = requestAnimationFrame(rotateBase);
        }
        animationFrameID = requestAnimationFrame(rotateBase);

        return () => cancelAnimationFrame(animationFrameID)
    }, [])

    // Knife throw animation and knife appending logic
    useEffect(() => {
        window.onclick = () => {

            if (throwing) return;

            const angle = rotationRef.current * -1;
            const knifeIndex = knives.findIndex(knife => (Math.abs(knife - angle) < 15));

            setThrowing(true);

            setTimeout(() => {
                setThrowing(false);

                if (knifeIndex !== -1) {
                    setScore(0);
                    setKnives([]);
                } else {
                    setKnives(prev => [...prev, angle]);
                    setScore(prev => prev + 1);
                }
            }, 50)
        }
        return () => {
            window.onclick = null;
        }
    }, [throwing, knives]);


    return (
        <div>
            <div className="container">

                <div className="score">
                    {score}
                </div>

                <div
                    className="target-base"
                    ref={baseRef}
                >

                    {knives.map((knife, index) => (
                        <div
                            key={index}
                            className="knife-hit"
                            style={{
                                transform: `rotate(${knife}deg)`,
                            }}
                        />
                    ))}

                </div>
                <div
                    className="knife"
                    data-throwing={throwing}
                />

                <div
                    className="target"
                    style={{ transform: `rotate(${rotationRef.current}deg)` }}
                />
            </div>


        </div>

    )
}