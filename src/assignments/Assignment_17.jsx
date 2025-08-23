import { useState, useEffect } from "react"

export default function Assignment_17() {
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");
    const [mixedColor, setMixedColor] = useState("");
    const [selected, setSelected] = useState(false);

    const hexToRgb = (hex) => {
        return hex.replace(/^#/, "").match(/.{2}/g).map((value) => parseInt(value, 16));
    }
    const rgbtoHex = (rgb) => {
        return `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`
    }
    const mix = (color1, color2) => {
        setSelected(true);
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        const mixedRgb = rgb1.map((value, i) => Math.floor((value + rgb2[i]) / 2));
        setMixedColor(rgbtoHex(mixedRgb));
    }

    return (
        <div>
            <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                style={{ margin: "10px" }} />

            <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                style={{ margin: "10px" }} />

            <br />
            <button
                onClick={() => mix(color1, color2)}
                style={{ margin: "10px" }}>
                Mix
            </button>
            <br />
            <div
                style={{
                    margin: "10px",
                    width: "100px",
                    height: "100px",
                    backgroundColor: mixedColor
                }}>Mixed Color</div>

            <div
                style={{
                    margin: "10px",
                    width: "100px",
                    height: "100px",
                    background: `linear-gradient(to right, ${color1}, ${mixedColor}, ${color2})`
                }}>Gradient</div>
        </div>
    )

}