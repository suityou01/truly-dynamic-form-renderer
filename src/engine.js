const Services = require("./services");
const Factories = require("./factories");

class Engine {
    _meta = [];
    constructor() {

    }
    loadMetaData() {

        const metaDirectories = Services.fileLoaderService.listDirectories('../meta/');
        const files = Services.fileLoaderService.listFiles(`../meta/base/form/`);
        const inputFiles = Services.fileLoaderService.listFiles(`../meta/inputs`);

        files.forEach(file => {
            const rawMetaDataFile = Services.metaDataService.loadMetaData(`../meta/base/form/${file}`);
            const metaDataObject = Factories.metaDataFactory.setRawObject(rawMetaDataFile).build();
            this._meta.push({
                file: file,
                meta: metaDataObject
            });
        });

        inputFiles.forEach(file => {
            const metaDataFile = Services.metaDataService.loadMetaData(`../meta/inputs/${file}`);
            this._meta.push({
                file: file,
                meta: Factories.metaDataFactory.setRawObject(metaDataFile).build()
            });
        });
        
    }
    getMetaData(name) {
        return this._meta.filter(m => m.meta._name === name)[0];
    }

    toString(){
        return `{
            meta: ${JSON.stringify(this._meta, null, 2)}
        }`
    }
}

module.exports = Engine;