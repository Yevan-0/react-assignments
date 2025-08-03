import { useState } from "react";



export default function Assignment_6() {
    const [inputName, setInputName] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [style, setStyle] = useState([])

    const changeStyle = () => {
        const name = inputName;
        const value = inputVal;
        setStyle(prev => {
            const list = [...prev, { name, value }];
            return list
        });
        setInputName("");
        setInputVal("");
    }

     const deleteItem = (indexToDel) => {
        const updatedList = style.filter((_, i) => i !== indexToDel);
        console.log(updatedList)
        setStyle(updatedList);
    }


    const cssObject = style.reduce((obj, item) => ({
        ...obj, [item.name]: item.value
    }), {})

   
    return (
        <div>

            <p style={cssObject}>SAMPLE TEXT</p>
            <input type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                style={{ margin: '10px' }}
            />

            <input type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{ margin: '10px' }}
            />

            <button onClick={changeStyle}>Change style</button>

            <br />
            <ul>
                {style.map((element, index) => (
                    <li key={index} style={{display:"flex", alignItems:"center", gap:"8px", margin:"10px"}}>
                        <span>{`${element.name} : ${element.value}`}</span> 
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}