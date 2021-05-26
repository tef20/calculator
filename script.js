// TODO: 
// - instructions key
// - calculator flip animation 'hello'

FLIP_MESSAGE = "01134"
WELCOME_MESSAGE = "...";
ZERO_ERROR_MSG = "ZERO ERROR";

class Calculator {
    constructor(num1, num2, operator) {
        this.operands = {
            "num1": num1 ? num1 : null,
            "num2": num2 ? num2 : null
        };
        this.operator = operator ? operator : null;
        this.result = null;
    }

    allClear = () => {
        this.operands = {
            "num1": null,
            "num2": null
        };
        this.operator = null;
        this.result = null;
    }
    
    handleNum = (newNum) => {       
        if (isNaN(newNum)) {
            console.error(`${newNum} is not a number.`);
        } else if (this.result !== null) {
            this.allClear();
            this.updateNum(newNum);
        } else {
            this.updateNum(newNum);
        }
    }  
    
    updateNum = (newNum) => {
        const oldNum = this.getCurrentNum();
        if (this.operands[oldNum] !== null) {
            this.operands[oldNum] += newNum.toString();
        } else {
            this.operands[oldNum] = newNum.toString();
        }
    }

    getCurrentNum = () => (this.operator === null) ? 'num1' : 'num2';

    addDecimal = () => {
        const oldNum = this.getCurrentNum();
        if (this.result === null && this.operands[oldNum] !== null && !(/\./.test(this.operands[oldNum]))) {
            this.operands[oldNum] += '.';
        }
    }

    handleOperator = (newOperator) => {       
        if (/^[\+\-\*\/]$/.test(newOperator)) {
            if (this.result === ZERO_ERROR_MSG) {
                return;
            }
            if (this.operands['num2'] !== null) {
                this.operate();
            }
            if (this.result !== null) {
                // feed prior result into new operation
                let mem = this.result;
                this.allClear();
                this.updateNum(mem);
            }
            this.updateOperator(newOperator);
        }
    }
    
    updateOperator = (newOperator) => {
        if (this.operands['num1'] !== null) {
            this.operator = newOperator;
        }
    }

    deleteOne = () => {
        this.result = null;
        let currentNum = this.getCurrentNum();
        if (this.operands[currentNum] !== null) {
            this.operands[currentNum] = this.operands[currentNum].slice(0, -1).length === 0 ? 
                                            null : 
                                            this.operands[currentNum].slice(0, -1);
        } else {
            this.updateOperator(null);
        }
    }

    operate = () => {
        if (!Object.values(this.operands).includes(null)) {
            switch(this.operator) {
                case '+':
                    this.result = this.add(this.operands['num1'], this.operands['num2']);
                    return;
                case '-':
                    this.result = this.subtract(this.operands['num1'], this.operands['num2']);
                    return;
                case '*':
                    this.result = this.multiply(this.operands['num1'], this.operands['num2']);
                    return;
                case '/':
                    this.result = this.divide(this.operands['num1'], this.operands['num2']);
                    return;
                default:
                    console.log(`Operator ${operator} has no match.`);
                    return "ERROR";
            }
        }        
    }

    add = (num1, num2) => {
        return Math.round((parseFloat(num1) + parseFloat(num2)) * 100) / 100;
    }

    subtract = (num1, num2) => {
        return Math.round((parseFloat(num1) - parseFloat(num2)) * 100) / 100;
    }

    multiply = (num1, num2) => {
        return Math.round((parseFloat(num1) * parseFloat(num2)) * 100) / 100;
    }

    divide = (num1, num2) => {
        if (Math.round((parseFloat(num1) !== 0 && parseFloat(num2) !== 0) * 100) / 100) {
            return Math.round((parseFloat(num1) / parseFloat(num2)) * 100) / 100;
        } else {
            return ZERO_ERROR_MSG;
        }
    }
}

// Initialize
let calc = new Calculator();
let display = document.getElementById('display');
display.textContent = WELCOME_MESSAGE;
console.log("Use onscreen buttons or keyboard values: \
            \n- numbers 0-9\
            \n- operations + - / and *\
            \n- press enter or = to perform calculations\
            \n- press backspace to undo an action\
            \n- press c for All Clear")


// Bindings
window.addEventListener('click', handleMouseClick);
window.addEventListener('keydown', handleKeyDown)

function handleMouseClick (e) {
    if (e.target.classList.contains('button')) {
        operateButton(e.target.textContent);
    }
}

function handleKeyDown (e) {
    if (/^[0-9\+\-\*\/\.=c]$|Backspace|Enter/.test(e.key)) {
        operateButton(e.key);
    }
}

function operateButton(buttonName) {
    switch(true) {
        case /^[0-9]$/.test(buttonName):
            calc.handleNum(buttonName);
            break;
        case /^[\+\-\*\/]$/.test(buttonName): 
            calc.handleOperator(buttonName);
            break;
        case /^\.$/.test(buttonName): 
            calc.addDecimal();
            break;
        case /^DEL$|^Backspace$/.test(buttonName): 
            calc.deleteOne();
            break;         
        case /^AC$|^[c]$/.test(buttonName): 
            calc.allClear();
            break;
        case /^=$|^Enter$/.test(buttonName): 
            calc.operate();
            break;                
        default:
            console.error(`Button has no match.`);
            break;
    }
    updateDisplay(calc);
}

function updateDisplay (calculatorObject) {
    if (calc.result !== null) {
        display.textContent = calc.result;
    } else if (calc.operands["num2"] !== null) {
        display.textContent = `${calc.operands["num1"]} ${calc.operator} ${calc.operands["num2"]}`;
    } else if (calc.operator) {
        display.textContent = `${calc.operands["num1"]} ${calc.operator} `;
    } else if (calc.operands["num1"]) {
        display.textContent = calc.operands["num1"];
    } else {
        display.textContent = '...';
    }
    
}