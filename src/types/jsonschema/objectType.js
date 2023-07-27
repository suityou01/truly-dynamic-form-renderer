const assert = require("assert");

module.exports = class ObjectType {

    properties={};
    additionalProperties = [];
    required = [];
    minProperties;
    maxProperties;
    dependencies;
    patternProperties;
    _type = "ObjectType";
    type = "object";
    
    constructor( { properties = {}, additionalProperties = [], required = [],
                    minProperties = null, maxProperties = null, dependencies = null,
                    patternProperties = null } = {} ){
        this.properties = properties;
        this.additionalProperties = additionalProperties;
        this.required = required;
        this.minProperties = minProperties;
        this.maxProperties = maxProperties;
        this.dependencies = dependencies;
        this.patternProperties = patternProperties;
    }
    property = {
        add: ( { name, prop, required = false } ={} ) => {
            assert(name);
            assert(prop);
            this.properties[name] = prop;
            if( required ) this.required.push( name );
            return this;
        }
    }

}