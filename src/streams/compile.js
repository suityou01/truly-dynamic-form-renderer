const { Transform } = require('node:stream');

class CompileStream extends Transform {
    constructor(opts){
        super(opts);
    }

    _transform(chunk, encoding, cb){
        console.log(chunk);
    }

    _final(callback){

    }

    _destroy(){

    }
}

module.exports = CompileStream;