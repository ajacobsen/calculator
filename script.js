function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
        return '#ERR';
    }
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}


const display = document.querySelector('input[data-type="display"]');
const digits = document.querySelectorAll('input[data-type="digit"]');
const operators = document.querySelectorAll('input[data-type="operator"]');
const AC = document.querySelector('input[data-type="ac"]');
const equals = document.querySelector('input[data-type="equals"]');

let prevDisplayValue = null;
let displayValue = '0';
let operator = null;
let firstInput = true;

function clearDisplay(ev) {
    display.value = '0';
    displayValue = '0';
    prevDisplayValue = null;
    operator = null;
    firstInput = true;
}

function digitInput(ev) {
    if (firstInput) {
        displayValue = this.value;
        display.value = displayValue;
        firstInput = false;
        return;
    }
    displayValue += this.value;
    display.value = displayValue
}

function operatorInput(ev) {
    if (prevDisplayValue !== null && operator !== null) {
        prevDisplayValue = operate(operator, prevDisplayValue, displayValue);
    } else {
        prevDisplayValue = displayValue;
    }
    operator = this.value;
    firstInput = true;
}

function equalsInput(ev) {
    displayValue = operate(operator, prevDisplayValue, displayValue);
    display.value = displayValue;
}


AC.addEventListener('click', clearDisplay);
equals.addEventListener('click', equalsInput);
digits.forEach(digit => {
    digit.addEventListener('click', digitInput);
});
operators.forEach(op => {
    op.addEventListener('click', operatorInput);
})