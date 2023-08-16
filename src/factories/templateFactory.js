const Template = require("../types/templateType");
const TemplatePointer = require("../types/templatePointer");
const TemplatePart = require("../types/templatePart");
class TemplateFactory {
    _raw;
    _file;
    constructor(yaml){
        this._raw = yaml;
    }
    setRawObject(o){
        this._raw = o;
        return this;
    }
    setFile(file){
        this._file = file;
        return this;
    }
    getRawContent(){
        const raw = { ...this._raw };
        if(raw.hasOwnProperty('Template')){
            return raw.Template;
        }
        return raw;
    }
    getTemplateId(templateObjectName){
        if(this._raw.Template[templateObjectName].hasOwnProperty('id')){
            return this._raw.Template[templateObjectName].id;
        }
    }
    getTemplateName(templateObjectName){
        if(this._raw.Template[templateObjectName].hasOwnProperty('name')){
            return this._raw.Template[templateObjectName].name;
        }
    }
    getTemplateObjectName(){
        if(this._raw.hasOwnProperty('Template')){
            return Object.keys(this._raw.Template)[0];
        }
        return "";
    }
    getTemplatePart(){
        return Object.keys(this._raw)[0];
    }
    getTemplatePartName(){
        return Object.values(this._raw)[0].name;
    }
    getTemplatePartId(){
        return Object.values(this._raw)[0].id;
    }
    getTemplatePartContent(){
        return Object.values(this._raw)[0].content;
    }
    getTemplatePartExtends(){
        const content = this.getTemplatePartContent();
        const partContent = Object.values(content)[0];
        return partContent.extends;
    }
    getTemplateExtends(templateObjectName){
        if(this._raw.Template[templateObjectName].hasOwnProperty('extends')){
            return this._raw.Template[templateObjectName].extends;
        }
    }
    isTopLevelTemplate(){
        return this._raw.hasOwnProperty('Template');
    }
    build(){
        let templateObject;
        const templatePointer = new TemplatePointer();
        templatePointer.file = this._file;

        try {
            if(this.isTopLevelTemplate()) {
                templateObject = new Template();
                let templateObjectName = this.getTemplateObjectName();
                templateObject._templateObjectName = templateObjectName;
                templateObject.name = this.getTemplateName(templateObjectName);
                templateObject.id = this.getTemplateId(templateObjectName);
                templateObject.extends = this.getTemplateExtends(templateObjectName);
            } else {
                templateObject = new TemplatePart();
                templateObject.part = this.getTemplatePart();
                templateObject.name = this.getTemplatePartName();
                templateObject.id = this.getTemplatePartId();
                templateObject.extends = Object.values(this._raw)[0].extends;
            }
        }
        catch(e) {
            console.log(e);
            console.log(this._raw);
            throw new Error(e);
        }
        finally{
            templateObject.content = this.getRawContent();
            templatePointer.template = templateObject;
            return templatePointer;
        }
    }

}

module.exports = TemplateFactory;