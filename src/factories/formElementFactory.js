const BaseFormElement = require("../types/baseFormElement");

class FormElementFactory {
    _metaDataObject;
    constructor(metaDataObject) {
        this._metaDataObject = metaDataObject;
    }
    buildStringProperty(stringDef){

    }
    build(){
        const baseFormElement = new BaseFormElement();
        Object.keys(this._metaDataObject.meta._api).forEach(k => {
            Object.keys(this._metaDataObject.meta._api[k]).forEach(j => {
                console.log(`${k} -> ${j}`);
            })
        })
    }
}

module.exports = FormElementFactory;