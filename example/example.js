const display = document.querySelector(".display");
const historyDisplay = document.querySelector("#history");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let firstValue = '';
let operator = '';
let secondValue = '';

const isNumber = (value) => !isNaN(value) && value.trim() !== '';

const updateHistory = () => {
  if (firstValue !== '' && operator !== '' && secondValue === '') {
    historyDisplay.textContent = firstValue + ' ' + operator;
  } else if (firstValue !== '' && operator !== '' && secondValue !== '') {
    historyDisplay.textContent = firstValue + ' ' + operator + ' ' + secondValue;
  }
};

const calculate = (btnValue) => {
  display.focus();
  
  if (btnValue === "AC") {
    firstValue = '';
    operator = '';
    secondValue = '';
    display.value = '';
    historyDisplay.textContent = '';
  } else if (btnValue === "DEL") {
    if (operator === '') {
      firstValue = firstValue.slice(0, -1);
      display.value = firstValue;
    } else {
      secondValue = secondValue.slice(0, -1);
      display.value = secondValue;
    }
    updateHistory();
  } else if (btnValue === "=") {
    if (!isNumber(firstValue) || !isNumber(secondValue) || operator === '') {
      display.value = 'Помилка!';
      return;
    }

    let result;
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          display.value = 'Ділення на нуль!';
          return;
        }
        result = num1 / num2;
        break;
      default:
        display.value = 'Помилка!';
        return;
    }

    display.value = (result % 1 === 0) ? result : result.toFixed(2);
    firstValue = display.value;
    operator = '';
    secondValue = '';
    historyDisplay.textContent = '';
  } else if (specialChars.includes(btnValue)) {
    if (!isNumber(firstValue)) {
      display.value = 'Помилка!';
      return;
    }
    operator = btnValue;
    secondValue = '';
    updateHistory();
  } else {
    if (operator === '') {
      firstValue += btnValue;
      display.value = firstValue;
    } else {
      secondValue += btnValue;
      display.value = secondValue;
    }
    updateHistory();
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
