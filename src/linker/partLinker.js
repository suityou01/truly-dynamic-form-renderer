class PartLinker {
    _template;
    _templateLinker;
    constructor(templateLinker){
        this._templateLinker = templateLinker;
    }
    setTemplate(template){
        this._template = template;
    }
    getParent() {
        const content = this._template.template._content;
        const extend = Object.values(content)[0].extends;
        const parent = Services.templateService.getTemplateByTemplateObjectName(extend);
        return parent.template;
    }
    getParentMetaData(parent){
        if(this.isTopLevelTemplate(parent)){
            return this._templateLinker.getParentMetaData(parent);
        }
        return {};
    }
    getParentProperties(parent){
        console.log(parent);
        const name = parent.meta._name;
        const metaClass = parent.meta[name];
        return metaClass.properties;
    }
    getExtendableProperties(properties){
        const extendableProperties = [];
        for(let k in properties){
            if(properties[k].hasOwnProperty('extends')){
                extendableProperties.push(k);
            }
        }
        return extendableProperties;
    }
    getPropertyValue(propertyName, templateObjectName){
        return this.getContent(templateObjectName)[propertyName];
    }
    getContent(templateObjectName){
        return this._template.template._content.Template[templateObjectName];
    }
    isTopLevelTemplate(template){
        return template._templateObjectName.length > 0;
    }
    link(){
        const parent = this.getParent();
        const parentMetaData = this.getParentMetaData(parent);
        console.log(parentMetaData);
    }
}

module.exports = PartLinker;