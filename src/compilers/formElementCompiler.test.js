require("../services");
require("../factories");

const FormElementCompiler = require("./formElementCompiler");
describe('goukInput', () => {
  beforeAll(() => {
    Services.metaDataService.loadAllMetaData();
    Services.templateService.loadAllTemplates();
  });
  it('should compile a template and metadata', () => {
      const formElementCompiler = new FormElementCompiler();
      const template = Services.templateService.getTemplateByTemplateObjectName('HAS');
      console.log(template);
      // const compiledFormElement = formElementCompiler.compile(template, metadata);
      // expect(compiledFormElement.values).toEqual(compiled.values);
      // console.log(compiledFormElement);
  });
});