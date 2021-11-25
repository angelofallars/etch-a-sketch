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


// Clear the current grid
function clearGrid() {
  const childrenCount = sketch.children.length;

  for (let i = childrenCount - 1; i >= 0; i--) {
    sketch.children[i].remove();
  }
}

sketch.style.height = '400px';
sketch.style.width = '400px';

clearButton.addEventListener("click", () => {
  clearGrid();
  let dimensions;
  
  do {
    dimensions = parseInt(prompt("Dimensions of new grid:"));

    if (dimensions > 80) {
      alert("Dimensions must be not more than 80.");
    }
  }
  while (isNaN(dimensions) || dimensions > 80);

  createGrid(dimensions);
});

createGrid(16);
