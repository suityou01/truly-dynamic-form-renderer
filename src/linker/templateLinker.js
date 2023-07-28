class TemplateLinker {
    _template;
    setTemplate(template){
        this._template = template;
    }
    getTemplateObjectName(){
        return this._template.template._templateObjectName;
    }
    getParent(templateObjectName){
        if(this.isTopLevelTemplate()){

        } else {
            const content = this._template.template._content;
            const extend = Object.values(content)[0].extends;
            return Services.metaDataService.getMetaData(extend);
        }
    }
    getParentMetaData(parent){
        const extend = parent._extends;
        const metaData = Services.metaDataService.getMetaData(extend);
        return metaData;
    }
    getParentProperties(parent){
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
    link(){

        const templateObjectName = this.getTemplateObjectName();
        const parent = this.getParent(templateObjectName);
        const properties = this.getParentProperties(parent);
        const extendableProperties = this.getExtendableProperties(properties.api.properties);
        const value = this.getPropertyValue('header', templateObjectName);
        const content = this.getContent(templateObjectName);

    }
}

module.exports = TemplateLinker;