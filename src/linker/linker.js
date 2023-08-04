
const TemplateLinker = require("./templateLinker");
const MetaDataLinker = require("./metaDataLinker");
class Linker {
    _templateLinker;
    _metaDataLinker;
    _linkableObject;
    constructor(){
        this._metaDataLinker = new MetaDataLinker();
        this._templateLinker = new TemplateLinker(this._metaDataLinker);
    }
    setLinkableObject(linkableObject){
        this._linkableObject = linkableObject;
        return this;
    }
    isTemplate(){
        return this._linkableObject.hasOwnProperty('template');
    }
    isTopLevelTemplate(){
        return this._template.hasOwnProperty('Template');
    }
    link(){
        if(this.isTemplate()){
            this._templateLinker.setTemplate(this._linkableObject.template);
            return this._templateLinker.link();
        }
        this._metaDataLinker.setMetaData(this._linkableObject);
        return this._metaDataLinker.link();
    }
}

module.exports = Linker