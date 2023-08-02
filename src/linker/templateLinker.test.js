require("../services");
require("../factories");
const TemplateLinker = require("./templateLinker");
const MetaDataLinker = require("./metaDataLinker");
describe('./src/linker/templateLinker.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
    });
    it('should link a Page object', () => {
        const pageId = '8b148a5d-d37e-414a-a71b-08017681b0d0';
        const template = Services.templateService.getPartById(pageId, 'HAS');
        const metaDataLinker = new MetaDataLinker();
        const templateLinker = new TemplateLinker(metaDataLinker);
        templateLinker.setTemplate(template.template);
        const linked = templateLinker.link();
        console.log(JSON.stringify(linked, null, 2));
    });
});