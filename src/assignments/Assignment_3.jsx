import { useEffect, useState } from "react";

export default function Assignment_3() {
    let array = [];
    function add() {
        const input = (document.getElementById('num').value);
        const inputs = parseInt(input)
        array.push(inputs)
        array.sort((a, b) => a - b)
        console.log(array)
        display()
        totalAndAverage()
    }
    function display() {
        const ul = document.getElementsByTagName("ul")[0];
        ul.innerHTML = "";

        array.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        })
    }
    function totalAndAverage() {
        const total = array.reduce((acc, element) => acc + element);
        document.getElementById('total').textContent = total;
        const average = total/array.length
        document.getElementById('average').textContent = average;   
    }

    return (
        <div>
            <ul></ul>
            <input type="number" id="num" />
            <button onClick={add}>Add</button>
            <br />
            <label htmlFor="total">Total :</label> <p id='total' />
            <label htmlFor="average">Average :</label> <p id="average" />
        </div>
    )
}