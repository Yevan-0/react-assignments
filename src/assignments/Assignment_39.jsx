import { useEffect, useRef, useState } from "react"


export default function Assignment_39() {
    const [Xaxis, setXaxis] = useState("");
    const [Yaxis, setYaxis] = useState("");
    const [Zaxis, setZaxis] = useState("");

    const orientationValues = useRef({
        alpha: 0,
        beta: 0,
        gamma: 0
    });


    const handleOrientation = (event) => {
        console.log("alpha:", event.alpha, "beta:", event.beta, "gamma:", event.gamma);
        orientationValues.current = {
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
        };
    };

// Request for iphone
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
        }
    };

    const handleClick = () => {
        const { alpha, beta, gamma } = orientationValues.current;
        setZaxis(`alpha: ${alpha}`);
        setXaxis(`beta: ${beta}`);
        setYaxis(`gamma: ${gamma}`);
    }
    return (
        <div onClick={handleClick}>
            <button onClick={requestAccess}>Enable Motion Access</button>

            <div
                className="values"
            >
                Click over here
                <div className="x">
                    X: {Xaxis}
                </div>

                <div className="y">
                    Y: {Yaxis}
                </div>

                <div className="z">
                    Z: {Zaxis}
                </div>

            </div>
        </div>
    )

}

