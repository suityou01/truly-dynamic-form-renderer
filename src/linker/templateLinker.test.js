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
        //console.log(JSON.stringify(linked, null, 2));
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        templateLinker.setTemplate(template);
        const linked = templateLinker.link();
    });
});