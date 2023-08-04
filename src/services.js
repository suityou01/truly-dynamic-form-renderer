const FileLoaderService = require("./services/fileLoaderService");
const MetaDataService = require("./services/metadataService");
const YamlFileLoaderService = require("./services/yamlFileLoaderService");
const TemplateService = require("./services/templateService");
const RenderTemplateService = require("./services/renderTemplateService");

const metaDataService = new MetaDataService();
const fileLoaderService = new FileLoaderService();
const yamlFileLoaderService = new YamlFileLoaderService();
const templateService = new TemplateService();
const renderTemplateService = new RenderTemplateService();

global.Services = {
    metaDataService: metaDataService,
    yamlFileLoaderService: yamlFileLoaderService,
    fileLoaderService: fileLoaderService,
    templateService: templateService,
    renderTemplateService: renderTemplateService
}

module.exports = {
    fileLoaderService,
    metaDataService,
    yamlFileLoaderService,
    templateService,
    renderTemplateService
}