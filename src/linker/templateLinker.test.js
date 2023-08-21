require("../services");
require("../factories");
const TemplateLinker = require("./templateLinker");
const MetaDataLinker = require("./metaDataLinker");
const TemplateType = require("../types/templateType");
const MetaData = require("../types/metaType");

describe('./src/linker/templateLinker.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
        Services.templateService.collateTemplateParts();
    });
    it('should identify a template part', () => {
        const link = new TemplateType();
        const templateLinker = new TemplateLinker();
        link._part = "MyPart";
        link._content = {
            MyPart: {
                id: 1
            }
        };
        expect(templateLinker.isTemplatePart(link)).toEqual(true);
        expect(templateLinker.isTemplate(link)).toEqual(false);
        expect(templateLinker.isMetaData(link)).toEqual(false);
    });
    it('should identify a template', () => {
        const link = new TemplateType();
        link._templateObjectName = "A template";
        const templateLinker = new TemplateLinker();
        expect(templateLinker.isTemplatePart(link)).toEqual(false);
        expect(templateLinker.isTemplate(link)).toEqual(true);
        expect(templateLinker.isMetaData(link)).toEqual(false);
    });
    it('should identify Metadata', () => {
        const link = {
            meta: new MetaData()
        };
        const templateLinker = new TemplateLinker();
        expect(templateLinker.isTemplatePart(link)).toEqual(false);
        expect(templateLinker.isTemplate(link)).toEqual(false);
        expect(templateLinker.isMetaData(link)).toEqual(true);
    });
    it('should link a template part', () => {
        const partId = '228eee93-db3e-42be-8c5b-9c24acdfde58';
        const part = Services.templateService.getPartById(partId, 'HAS');
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        templateLinker.setTemplate(part);
        const linked = templateLinker.link();
        console.log(JSON.stringify(linked, null, 2));
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        templateLinker.setTemplate(template);
        const linked = templateLinker.link();
    });
    it('should link a template part to a template part', () => {
        const childTemplatePartId = '228eee93-db3e-42be-8c5b-9c24acdfde58';
        const childTemplatePart = Services.templateService.getPartById(childTemplatePartId, 'HAS');
        const parentTemplatePartId = 'a36b3b33-a94b-4c36-81ca-674cb6dc9565';
        const parentTemplatePart = Services.templateService.getOrphanTemplateById(parentTemplatePartId);
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        const linked = templateLinker.linkTemplatePartToTemplatePart(parentTemplatePart, childTemplatePart);
        expect(linked.template._id).toEqual(childTemplatePartId);
        expect(linked.template._part).toEqual('LPAEmail');
        expect(linked.template._content.LPAEmail.id).toEqual(childTemplatePartId);
        expect(linked.template._content.LPAEmail.extends).toEqual('Email');
        expect(linked.template._content.LPAEmail.page).toEqual('Page1');
        expect(linked.template._content.LPAEmail.section).toEqual('Section1');
        expect(linked.template._content.LPAEmail.template).toEqual('HAS');
        expect(linked.template._content.LPAEmail.type).toEqual('object');
        expect(linked.template._content.LPAEmail.properties.api.type).toEqual('object');
        expect(linked.template._content.LPAEmail.properties.api.properties.inputmode.type).toEqual('string');
        expect(linked.template._content.LPAEmail.properties.api.properties.inputmode.value).toEqual('email');
        expect(linked.template._content.LPAEmail.properties.api.properties.value.type).toEqual('object');
        expect(linked.template._content.LPAEmail.properties.api.properties.value.properties.pattern.type).toEqual('string');
        expect(linked.template._content.LPAEmail.properties.api.properties.value.properties.pattern.value).toEqual("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        expect(linked.template._content.LPAEmail.properties.api.properties.value.properties['x-errorMessage'].type).toEqual('string');
        expect(linked.template._content.LPAEmail.properties.api.properties.value.properties['x-errorMessage'].value).toEqual('Enter an email address in the correct format, like name@example.com');
        expect(linked.template._content.LPAEmail.properties.api.properties.label.text.value).toEqual('Enter your email address');
        expect(linked.template._content.LPAEmail.properties.api.properties.label.isPageHeading.value).toEqual(true);
        expect(linked.template._content.LPAEmail.properties.api.properties.hint.value).toEqual("We'll send an access code to this address, if you have an account");
    });
    it('should link a template to a template', () => {
        const parentTemplateId = 'ee9ec28b-df53-4de7-ac63-9495968ac984';
        const childTemplateId = 'e7b6dae8-7297-454c-8004-5eb869abea92';
        const parentTemplate = Services.templateService.getTemplateById(parentTemplateId);
        const childTemplate = Services.templateService.getTemplateById(childTemplateId);
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        const linked = templateLinker.linkTemplateToTemplate(parentTemplate, childTemplate);
    });
});