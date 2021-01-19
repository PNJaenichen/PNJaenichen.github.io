function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert('Nice try! If you divide by 0 the world would end!')
        return 0;
    } else {
        return num1 / num2;
    }
}

// TODO Round long decimals
function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return truncate(add(num1, num2));
        case '-':
            return truncate(subtract(num1, num2));
        case 'x':
            return truncate(multiply(num1, num2));
        case '/':
            return truncate(divide(num1, num2));
        default:
            return 'An error occured'
    }
}

function truncate(num) {
    if (num.toString().length > 10) {
        let newString = num.toString().slice(0,10);
        return floatCheck(newString);
    }
    return floatCheck(num);
}

function floatCheck(str) {
    if (typeof(str) !== 'number') {
        if (str.indexOf('.') !== -1) {
            return parseFloat(str);
        } else {
            return parseInt(str);
        }
    } else {
        return str;
    }
}

function display(str) {
    if (disp.textContent.length < 10) {
        disp.textContent += str;
    }
}

function clear() {
    operator = null;
    numberOne = null;
    numberTwo = null;
    disp.textContent = '';
}

function innerWorkings(text) {
    switch (text) {
        case '+':
        case '-':
        case 'x':
        case '/':
            if (!disp.textContent) {
                numberOne = 0;
                operator = text;
            } else if (disp.textContent && !numberOne) {
                numberOne = floatCheck(disp.textContent);
                operator = text;
                disp.textContent = '';
            } else if (disp.textContent && !operator) {
                operator = text;
                disp.textContent = '';
            } else if (disp.textContent && numberOne && operator) {
                numberTwo = floatCheck(disp.textContent);
                numberOne = operate(numberOne, numberTwo, operator);
                numberTwo = null;
                operator = text;
                disp.textContent = numberOne;
            }
            break;
        case '=':
            if ((numberOne === 0 || numberOne) && operator) {
                if (disp.textContent === '0' || disp.textContent) {
                    numberTwo = floatCheck(disp.textContent);
                    numberOne = operate(numberOne, numberTwo, operator);
                    numberTwo = null;
                    operator = null;
                    disp.textContent = numberOne;
                } else if (!disp.textContent) {
                    numberTwo = 0;
                    numberOne = operate(numberOne, numberTwo, operator);
                    numberTwo = null;
                    operator = null;
                    disp.textContent = numberOne;
                }
            }
            break;
        case 'Clear':
            clear();
            break;
        case '.':
            if (disp.textContent.indexOf('.') === -1) {
                disp.textContent += text;
            }
            break;
        case 'Back':
            disp.textContent = disp.textContent.slice(0,disp.textContent.length - 1);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            if (parseInt(disp.textContent) === numberOne && operator) {
                disp.textContent = '';
            }
            display(text);
            break;
        default:
            break;
    }
}

let numberOne = null;
let numberTwo = null;
let operator = null;

const container = document.querySelector('.grid-container');
const display_container = document.getElementById('display');
const disp = display_container.querySelector("span");

container.addEventListener('click', function(e) {
    innerWorkings(e.target.textContent);
});
window.addEventListener('keydown', function(e) {
    var key = e.code;
    console.log(key);
    if (key === 'Digit1' || key === 'Numpad1') {
        innerWorkings('1');
    } else if (key === 'Digit2' || key === 'Numpad2') {
        innerWorkings('2');
    } else if (key === 'Digit3' || key === 'Numpad3') {
        innerWorkings('3');
    } else if (key === 'Digit4' || key === 'Numpad4') {
        innerWorkings('4');
    } else if (key === 'Digit5' || key === 'Numpad5') {
        innerWorkings('5');
    } else if (key === 'Digit6' || key === 'Numpad6') {
        innerWorkings('6');
    } else if (key === 'Digit7' || key === 'Numpad7') {
        innerWorkings('7');
    } else if (key === 'Digit8' || key === 'Numpad8') {
        innerWorkings('8');
    } else if (key === 'Digit9' || key === 'Numpad9') {
        innerWorkings('9');
    } else if (key === 'Digit0' || key === 'Numpad0') {
        innerWorkings('0');
    } else if (key === 'Period' || key === 'NumpadDecimal') {
        innerWorkings('.');
    } else if (key === 'NumpadAdd') {
        innerWorkings('+');
    } else if (key === 'NumpadSubtract') {
        innerWorkings('-');
    } else if (key === 'NumpadMultiply') {
        innerWorkings('x');
    } else if (key === 'NumpadDivide') {
        innerWorkings('/');
    } else if (key === 'Enter' || key === 'Equal' || key === 'NumpadEnter') {
        innerWorkings('=');
    } else if (key === 'Backspace') {
        innerWorkings('Back');
    }
});

