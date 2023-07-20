const FormElementFactory = require("./formElementFactory");

describe('./src/factories/formElementFactory', () => {
    describe('Build', () => {
        it('should build simple form element', () => {
            const metaData = {
                file: 'govukInput.yaml',
                meta: {
                    _name: 'GovukInput',
                    _extends: 'BaseFormElement',
                    _macro_file: 'govuk/components/input/macro.njk',
                    _import: 'govUKInput',
                    _api: { 
                        label: {
                            text: { 
                                type: "string",
                                default: "What is the name of the event?"
                            },
                            classes: {
                                type: "string",
                                default: "govuk-label--l"
                            },
                            isPageHeading: {
                                type: "boolean",
                                default: true
                            }
                        } 
                    }
                }
            };
            const formElementFactory = new FormElementFactory(metaData);
            formElementFactory.build();

        });
    });
});