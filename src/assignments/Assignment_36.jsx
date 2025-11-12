import { useEffect, useRef, useState } from "react";
import './Assignment_36.css';

export default function Assignment_36() {
    const [numbers, setNumbers] = useState([]);
    const [expand, setExpand] = useState(null);
    const [rect, setRect] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [closing, setClosing] = useState(false);
    const outerRef = useRef(null);
    const itemRef = useRef([]);

    useEffect(() => {
        const fixedColors = [
            "#FF5733", "#33FF57", "#3357FF", "#F1C40F",
            "#9B59B6", "#1ABC9C", "#E67E22", "#2ECC71"
        ];
        const nums = Array.from({ length: 64 }, (_, i) => ({
            value: i,
            color: fixedColors[i % fixedColors.length]
        }));
        setNumbers(nums);
    }, []);

    const setItemRef = (el, index) => {
        if (el) itemRef.current[index] = el;
    };

    const handleClick = (index) => {
        const item = itemRef.current[index];
        const outer = outerRef.current;

        if (item && outer) {
            const itemBounds = item.getBoundingClientRect();
            const outerBounds = outer.getBoundingClientRect();

            setRect({
                top: itemBounds.top - outerBounds.top,
                left: itemBounds.left - outerBounds.left,
                width: itemBounds.width,
                height: itemBounds.height,
                color: numbers[index].color,
                value: numbers[index].value
            });

            setExpand(index);

            setTimeout(() => {
                setAnimating(true);
            }, 10)
        }
    };

    const handleClose = () => {
        setAnimating(false);
        setClosing(true);

        setTimeout(() => {
            setExpand(null);
            setRect(null);
            setClosing(false);
        }, 400);

    };

    return (
        <div>
            <div className="container" ref={outerRef}>
                <div className="numbers">
                    {numbers.map((number, index) => (
                        <div
                            key={index}
                            ref={(el) => setItemRef(el, index)}
                            className={`number ${expand === index ? "expand" : ""}`}
                            onClick={() => handleClick(index)}
                            style={{ backgroundColor: number.color }}
                        >
                            {number.value}
                        </div>
                    ))}
                </div>

                {rect && (
                    <div
                        className={`overlay ${expand !== null ? "open" : ""}`}
                        style={{
                            position: "absolute",
                            top: animating ? 0 : rect.top,
                            left: animating ? 0 : rect.left,
                            width: animating ? "100%" : rect.width,
                            height: animating ? "100%" : rect.height,
                            backgroundColor: rect.color,
                            transition: "all 0.4s ease",
                            overflow: "hidden"
                        }}
                    >
                        <div className="exit" onClick={handleClose} />
                        <div className="expanded-content">{rect.value}</div>
                    </div>
                )}
            </div>
        </div>
    );
}