import { color } from "framer-motion";
import { div, style } from "framer-motion/client";
import { createElement, useEffect, useRef, useState } from "react";


export default function Assignment_24() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null);
    const [statements, setStatements] = useState([]);
    const [selectIndex, setSelcetIndex] = useState(-1);


    const enter = () => {

        try {
            const func = new Function(`return ${input}`)
            const result = func();

            const display = (
                <div>
                    <div style={{
                        display: 'flex',
                        borderRadius: '5px 5px 5px 5px',
                        border: " solid thin #464652ff",
                        backgroundColor: "#222222ff",
                        color: '#8e8c8cff ',
                        fontWeight: 'bold',
                        margin: '5px'
                    }}>
                        <img src="./arrow_right.svg"
                            style={{
                                width: '20px'
                            }}
                        />
                        <span>{input}</span>
                    </div>

                    <div
                        data-type={typeof result}
                        style={{
                            display: 'flex',
                            borderRadius: '5px 5px 5px 5px',
                            border: " solid thin #464652ff",
                            backgroundColor: "#222222ff",
                            color: getDataColor(typeof result),
                            margin: '5px',
                        }}>
                        <img src="./arrow_right.svg"
                            style={{
                                width: '20px'
                            }}
                        />
                        <span>{result === undefined ? 'undefined' : JSON.stringify(result)}</span>
                    </div>
                </div>
            )

            setOutput({ input, jsx: display });
            setInput('')
        } catch (err) {
            // console.error(err)
            const errors = (
                <div style={{
                    display: 'flex',
                    borderRadius: '5px 5px 5px 5px',
                    border: " solid thin #ff0000ff",
                    backgroundColor: "#a23e3eff",
                    color: '#ffff',
                    margin: '5px'
                }}>
                    <img src="./arrow_right.svg"
                        style={{
                            width: '20px',
                        }}
                    />
                    <span>{err.message}</span>
                </div>
            )
            setOutput({ input, jsx: errors });
            setInput('');

        }
    }

    const getDataColor = (type) => {
        switch (type) {
            case 'string':
                return '#fe8d59';
            case 'number':
                return '#9980ff';
            case 'boolean':
                return '#9980ff';
            case 'object':
                return '#5cd5fb';
            case 'undefined':
                return '#8888';
            default:
                return '#2e2e2e';
        }
    }

    useEffect(() => {
        if (!output) return;
        setStatements(acc => [output, ...acc])
        setSelcetIndex(0)
    }, [output])


    return (
        <div className="container"
            style={{
                width: '600px',
                height: '600px',
                backgroundColor: '#2f3031ff',
                borderRadius: '15px 15px 15px 15px',
                display: "flex",
                flexDirection: 'column',
                filter: 'drop-shadow(0px 10px 15px rgba(20, 19, 19, 1))',
                position: 'relative'
            }}>

            <div className="output"
                style={{
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    padding: '15px',
                    maxHeight: '100%',
                    overflow: 'auto'
                }}>
                {statements.map((element, index) => (
                    <div
                        key={index}
                    >
                        <div style={{
                        }}>{element.jsx}</div>
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                }}
                placeholder="Input your JavaScript command and hit enter"
                style={{
                    borderRadius: '0 0 15px 15px',
                    border: " solid thin #464652ff",
                    height: '40px',
                    paddingLeft: '20px',
                    bottom: '30px',
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        enter();
                    } else if (e.key === "ArrowUp") {
                        if (selectIndex < statements.length - 1) {
                            const newIndex = selectIndex + 1;
                            setSelcetIndex(newIndex);
                            setInput(statements[newIndex].input);
                        }
                    } else if (e.key === "ArrowDown") {
                        if (selectIndex > 0) {
                            const newIndex = selectIndex - 1;
                            setSelcetIndex(newIndex);
                            setInput(statements[newIndex].input);
                        } else if (selectIndex === 0) {
                            setSelcetIndex(-1);
                            setInput('')
                        }
                    }
                }}
            />

        </div>
    )
}
