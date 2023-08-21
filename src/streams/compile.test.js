require("../services");
require("../factories");

const CompileStream = require("./compile");
const compileStream = new CompileStream({ objectMode: true });

const chunk = {
    templateId: 'ee9ec28b-df53-4de7-ac63-9495968ac984',
    sectionId: '234ae48f-451d-4222-8805-8fd96e9564ff',
    pageId: '8b148a5d-d37e-414a-a71b-08017681b0d0',
    fields: [ { name: 'LPAEmail', type: 'field', value: 'Hello\r\n' } ],
    files: []
};

describe('./src/streams/compile.js', () => {
    beforeAll(()=>{
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
        Services.templateService.collateTemplateParts();
    });
    it('should ', () => {
        compileStream._chunk = chunk;
        compileStream.compile();
    });
});