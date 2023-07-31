const MetaData = require("../types/metaType");

const getValueFromObject = (object, selector) => {
    selectors = selector.split('.');
    return selectors.reduce((prev,cur) => prev && prev[cur], object);
}
const setValueOnObject = (object, selector, value) => {
    const selectors = selector.split('.');
    const key = selectors.pop();
    let pointer = selectors.reduce((prev,cur) => prev && prev[cur], object);
    if(typeof value === 'object'){
        pointer[key] = {
            ...pointer[key],
            ...value
        }
    } else {
        pointer[key] = value;
    }
        
}
const recurseObjectProperties = (parent, object) => {
    let keyMap = [];
    Object.keys(object).forEach(key => {
        const fullKey = parent ? `${parent}.${key}`: key;
        keyMap.push(fullKey);
        if(typeof object[key] === 'object'){
            const childKeyMap = recurseObjectProperties(fullKey, object[key]);   
            keyMap = keyMap.concat(childKeyMap);
        }
    });
    return keyMap;
}

class MetaDataLinker {
    _metaData;
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
        const parentKeyMap = recurseObjectProperties('', parent);
        const childKeyMap = recurseObjectProperties('', child);
        parentKeyMap.forEach(selector => {
            setValueOnObject(linkedMetaData, selector, getValueFromObject(parent, selector));
        });

        childKeyMap.forEach(selector => {
            setValueOnObject(linkedMetaData, selector, getValueFromObject(child, selector));
        });
        return linkedMetaData;
    }
    linkInheritanceChain(inheritanceChain){
        let linkedMetaData = {
            meta: new MetaData()
        };
        linkedMetaData = inheritanceChain.reduce((parent, child) => this.linkMetaData(linkedMetaData, parent, child), linkedMetaData);
        return linkedMetaData;
    }
    link(){
        const inheritanceChain = this.getIneritanceChain();
        const linkedMetaData = this.linkInheritanceChain(inheritanceChain);
        //console.log(inheritanceChain);
        console.log(JSON.stringify(linkedMetaData, null, 2));
    }
}

module.exports = MetaDataLinker;