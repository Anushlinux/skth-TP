
document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.querySelector(".graph-grid");
  const gridSlider = document.getElementById("slide-bitch");
  let isDragging = false;
  const colorPicker = document.getElementById("color-select");
  const bgPicker = document.getElementById("bg-pick");
  let selectedColor = colorPicker.value;
  let backgroundColor = bgPicker.value;
  let isErasing = false;
  let israinBow = false;
  const eraserButton = document.querySelector(".eraser");
  const rainbowButton = document.querySelector(".rainbow");

  function createGrid(gridSize) {
    gridContainer.innerHTML = ""; 

    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) 
    {
      const cell = document.createElement("div");
      cell.style.background = backgroundColor;
      cell.style.borderColor = `1px solid ${getContrastingColor(backgroundColor)}`

      cell.addEventListener("mousedown", () => {
        isDragging = true;
        applyCell(cell);
       
      });

      cell.addEventListener("mousemove", () => {
        if(isDragging)
        {
            applyCell(cell);
        }
        
        
      });

      cell.addEventListener("mouseup", () => {
        isDragging = false;
      });

      cell.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });

      gridContainer.appendChild(cell);
    }
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function applyCell(cell) {
    if (isErasing)
    {
      cell.style.backgroundColor = backgroundColor;
    }
    else if (israinBow)
    {
      cell.style.backgroundColor = getRandomColor();
    }
    else
    {
      cell.style.backgroundColor = selectedColor;
    }
  }

  function getContrastingColor(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000" : "#FFF";
  }

  createGrid(gridSlider.value);
  
  gridSlider.addEventListener("input", () => {
    createGrid(gridSlider.value);
  });

  colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
  });

  bgPicker.addEventListener("input", () => {
    backgroundColor = bgPicker.value;

    document.querySelectorAll('.graph-grid div').forEach(cell => {
        cell.style.backgroundColor = backgroundColor;
        cell.style.border = `1px solid ${getContrastingColor(backgroundColor)}`
    });

  });

  eraserButton.addEventListener("click", () => {
    isErasing = !isErasing;
    eraserButton.classList.toggle("active");
  });

  rainbowButton.addEventListener("click", () => {
    israinBow = !israinBow;
    rainbowButton.classList.toggle("active");
    eraserButton.classList.remove("active");
  });
  
});
