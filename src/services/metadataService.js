class MetaDataService {
    _meta = [];
    constructor(){

    }
    loadMetaData() {

        const metaDirectories = Services.fileLoaderService.listDirectories('../meta/');
        metaDirectories.forEach(dir => {
            const files = Services.fileLoaderService.listFiles(dir);
            files.forEach(file => {
                const rawMetaDataFile = Services.yamlFileLoaderService.load(`${dir}/${file}`);
                const metaDataObject = Factories.metaDataFactory.setRawObject(rawMetaDataFile).build();
                this._meta.push({
                    file: file,
                    meta: metaDataObject
                });
            });    
        });
        
    }
    getMetaData(name) {
        return this._meta.filter(m => m.meta._name === name)[0];
    }
    static loadMetaData(relativePath){
        return yamlFileLoaderService.load(relativePath);
    }
}

module.exports = MetaDataService