const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const percent = (num) => num / 100;

let operator = "";
let num1 = "";
let num2 = "";
let clear = true;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const prc = document.querySelector(".prc");
const equal = document.querySelector(".equal");
const AC = document.querySelector(".AC");

numbers.forEach((button) => button.addEventListener("click", getNum));
function getNum(e) {
  if (clear) {
    display.textContent = "";
    clear = false;
  }
  let numValue = e.target.textContent;
  display.textContent += numValue;
}

opButtons.forEach((opButton) => opButton.addEventListener("click", storeNum));
function storeNum(e) {
  if (!operator) {
    operator = e.target.textContent;
    num1 = display.textContent;
    clear = true;
  } else {
    num2 = display.textContent;
    operate(operator, e.target.textContent);
    clear = true;
  }
}

equal.addEventListener("click", () => {
  num2 = display.textContent;
  operate(operator, operator);
  operator = "";
});

AC.addEventListener("click", () => {
  display.textContent = "";
  num1 = "";
  num2 = "";
  operator = "";
});

prc.addEventListener("click", () => (display.textContent *= 0.01));

function operate(op, op2) {
  display.textContent = "";
  switch (op) {
    case "+":
      display.textContent = add(num1, num2);
      num1 = add(num1, num2);
      num2 = "";
      operator = op2;
      break;
    case "-":
      display.textContent = subtract(num1, num2);
      num1 = subtract(num1, num2);
      operator = op2;
      num2 = "";
      break;
    case "*":
      display.textContent = multiply(num1, num2);
      num1 = multiply(num1, num2);
      num2 = "";
      operator = op2;
      break;
    case "÷":
      display.textContent = divide(num1, num2);
      num1 = divide(num1, num2);
      num2 = "";
      operator = op2;
      break;
  }
}
