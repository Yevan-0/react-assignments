import { useState } from "react";



export default function Assignment_6() {
    const [style, setStyle] = useState([]);
    const updateStyle = () => {
        setStyle()
    }

    return (
        <div>
            <h4 style={style}>CHANGE MY STYLE</h4>
            <label htmlFor="name">Enter rule name</label> <input type="text" id="name" />
            <br />
            <label htmlFor="value">Enter rule value</label> <input type="text" id="value" />
            <br /><br />
            <button onClick={updateStyle}>Add</button>

        </div>
    )
}