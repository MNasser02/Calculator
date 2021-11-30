//compute available operations
const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const percent = (num) => num / 100;

let operator = "";
let num1 = "";
let num2 = "";
//clear display when inputting new number
let clear = true;

//selecting buttons
const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const prc = document.querySelector(".prc");
const equal = document.querySelector(".equal");
const AC = document.querySelector(".AC");
const DEL = document.querySelector(".delete");

numbers.forEach((button) => button.addEventListener("click", displayNum));
function displayNum(e) {
  //check if inputting new number
  if (clear || display.textContent == 0) {
    display.textContent = "";
    clear = false;
  }
  //reject input size greater than 11 chars
  if (display.textContent.length > 11) return;

  //store input digit or point
  let numValue = e.target.textContent;

  //take only 2 digits after decimal point
  //if (display.textContent.split(".")[1].length >= 2) return;

  display.textContent += numValue;
}

opButtons.forEach((opButton) => opButton.addEventListener("click", storeNum));
function storeNum(e) {
  //store operator if there is none, otherwise operate
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

function operate(op, op2) {
  //determine operation
  switch (op) {
    case "+":
      operationProcess(op2, add);
      break;
    case "-":
      operationProcess(op2, subtract);
      break;
    case "*":
      operationProcess(op2, multiply);
      break;
    case "/":
      operationProcess(op2, divide);
      break;
  }
}

function operationProcess(op2, operation) {
  //clear to display answer
  display.textContent = "";

  //display a max of 2 decimal points
  let answer = `${operation(num1, num2)}`;
  if (answer % 1 != 0) answer = `${operation(num1, num2).toFixed(2)}`;

  //check if something went wrong
  if (isNaN(answer)) {
    allClear();
    display.textContent = "Syntax Error";
    clear = true;
  }
  //error for large size answers
  else if (answer.length > 11) {
    allClear();
    display.textContent = "Math Error";
    clear = true;
  } else {
    display.textContent = answer;
    num1 = answer;
    num2 = "";
    operator = op2;
  }
}

equal.addEventListener("click", evaluate);

function evaluate() {
  num2 = display.textContent;
  operate(operator, operator);
  operator = "";
  clear = true;
}

AC.addEventListener("click", allClear);

function allClear() {
  display.textContent = "0";
  num1 = "";
  num2 = "";
  operator = "";
}

DEL.addEventListener("click", del);

function del() {
  display.textContent = display.textContent.slice(0, -1);
}

prc.addEventListener("click", () => {
  answer = display.textContent * 0.01;

  //display a max of 2 decimal points
  if (answer % 1 != 0) display.textContent = answer.toFixed(2);
  else display.textContent = answer;
});
