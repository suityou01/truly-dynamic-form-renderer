require("../services");
require("../factories");
const Linker = require("./linker");
describe('./src/linker/templateLinker.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const linker = new Linker();
        linker.setLinkableObject(template);
        linker.link();
    });
    it('should link a metadata object', () => {
        const metaData = Services.metaDataService.getMetaData('AccessibleFormElement');
        const linker = new Linker();
        linker.setLinkableObject(metaData);
        linker.link();
    })
});