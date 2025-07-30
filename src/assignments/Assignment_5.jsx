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
        moveDown()
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
        moveUp()
        moveDown()


    }

    function sortDescending() {
        const sortedArray = array.sort((a, b) => b - a);
        console.log(sortedArray);
        display()
        deleteButtons()
        moveUp()
        moveDown()

    }

    function moveUp() {
        const list = Array.from(document.getElementsByTagName('li'));

        list.forEach((li, index) => {
            const upBtn = document.createElement('button')
            upBtn.textContent = 'Move Up'
            upBtn.style.marginLeft = '10px'
            upBtn.style.marginTop = '10px';
            upBtn.style.marginRight = '10px';
            upBtn.disabled = index === 0;

            

            upBtn.onclick = () => {
                if (index > 0) {
                    [array[index - 1], array[index]] = [array[index], array[index - 1]];
                    display();
                    moveUp();
                    moveDown()
                    deleteButtons()

                }
            }
            li.appendChild(upBtn)
        });

    }


    function moveDown() {
        let list =  Array.from(document.getElementsByTagName('li'));
        list.forEach((li, index) => {
            const downBtn = document.createElement('button')
            downBtn.textContent = 'Move Down'
            downBtn.style.marginLeft = '10px'
            downBtn.style.marginTop = '10px';
            downBtn.style.marginRight = '10px';
            downBtn.disabled = index === array.length - 1;

            downBtn.onclick = () => {
                if (index < array.length - 1) {
                    [array[index], array[index + 1]] = [array[index + 1], array[index]];
                    display();
                    moveDown();
                    moveUp();
                    deleteButtons()
                }
            }
            li.appendChild(downBtn)
        });
    }




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
