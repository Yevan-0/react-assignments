
import { useEffect, useState } from "react";

export default function Assignment_1(props) {
    const [visibility, setVisibility] = useState('');

    return (

        <>
            {visibility === 'p1'&& <p> This is paragraph 1</p>}
            {visibility === 'p2' && <p> This is paragraph 2</p>}
            {visibility === 'p3' && <p> This is paragraph 3</p>}

            <button onClick={() => setVisibility('p1')}>Section #1</button>
            <button onClick={() => setVisibility('p2')}>Section #2</button>
            <button onClick={() => setVisibility('p3')}>Section #3</button>

        </>


    )

}