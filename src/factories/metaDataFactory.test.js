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
            expect(metaDataObject._name).toEqual('GovukInput');
            expect(metaDataObject.GovukInput.properties.api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
            expect(metaDataObject.GovukInput.properties.api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
            expect(metaDataObject.GovukInput.properties.api).toHaveProperty('type', 'object'); // <<---- defined on the metaDataObject
            expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('label'); // <<---- defined on the metaDataObject
        });
        describe('Specific Meta data tests', () => {
            it('./src/meta/form/base/base_form_element.yaml', () => {
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
            it('./src/meta/form/base/base_form.yaml', () => {
                const metaDataFile = '../meta/base/form/base_form.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('BaseForm');
                expect(metaDataObject.BaseForm).toHaveProperty('properties');
                expect(metaDataObject.BaseForm.properties).toHaveProperty('api');
                expect(metaDataObject.BaseForm.properties.api).toHaveProperty('id');
                expect(metaDataObject.BaseForm.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseForm.properties.api.id).toHaveProperty('format', 'uuid');
                expect(metaDataObject.BaseForm.properties.api).toHaveProperty('name');
                expect(metaDataObject.BaseForm.properties.api.name).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseForm.properties.api).toHaveProperty('url');
                expect(metaDataObject.BaseForm.properties.api.url).toHaveProperty('type', 'string');
            });
            it('./src/inputs/govukButton.yaml', () => {
                const metaDataFile = '../meta/inputs/govukButton.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                metaDataFactory.getParentMetaData = jest.fn();
                metaDataFactory.getParentMetaData.mockReturnValue({
                    "meta": {
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
                    "meta": {
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
            it('./src/inputs/govukCheckboxes.yaml', () => {
                const metaDataFile = '../meta/inputs/govukCheckboxes.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                metaDataFactory.getParentMetaData = jest.fn();
                metaDataFactory.getParentMetaData.mockReturnValue({
                    "meta": {
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
                    }
                });
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukCheckboxes');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/checkboxes/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukCheckboxes');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukCheckboxes.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukCheckboxes.properties.api.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('describedBy'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.describedBy).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('fieldset'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.fieldset).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.fieldset).toHaveProperty('extends', 'govukFieldset');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('hint'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.hint).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.hint).toHaveProperty('extends', 'Hint');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('errorMessage'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.errorMessage).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.errorMessage).toHaveProperty('extends', 'GovukErrorMessage');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('formGroup'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.formGroup).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('idPrefix'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.idPrefix).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api).toHaveProperty('items'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukCheckboxes.properties.api.items).toHaveProperty('item');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('text');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('id');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('name');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('value');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('label');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('text');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('for');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.for).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('isPageHeading');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.isPageHeading).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.label.properties.attributes.patternProperties['^.*$']).toHaveProperty("type", "string");
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('hint');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.hint).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.hint).toHaveProperty('extends', 'Hint');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('divider');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.divider).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('checked');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.checked).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('conditional');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.conditional).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.conditional).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.conditional.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.conditional.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('behaviour');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.behaviour).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('disabled');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.disabled).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukCheckboxes.properties.api.items.item.properties.attributes.patternProperties['^.*$']).toHaveProperty("type", "string");
                expect(metaDataObject.GovukCheckboxes).toHaveProperty('additionalProperties', false);
            });
            it('./src/inputs/govukSelect.yaml', () => {
                const metaDataFile = '../meta/inputs/govukSelect.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                metaDataFactory.getParentMetaData = jest.fn();
                metaDataFactory.getParentMetaData.mockReturnValue({
                    "meta": {
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
                    }
                });
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukSelect');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/select/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukSelect');
                expect(metaDataObject.GovukSelect.properties.api).toHaveProperty('id');   // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukSelect.properties.api.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api).toHaveProperty('name'); // <<---- inherited from BaseFormElement
                expect(metaDataObject.GovukSelect.properties.api.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api).toHaveProperty('label');
                expect(metaDataObject.GovukSelect.properties.api.label).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.label.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.label.text).toHaveProperty('default', 'What is the name of the event?');
                expect(metaDataObject.GovukSelect.properties.api).toHaveProperty('hint');
                expect(metaDataObject.GovukSelect.properties.api.hint).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.hint.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api).toHaveProperty('items');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('item');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('item');
                expect(metaDataObject.GovukSelect.properties.api.items.item).toHaveProperty('value');
                expect(metaDataObject.GovukSelect.properties.api.items.item.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.items.item).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.items.item.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.items.item).toHaveProperty('selected');
                expect(metaDataObject.GovukSelect.properties.api.items.item.selected).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('datasource');
                expect(metaDataObject.GovukSelect.properties.api.items.datasource).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.items.datasource).toHaveProperty('enum');
                expect(metaDataObject.GovukSelect.properties.api.items.datasource.enum[0]).toEqual('rest');
                expect(metaDataObject.GovukSelect.properties.api.items.datasource.enum[1]).toEqual('template');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('url');
                expect(metaDataObject.GovukSelect.properties.api.items.url).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('method');
                expect(metaDataObject.GovukSelect.properties.api.items.method).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.items.method).toHaveProperty('default', 'GET');
                expect(metaDataObject.GovukSelect.properties.api.items).toHaveProperty('jsonPath');
                expect(metaDataObject.GovukSelect.properties.api.items.jsonPath).toHaveProperty('type', 'string');
            });
            it('./src/meta/content/govukHeader.yaml', () => {
                const metaDataFile = '../meta/content/govukHeader.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukHeader');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/header/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukHeader');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('homepageUri');
                expect(metaDataObject.GovukHeader.properties.api.homepageUri).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.homepageUri).toHaveProperty('default', '/');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('assetsPath');
                expect(metaDataObject.GovukHeader.properties.api.assetsPath).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.assetsPath).toHaveProperty('default', '/assets/images');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('productName');
                expect(metaDataObject.GovukHeader.properties.api.productName).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('serviceName');
                expect(metaDataObject.GovukHeader.properties.api.serviceName).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('serviceUri');
                expect(metaDataObject.GovukHeader.properties.api.serviceUri).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('navigation');
                expect(metaDataObject.GovukHeader.properties.api.navigation).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukHeader.properties.api.navigation).toHaveProperty('item');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item).toHaveProperty('properties');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties).toHaveProperty('text');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties).toHaveProperty('html');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties).toHaveProperty('href');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties).toHaveProperty('active');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.active).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukHeader.properties.api.navigation.item.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('navigationClasses');
                expect(metaDataObject.GovukHeader.properties.api.navigationClasses).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('navigationLabel');
                expect(metaDataObject.GovukHeader.properties.api.navigationLabel).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('menuButtonLabel');
                expect(metaDataObject.GovukHeader.properties.api.menuButtonLabel).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('containerClasses');
                expect(metaDataObject.GovukHeader.properties.api.containerClasses).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('classes');
                expect(metaDataObject.GovukHeader.properties.api.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api).toHaveProperty('attributes');
                expect(metaDataObject.GovukHeader.properties.api.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukHeader.properties.api.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
            });
        });
    });
});