const TemplateType = require("../types/templateType");
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
    isTemplatePart(){
        return this._template._part != '' && typeof this._template._part != 'undefined';
    }
    getIneritanceChain(){
        const inheritanceChain = [];
        let link;
        if(this.isTemplatePart()){
            const partName = this._template._part;
            link = this._template._content[partName];
        } else {
            link = this._template;
        }
        inheritanceChain.push(link);
        try {
            while(link && ((link.extends && link.extends!='') || link.meta)){
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
    linkTemplate(parent, child){
        // Need to legislate for template parts here
        let linkedTemplate;
        if(this.isTemplatePart()){
            linkedTemplate = mergeObjects(parent, child);
        } else {
            linkedTemplate = mergeObjects(parent, child);
        }
        return linkedTemplate
    }
    linkInheritanceChain(inheritanceChain){
        let linkedTemplate = new TemplateType();
        linkedTemplate = inheritanceChain.reduce((parent, child) => {
            if(parent instanceof MetaData) {
                let linkedMetaData = new MetaData();
                return this._metaDataLinker.linkMetaData(linkedMetaData, parent, child);
            }
            return this.linkTemplate(parent, child);
        });
        return linkedTemplate;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        console.log(JSON.stringify(inheritanceChain, null, 2));
        const linkedTemplate = this.linkInheritanceChain(inheritanceChain);
        return linkedTemplate;
    }
}

module.exports = TemplateLinker;