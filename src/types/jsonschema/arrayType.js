module.exports = class ArrayType{
    _type = "ArrayType";
    type = "array";
    minItems;
    maxItems;
    items={};
    uniqueitems={};
    constructor( { minItems, maxItems, items = {}, uniqueitems = {} }={} ){

        this.minItems = minItems;
        this.maxItems = maxItems;
        this.items = items;
        this.uniqueitems = uniqueitems;

    }
}