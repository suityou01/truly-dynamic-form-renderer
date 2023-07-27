class TemplateService {
    
    _templates = [];
    _invalidTemplates = [];
    _orphans = [];

    constructor(){

    }
    getTemplateById(id){
        return this._templates.filter(template => 
            template.template && 
            template.template.id && 
            template.template.id === id
        )[0];
    }
    getTemplateByTemplateObjectName(templateObjectName){
        return this._templates.filter(template =>
            template.template &&
            template.template._templateObjectName &&
            template.template._templateObjectName === templateObjectName
        )[0];
    }
    validateTemplate(templateObject) {
        return true;
    }
    getTemplateFromReference(ref){
        const refRegEx = /^\$ref\s/gi;
        if(refRegEx.test(ref)){
            const templateName = ref.replace(refRegEx,'');
            const template = this.getTemplateByTemplateObjectName(templateName);
            return template;
        }
    }
    getPartTemplate(templateObject){
        let content = templateObject.content;
        let belongsToTemplate = Object.values(content)[0].template;
        let templateReference = this.getTemplateFromReference(belongsToTemplate);
        return templateReference;
    }
    isTopLevelTemplate(templateObject){
        return (templateObject._name!="" && templateObject._part === "");
    }
    loadAllTemplates() {

        const templateDirectories = Services.fileLoaderService.listDirectories('../templates/');
        templateDirectories.forEach(dir => {
            const files = Services.fileLoaderService.listFiles(dir);
            files.forEach(file => {
                const rawTemplateArray = Services.yamlFileLoaderService.loadAll(`${dir}/${file}`);
                rawTemplateArray.forEach(rawTemplate => {
                    const templateObject = Factories.templateFactory.setRawObject(rawTemplate).build();
                    if(this.validateTemplate(templateObject)){
                        if(this.isTopLevelTemplate(templateObject)){
                            this._templates.push({
                                file: file,
                                template: templateObject
                            });
                        } else {
                            const belongsToTemplate = this.getPartTemplate(templateObject);
                            belongsToTemplate.template._parts.push({
                                file: file,
                                template: templateObject
                            });
                        }
                    } else{
                        this._invalidTemplates.push({
                            file: file,
                            template: templateObject
                        });
                    }
                });
            });    
        });
        
    }
}

module.exports = TemplateService;