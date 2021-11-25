const sketch = document.querySelector("#sketch");
const rainbowColors = ["red", "orange", "yellow",
                       "green", "blue", "magenta"];

let brushColor = "black";

// Fill a square in the canvas with the color in 'brushColor'
function fillSquare(e) {
  e.target.setAttribute("class", "sketch__square");

  if (brushColor === "black") {
    e.target.classList.add("sketch__square--black");
  } else if (brushColor === "rainbow") {
    // Get a random color from rainbowColors
    const squareColor = rainbowColors[Math.floor(Math.random() * 
                                                 rainbowColors.length)];

    e.target.classList.add(`sketch__square--${squareColor}`);
  }
}

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
    square.addEventListener("mouseover", fillSquare);

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
const colorButtons = document.querySelectorAll(".color-controls__btn");

clearButton.addEventListener("click", clearGrid);

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

colorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    brushColor = e.target.value;

    // Make the current size highlighted
    colorButtons.forEach((button) => {
      if (button === e.target) {
        button.classList.remove("btn--inactive");
      } else {
        button.classList.add("btn--inactive");
      }
    });
  });
});

createGrid(16);
