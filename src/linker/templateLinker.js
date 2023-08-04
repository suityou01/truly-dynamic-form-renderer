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
    getIneritanceChain(){
        const inheritanceChain = [];
        let link = this._template;
        inheritanceChain.push(link);

        while(link.extends && link.extends!=''){
            link = Services.templateService.getParent(link);
            inheritanceChain.push(link);
        }
        return inheritanceChain.reverse();
    }
    linkTemplate(parent, child){
        const linkedTemplate = mergeObjects(parent, child);
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
        const linkedTemplate = this.linkInheritanceChain(inheritanceChain);
        return linkedTemplate;
    }
}

module.exports = TemplateLinker;