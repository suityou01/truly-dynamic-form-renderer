require("./services");
require("./factories");
class Engine {
    constructor() {
        
    }
    loadMetaData(){
        Services.metaDataService.loadMetaData();
    }
    getMetaData(name) {
        return Services.metaDataService.getMetaData(name);
    }
    toString(){
        return `{
            meta: ${JSON.stringify(this._meta, null, 2)}
        }`
    }
}

module.exports = Engine;