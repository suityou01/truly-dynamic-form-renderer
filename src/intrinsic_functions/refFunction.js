const refOdd = (state) => {
    return state.filter((item, i) => i%2 === 1);
}

const refEven = (state) => {
    return state.filter((item, i) => i%2 === 0);
}

const dispatchTable = {
    'odd': refOdd,
    'even': refEven
}

class RefFunction {
    _refExpression = '';
    constructor(refExpression, state){
        this._refExpression = refExpression;
        this._state = state;
    }
    parseExpression() {
        const expression = this._refExpression.match(/(?<=\!Ref\s).*$/gi);
        if(expression[0].match(/(?<=\$item{)(.*?)(?=\})/gi)){
            return expression[0].match(/(?<=\$item{)(.*?)(?=\})/gi);
        }
    }
    evaluateExpression(exp){
        return dispatchTable[exp](this._state);
    }
    execute() {
        const expression = this.parseExpression();
        return this.evaluateExpression(expression);
    }
}

module.exports = RefFunction;