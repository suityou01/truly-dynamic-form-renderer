const FileLoaderService = require("./services/fileLoaderService");
const MetaDataService = require("./services/metadataService");
const YamlFileLoaderService = require("./services/yamlFileLoaderService");

const metaDataService = new MetaDataService();
const fileLoaderService = new FileLoaderService();
const yamlFileLoaderService = new YamlFileLoaderService();

global.Services = {
    metaDataService: metaDataService,
    yamlFileLoaderService: yamlFileLoaderService,
    fileLoaderService: fileLoaderService
}

module.exports = {
    fileLoaderService,
    metaDataService,
    yamlFileLoaderService
}