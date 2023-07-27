class TemplateService {
    _templates = [];
    constructor(){

    }
    loadAllTemplates() {

        const templateDirectories = Services.fileLoaderService.listDirectories('../templates/');
        templateDirectories.forEach(dir => {
            const files = Services.fileLoaderService.listFiles(dir);
            files.forEach(file => {
                const rawTemplateArray = Services.yamlFileLoaderService.loadAll(`${dir}/${file}`);
                rawTemplateArray.forEach(rawTemplate => {
                    const templateObject = Factories.templateFactory.setRawObject(rawTemplate).build();
                    this._templates.push({
                        file: file,
                        template: templateObject
                    });
                });
            });    
        });
        
    }
}

module.exports = TemplateService;