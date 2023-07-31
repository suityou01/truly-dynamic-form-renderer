require("../services");
require("../factories");
const TemplateLinker = require("./templateLinker");
describe('./src/linker/templateLinker.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const templateLinker = new TemplateLinker();
        templateLinker.setTemplate(template.template);
        templateLinker.link();
    });
    it('should link a Metadata object with its parent', () => {
        const metadata = Services.metaDataService.getMetaData('AccessibleFormElement');
        console.log(metadata);
    })
});