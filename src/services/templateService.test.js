require("../services");
require("../factories");

const TemplateService = require("./templateService");

describe('./src/servics/templateService.js', () => {
    beforeAll(()=> {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
    })
    it('should retrieve a template by TemplateObjectName', ()=> {
        const template = Services.templateService.getTemplateByTemplateObjectName('HAS');
        expect(template).toBeTruthy();
    });
    it('should retrieve a template by ID', ()=> {
        const hasTemplateId = 'ee9ec28b-df53-4de7-ac63-9495968ac984';
        const template = Services.templateService.getTemplateById(hasTemplateId);
        expect(template).toBeTruthy();
    });
    it('should retrieve a template by instrinsic reference function', ()=> {
        const ref = '$Ref HAS';
        const template = Services.templateService.getTemplateFromReference(ref);
        expect(template).toBeTruthy();
    });
    it('should retrieve a part by name', () => {
        let partName = 'Section 1';
        let templateObjectName = 'HAS';
        const templatePart = Services.templateService.getPartByName(partName, templateObjectName);
        expect(templatePart).toBeTruthy();
    });
    it('should retrieve a template from knowing the part', ()=> {
        let partName = 'Section 1';
        let templateObjectName = 'HAS';
        const templatePart = Services.templateService.getPartByName(partName, templateObjectName);
        const template = Services.templateService.getPartTemplate(templatePart.template);
        expect(template).toBeTruthy();
    });
    it('should retrieve a parent template', () => {
        const documents = '../templates/has/has.yaml';
        const yaml = Services.yamlFileLoaderService.loadAll(documents)[2];
        const template = Factories.templateFactory.setRawObject(yaml).build();
        const parent = Services.templateService.getParent(template);
        const grandParent = Services.templateService.getParent(parent);
    })
});