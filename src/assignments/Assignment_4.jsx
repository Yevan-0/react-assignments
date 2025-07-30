export default function Assignment_4(){
    let array = [];
    function add(){
        const input = document.getElementById('num').value;
        const numbers = parseInt(input);
        array.push(numbers);
        console.log(array);
        display();
        deleteButtons();
    }

    function display(){
        const ul = document.getElementsByTagName('ul')[0];
        ul.innerHTML ="";

        array.forEach(element => {
            const li = document.createElement('li');
            li.textContent =    element;
            ul.appendChild(li);
        });
    }

    function deleteButtons(){
        const list = Array.from(document.getElementsByTagName('li'));
        const selectedItem = list.filter(item => item.textContent.includes('Delete'));

        list.forEach(li => {
            const delBtn = document.createElement('button');
            delBtn.textContent ='Delete';
            delBtn.onclick =() =>{
                li.remove();
            }
            li.appendChild(delBtn);
        });
    }
    

    return (
        <div>
            <ul></ul>
            <input type="number" id="num"/>
            <br />  <br />
            <button onClick={add}>Add</button>
        </div>
    )
}