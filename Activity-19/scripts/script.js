document.getElementById('colorPicker').addEventListener('change', function() {
    let chosenColor = this.value;
    displayColor(chosenColor);
    addToHistory(chosenColor);
});

document.getElementById('randomColor').addEventListener('click', function() {
    let randomColor = getRandomColor();
    displayColor(randomColor);
    addToHistory(randomColor);
});

function displayColor(color) {
    let displayArea = document.getElementById('displayArea');
    displayArea.style.backgroundColor = color;
    displayArea.textContent = color;  // Display the hexadecimal code
    document.body.style.backgroundColor = color;  // Change the background color
}

function addToHistory(color) {
    let historyDiv = document.getElementById('paletteHistory');
    let newColorBox = document.createElement('div');
    newColorBox.style.backgroundColor = color;
    newColorBox.classList.add('color-box');
    historyDiv.appendChild(newColorBox);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
