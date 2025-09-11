import { useEffect, useRef, useState } from "react"
import './Assignment_26.css'

export default function Assignment_26() {
    const [drag, setDrag] = useState(false);
    const elementRef = useRef(null);
    const oX = useRef(0);
    const oY = useRef(0);
    const eX = useRef(0);
    const eY = useRef(0);
    const offsetX = useRef(0);
    const offsetY = useRef(0);


    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        element.onmousedown = (event) => {
            event.preventDefault();
            setDrag(true);
            // remember initial cursor position
            oX.current = event.clientX;
            oY.current = event.clientY;

            const rect = element.getBoundingClientRect(); // elements current position and size

            // remember initial object position
            eX.current = rect.left;
            eY.current = rect.top;

            // calc the distance from objects top-left corner during drag
            offsetX.current = event.clientX - rect.left;
            offsetY.current = event.clientY - rect.top;
        }

        window.onmousemove = (event) => {
            if (!drag) return;

            // gets the difference fromt the orign and the current coordinates
            const objectLeft = event.clientX - offsetX.current;
            const objectTop = event.clientY - offsetY.current;

            element.style.left = `${objectLeft}px`
            element.style.top = `${objectTop}px`
        }

        window.onmouseup = () => {
            setDrag(false)
        }


    }, [drag])

    return (
        <div>
            <div className="container">
                <div
                    className="draggable"
                    ref={elementRef}
                >
                    DRAG ME!
                </div>
            </div>
        </div>
    )
}