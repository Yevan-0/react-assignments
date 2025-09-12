import { press, useScroll } from 'framer-motion'
import './Assignment_27.css'
import { useEffect, useRef, useState } from 'react'
import { div, input } from 'framer-motion/client';

export default function Assignment_27() {
    const [keys, setKeys] = useState([]);
    const keyRef = useRef(null);

    useEffect(() => {
        setKeys([
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
            ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
            ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
        ])
    }, [])

    useEffect(() => {
        const pressedKey = keyRef.current;
        pressedKey.onkeydown = (event) => {
            const keys = document.querySelectorAll('.keyboard-key');
            keys.forEach((key) => {
                let keyText = key.innerText.toLowerCase();
                if (keyText === event.key.toLowerCase()) {
                    key.style.backgroundColor = "#4859";
                } else if (keyText === 'space' && event.key === ' ') {
                    key.style.backgroundColor = '#4859'
                } else if (keyText === 'ctrl' && event.key === 'Control') {
                    key.style.backgroundColor = '#4859'
                } else if (keyText === 'caps lock' && event.key === 'CapsLock') {
                    key.style.backgroundColor = '#4859'
                } else if (keyText === 'tab' && event.key === 'Tab') {
                    key.style.backgroundColor = ''
                }
            })
        }

        pressedKey.onkeyup = (event) => {
            const keys = document.querySelectorAll('.keyboard-key');
            keys.forEach((key) => {
                let keyText = key.innerText.toLowerCase();
                if (keyText === event.key.toLowerCase()) {
                    key.style.backgroundColor = "";
                } else if (keyText === 'space' && event.key === ' ') {
                    key.style.backgroundColor = ""
                } else if (keyText === 'ctrl' && event.key === 'Control') {
                    key.style.backgroundColor = ""
                } else if (keyText === 'caps lock' && event.key === 'CapsLock') {
                    key.style.backgroundColor = ""
                }
            })
        }
    }, [])

    return (
        <div>
            <div className='container'>
                <textarea
                    className='textarea'
                    spellCheck='false'
                    ref={keyRef}
                ></textarea>

                <div className='keyboard'>
                    {keys.map((row, rowIndex) => (
                        <div key={rowIndex} className='keyboard-row'>
                            {row.map((keyVal, keyIndex) => (
                                <div key={keyIndex}
                                    className='keyboard-key'
                                    data-key={keyVal}
                                    onKeyDown={(e) => {
                                        if (e.code === keyVal) {
                                            handleTrack();
                                        }
                                    }}
                                >
                                    {keyVal === " " ? "Space" : keyVal}
                                </div>
                            ))}</div>
                    ))}
                </div>

            </div>
        </div>
    )
}