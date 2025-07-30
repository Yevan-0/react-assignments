import { useEffect, useState } from "react";


export default function Assignment_2() {

    function calculate() {
        const a = Number(document.getElementById('num1').value);
        const b = Number(document.getElementById('num2').value);
        const operator = document.getElementById('operators').value;
        const output = document.getElementById('output');

        if (operator == "+") {
            output.value = a + b;
        } else if (operator == "-") {
            output.value = a - b;
        } else if (operator == "*") {
            output.value = a * b;
        } else if (operator == "/") {
            output.value = a / b;
        }
    }

    return (
        <div>
            <label htmlFor="num1">Number 1:</label> <input type="number" id="num1" />
            <br />
            <label htmlFor="operators">Operator : </label>
            <select id="operators">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <br />
            <label htmlFor="num2">Number 2: </label> <input type="number" id="num2" />
            <br />
            <label htmlFor="output">Output Value: </label><input type="number" id="output" disabled />
            <br /><br />
            <button onClick={calculate}>Calculate</button>
        </div>
    )
}