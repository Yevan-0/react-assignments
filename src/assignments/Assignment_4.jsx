import { useState } from "react";
export default function Assignment_4() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);

    const addItems = () => {
        const num = parseFloat(input);

        if (!isNaN(num)) {
            setItems(prev => {
                const updatedList = [...prev, num];
                console.log(updatedList)
                return updatedList;
            });
            setInput("");
        }
    };

    const deleteItems = (indexToDel) => {
        const updated = items.filter((_, i) => i !== indexToDel);
        setItems(updated)
    }

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} style={{margin: "10px 0"}}>
                        {item}  <button onClick={() => deleteItems(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />  <br />
            <button onClick={addItems}>Add</button>
        </div>
    )
}