const chalk = require("chalk");
const boxen = require("boxen");
const packageJSON = require('./package.json');
require("./services");
require("./factories");

const banner = `
╔╦╗╔╦╗╔═╗╦═╗
 ║  ║║╠╣ ╠╦╝
 ╩ ═╩╝╚  ╩╚═
`;
class Engine {
    constructor() {
        
    }
    loadAllMetaData(){
        this.sayMessage("Loading meta data");
        Services.metaDataService.loadAllMetaData();
        this.sayMessage(`${this.getAllMetaData().length} loaded`);
    }
    loadAllTemplates(){
        this.sayMessage("Loading templates");
        Services.templateService.loadAllTemplates();
        this.sayMessage(`${this.getAllTemplates().length} loaded`);
        const invalidTemplateCount = this.getInvalidTemplates().length;
        if(invalidTemplateCount){
            this.sayError(`${invalidTemplateCount} template${invalidTemplateCount > 1 ? 's were': ' was'} deemed invalid.`);
        }
        const orphanTemplateCount = this.getOrphanTemplates().length;
        if(orphanTemplateCount){
            this.sayError(`${orphanTemplateCount} template${orphanTemplateCount > 1 ? 's were': ' was'} deemed orphaned.`);
        }
    }
    collateTemplateParts(){
        this.sayMessage("Collating template parts");
        Services.templateService.collateTemplateParts();
        this.sayMessage("Template parts collated");
    }
    loadMetaData(path = undefined){
        Services.metaDataService.loadMetaData(path);
    }
    getAllMetaData() {
        return Services.metaDataService.getAllMetaData();
    }
    getAllTemplates() {
        return Services.templateService.getAllTemplates();
    }
    getInvalidTemplates(){
        return Services.templateService.getInvalidTemplates();
    }
    getOrphanTemplates(){
        return Services.templateService.getOrphanTemplates();
    }
    getOrphanTemplateById(id){
        return Services.templateService.getOrphanTemplateById(id);
    }
    getTemplateByTemplateObjectName(name){
        return Services.templateService.getTemplateByTemplateObjectName(name);
    }
    getMetaData(name) {
        return Services.metaDataService.getMetaData(name);
    }
    sayHello() {
        const greeting = chalk.white.bold(banner);
        const version = chalk.blue.bold(`   version: ${packageJSON.version}`);
        const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        backgroundColor: "#555555"
        };
        const msgBox = boxen( greeting, boxenOptions );
        console.log(msgBox);
        console.log(version);
    }
    sayMessage(message) {
        const styledMessage = chalk.blue.bold(`   ${message}`);
        console.log(styledMessage);
    }
    sayError(error) {
        const styledMessage = chalk.red.bold(`   ${error}`);
        console.log(styledMessage);
    }
    render(templateId) {

    }
    renderOrphan(templateId){

    }
    toString(){
        return `{
            meta: ${JSON.stringify(this._meta, null, 2)}
        }`
    }
}

module.exports = Engine;