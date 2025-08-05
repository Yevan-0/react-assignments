import axios from "axios";
import { useState, useEffect } from "react";
import { data } from "react-router-dom";

export default function Assignment_8() {
    const [query, setQuery] = useState("");
    const [array, setArray] = useState([]);


    const searchItem = async () => {
        const respsone = await axios.get(`https://apis.dnjs.lk/objects/colors.php`);
        setArray(respsone.data.filter(item =>
            item.name[0].toLowerCase().includes(query.toLowerCase())
        ));
    };

    useEffect(() => {
        searchItem();
    }, []);


    return (
        <div>
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />

            <button onClick={searchItem}>Search</button>

            <ul>
                {array.map((item, index) => (
                    <li key={index}>{item.name}-{item.code}</li>
                ))}
            </ul>
        </div>
    )

}