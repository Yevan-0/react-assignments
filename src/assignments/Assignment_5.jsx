import { useEffect, useState } from "react";

export default function Assignment_5() {
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

    const ascending = () => {
        const listAsc = [...items].sort((a, b) => a - b)
        setItems(listAsc);
    }

    const descending = () => {
        const listDsc = [...items].sort((a, b) => b - a);
        setItems(listDsc);
    }

    const moveUp = (index) => {
        if (index <= 0) return;

        const rearrangedList = [...items];
        [rearrangedList[index - 1], rearrangedList[index]] = [rearrangedList[index], rearrangedList[index - 1]];

        setItems(rearrangedList);

    }

    const moveDown = (index) => {
        if (index < 0 || index >= items.length - 1) return;

        const rearrangedList = [...items];
        [rearrangedList[index], rearrangedList[index + 1]] = [rearrangedList[index + 1], rearrangedList[index]];

        setItems(rearrangedList);

    }
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} style={{ margin: "10px 0" }}>

                        {item} <button onClick={() => deleteItems(index)}>Delete</button>

                        <button onClick={() => moveUp(index)}
                            disabled={index === 0}
                            style={{ margin: "10px 0 0 10px" }}
                        >
                            Move Up
                        </button>

                        <button onClick={() => moveDown(index)}
                            disabled={index === items.length - 1}
                            style={{ margin: "10px 0 0 10px" }}
                        >
                            Move Down
                        </button>

                    </li>
                ))}
            </ul>
            <br />
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <button onClick={addItems}>Add</button>
            <br /><br />
            <button onClick={ascending}>Sort Ascending</button>
            <br /><br />
            <button onClick={descending}>Sort Descending</button>

        </div>
    )
}
