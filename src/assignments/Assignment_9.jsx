import ReactPaginate from "react-paginate"
import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router-dom";


export default function Assignment_9() {
    const [colors, setColors] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0)
    const [query, setQuery] = useState("");

    const fetchData = async () => {
        const response = await axios.get(`https://apis.dnjs.lk/objects/colors.php?search=red&page=${page}&limit=${limit}`);
        setColors(response.data.data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())));
        setTotal(Math.ceil(response.data.total / limit));
    };
    useEffect(() => {
        fetchData()
    }, [page, limit]);


    return (
        <>
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ margin: "10px" }} />

            <button onClick={fetchData}>Search</button>

            <ul>
                {colors.map((color, index) => (
                    <li key={index}>{color.name} - {color.code}</li>
                ))}
            </ul>

            <div>
                {Array.from({ length: total }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    )
}