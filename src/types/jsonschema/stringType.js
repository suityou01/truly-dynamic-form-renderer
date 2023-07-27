module.exports = class StringType {
    minLength;
    maxLength;
    pattern;
    _type = "StringType";
    type = "string";
    constructor({ minLength, maxLength, pattern }={}){
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.pattern = pattern;
    }
}