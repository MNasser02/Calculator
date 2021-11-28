const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let displayValue = "";
let operator = "";
let num1 = "";
let num2 = "";

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".num, .op");
const opButtons = document.querySelectorAll(".op");
const equal = document.querySelector(".equal");

function operate(e) {
  if (displayValue.indexOf(operator) == -1) return;
  if (e.target.textContent === "=")
    num2 = displayValue.slice(displayValue.indexOf(operator) + 1);
  else num2 = displayValue.slice(displayValue.indexOf(operator) + 1, -1);

  switch (operator) {
    case "+":
      answer = add(num1, num2);
      num2 = "";
      if (e.target.textContent === "=") {
        operator = "";
        num1 = "";
      } else {
        operator = e.target.textContent;
        num1 = add(num1, num2);
      }
      displayValue = answer + operator;
      display.textContent = displayValue;
      break;
    case "-":
      num1 = subtract(num1, num2);
      num2 = "";
      if (e.target.textContent === "=") operator = "";
      else operator = e.target.textContent;
      displayValue = num1 + operator;
      display.textContent = displayValue;
      break;
    case "*":
      num1 = multiply(num1, num2);
      num2 = "";
      if (e.target.textContent === "=") operator = "";
      else operator = e.target.textContent;
      displayValue = num1 + operator;
      display.textContent = displayValue;
      break;
    case "/":
      num1 = divide(num1, num2);
      num2 = "";
      if (e.target.textContent === "=") operator = "";
      else operator = e.target.textContent;
      displayValue = num1 + operator;
      display.textContent = displayValue;
      break;
  }
}

//add onclick event to numbers and operators buttons to display on screen
buttons.forEach((button) => button.addEventListener("click", getNum));
function getNum(e) {
  let buttonValue = e.target.textContent;
  displayValue += buttonValue;

  if (buttonValue == "AC") {
    displayValue = "";
    num1 = "";
    num2 = "";
    operator = "";
  }
  display.textContent = displayValue;
}

//add onclick event to operation buttons to store display value and operator
opButtons.forEach((opButton) => opButton.addEventListener("click", storeNum1));
function storeNum1(e) {
  if (num1 === "") {
    num1 = displayValue.slice(0, -1);
    operator = e.target.textContent;
  } else {
    operate(e);
  }
}

equal.addEventListener("click", operate);
