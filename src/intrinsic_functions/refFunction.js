const refOdd = (state) => {
    return state.filter((item, i) => i%2 === 1);
}

const refEven = (state) => {
    return state.filter((item, i) => i%2 === 0);
}

const comparatorEq = (state, value) => {
    return state.map(i => i == value);
}

const comparator = (state, comparison) => {
    switch (comparison.comparator) {
        case 'eq':
            return comparatorEq(state, comparison.value);
        default:
            return false;
    }
}

const dispatchTable = {
    'odd': refOdd,
    'even': refEven,
    'compare': comparator
}

class RefFunction {
    _refExpression = '';
    constructor(refExpression, state){
        this._refExpression = refExpression;
        this._state = state;
    }
    parseExpression() {
        const expression = this._refExpression.match(/(?<=\!Ref\s).*$/gi);
        const ast = {};
        if(expression[0].match(/(?<=\$item{)(.*?)(?=\})/gi)){
            ast.expr = expression[0].match(/(?<=\$item{)(.*?)(?=\})/gi)[0];
        }
        if(expression[0].match(/(?<=eq\s).*$/gi)) {
            ast.compare = {
                comparator: 'eq',
                value: expression[0].match(/(?<=eq\s).*$/gi)
            }
        }
        return ast;
    }
    evaluateExpression(ast){
        if(ast.hasOwnProperty('compare')) {
            const state = dispatchTable[ast.expr](this._state);
            const comparison = dispatchTable['compare'](state, ast.compare);
            return comparison;
        }
        return dispatchTable[ast.expr](this._state);
    }
    execute() {
        const ast = this.parseExpression();
        return this.evaluateExpression(ast);
    }
}

module.exports = RefFunction;