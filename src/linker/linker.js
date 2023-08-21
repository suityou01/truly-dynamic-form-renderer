const TemplateLinker = require("./templateLinker");
const MetaDataLinker = require("./metaDataLinker");
const Template = require("../types/templateType");
const TemplatePart = require("../types/templatePart");
const TemplatePointer = require("../types/templatePointer");
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
    isTemplatePointer(){
        return this._linkableObject instanceof TemplatePointer;
    }
    isTemplate(){
        if(this.isTemplatePointer()){
            return this._linkableObject.template instanceof Template;    
        }
        return this._linkableObject instanceof Template;
    }
    isTemplatePart(){
        if(this.isTemplatePointer()){
            return this._linkableObject.template instanceof TemplatePart;    
        }
        return this._linkableObject instanceof TemplatePart;
    }
    link(){
        if(this.isTemplate() || this.isTemplatePart()){
            this._templateLinker.setTemplate(this._linkableObject.template);
            return this._templateLinker.link();
        }
        this._metaDataLinker.setMetaData(this._linkableObject);
        return this._metaDataLinker.link();
    }
}

module.exports = Linker