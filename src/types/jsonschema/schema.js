const assert = require("assert");

module.exports = class Schema {

    $schema="https://json-schema.org/draft/2020-12/schema";
    $id;
    title;
    description;
    type="object";
    _type="Schema";
    properties={};
    required=[];

    constructor( { $schema="", $id="", title="", description="" } = {} ){

        this.$schema = $schema;
        this.$id = $id;
        this.title = title;
        this.description = description;

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