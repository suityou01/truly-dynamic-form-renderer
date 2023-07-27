require("../services");
require("../factories");

const TemplateService = require("./templateService");

describe('./src/servics/templateService.js', () => {
    it('should load all templates', () => {
        const ts = new TemplateService();
        ts.loadAllTemplates();
        expect(Array.isArray(ts._templates)).toEqual(true);
        expect(ts._templates.length > 0).toEqual(true);
        expect(ts._invalidTemplates.length).toEqual(0);
    });
});