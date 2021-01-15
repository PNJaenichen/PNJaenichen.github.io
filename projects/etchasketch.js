function getGridSize() {
    let userSize = NaN;
    do {
        userSize = prompt("Enter Grid size 1-100", 16);
    } while (!parseInt(userSize) || parseInt(userSize) < 0 || parseInt(userSize) > 100);
    buildGrid(userSize);
}

function buildGrid(size) {
    let gridSize = size;
    let relSize = `${(1 / gridSize) * 100}%`;

    for (let i = 0; i < gridSize; i++) {
        let new_row = document.createElement('div');
        new_row.style.height = relSize;
        new_row.className = 'row';
        for (let j = 0; j < gridSize; j++) {
            let new_pix = document.createElement('div');
            new_pix.id = `${i}_${j}`;
            new_pix.className = 'pixel';
            new_pix.style.width = relSize;
            new_pix.style.height = "100%";
            new_row.appendChild(new_pix);
        }
        container.appendChild(new_row);
    }
}

function resetColor() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    getGridSize();
}

const container = document.querySelector('#container');
const reset = document.querySelector('#reset')

getGridSize();

container.addEventListener("mouseover", function(e) {
    if (e.target.className == 'pixel') {
        e.target.style.background = 'black';
    }
});

reset.addEventListener("click", resetColor);