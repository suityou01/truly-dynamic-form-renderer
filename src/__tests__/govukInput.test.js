const FormElementRenderer = require("../renderers/formElementRenderer");

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
    it('should get import from metadata', () => {
        const formElementRenderer = new FormElementRenderer();
        const importString = formElementRenderer.getImport(compiled);
        expect(importString).toEqual('govukInput');
    });
    it('should get macro file from metadata', () => {
        const formElementRenderer = new FormElementRenderer();
        const importString = formElementRenderer.getFrom(compiled);
        expect(importString).toEqual('govuk/components/input/macro.njk');
    });
    it('should render import line', () => {
        const formElementRenderer = new FormElementRenderer();
        const importLine = formElementRenderer.renderImportLine(compiled);
        expect(importLine).toEqual('{% from "govuk/components/input/macro.njk" import govukInput %}');
    });
});