const { Transform } = require('node:stream');

class VirusScanStream extends Transform {
    _chunk;
    constructor(opt){
        super(opt);
    }
    _transform(chunk, encoding, cb){
        this._chunk = chunk;
        cb();
    }
    _final(callback){
        this.push(this._chunk);
        callback();
    }
    _destroy(){

    }
}

module.exports = VirusScanStream;