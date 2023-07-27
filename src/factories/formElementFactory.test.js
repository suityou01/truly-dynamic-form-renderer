const FormElementFactory = require("./formElementFactory");

const metaData = {
    file: 'govukInput.yaml',
    meta: {
        _name: 'GovukInput',
        _extends: 'BaseFormElement',
        _macro_file: 'govuk/components/input/macro.njk',
        _import: 'govUKInput',
        _api: { 
            label: {
                type: Object,
                properties: {
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
    }
};

describe('./src/factories/formElementFactory', () => {
    describe('Build', () => {
        it('should build simple form element', () => {
            const formElementFactory = new FormElementFactory(metaData);
            const formElement = formElementFactory.build();
            console.log(formElement);
        });
    });
});