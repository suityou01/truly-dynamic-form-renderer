require("../services");
require("../factories");
const fs = require("fs");

const TemplateService = require("./templateService");
const TemplatePointer = require("../types/templatePointer");

describe('./src/servics/templateService.js', () => {
    beforeAll(()=> {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
        Services.templateService.collateTemplateParts();
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
        let partName = 'Section1';
        let templateObjectName = 'HAS';
        const templatePart = Services.templateService.getPartByName(partName, templateObjectName);
        expect(templatePart).toBeTruthy();
    });
    it('should retrieve a template from knowing the part', ()=> {
        let partName = 'Section1';
        let templateObjectName = 'HAS';
        const templatePart = Services.templateService.getPartByName(partName, templateObjectName);
        const template = Services.templateService.getPartTemplate(templatePart.template);
        expect(template).toBeTruthy();
    });
    it('should retrieve a parent template', () => {
        const documents = '../templates/has/has.yaml';
        const yaml = Services.yamlFileLoaderService.loadAll(documents)[2];
        const templatePointer = Factories.templateFactory.setRawObject(yaml).build();
        const parentTemplatePointer = Services.templateService.getParent(templatePointer);
        expect(parentTemplatePointer).toBeTruthy();
        expect(parentTemplatePointer.template._templateObjectName).toEqual('HASPage');
        const grandParentMetaData = Services.templateService.getParent(parentTemplatePointer);
        expect(grandParentMetaData).toBeTruthy();
        expect(grandParentMetaData.meta._name).toEqual('Page');
    });
    it('should retrieve the parent of a template part', () => {
        const templateId = 'ee9ec28b-df53-4de7-ac63-9495968ac984';
        const partName = 'LPAEmail';
        const partTemplatePointer = Services.templateService.getPartByNameAndTemplateId(partName, templateId);
        const content = partTemplatePointer.template._content['LPAEmail'];
        const parent = Services.templateService.getParent(content);
        expect(parent).toBeTruthy();
        expect(parent.template._id).toEqual('a36b3b33-a94b-4c36-81ca-674cb6dc9565');
        expect(parent instanceof TemplatePointer).toEqual(true);
    });
    it('should load all templates', () => {
        const t = new TemplateService();
        t.loadAllTemplates();
        expect(t._invalidTemplates.length).toEqual(0);
        expect(t._orphans.length).toEqual(0);
        expect(t._templates.length).toBeGreaterThan(0);
    });
    it('should collate template parts into top level templates', () => {
        const t = new TemplateService();
        t.loadAllTemplates();
        t.collateTemplateParts();
        const hasTemplate = t.getTemplateByTemplateObjectName('HAS');
        expect(hasTemplate.template._parts.length).toBeGreaterThan(0);
    });
});