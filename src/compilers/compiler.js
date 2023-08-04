const { mergeKeys } = require("../lib/object/object");
class Compiler {
    _linkedObject;
    constructor() {

    }
    setLinkedObject(linkedObject){
        this._linkedObject = linkedObject;
        return this;
    }
    compile(){
        const content = this._linkedObject._content;
    }
}

module.exports = Compiler;