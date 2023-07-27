module.exports = class NumberType {
    minimum;
    maximum;
    exclusiveMinimum;
    exclusiveMaximum;
    multipleOf;
    _type = "NumberType";
    type = "number";
    constructor({ minimum=0,maximum=null,exclusiveMinimum=null,exclusiveMaximum=null,multipleOf=null }={}){
        this.minimum = minimum;
        this.maximum = maximum;
        this.exclusiveMinimum = exclusiveMinimum;
        this.exclusiveMaximum = exclusiveMaximum;
        this.multipleOf = multipleOf;
    }
}