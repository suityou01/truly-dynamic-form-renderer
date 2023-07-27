const MetaData = require("../types/metaType");

class MetaDataFactory {
    _raw;
    
    constructor(yaml){
        this._raw = yaml;
    }
    setRawObject(o){
        this._raw = o;
        return this;
    }
    getParentMetaData(extend) {
        return Services.metaDataService.getMetaData(extend);
    }
    getInheritedEntries(metaData) {
        const name = Object.keys(this._raw.properties)[0];
        const _extends = metaData._extends;
        let parentMetaData = this.getParentMetaData(_extends);
        if(parentMetaData.hasOwnProperty('file')){
            delete parentMetaData.file;
        }
        Object.defineProperty(metaData, name, {
            value: {
                properties: {
                    api: {}
                }
            },
            writable: true,
            enumerable: true
        });
        Object.assign(metaData[name].properties.api, parentMetaData.meta[_extends].properties.api);
    }
    build(){
        let metaData = new MetaData();
        const name = Object.keys(this._raw.properties)[0];
        const props = Object.values(this._raw.properties)[0];
        const value = props;
        
        if(value.properties.hasOwnProperty('extends')){
            metaData._extends = value.properties.extends.const;
            this.getInheritedEntries(metaData);
        } else {
            metaData[name] = {};
            Object.assign(metaData[name], {
                properties: {
                    api: {}
                }
            });
        }
        
        metaData[name].properties.api = {
            ...metaData[name].properties.api,
            ...value.properties.api
        }
        
        metaData._name = name;
        if(value.properties.hasOwnProperty('macro_file')){
            metaData._macro_file = value.properties.macro_file.const;
        }
        if(value.properties.hasOwnProperty('import')){
            metaData._import = value.properties.import.const;
        }
        if(props.hasOwnProperty('additionalProperties')){
            metaData[name].additionalProperties = props.additionalProperties;
        }
        return metaData;
    }
}

module.exports = MetaDataFactory