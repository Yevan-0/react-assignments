import { useState } from "react";
import { redirectDocument } from "react-router-dom";

export default function Assignment_3() {
    const [input, setInput] = useState("");
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState("");
    const [items, setItems] = useState([]);


    const addItems = () => {
        const num = parseFloat(input);

        if (!isNaN(num)) {
            setItems(prev => {
                const updatedList = [...prev, num];
                console.log(updatedList)
                const sum = updatedList.reduce((acc, elemnt) => acc + elemnt, 0);
                setTotal(sum);
                console.log("total:", sum);
                const avg = sum / updatedList.length;
                setAverage(avg)
                console.log("average :", average)
                return updatedList;
            });
            setInput("");
        }
    };

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addItems}>Add</button>
            <br />
            <p>Total: {total}</p>
            <p>Average: {average}</p>
        </div>
    )
}