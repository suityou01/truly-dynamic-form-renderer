
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
    if(typeof value != 'object'){
        {
            pointer[key] = value;
        }    
    }
}

const deleteKeyFromObject = (obj, path) => {
    const _obj = JSON.parse(JSON.stringify(obj));
    if(!path.includes('.') && obj.hasOwnProperty(path)){
        delete _obj[path];
        return _obj;
    }
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
            const childKeyMap = recurseObjectProperties(fullKey, object[key], omit);   
            keyMap = keyMap.concat(childKeyMap);
        }
    });
    keyMap = keyMap.filter(key => key != omit);
    return keyMap;
}

const createKeyOnObject = (object, selector, value = null) => {
    selectors = selector.split('.');
    let pointer = selectors.reduce((prev,cur) => {
        if(!prev.hasOwnProperty(cur)){
            Object.defineProperty(prev, cur, {
                value: value ? value : {},
                writable: true,
                enumerable: true
            });
        }
        return prev[cur];
    }, object);
    return pointer;
}

const mergeKeys = ( object, selector1, selector2 = null, mergeKeySelector, deleteMergedKeys = true) => {
    
    let _obj = JSON.parse(JSON.stringify(object));
    const mergeKeyPointer = createKeyOnObject(_obj, mergeKeySelector);

    if(!selector1.includes('.')) {
        createKeyOnObject(mergeKeyPointer, selector1, _obj[selector1]);
    } else {
        let key1Pointer = getKeyPointerFromObject(_obj, selector1);
        const key1KeyMap = recurseObjectProperties('', key1Pointer);
        key1KeyMap.forEach(selector => {
            setValueOnObject(mergeKeyPointer, selector, getValueFromObject(key1Pointer, selector));
        });
    }
    
    if(selector2) {
        let key2Pointer;
        let key2KeyMap;

        if(!selector2.includes('.')) {
            createKeyOnObject(mergeKeyPointer, selector2, _obj[selector2]);
        } else {
            key2Pointer = getKeyPointerFromObject(_obj, selector2);
            key2KeyMap = recurseObjectProperties('', key2Pointer);
            key2KeyMap.forEach(selector => {
                setValueOnObject(mergeKeyPointer, selector, getValueFromObject(key2Pointer, selector));
            });
        }
        
    }

    if(deleteMergedKeys){
        _obj = deleteKeyFromObject(_obj, selector1);
        if(selector2){
            _obj = deleteKeyFromObject(_obj, selector2);
        }
    }
    return _obj;
}

const mergeObjects = (objectA, objectB) => {
    let _obj = {};
    let objectAKeyMap = recurseObjectProperties('', objectA);
    let objectBKeyMap = recurseObjectProperties('', objectB);
    objectAKeyMap.forEach(path => {
        let keyPointer = getKeyPointerFromObject(objectA, path);
        if(typeof keyPointer != 'object'){
            createKeyOnObject(_obj, path);
            setValueOnObject(_obj, path, keyPointer);
        }        
    });
    objectBKeyMap.forEach(path => {
        let keyPointer = getKeyPointerFromObject(objectB, path);
        if(typeof keyPointer != 'object'){
            createKeyOnObject(_obj, path);
            setValueOnObject(_obj, path, keyPointer);
        }        
    });
    return _obj;
}

module.exports = {
    getKeyPointerFromObject,
    getValueFromObject,
    setValueOnObject,
    deleteKeyFromObject,
    recurseObjectProperties,
    createKeyOnObject,
    mergeKeys,
    mergeObjects
}