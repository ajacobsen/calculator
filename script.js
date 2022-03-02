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
            if (b === 0) return '#ERR';
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
const point = document.querySelector('input[data-type="point"]');

let prevDisplayValue;
let displayValue;
let operator;
let firstInput;
let lastInputType;
let hasPoint;

function clearDisplay(ev) {
    display.value = '0';
    displayValue = '0';
    prevDisplayValue = null;
    operator = null;
    firstInput = true;
    lastInputType = null;
    hasPoint = false;
}

function digitInput(ev) {
    if (firstInput) {
        displayValue = this.value;
        display.value = displayValue;
        firstInput = false;
        lastInputType = 'digit';
        return;
    }

    displayValue += this.value;
    display.value = displayValue
    lastInputType = 'digit';
}

function operatorInput(ev) {
    if (lastInputType === 'operator') {
        operator = this.value;
        return;
    }
    if (prevDisplayValue !== null && operator !== null) {
        prevDisplayValue = operate(operator, prevDisplayValue, displayValue);
    } else {
        prevDisplayValue = displayValue;
    }
    operator = this.value;
    firstInput = true;
    lastInputType = 'operator';
    hasPoint = false;
}

function equalsInput(ev) {
    displayValue = operate(operator, prevDisplayValue, displayValue);
    display.value = displayValue;
    prevDisplayValue = null;
    hasPoint = false;
}

function pointInput(ev) {
    if (lastInputType === 'point' || hasPoint) return;

    if (firstInput) {
        displayValue = '0.';
    } else {
        displayValue += '.';
    }
    display.value = displayValue;
    firstInput = false;
    lastInputType = 'point';
    hasPoint = true;
}

AC.addEventListener('click', clearDisplay);
equals.addEventListener('click', equalsInput);
point.addEventListener('click', pointInput);
digits.forEach(digit => {
    digit.addEventListener('click', digitInput);
});
operators.forEach(op => {
    op.addEventListener('click', operatorInput);
});

clearDisplay();
