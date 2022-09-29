let size;
let color;
let gridBorder;
let gridColor;

const inputSize = document.querySelector('#gridSize');
const inputDiv = document.querySelector('#input');
const favColor = document.getElementById('favcolor');
const boxes = document.querySelector('.boxes');
const blackBtn = document.getElementById('Black');
const eraserBtn = document.getElementById('Eraser');
const randomBtn = document.getElementById('Random');
const resetBtn = document.getElementById('Reset');
const borderStyle = document.getElementById('borderStyle');
const gridStyleColor = document.getElementById('gridColor');

gridStyleColor.onchange = (e) => setGridColor(e.target.value);
favColor.onchange = (e) => setColor(e.target.value);
blackBtn.onclick = () => setColor('black');
eraserBtn.onclick = () => setColor('Eraser');
randomBtn.onclick = () => setColor('random');
resetBtn.onclick = () => reset();
borderStyle.onclick = () => setGridborder();
inputSize.addEventListener('mousemove', displaySize);
inputSize.addEventListener('change', setGridSize);


function createGrid(){
    size = inputSize.value;
    boxes.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boxes.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let divs = size * size;
    for(let i = 0; i<divs; i++){
        let divBox = document.createElement('div');
        divBox.className = 'grid-element';
        divBox.style.backgroundColor = gridColor || 'white';
        divBox.style.border = gridBorder;
        boxes.insertAdjacentElement('beforeend', divBox);
        divBox.addEventListener('mouseover', changeColor);
    }
}

function displaySize(){
    inputDiv.textContent = inputSize.value+' x '+inputSize.value;
}

function setGridSize(){
    boxes.innerHTML = '';
    displaySize();
    createGrid();
}

function changeColor(){
    if(color == 'random'){
        this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }
    else {
        this.style.backgroundColor = color;
    }
}

function setColor(choice){
    if(choice === 'Eraser'){
        color = gridColor || 'white';
        active();
    }
    else{
        color = choice;
        active();
    }
}

function active(){
    if(color == 'black'){
        blackBtn.classList.add('active');
        eraserBtn.classList.remove('active');
        randomBtn.classList.remove('active');
    }
    else if(color == 'random'){
        blackBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
        randomBtn.classList.add('active');
    }
    else if(color == gridColor || color == 'white'){
        blackBtn.classList.remove('active');
        eraserBtn.classList.add('active');
        randomBtn.classList.remove('active');
    }
    else {
        blackBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
        randomBtn.classList.remove('active');
    }
}

function reset(){
    setGridSize();
}

function setGridborder(){
    if(borderStyle.textContent == 'Grid Lines: On'){
        borderStyle.textContent = 'Grid Lines: Off';
        gridBorder = 'none';
        setGridSize();
        activeGridBorder();
    }
    else if(borderStyle.textContent == 'Grid Lines: Off'){
        borderStyle.textContent = 'Grid Lines: On';
        gridBorder = '1px solid black';
        setGridSize();
        activeGridBorder();
    }
}

function activeGridBorder(){
    if(borderStyle.textContent == 'Grid Lines: On'){
        borderStyle.classList.add('active');
    }
    else {
        borderStyle.classList.remove('active');
    }
}


function setGridColor(choice){
    gridColor = choice;
    color = choice;
    setGridSize();
}


window.onload = () =>{
    setGridSize();
}