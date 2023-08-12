require("../services");
require("../factories");
const RenderTemplateService = require("./renderTemplateService");

describe('renderTemplateService.js', () => {
    describe('Rendering examples', () => {
        let renderTemplateService;
        beforeAll(() => {
            Services.metaDataService.loadAllMetaData();
            Services.templateService.loadAllTemplates();
            renderTemplateService = new RenderTemplateService();
        });
        describe('Intrinsics', () => {
            it('govUKButton', () => {
                const templateId = '99708c4e-c109-430a-bcb1-729766cc72e6';
                const template = Services.templateService.getOrphanTemplateById(templateId);
                expect(template).toBeTruthy;
                // renderTemplateService.render(template);
            });
        });
    });
});