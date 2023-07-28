const Template = require("../types/templateType");

class TemplateFactory {
    _raw;    
    constructor(yaml){
        this._raw = yaml;
    }
    setRawObject(o){
        this._raw = o;
        return this;
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
        const templateObject = new Template();
        templateObject.content = { ...this._raw };
        try {
            if(this.isTopLevelTemplate()) {
                let templateObjectName = this.getTemplateObjectName();
                templateObject._templateObjectName = templateObjectName;
                templateObject.name = this.getTemplateName(templateObjectName);
                templateObject.id = this.getTemplateId(templateObjectName);
                templateObject.extends = this.getTemplateExtends(templateObjectName);
            } else {
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
            return templateObject;
        }
    }

}

module.exports = TemplateFactory;