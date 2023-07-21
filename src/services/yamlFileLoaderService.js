const yaml = require('js-yaml');

class YamlFileLoaderService {
    load(relativePath){
        return yaml.load(Services.fileLoaderService.load(relativePath));
    }
}

module.exports = YamlFileLoaderService