require("../services");
require("../factories");
const MetaDataFactory = require("../factories/metaDataFactory");
const metaDataService = Services.metaDataService;

describe('./src/factories/metaDataFactory.js', () => {
    describe('build', () => {
        it('should build a metadata object', () => {
            const metaDataFile = '../meta/inputs/govukInput.yaml';
            metaDataService.loadAllMetaData();
            const yaml = metaDataService.loadMetaData(metaDataFile);
            const metaDataFactory = new MetaDataFactory(yaml);
            const metaDataObject = metaDataFactory.build();
            expect(metaDataObject.name).toEqual('GovukInput');
            expect(metaDataObject._api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
            expect(metaDataObject._api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
            expect(metaDataObject._api).toHaveProperty('label'); // <<---- defined on the metaDataObject
        });
        describe('Specific Meta data tests', () => {
            it('./src/inputs/baseInput.yaml', () => {
                const metaDataFile = '../meta/base/form/base_form_element.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('BaseFormElement');
                expect(metaDataObject.BaseFormElement).toHaveProperty('properties');
                expect(metaDataObject.BaseFormElement.properties).toHaveProperty('api');
                expect(metaDataObject.BaseFormElement.properties.api).toHaveProperty('id');
                expect(metaDataObject.BaseFormElement.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseFormElement.properties.api).toHaveProperty('name');
                expect(metaDataObject.BaseFormElement.properties.api.name).toHaveProperty('type', 'string');
            });
            it('./src/inputs/govukButton.yaml', () => {
                const metaDataFile = '../meta/inputs/govukButton.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                metaDataFactory.getParentMetaData = jest.fn();
                metaDataFactory.getParentMetaData.mockReturnValue({
                    "_name": "BaseFormElement",
                    "BaseFormElement": {
                      "properties": {
                        "api": {
                          "id": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          }
                        }
                      }
                    }
                });
                const metaDataObject = metaDataFactory.build();
                const name = metaDataObject._name;
                expect(metaDataObject).toHaveProperty('_name', 'GovukButton');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/button/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukButton');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukButton.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukButton.properties.api.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('element'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.element).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('text'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.text).toHaveProperty('default', 'Save and continue');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('html'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('type'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.type).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('value'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('disabled'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.disabled).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('href'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('classes'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('attributes'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.attributes).toHaveProperty('type', ['object', 'any']);
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('preventDoubleClick'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.preventDoubleClick).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton.properties.api).toHaveProperty('isStartButton'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.isStartButton).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton).toHaveProperty('additionalProperties', false);
            });
            it('./src/inputs/govukInput.yaml', () => {
                const metaDataFile = '../meta/inputs/govukInput.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                metaDataFactory.getParentMetaData = jest.fn();
                metaDataFactory.getParentMetaData.mockReturnValue({
                    "_name": "BaseFormElement",
                    "BaseFormElement": {
                      "properties": {
                        "api": {
                          "id": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          }
                        }
                      }
                    }
                });
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukInput');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/input/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukInput');
                expect(metaDataObject.GovukInput.properties.api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukInput.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput.properties.api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukInput.properties.api.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput.properties.api).toHaveProperty('type'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.type).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('inputmode');
                expect(metaDataObject.GovukInput.properties.api.properties.inputmode).toHaveProperty('type', 'string'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.inputmode).toHaveProperty('enum');
                expect(metaDataObject.GovukInput.properties.api.properties.inputmode.enum).toEqual(["none", "text", "decimal", "numeric", "tel", "search", "email", "url"]);
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('value'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('disabled'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.disabled).toHaveProperty('type', 'boolean'); 
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('describedBy'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.describedBy).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('label'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.label).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukInput.properties.api.properties.label).toHaveProperty('properties');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties).toHaveProperty('text');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties.text).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties.classes).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties.classes).toHaveProperty('default','govuk-label--l');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties).toHaveProperty('isPageHeading');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties.isPageHeading).toHaveProperty('type','boolean');
                expect(metaDataObject.GovukInput.properties.api.properties.label.properties.isPageHeading).toHaveProperty('default',true);
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('hint'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukInput.properties.api.properties.hint).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukInput.properties.api.properties.hint).toHaveProperty('properties');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties).toHaveProperty('text');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.text).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties).toHaveProperty('html');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.html).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties).toHaveProperty('id');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.id).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.classes).toHaveProperty('type','string');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.attributes.patternProperties['^.*$']).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput).toHaveProperty('additionalProperties', false);
            });
        });
    });
});