class MetaDataService {
    _meta = [];
    constructor(){

    }
    loadAllMetaData(path = "../meta/") {

        const metaDirectories = Services.fileLoaderService.listDirectories(path);
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
    getAllMetaData() {
        return this._meta;
    }
    loadMetaData(relativePath){
        return Services.yamlFileLoaderService.load(relativePath);
    }
}

module.exports = MetaDataService