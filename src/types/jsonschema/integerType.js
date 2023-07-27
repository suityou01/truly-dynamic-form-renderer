const NumberType = require('./numberType.js');

module.exports = class IntegerType extends NumberType{
    _type = "IntegerType";
    type = "integer";
    constructor({ minimum=0,maximum=null,exclusiveMinimum=null,exclusiveMaximum=null,multipleOf=null }={}){
        super({ minimum: minimum, maximum: maximum, exclusiveMinimum: exclusiveMinimum, exclusiveMaximum: exclusiveMaximum, multipleOf: multipleOf});
    }
}