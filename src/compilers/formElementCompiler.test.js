const FormElementCompiler = require("./formElementCompiler");

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

const metadata = {
    file: 'govukInput.yaml',
    meta: {
      _name: 'GovukInput',
      _extends: 'BaseFormElement',
      _macro_file: 'govuk/components/input/macro.njk',
      _import: 'govukInput',
      _api: {
        id: { type: 'string' },
        name: { type: 'string' },
        label: {
          text: { type: 'string', default: 'What is the name of the event?' },
          classes: { type: 'string', default: 'govuk-label--l' },
          isPageHeading: { type: 'boolean', default: true }
        }
      }
    }
};

const compiled = {
    file: 'govukInput.yaml',
    meta: {
      _name: 'GovukInput',
      _extends: 'BaseFormElement',
      _macro_file: 'govuk/components/input/macro.njk',
      _import: 'govukInput',
      _api: {
        id: { type: 'string' },
        name: { type: 'string' },
        label: {
          text: { type: 'string', default: 'What is the name of the event?' },
          classes: { type: 'string', default: 'govuk-label--l' },
          isPageHeading: { type: 'boolean', default: true }
        }
      }
    },
    values: {
        id: 'code',
        name: 'code',
        label: {
            text: 'Please enter the code that was sent to you by email',
            isPageHeading: false
        }
    }
}

describe('goukInput', () => {
    it('should compile a template and metadata', () => {
        const formElementCompiler = new FormElementCompiler();
        const compiledFormElement = formElementCompiler.compile(template, metadata);
        expect(compiledFormElement.values).toEqual(compiled.values);
        //console.log(compiledFormElement);
    });
});