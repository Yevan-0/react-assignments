import axios from "axios";
import { useState, useEffect, use } from "react";

export default function Assignment_8() {
    const [query, setQuery] = useState("");
    const [array, setArray] = useState([]);

    const searchItem = () => {

        if (query.trim() === "") {
            setArray([]);
            return;
        }

        axios.get(`https://apis.dnjs.lk/objects/colors.php?search=red`)
            .then(respsone => {
                const filtered = respsone.data.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                setArray(filtered);
            })
            .catch(error => console.log(`Error in API:`, error))
    }

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