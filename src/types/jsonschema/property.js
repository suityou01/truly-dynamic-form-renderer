const assert = require("assert");

module.exports = class Property {
    description;
    type;
    properties
    _type = "Property";
    constructor( { type, description } ={}){
        assert( type );
        this.type = type.type;
        this.properties = type.properties;
        this.description = description;
    }
}