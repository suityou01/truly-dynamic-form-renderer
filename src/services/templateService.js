class TemplateService {
    
    _templates = [];
    _invalidTemplates = [];
    _orphans = [];

    constructor(){

    }
    getTemplateObjectName(template){
        return template.templateObjectName;
    }
    getParent(template){
        const parentName = template.extends;
        let parent = Services.templateService.getTemplateByTemplateObjectName(parentName);
        if(!parent){
            parent = Services.metaDataService.getMetaData(parentName);
            return parent;
        }
        return parent.template;
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
    getTemplateNameFromReference(ref = ""){
        const refRegEx = /^\$ref\s/gi;
        const templateName = ref.replace(refRegEx,'');
        return templateName;
    }
    getTemplateFromReference(ref){
        const templateName = this.getTemplateNameFromReference(ref);
        if(templateName!=""){
            const template = this.getTemplateByTemplateObjectName(templateName);
            return template;
        }
        return "";
    }
    getPartByName(partName, templateObjectName){
        const template = this.getTemplateByTemplateObjectName(templateObjectName);
        return template.template._parts.filter(part => 
            part.template._name === partName
        )[0];
    }
    getPartById(id, templateObjectName){
        const template = this.getTemplateByTemplateObjectName(templateObjectName);
        return template.template._parts.filter(part => 
            part.template._id === id
        )[0];
    }
    getPartTemplate(templateObject){
        let content = templateObject._content;
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
                            if(!belongsToTemplate){
                                this._orphans.push({
                                    file: file,
                                    template: templateObject
                                });                              
                            } else {
                                belongsToTemplate.template._parts.push({
                                    file: file,
                                    template: templateObject
                                });
                            }
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
    listTemplates(){
        return this._templates;
    }
}

module.exports = TemplateService;