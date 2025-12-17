import { useEffect, useRef, useState } from "react"
import './Assignment_39.css'

export default function Assignment_39() {
    const [xAxis, setXaxis] = useState("");
    const [yAaxis, setYaxis] = useState("");
    const [ZAxis, setZaxis] = useState("");

    const handleOrientation = (event) => {
        const alpha = event.alpha ? Number(event.alpha).toPrecision(5) : 0;
        const beta = event.beta ? Number(event.beta).toPrecision(3) : 0;
        const gamma = event.gamma ? Number(event.gamma).toPrecision(3) : 0;

        setZaxis(alpha);
        setXaxis(beta);
        setYaxis(gamma);
    };

    // Request for iphone and android permission
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
        else if (typeof DeviceOrientationEvent !== "undefined") {
            // Android + Desktop (no explicit permission needed)
            window.addEventListener("deviceorientation", handleOrientation);
        }
    };

    return (
        <div>
            <div className="container">
                <button onClick={requestAccess}>Enable Motion Access</button>
                <div
                    className="values"
                >
                    <div className="z">
                        Alpha: {ZAxis}
                    </div>

                    <div className="x">
                        Beta: {xAxis}
                    </div>

                    <div className="y">
                        Gamma: {yAaxis}
                    </div>
                </div>
            </div>
        </div>
    )

}

