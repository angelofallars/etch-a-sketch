const sketch = document.querySelector("#sketch");
const clearButton = document.querySelector(".clear-button");

// Create a grid (default 16x16) inside the etch container
function createGrid(dimensions = 16) {
  const squareCount = dimensions ** 2;
  const sketchWidth = parseInt(sketch.style.width);

  for (let i = 0; i < squareCount; i++) {
    let square = document.createElement("div");
    square.classList.add("sketch__square");

    square.style.width = `${sketchWidth / dimensions}px`;
    square.style.height = `${sketchWidth / dimensions}px`;

    // Make the grid divs change color on hover
    square.addEventListener("mouseover", (e) => {
      // Add a class to turn them black
      e.target.classList.add("sketch__square--black");
    });

    sketch.appendChild(square);
  }
}


// Clear the grid of colors by "resetting" the styles of each square
function clearGrid() {
  for (let child of sketch.children) {
    child.className = "sketch__square";
  }
}

sketch.style.height = '400px';
sketch.style.width = '400px';

clearButton.addEventListener("click", () => {
  clearGrid();
});

createGrid(16);
