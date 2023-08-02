const MetaData = require("../types/metaType");
const { getKeyPointerFromObject,
    getValueFromObject,
    setValueOnObject,
    deleteKeyFromObject,
    recurseObjectProperties,
    createKeyOnObject,
    mergeKeys
} = require('../lib/object/object');
class MetaDataLinker {
    _metaData;
    generateTemporaryMergeSelector = (selector, metaobject) => {
        const keyName = metaobject.meta._name;
        const temporaryKeyName = `${keyName}_temp`
        let temporaryMergeSelector = selector;
        if(selector.indexOf(temporaryKeyName)===-1){
            temporaryMergeSelector = temporaryMergeSelector.replace(keyName, temporaryKeyName);
        }
        return temporaryMergeSelector;
    }
    setMetaData(metaData){
        this._metaData = metaData;
    }
    getParent(link) {
        return Services.metaDataService.getMetaData(link.meta._extends);
    }
    getIneritanceChain(){
        const inheritanceChain = [];
        let link = this._metaData;
        inheritanceChain.push(link);

        while(link.meta._extends && link.meta._extends!=''){
            link = this.getParent(link);
            inheritanceChain.push(link);
        }
        return inheritanceChain.reverse();
    }
    getMetaProperties(link){
        const metaName = link.meta._name;
        return link.meta[metaName].properties;
    }
    linkMetaData(linkedMetaData ,parent, child){
        console.log(parent);
        const parentKeyMap = recurseObjectProperties('', parent);
        const childKeyMap = recurseObjectProperties('', child);
        
        parentKeyMap.forEach(selector => {
            const mergeSelector = this.generateTemporaryMergeSelector(selector, parent);
            setValueOnObject(linkedMetaData, mergeSelector, getValueFromObject(parent, selector));
        });

        childKeyMap.forEach(selector => {
            const mergeSelector = this.generateTemporaryMergeSelector(selector, child);
            setValueOnObject(linkedMetaData, mergeSelector, getValueFromObject(child, selector));
        });
        
        return linkedMetaData;
    }
    mergeInheritanceChain(inheritanceChain, linkedMetaData){
        const lastLink = inheritanceChain[inheritanceChain.length - 1];
        const mergeKeyName = `meta.${lastLink.meta._name}`;
        inheritanceChain.forEach(link => {
            const selectorFrom = `meta.${link.meta._name}_temp`;
            mergeKeys(linkedMetaData, selectorFrom, null, mergeKeyName);
            linkedMetaData = deleteKeyFromObject(linkedMetaData, selectorFrom);
        });
        return linkedMetaData;
    }
    linkInheritanceChain(inheritanceChain){
        let linkedMetaData = {
            meta: new MetaData()
        };
        linkedMetaData = inheritanceChain.reduce((parent, child) => this.linkMetaData(linkedMetaData, parent, child), linkedMetaData);
        linkedMetaData = this.mergeInheritanceChain(inheritanceChain, linkedMetaData);
        return linkedMetaData;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        const linkedMetaData = this.linkInheritanceChain(inheritanceChain);
        return linkedMetaData;
    }
}

module.exports = MetaDataLinker;