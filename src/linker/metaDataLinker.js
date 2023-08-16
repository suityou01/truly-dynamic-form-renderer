const MetaData = require("../types/metaType");
const Template = require("../types/templateType");
const TemplatePointer = require("../types/templatePointer");
const TemplatePart = require("../types/templatePart");

const { getKeyPointerFromObject,
    getValueFromObject,
    setValueOnObject,
    deleteKeyFromObject,
    recurseObjectProperties,
    createKeyOnObject,
    mergeKeys,
    deepMerge
} = require('../lib/object/object');

class MetaDataLinker {
    _metaData;
    isTemplatePointer(link){
        return link instanceof TemplatePointer;
    }
    isTemplatePart(link){
        if(this.isTemplatePointer(link)){
            return link.template instanceof TemplatePart
        } else {
            return link instanceof TemplatePart;
        }
    }
    isTemplate(link){
        if(this.isTemplatePointer(link)){
            return link.template instanceof Template
        } else {
            return link instanceof Template;
        }
    }
    isMetaData(link){
        return link.meta && link.meta instanceof MetaData;
    }
    setMetaData(metaData) {
        this._metaData = metaData;
    }
    getParent(link) {
        return Services.metaDataService.getMetaData(link.meta._extends);
    }
    getIneritanceChain() {
        const inheritanceChain = [];
        let link = this._metaData;
        inheritanceChain.push(link);

        while(link.meta._extends && link.meta._extends!=''){
            link = this.getParent(link);
            inheritanceChain.push(link);
        }
        return inheritanceChain.reverse();
    }
    getExtendedProperties(link){
        let linkObjectName;
        if(this.isMetaData(link)){
            linkObjectName = link.meta._name;
            const properties = link.meta[linkObjectName].properties.api.properties;
            return Object.keys(properties).filter(property => properties[property].hasOwnProperty('extends'));
        }
    }
    linkExtendedProperties(link){
        const extendedProperties = this.getExtendedProperties(link);
        if(!extendedProperties) return link;
        extendedProperties.forEach(ep => {
            let linkObjectName = link.meta._name;
            let extend = link.meta[linkObjectName].properties.api.properties[ep].extends;
            let parent = Services.metaDataService.getMetaData(extend);
            let parentName = parent.meta._name;
            let parentProperties = parent.meta[parentName].properties.api.properties;
            let childProperties = link.meta[linkObjectName].properties.api.properties[ep];
            const merged = deepMerge(parentProperties, childProperties);
            link.meta[linkObjectName].properties.api.properties[ep] = merged;
        });
        return link;
    }
    getMetaProperties(link) {
        const metaName = link.meta._name;
        return link.meta[metaName].properties;
    }
    linkMetaDataToMetaData(parent, child) {
        parent = this.linkExtendedProperties(parent);
        child = this.linkExtendedProperties(child);
        if(parent.meta._macrofile){
            child.meta._macrofile = parent.meta._macrofile;
        }
        if(parent.meta._import){
            child.meta._import = parent.meta._import;
        }
        const parentName = parent.meta._name;
        const childName = child.meta._name;
        const parentProperties = parent.meta[parentName].properties;
        const childProperties = child.meta[childName].properties;
        const merged = deepMerge(parentProperties, childProperties);
        child.meta[childName].properties = merged;
        return child;
    }
    linkMetaDataToPart(parent, child){
        parent = this.linkExtendedProperties(parent);
        child = this.linkExtendedProperties(child);
        child.template._macro_file = parent.meta._macro_file;
        child.template._import = parent.meta._import;
        const parentName = parent.meta._name;
        const parentProperties = parent.meta[parentName].properties;
        const childName = child.template._part;
        const childProperties = child.template._content[childName].properties;
        const merged = deepMerge(parentProperties, childProperties);
        child.template._content[childName].properties = merged;
        return child;
    }
    linkMetaDataToTemplate(parent, child) {
        parent = this.linkExtendedProperties(parent);
        child = this.linkExtendedProperties(child);
        const parentName = parent.meta._name;
        const childName = child.template._templateObjectName;
        const parentProperties = parent.meta[parentName].properties;
        const childProperties = child.template._content[childName].properties;
        const merged = deepMerge(parentProperties, childProperties);
        child.template._content[childName].properties = merged;
        return child;
    }
    linkMetaData(parent, child){
        if(this.isMetaData(child)){
            return this.linkMetaDataToMetaData(parent, child);
        }
        if(this.isTemplatePart(child)){
            return this.linkMetaDataToPart(parent, child);
        }
        if(this.isTemplate(child)){
            return this.linkMetaDataToTemplate(parent, child);
        }
        console.log("Should not reach here");
        console.log(parent, child);
    }
    linkInheritanceChain(inheritanceChain){
        let linkedMetaData = inheritanceChain.reduce((parent, child) => this.linkMetaData(parent, child), inheritanceChain[0]);
        return linkedMetaData;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        const linkedMetaData = this.linkInheritanceChain(inheritanceChain);
        return linkedMetaData;
    }
}

module.exports = MetaDataLinker;