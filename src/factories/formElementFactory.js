const BaseFormElement = require("../types/baseFormElement");

class FormElementFactory {
    _metaDataObject;
    constructor(metaDataObject) {
        this._metaDataObject = metaDataObject;
    }
    buildStringProperty(stringDef){

    }
    buildTextProperty(formElement, propName) {
        Object.defineProperty(formElement, propName, {
            value: "",
            writable: true,
            enumerable: true
          });
    }
    build(){
        const baseFormElement = new BaseFormElement();
        Object.keys(this._metaDataObject.meta._api).forEach(k => {
            Object.keys(this._metaDataObject.meta._api[k]).forEach(j => {
                // console.log(`${k} -> ${j}`);
                this.buildTextProperty(baseFormElement, k);
            })
        });
        return baseFormElement;
    }
}

module.exports = FormElementFactory;