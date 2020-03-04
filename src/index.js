function eval(expr) {
    let prior = {
        '-': 1,
        '+': 1,
        '/': 2,
        '*': 2,
    }

    let output = [];
    let stack = [];
    let number = '';

    for (let i = 0; i < expr.length; i++) {
        let element = expr[i];
        if (element !== ' ') {

            if (!isNaN(+element)) {
                while (!isNaN(+expr[i])) {
                    if(expr[i] !== ' ') {
                        number += expr[i];
                    }
                    i++;
                }
                i--;
                output.push(number);
                number = '';

            } else if (prior[element]) {
                while (prior[stack[stack.length - 1]] >= prior[element]) {
                    output.push(stack.pop());
                }
                stack.push(element)
            } else if (element === '(') {
                stack.push(element);
            } else if (element === ')') {
                while (stack[stack.length - 1] !== '(' && stack.length !== 0) {
                    output.push(stack.pop());
                }

                if (stack.length === 0) {
                    throw new Error("ExpressionError: Brackets must be paired");
                }
                if (stack.pop() === '(') {

                }
            } else {
                stack.push(element);
            }
        }
    };
    stack.reverse().forEach(item => {
        if (item === '(') {
            throw new Error("ExpressionError: Brackets must be paired");
        } else {

            output.push(item);
        }
    });
    output.forEach(item => {
        item = item.trim();
    })
    return output;

}

function expressionCalculator(expr) {

    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => {
            if(+y === 0) {
                throw new Error("TypeError: Division by zero.");
            } else {
                return x / y;
            }
        }
    };

    let evaluate = (expr) => {
        let stack = [];

        expr.forEach((token) => {
            if (token in operators) {
                let [y, x] = [stack.pop(), stack.pop()];
                stack.push(operators[token](x, y));

            } else {
                stack.push(parseFloat(token));

            }
        });

        return stack.pop();
    };
    let result = evaluate(eval(expr));

    return result;

}

module.exports = {
    expressionCalculator
}
