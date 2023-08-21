const Template = require("../types/templateType");
const TemplatePart = require("../types/templatePart");
const TemplatePointer = require("../types/templatePointer");
const MetaData = require("../types/metaType");
const { mergeObjects, deepMerge } = require('../lib/object/object');

class TemplateLinker {
    _template;
    _metaDataLinker;
    constructor(metaDataLinker){
        this._metaDataLinker = metaDataLinker;
    }
    setTemplate(template){
        this._template = template;
        return this;
    }
    isTemplatePointer(link){
        return link instanceof TemplatePointer;
    }
    isTemplatePart(link){
        if(this.isTemplatePointer(link)){
            return link.template instanceof TemplatePart;
        }
        return link instanceof TemplatePart;
    }
    isTemplate(link){
        if(this.isTemplatePointer(link)){
            return link.template instanceof Template;
        }
        return link instanceof Template;
    }
    isMetaData(link){
        return link.meta && link.meta instanceof MetaData ? true : false;
    }
    getIneritanceChain(){
        const inheritanceChain = [];
        let link = this._template;
        inheritanceChain.push(link);
        try {
            while(link && ((link.template && link.template.extends!='') || link.meta)){
                if(link.meta){
                    link = Services.metaDataService.getParent(link);
                } else {
                    link = Services.templateService.getParent(link);
                }
                if(link) inheritanceChain.push(link);
            }
        } catch(e) {
            console.log(e);
            console.log(link);
            console.log(this._template);
            throw new Error(e);
        }
        return inheritanceChain.reverse();
    }
    linkTemplatePartToTemplatePart(parent, child){
        const parentName = parent.template._part;
        const childName = child.template._part;
        const parentOptions = parent.template._content[parentName].properties;
        const childOptions = child.template._content[childName].properties;
        const merged = deepMerge(parentOptions, childOptions);
        child.template._content[childName].properties = merged;
        return child;
    }
    linkTemplateToTemplate(parent, child){
        const parentTemplate = parent.template;
        const childTemplate = child.template;

        for(const part of parentTemplate.parts){
            console.log(part);
        }
    }
    linkTemplate(parent, child){
        let linkedTemplate;
        if(this.isTemplatePart(parent) && this.isTemplatePart(child)) {
            linkedTemplate = this.linkTemplatePartToTemplatePart(parent, child);
        } else if (this.isTemplate(parent) && this.isTemplate(child)) {
            linkedTemplate = this.linkTemplateToTemplate(parent, child);
        } else if (this.isMetaData(parent)) {
            linkedTemplate = this._metaDataLinker.linkMetaData(parent, child);
        }
        return linkedTemplate;
    }
    linkInheritanceChain(inheritanceChain){
        let linkedTemplate = new Template();
        linkedTemplate = inheritanceChain.reduce((parent, child) => {
            if(this.isMetaData(parent)) {
                return this._metaDataLinker.linkMetaData(parent, child);
            }
            return this.linkTemplate(parent, child);
        });
        return linkedTemplate;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        const linkedTemplate = this.linkInheritanceChain(inheritanceChain);
        return linkedTemplate;
    }
}

module.exports = TemplateLinker;