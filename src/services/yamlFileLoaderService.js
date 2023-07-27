const yaml = require('js-yaml');

class YamlFileLoaderService {
    load(relativePath){
        return yaml.load(Services.fileLoaderService.load(relativePath));
    }
    loadAll(relativePath){
        return yaml.loadAll(Services.fileLoaderService.load(relativePath));
    }
}

module.exports = YamlFileLoaderService