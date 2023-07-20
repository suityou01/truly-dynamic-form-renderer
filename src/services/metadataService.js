const yamlFileLoaderService = require("./yamlFileLoaderService");

class MetaDataService {
    static loadMetaData(relativePath){
        return yamlFileLoaderService.load(relativePath);
    }
}

module.exports = MetaDataService