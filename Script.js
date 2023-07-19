const calculateWaterStorage = () => {
    const heightsInput = document.getElementById("block-heights");
    const resultElement = document.getElementById("result");
    const svgContainer = document.getElementById("svg-container");
  
    const heights = heightsInput.value.split(",").map(Number);
    const n = heights.length;
    let leftMax = 0;
    let rightMax = 0;
    let left = 0;
    let right = n - 1;
    let waterUnits = 0;
  
    while (left < right) {
      if (heights[left] < heights[right]) {
        if (heights[left] > leftMax) {
          leftMax = heights[left];
        } else {
          waterUnits += leftMax - heights[left];
        }
        left++;
      } else {
        if (heights[right] > rightMax) {
          rightMax = heights[right];
        } else {
          waterUnits += rightMax - heights[right];
        }
        right--;
      }
    }
  
    resultElement.textContent = `Units of water stored: ${waterUnits}`;
    renderSVG(waterUnits, svgContainer);
  };
  const renderSVG = (waterUnits, container) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "200");
  
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "50");
    rect.setAttribute("y", "50");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "100");
    rect.setAttribute("fill", "#eaeaea");
  
    const waterRect = document.createElementNS(svgNS, "rect");
    waterRect.setAttribute("x", "50");
    waterRect.setAttribute("y", `${150 - waterUnits}`);
    waterRect.setAttribute("width", "200");
    waterRect.setAttribute("height", `${waterUnits}`);
    waterRect.setAttribute("fill", "#0088ff");
  
    svg.appendChild(rect);
    svg.appendChild(waterRect);
  
    container.innerHTML = "";
    container.appendChild(svg);
  };
  
  const calculateButton = document.getElementById("calculate-btn");
  calculateButton.addEventListener("click", calculateWaterStorage);
  
  // 0,4,0,0,0,6,0,6,4,0
  