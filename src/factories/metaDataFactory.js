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
        return Services.metaDataService.getMetaData(extend);
    }
    getInheritedEntries(metaData) {
        const { _extends } = metaData;
        let parentMetaData = this.getParentMetaData(_extends);
        delete parentMetaData.file;
        metaData._api = {
            ...metaData._api,
            ...parentMetaData.meta._api
        }
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