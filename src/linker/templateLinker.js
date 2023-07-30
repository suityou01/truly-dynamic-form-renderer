const TemplateType = require("../types/templateType");
const MetaData = require("../types/metaType");
class TemplateLinker {
    _template;
    setTemplate(template){
        this._template = template;
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
    getMetaProperties(metaData){
        const metaName = metaData._name;
        return metaData[metaName].properties;
    }
    linkMetaData(parent, child){
        const linkedMetaData = {
            ...parent,
            ...{
                _metaData: this.getMetaProperties(child)
            }
        }
        return linkedMetaData;
    }
    linkTemplate(parent, child){
        const linkedTemplate = {
            ...parent,
            ...child
        }
        return linkedTemplate
    }
    linkInheritanceChain(inheritanceChain){
        let linkedTemplate = new TemplateType();
        linkedTemplate = inheritanceChain.reduce((parent, child) => {
            if(child instanceof MetaData){
                return this.linkMetaData(parent, child);
            }
            return this.linkTemplate(parent, child);
        }, linkedTemplate);
        return linkedTemplate;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        const linkedTemplate = this.linkInheritanceChain(inheritanceChain);
        console.log(inheritanceChain);
        console.log(linkedTemplate);
    }
}

module.exports = TemplateLinker;