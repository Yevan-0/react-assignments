import { div, title } from "framer-motion/client";
import { createElement, useEffect, useState } from "react";
import './Assignment_30.css'
export default function Assignment_30() {
    const [items, setItems] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [bgColor, setBgColor] = useState('rgba(33, 33, 33, 0.67)');

    useEffect(() => {
        setItems([
            'Default', 'Red', 'Green', 'Blue'
        ]);
    }, []);

    useEffect(() => {
        window.onclick = () => {
            setMenuVisible(false);
        }
        return () => {
            window.onclick = null;
        }
    }, []);

    return (
        <div>
            <div
                style={{ backgroundColor: bgColor }}
                className="container"
                onContextMenu={(e) => {
                    e.preventDefault();
                    console.log('right click');
                    setMenuVisible(true);
                    setMenuPosition({ x: e.pageX, y: e.pageY });
                }}
            >
                Right click to display menu
            </div>

            {menuVisible && (
                <div
                    className="context-menu"
                    style={{
                        position: 'absolute',
                        top: menuPosition.y,
                        left: menuPosition.x,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            className="item"
                            key={index}
                            onClick={() => {
                                const color = item.toLowerCase();
                                setBgColor(color === 'default' ? 'rgba(33, 33, 33, 0.67)' : color);
                            }}
                        >{item}</div>
                    ))}
                </div>
            )}

        </div>
    )
}