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
    build(){
        const templateObject = new Template();
        try {
            let templateObjectName = this.getTemplateObjectName();
            if(templateObjectName!="") {
                templateObject.name = this.getTemplateName(templateObjectName);
                templateObject.id = this.getTemplateId(templateObjectName);
            } else {
                templateObject.part = this.getTemplatePart();
            }
            templateObject.content = { ...this._raw };
            templateObject._templateObjectName = templateObjectName;
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