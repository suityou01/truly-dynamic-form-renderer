const MetaData = require("../types/metaType");

generateTemporaryMergeSelector = (selector, metaobject) => {
    const keyName = metaobject.meta._name;
    const temporaryKeyName = `${keyName}_temp`
    let temporaryMergeSelector = selector;
    if(selector.indexOf(temporaryKeyName)===-1){
        temporaryMergeSelector = temporaryMergeSelector.replace(keyName, temporaryKeyName);
    }
    return temporaryMergeSelector;
}
const getKeyPointerFromObject = (object, selector) => {
    selectors = selector.split('.');
    let pointer = selectors.reduce((prev,cur) => prev && prev[cur], object);
    return pointer;
}

const getValueFromObject = (object, selector) => {
    return getKeyPointerFromObject(object, selector);
}

const setValueOnObject = (object, selector, value) => {
    const selectors = selector.split('.');
    const key = selectors.pop();
    let pointer = selectors.reduce((prev,cur) => {
        if(!prev.hasOwnProperty(cur)){
            Object.defineProperty(prev, cur, {
                value: {},
                writable: true,
                enumerable: true
            });
        }
        return prev[cur];
    }, object);
    if(typeof value === 'object'){
        /*
        pointer[key] = {
            ...pointer[key],
            ...value
        }
        */
    } else {
        pointer[key] = value;
    }
        
}

const deleteKeyFromObject = (obj, path) => {
    const _obj = JSON.parse(JSON.stringify(obj));
    const keys = path.split('.');

    keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
            delete acc[key];
            return true;
        }
        return acc[key];
    }, _obj);

    return _obj;
}

const recurseObjectProperties = (parent, object, omit = 'meta') => {
    let keyMap = [];
    Object.keys(object).forEach(key => {
        const fullKey = parent ? `${parent}.${key}`: key;
        keyMap.push(fullKey);
        if(typeof object[key] === 'object'){
            const childKeyMap = recurseObjectProperties(fullKey, object[key]);   
            keyMap = keyMap.concat(childKeyMap);
        }
    });
    keyMap = keyMap.filter(key => key != omit);
    return keyMap;
}
const createKeyOnObject = (object, selector) => {
    selectors = selector.split('.');
    let pointer = selectors.reduce((prev,cur) => {
        if(!prev.hasOwnProperty(cur)){
            Object.defineProperty(prev, cur, {
                value: {},
                writable: true,
                enumerable: true
            });
        }
        return prev[cur];
    }, object);
    return pointer;
}
const mergeKeys = ( object, selector1, selector2 = null, mergeKeySelector) => {
    
    let key1Pointer = getKeyPointerFromObject(object, selector1);
    let key2Pointer;
    let key2KeyMap;

    if(selector2) {
        key2Pointer = getKeyPointerFromObject(object, selector2);
        key2KeyMap = recurseObjectProperties('', key2Pointer);
    }

    const mergeKeyPointer = createKeyOnObject(object, mergeKeySelector);
    const key1KeyMap = recurseObjectProperties('', key1Pointer);

    key1KeyMap.forEach(selector => {
        setValueOnObject(mergeKeyPointer, selector, getValueFromObject(key1Pointer, selector));
    });

    if(selector2) {
        key2KeyMap.forEach(selector => {
            setValueOnObject(mergeKeyPointer, selector, getValueFromObject(key2Pointer, selector));
        });
    }

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
            const mergeSelector = generateTemporaryMergeSelector(selector, parent);
            setValueOnObject(linkedMetaData, mergeSelector, getValueFromObject(parent, selector));
        });

        childKeyMap.forEach(selector => {
            const mergeSelector = generateTemporaryMergeSelector(selector, child);
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