import axios from "axios";
import { useState,useEffect } from "react";

export default function Assignment_7() {
    const [array, setArray] = useState([]);
   
    useEffect(()=>{
        axios.get(`https://apis.dnjs.lk/objects/colors.php`)
        .then(response => {
            setArray(response.data)
        })
    }, [])

    return (
        <div>
            <ul>
                {array.map((item, index) => (
                    <li key={index}>{item.name} - {item.code}</li>
                ))}
            </ul>
        </div>
    )
}