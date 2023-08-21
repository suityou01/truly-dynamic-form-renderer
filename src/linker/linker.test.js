require("../services");
require("../factories");
const Linker = require("./linker");
describe('./src/linker/templateLinker.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
        Services.templateService.collateTemplateParts();
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const linker = new Linker();
        linker.setLinkableObject(template);
        const linked = linker.link();
    });
    it('should link a metadata object', () => {
        const metaData = Services.metaDataService.getMetaData('AccessibleFormElement');
        const linker = new Linker();
        linker.setLinkableObject(metaData);
        const linked = linker.link();
    });
    it('should link a template part', () => {
        const templateId = 'ee9ec28b-df53-4de7-ac63-9495968ac984';
        const partName = 'LPAEmail';
        const part = Services.templateService.getPartByNameAndTemplateId(partName, templateId);
        const linker = new Linker();
        linker.setLinkableObject(part)
        const linked = linker.link();
        console.log(JSON.stringify(linked, null, 2));
    });
});