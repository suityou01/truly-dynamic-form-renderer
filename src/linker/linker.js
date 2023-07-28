const PartLinker = require("./partLinker");
const TemplateLinker = require("./templateLinker");
class Linker {
    _templateLinker;
    _partLinker;
    _template;
    constructor(){
        this._templateLinker = new TemplateLinker();
        this._partLinker = new PartLinker(this._templateLinker);
    }
    setTemplate(template){
        this._template = template;
    }
    isTopLevelTemplate(){
        return this._template.hasOwnProperty('Template');
    }
    link(){
        if(this.isTopLevelTemplate()){
            this._templateLinker.setTemplate(this._template);
            return this._templateLinker.link();
        } else {
            this._partLinker.setTemplate(this._template);
            return this._partLinker.link();
        }
    }
}

module.exports = Linker