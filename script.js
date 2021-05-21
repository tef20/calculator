function equations () {
    this.operands = {
        num1: null,
        num2: null
    }

    this.operator = null;
    
    this.getCurrentNum = () => (this.operator === null) ? 'num1' : 'num2';
    
    this.updateNum = (newNum) => {
        if (isNaN(newNum)) {
            console.error(`${newNum} is not a number.`);
            return;
        } else {
            const oldNum = this.getCurrentNum();
            if (this.operands[oldNum] !== null) {
                this.operands[oldNum] += newNum ;
            } else {
                this.operands[oldNum] = newNum;
            }
        }
    }  

    this.addDecimal = () => {
        const oldNum = this.getCurrentNum();
        if (this.operands[oldNum] !== null && !(/\./.test(this.operands[oldNum]))) {
            this.operands[oldNum] += '.';
        }
    }

    this.updateOperator = (newOperator) => {
        const currentOperand = this.getCurrentNum;
        if (currentOperand === 'num1' && (/^[\+\-\*\/]$/.test(newOperator))) {
            this.operator = newOperator;
        }
    }

    this.delNum = () => {
        // TODO
    }

    // TODO 

}



// Bindings
window.addEventListener('click', handleInput)

function handleInput (e) {
    // if not button - return
    if (!e.target.classList.contains('button')) {
        console.log("not button!");
        return;
    } else {
        console.log(e.target.textContent)
        switch(true) {
            case !isNaN(e.target.textContent):
                // if ()          
        //      if first number (operator called? no)
        //          if num1 exists
        //              append to num1
        //          else
        //              initialize num1
        //      if second number (operator called? yes)
        //          if num2 exists
        //              append to num2
        //          else
        //              initialize num2
        //      else (edge cases?)
        //          return
        // if point
        //      
        // else if operator
        //      if num1 exists && num2 doesn't exist
        //          update operator
        //      else (edge cases?)
        //          return
        // else if AC
        //      reset all
        // else if result
        //     if num1 && num2 && operator exist
        //          run operate(operator, num1, num2);
        //     else
        //          return
        // ??else if percentage
        //     if num2 exist
        //          update num2 to num2 / 100
        //     if operator exists
        //          return;
        //     if num1 exist
        //          update num1 to num1 / 100
        //     
        default:
                console.error(`no case match.`);
                return "ERROR";
            }
    }
    
    //      
    if (e.target.classList.contains('button number')) {
        console.log("number!")
    } else {
        console.log("not a number!")
    }
}

// Calculator Logic //
function operate (operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            console.error(`Operator ${operator} has no match.`);
            return "ERROR";
        }
}

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
    return num1 !== 0 && num2 !== 0 ? num2 / num2 : "ZERO ERROR";
}
