const Template = require("../types/templateType");
const MetaData = require("../types/metaType");
const { mergeObjects } = require('../lib/object/object');

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
    isTemplatePart(link){
        return link._part != '' && typeof link._part != 'undefined';
    }
    isTemplate(link){
        return !this.isTemplatePart(link) && link instanceof Template && link._templateObjectName!="";
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
        console.log(parent, child);
    }
    linkTemplateToTemplate(parent, child){
        console.log(parent, child);
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