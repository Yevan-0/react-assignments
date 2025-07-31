import { useState } from "react";


export default function Assignment_2() {

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState('');

    function calculate() {
        const num1 = parseInt(value1);
        const num2 = parseInt(value2);
        let output;

        if (isNaN(num1) || isNaN(num2)) {
            output = ""
        } else {
            switch (operator) {
                case '+':
                    output = num1 + num2;
                    break;

                case '-':
                    output = num1 - num2;
                    break;
                case '*':
                    output = num1 * num2;
                    break;
                case '/':
                    output = num1 / num2;
                    break;
                default:

            }
        }

        setResult(output)
    }



    return (
        <div>
            <input
                type="number"
                value={value1}
                onChange={element => setValue1(element.target.value)}
                placeholder="Enter 1st number"
            />

            <br />

            <label htmlFor="operators">Operator : </label>

            <select value={operator}
                onChange={element => setOperator(element.target.value)}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>

            <br />

            <input
                type="number"
                value={value2}
                onChange={element => setValue2(element.target.value)}
                placeholder="Enter 1st number"
            />

            <br />

            <label htmlFor="output">Output Value: </label> <input type="number" value={result} disabled />
            <br /><br />
            <button onClick={calculate}>Calculate</button>
        </div>
    )
}