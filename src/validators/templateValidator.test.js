require("../services");
require("../factories");

const TemplateValidator = require("./templateValidator");

describe('./src/validators/templateValidator.js', () => {
    beforeAll(() => {
        Services.metaDataService.loadAllMetaData();
    })
    it('should validate a valid template', () => {
        const metadatafile = Services.metaDataService.getMetaData('GovukInput');
        console.log(metadatafile);
        const template = {
            FormElement:{
                extends: 'GovukInput',
                values: {
                    label: {
                        text: "Please enter the code that was sent to you by email",
                        isPageHeading: false
                    },
                    id: 'code',
                    name: 'code'
                }
            }
        };
        const result = TemplateValidator.validate(template, metadatafile.meta);
        console.log(result);
    });
});