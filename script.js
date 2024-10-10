let display = document.querySelector(".display");

display.textContent = "0";

// Buttons
let clearBtn = document.getElementById("clear");
let sevenBtn = document.getElementById("seven");
let eightBtn = document.getElementById("eight");
let nineBtn = document.getElementById("nine");
let divideBtn = document.getElementById("divide");
let fourBtn = document.getElementById("four");
let fiveBtn = document.getElementById("five");
let sixBtn = document.getElementById("six");
let multiplyBtn = document.getElementById("multiply");
let oneBtn = document.getElementById("one");
let twoBtn = document.getElementById("two");
let threeBtn = document.getElementById("three");
let subtractBtn = document.getElementById("subtract");
let zeroBtn = document.getElementById("zero");
let decimalBtn = document.getElementById("decimal");
let equalsBtn = document.getElementById("equals");
let addBtn = document.getElementById("add");

// Store operator buttons in an array for easy access
let operatorButtons = [addBtn, subtractBtn, multiplyBtn, divideBtn];

let result = null;
let firstNumber = null;
let secondNumber = null;
let operator = null;
const MAX_DECIMALS = 4; // Maximum number of decimal places allowed

// Function to limit decimal places in the input
function limitDecimals(numberString) {
  if (numberString.includes(".")) {
    let [integerPart, decimalPart] = numberString.split(".");
    if (decimalPart.length > MAX_DECIMALS) {
      decimalPart = decimalPart.slice(0, MAX_DECIMALS); // Trim to the allowed number of decimals
    }
    return `${integerPart}.${decimalPart}`;
  }
  return numberString;
}

// Function to highlight the active operator
function highlightOperator(button) {
  // Remove the highlight from all operator buttons
  operatorButtons.forEach((btn) => btn.classList.remove("operator-active"));
  // Add the highlight to the currently clicked operator button
  button.classList.add("operator-active");
}

function handleNumberInput(number) {
  // If there's an operator, start collecting secondNumber
  if (operator !== null) {
    if (secondNumber === null) {
      display.textContent = number;
      secondNumber = parseFloat(display.textContent);
    } else {
      display.textContent += number;
      display.textContent = limitDecimals(display.textContent); // Limit decimals
      secondNumber = parseFloat(display.textContent);
    }
  } else {
    // If no operator, continue adding to firstNumber
    if (display.textContent === "0") {
      display.textContent = number;
    } else {
      display.textContent += number;
    }
    display.textContent = limitDecimals(display.textContent); // Limit decimals
    firstNumber = parseFloat(display.textContent);
  }
}

function handleOperatorInput(newOperator, button) {
  // If both numbers and an operator exist, calculate the result
  if (firstNumber !== null && operator !== null && secondNumber !== null) {
    result = operate(firstNumber, operator, secondNumber);
    display.textContent = result;
    firstNumber = result; // Set result as the new first number
    secondNumber = null; // Reset second number for the next operation
  }

  // Set the operator for the next calculation
  operator = newOperator;

  // Highlight the current operator button
  highlightOperator(button);
}

equalsBtn.addEventListener("click", () => {
  // Perform calculation if everything is set
  if (firstNumber !== null && operator !== null && secondNumber !== null) {
    result = operate(firstNumber, operator, secondNumber);
    result = roundResult(result); // Round result to the desired number of decimal places
    display.textContent = result;
    firstNumber = result; // Result becomes the new first number
    secondNumber = null; // Reset second number
    operator = null; // Reset operator

    // Remove operator highlight when calculation is done
    operatorButtons.forEach((btn) => btn.classList.remove("operator-active"));
  }
});

clearBtn.addEventListener("click", () => clear());

// Button click handlers for numbers
oneBtn.addEventListener("click", () => handleNumberInput("1"));
twoBtn.addEventListener("click", () => handleNumberInput("2"));
threeBtn.addEventListener("click", () => handleNumberInput("3"));
fourBtn.addEventListener("click", () => handleNumberInput("4"));
fiveBtn.addEventListener("click", () => handleNumberInput("5"));
sixBtn.addEventListener("click", () => handleNumberInput("6"));
sevenBtn.addEventListener("click", () => handleNumberInput("7"));
eightBtn.addEventListener("click", () => handleNumberInput("8"));
nineBtn.addEventListener("click", () => handleNumberInput("9"));
zeroBtn.addEventListener("click", () => handleNumberInput("0"));
decimalBtn.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
});

// Operator button handlers, now calling `handleOperatorInput`
addBtn.addEventListener("click", () => handleOperatorInput("+", addBtn));
subtractBtn.addEventListener("click", () =>
  handleOperatorInput("-", subtractBtn)
);
multiplyBtn.addEventListener("click", () =>
  handleOperatorInput("*", multiplyBtn)
);
divideBtn.addEventListener("click", () => handleOperatorInput("/", divideBtn));

// Function to round result to a fixed number of decimal places
function roundResult(value) {
  return parseFloat(value.toFixed(MAX_DECIMALS)); // Limit to MAX_DECIMALS places
}

function add(a, b) {
  return roundResult(a + b); // Round the result after addition
}

function subtract(a, b) {
  return roundResult(a - b); // Round the result after subtraction
}

function multiply(a, b) {
  return roundResult(a * b); // Round the result after multiplication
}

function divide(a, b) {
  return roundResult(a / b); // Round the result after division
}

// Operate function using switch case
function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Error"; // Handle unknown operators
  }
}

function clear() {
  display.textContent = "0";
  result = null;
  firstNumber = null;
  secondNumber = null;
  operator = null;

  // Remove any operator highlight on clear
  operatorButtons.forEach((btn) => btn.classList.remove("operator-active"));
}
