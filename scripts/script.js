function buildGrid(gridSize = 16) {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    // Remove existing boxes
    if (grid) grid.forEach(box => box.parentNode.removeChild(box));

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridElement = document.createElement('div');
            gridElement.style.backgroundColor = "rgb(255, 255, 255)";
            gridContainer.appendChild(gridElement);
        }
    }

    addBoxesListeners();
}

function addBoxesListeners() {
    grid = document.querySelectorAll(".grid-container > *");
    grid.forEach(box => box.addEventListener('mouseover', changeColor));
}

function changeColor(e) {
    if (colorChoice[0].checked) {
        this.style.backgroundColor = "rgb(0, 0, 0)";
    }

    if (colorChoice[1].checked) {
        let r = Math.floor(Math.random() * 360);
        let g = Math.floor(Math.random() * 360);
        let b = Math.floor(Math.random() * 360);
        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    if (colorChoice[2].checked) {
        const backgroundColor = getComputedStyle(this).backgroundColor;
        const rgb = backgroundColor.replace(/[^\d,]/g, '').split(',');
        console.log(backgroundColor);

        let r = rgb[0] * 0.7;
        let g = rgb[1] * 0.7;
        let b = rgb[2] * 0.7;

        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    if (colorChoice[3].checked) {
        const backgroundColor = getComputedStyle(this).backgroundColor;
        const rgb = backgroundColor.replace(/[^\d,]/g, '').split(',');
        console.log(backgroundColor);
        let r = Number(rgb[0]) + (255 - rgb[0]) * 0.7;
        let g = Number(rgb[1]) + (255 - rgb[1]) * 0.7;
        let b = Number(rgb[2]) + (255 - rgb[2]) * 0.7;
        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

function gridReset(e) {
    grid.forEach(box => box.style.backgroundColor = "rgb(255, 255, 255)");

    let dimensions = Number(controlsForm.elements.dimensions.value) || 16;
    buildGrid(dimensions);
}

function displayGrid() {
    if (controlsForm.elements.displayGrid.checked) {
        grid.forEach(box => box.style.border = "1px rgba(0,0,0,0.1) solid");
    } else {
        grid.forEach(box => box.style.border = "none");
    }
}

const controlsForm = document.forms[0];
let grid;

buildGrid();
displayGrid();

const colorChoice = controlsForm.elements.colorChoice;
colorChoice.forEach(choice => choice.addEventListener('click', addBoxesListeners));

const resetButton = controlsForm.elements.reset;
resetButton.addEventListener('click', gridReset);

controlsForm.elements.displayGrid.addEventListener('click', displayGrid);




