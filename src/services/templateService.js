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
            parent = Services.templateService.getOrphanTemplateByName(parentName);
        }
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
    getPartByNameAndTemplateId(partName, templateId){
        const template = this.getTemplateById(templateId);
        return template.template._parts.filter(part => 
            part.template._part === partName
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
                        this._templates.push({
                            file: file,
                            template: templateObject
                        });
                    } else {
                        this._invalidTemplates.push({
                            file: file,
                            template: templateObject
                        });
                    }
                });
            });    
        });
        
    }
    collateTemplateParts() {
        this._templates.filter(t => t.template._part !='').forEach(part => {
            const parentTemplate = this.getPartTemplate(part.template);
            if(parentTemplate){
                if(parentTemplate.template._parts.filter(p => p.template._id === part.template._id).length === 0){
                    parentTemplate.template._parts.push(part);
                    this._templates = this._templates.filter(t => t.template._id != part.template._id);
                } else {
                    console.log("Failed to collate part");
                    console.log(parentTemplate, part);
                }
            } else {
                if(this._orphans.filter(orphan => orphan.template._id === part.template._id).length === 0){
                    this._orphans.push(part);
                }
            }
        });
    }
    listTemplates(){
        return this._templates;
    }
    getAllTemplates(){
        return this._templates;
    }
    getInvalidTemplates(){
        return this._invalidTemplates;
    }
    getOrphanTemplates(){
        return this._orphans;
    }
    getOrphanTemplateById(id){
        return this._orphans.filter(orphan => orphan.template.id === id)[0];
    }
    getOrphanTemplateByName(name){
        return this._orphans.filter(orphan => orphan.template._part === name)[0];
    }
    isValidTemplateId(id){
        return typeof this.getTemplateById(id) != 'undefined';
    }
}

module.exports = TemplateService;