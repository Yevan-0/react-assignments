import { useEffect, useState } from "react";

export default function Assignment_5() {
    let array = [];

    function add() {
        const input = document.getElementById('num').value;
        const numbers = parseInt(input);
        array.push(numbers);
        console.log(array);
        display()
        deleteButtons()
        moveUp()
    }

    function display() {
        const ul = document.getElementsByTagName('ul')[0];
        ul.innerHTML = "";

        array.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element;
            ul.appendChild(li)
        });
    }

    function deleteButtons() {
        const list = Array.from(document.getElementsByTagName('li'));

        list.forEach(li => {
            const delBtn = document.createElement('button')
            delBtn.textContent = 'Delete'
            delBtn.style.marginLeft = '10px'
            delBtn.style.marginTop = '10px';
            delBtn.style.marginRight = '10px';

            delBtn.onclick = () => {
                li.remove();
            }
            li.appendChild(delBtn)
        });
    }

    function sortAscending() {
        const sortedArray = array.sort((a, b) => a - b);
        console.log(sortedArray);
        display()
        deleteButtons()

    }

    function sortDescending() {
        const sortedArray = array.sort((a, b) => b - a);
        console.log(sortedArray);
        display()
        deleteButtons()
    }

    function moveUp() {
        list
    }
    const list = Array.from(document.getElementsByTagName('li'));
    list.forEach(li => {
        const moveUpBtn = document.createElement('button');
        moveUpBtn.textContent = 'Move Up';
        moveUpBtn.onclick = () => moveUp(li);
        li.appendChild(moveUpBtn);
    })




    return (
        <div>
            <ul></ul>
            <input type="number" id="num" />
            <br />  <br />
            <button onClick={add}>Add</button>
            <br /><br />
            <button onClick={sortAscending}>Sort Ascending</button>
            <br /><br />
            <button onClick={sortDescending}>Sort Descending</button>

        </div>
    )
}
