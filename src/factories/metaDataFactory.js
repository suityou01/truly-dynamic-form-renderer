const MetaData = require("../types/metaType");

class MetaDataFactory {
    _raw;
    _metadataService = {};
    constructor(yaml, metaDataService = {}){
        this._raw = yaml;
        this._metadataService = {};
    }
    setRawObject(o){
        this._raw = o;
        return this;
    }
    getParentMetaData(extend) {
        return;
    }
    getInheritedEntries(metaData) {
        const { extend } = metaData;
        let parentMetaData = this.getParentMetaData(extend);
        parentMetaData = {
            _api: {
                id: {
                    type: "string"
                },
                name: {
                    type: "string"
                },
            }
        }
        Object.assign(metaData, parentMetaData);
    }
    build(){
        let metaData = new MetaData();
        metaData.name = Object.keys(this._raw)[0];
        const value = Object.values(this._raw)[0];
        if(value.hasOwnProperty('extends')){
            metaData.extends = value.extends;
            this.getInheritedEntries(metaData);
        }
        metaData.macroFile = value.macro_file;
        metaData.import = value.import;
        metaData.api = {
            ...metaData.api,
            ...value.api
        };
        return metaData;
    }
}

module.exports = MetaDataFactory