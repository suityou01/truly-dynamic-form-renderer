require("../services");
require("../factories");

const TemplateFactory = require("./templateFactory");

describe('./src/factories/templateFactory.js', () => {
    beforeAll(() => {
        Services.templateService.loadAllTemplates();
    });
    it('should create top level template', () => {
        const templateFile = '../templates/has/has.yaml';
        const yaml = Services.yamlFileLoaderService.loadAll(templateFile)[0];
            
        const templateFactory = new TemplateFactory();
        templateFactory.setRawObject(yaml);
        const templateObject = templateFactory.build();
        expect(templateObject._templateObjectName).toEqual('HAS');
        expect(templateObject._id).toEqual('ee9ec28b-df53-4de7-ac63-9495968ac984');
        expect(templateObject._name).toEqual('Householder Appeals Service');
    });
    it('should create a part', () => {
        const templateFile = '../templates/has/has.yaml';
        const yaml = Services.yamlFileLoaderService.loadAll(templateFile)[1];
        const templateFactory = new TemplateFactory();
        templateFactory.setRawObject(yaml);
        const templateObject = templateFactory.build();
    })
});