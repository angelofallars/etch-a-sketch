const sketch = document.querySelector("#sketch");

// Create a grid (default 16x16) inside the etch container
function createGrid(dimensions = 16) {
  const squareCount = dimensions ** 2;
  const sketchWidth = parseInt(sketch.style.width);

  deleteGrid();

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

// Delete the grid
function deleteGrid() {
  const childrenCount = sketch.children.length;

  for (let i = childrenCount - 1; i >= 0; i--) {
    sketch.children[i].remove();
  }
}

sketch.style.height = '400px';
sketch.style.width = '400px';

const clearButton = document.querySelector(".controls__clear");
const dimensionButtons = document.querySelectorAll(".controls__dimensions");

clearButton.addEventListener("click", () => {
  clearGrid();
});

dimensionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const dimensions = e.target.getAttribute("value");
    createGrid(dimensions);

    // Make the current size highlighted
    dimensionButtons.forEach((button) => {
      if (button === e.target) {
        button.classList.remove("btn--inactive");
      } else {
        button.classList.add("btn--inactive");
      }
    });
  });
});

createGrid(16);
