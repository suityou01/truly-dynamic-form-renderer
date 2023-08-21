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
        expect(templateObject.template._templateObjectName).toEqual('HAS');
        expect(templateObject.template._id).toEqual('ee9ec28b-df53-4de7-ac63-9495968ac984');
        expect(templateObject.template._name).toEqual('Householder Appeals Service');
        expect(templateObject.template._content.HAS.id).toEqual('ee9ec28b-df53-4de7-ac63-9495968ac984');
    });
    it('should create a part', () => {
        const templateFile = '../templates/has/has.yaml';
        const yaml = Services.yamlFileLoaderService.loadAll(templateFile)[3];
        const templateFactory = new TemplateFactory();
        templateFactory.setRawObject(yaml);
        const templateObject = templateFactory.build();
        expect(templateObject.template.id).toEqual('228eee93-db3e-42be-8c5b-9c24acdfde58');
        expect(templateObject.template.extends).toEqual('Email');
        expect(templateObject.template.page).toEqual('Page1');
        expect(templateObject.template.section).toEqual('Section1');
        expect(templateObject.template.template).toEqual('HAS');
        expect(templateObject.template._content.LPAEmail.id).toEqual('228eee93-db3e-42be-8c5b-9c24acdfde58');
        expect(templateObject.template._content.LPAEmail.extends).toEqual('Email');
        expect(templateObject.template._content.LPAEmail.page).toEqual('Page1');
        expect(templateObject.template._content.LPAEmail.section).toEqual('Section1');
        expect(templateObject.template._content.LPAEmail.template).toEqual('HAS');
        expect(templateObject.template._content.LPAEmail.type).toEqual('object');
        expect(templateObject.template._content.LPAEmail.properties.api.type).toEqual('object');
        expect(templateObject.template._content.LPAEmail.properties.api.properties.label.text.value).toEqual('Enter your email address');
        expect(templateObject.template._content.LPAEmail.properties.api.properties.label.isPageHeading.value).toEqual(true);
        expect(templateObject.template._content.LPAEmail.properties.api.properties.hint.value).toEqual('We\'ll send an access code to this address, if you have an account');
    })
});