const fileLoaderService = require("./fileLoaderService");
const yaml = require('js-yaml');

class YamlFileLoaderService {
    static load(relativePath){
        return yaml.load(fileLoaderService.load(relativePath));
    }
}

module.exports = YamlFileLoaderService