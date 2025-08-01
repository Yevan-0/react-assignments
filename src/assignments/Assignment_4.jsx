import { useState } from "react";
export default function Assignment_4(){
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
                return updatedList;
            });
            setInput("");
        }
    };

    return (
        <div>
            <ul></ul>
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