const { Transform } = require('node:stream');

const { EOL } = require("os");

class MultiPartStream extends Transform {
    _templateId;
    _sectionId;
    _pageId;
    _boundary;
    _request;
    _chunks = [];
    _fields = [];
    _files = [];
    _states = {
        BEGIN: 'begin',
        EOL: 'eol',
        BOUNDARY: 'boundary',
        FIELDDATA: 'fielddata',
        FILEDATA: 'filedata'
    };

    _state = this._states.BEGIN;
    _previousState;
    removeLinebreaks(str) {
        return str.replace(/[\r\n]+/gm, '');
    }
    removeSpeechMarks(str){
        return str.replace(/[\"]+/gm, '');
    }
    removeLinebreaksAndSpeechMarks(str){
        let output = this.removeLinebreaks(str);
        output = this.removeSpeechMarks(output);
        return output;
    }
    isEncapsulationBoundary(line){
        return this.removeLinebreaks(line).match(`^--${this._boundary}$`) ? true  : false;
    }
    isLastEncapsulationBoundary(line){
        return this.removeLinebreaks(line).match(`^--${this._boundary}--$`) ? true : false;
    }
    isNewLine(line){
        return line === EOL;
    }
    getValue(key, line){
        if(!key || !line) return;
        if(!typeof key === 'string' || !typeof line === 'string') return;
        if(!key.endsWith("=")) key += "=";
        const cleanedLine = this.removeLinebreaksAndSpeechMarks(line);
        const startPos = line.indexOf(`${key}`) + key.length;
        let endPos = cleanedLine.indexOf(';', startPos);
        endPos = endPos > 0 ? endPos : cleanedLine.length;
        return cleanedLine.substring(startPos, endPos).replace('"','');
    }
    isFileContent(line){
        const fileRegExp = /filename=/i;
        return line.match(fileRegExp) ? true : false;
    }
    isFieldContent(line){
        return !this.isFileContent(line);
    }
    getFileContent(line){

    }
    getContentDisposition(line){
        const linePart = line.split(':')[1];
        const result = new Object(null);
        result['name'] = this.getValue("name", linePart);
        if(this.isFileContent(line)){
            result['type'] = 'file';
            result['filename'] = this.getValue("filename", linePart);
            result['content'] = "";
            this._files.push(result);
        } 
        if(this.isFieldContent(line)){
            result['type'] = 'field';
            result["value"] = "";
            this._fields.push(result);
        }
        return result;
    }
    isContentDisposition(line){
        const cdRegExp = /content-disposition/i;
        if(line.match(cdRegExp)){
            return true;
        }
        return false;
    }
    parseLine(line){
        if(this.isEncapsulationBoundary(line)) {
            this._previousState = this._state;
            this._state = this._states.BOUNDARY;
            return;
        };
        if(this.isLastEncapsulationBoundary(line)) {
            this._previousState = this._state;
            this._state = this._states.BOUNDARY;
            return;
        };
        if(this.isContentDisposition(line)){
            const cd = this.getContentDisposition(line);
            this._previousState = this._state;
            if(cd.type === 'file') this._state = this._states.FILEDATA;
            if(cd.type === 'field') this._state = this._states.FIELDDATA;
            return;
        }
        if(line === EOL) {
            this._previousState = this._state;
            this._state = this._states.EOL;
            return;
        }
        if(this._state === this._states.FIELDDATA || (this._state === this._states.EOL && this._previousState === this._states.FIELDDATA)){
            this._fields[this._fields.length - 1]['value'] = line;
            return;
        }
        if(this._state === this._states.FILEDATA || (this._state === this._states.EOL && this._previousState === this._states.FILEDATA)){
            this._files[this._files.length -1]['content'] += line;
            return;
        }
    }
    _transform(chunk, encoding, cb){
        this._chunks.push(chunk);
        let str = chunk.toString();
        let buff = [];
        for(let i=0; i < str.length; i++) {
            buff.push(str.charAt(i));''
            if(str.charAt(i)===EOL){
                this.parseLine(buff.join('').toString());
                buff = [];
            }
        }
        cb();
    }

    _final(callback){
        const finalOutput = {
            templateId: this._templateId,
            sectionId: this._sectionId,
            pageId: this._pageId,
            fields: this._fields,
            files: this._files
        };
        this.push(finalOutput);
        callback();
    }

    _destroy(){

    }
}

module.exports = MultiPartStream;