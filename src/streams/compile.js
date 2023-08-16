const Linker = require("../linker/linker");
const { Transform } = require('node:stream');

class CompileStream extends Transform {
    _chunk;
    constructor(opts){
        super(opts);
    }

    compile(){
        const field = this._chunk.fields[0];
        const part = Services.templateService.getPartByNameAndTemplateId(field.name, this._chunk.templateId);
        const linker = new Linker();
        linker.setLinkableObject(part);
        const linked = linker.link();
    }

    _transform(chunk, encoding, cb){
        this._chunk = chunk;
        cb();
    }

    _final(callback){
        this.compile();
        callback();
    }

    _destroy(){

    }
}

module.exports = CompileStream;