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
                expect(metaDataObject.BaseFormElement.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.BaseFormElement.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseFormElement.properties.api.properties).toHaveProperty('name');
                expect(metaDataObject.BaseFormElement.properties.api.properties.name).toHaveProperty('type', 'string');
            });
            it('./src/meta/form/base/base_form.yaml', () => {
                const metaDataFile = '../meta/base/form/base_form.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('BaseForm');
                expect(metaDataObject.BaseForm).toHaveProperty('properties');
                expect(metaDataObject.BaseForm.properties).toHaveProperty('api');
                expect(metaDataObject.BaseForm.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.BaseForm.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseForm.properties.api.properties.id).toHaveProperty('format', 'uuid');
                expect(metaDataObject.BaseForm.properties.api.properties).toHaveProperty('name');
                expect(metaDataObject.BaseForm.properties.api.properties.name).toHaveProperty('type', 'string');
                expect(metaDataObject.BaseForm.properties.api.properties).toHaveProperty('url');
                expect(metaDataObject.BaseForm.properties.api.properties.url).toHaveProperty('type', 'string');
            });
            it('./src/inputs/govukButton.yaml', () => {
                const metaDataFile = '../meta/inputs/govukButton.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                const name = metaDataObject._name;
                expect(metaDataObject).toHaveProperty('_name', 'GovukButton');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/button/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukButton');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('element'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.element).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('text'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties.text).toHaveProperty('default', 'Save and continue');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('html'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('type'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.type).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('value'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('disabled'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.disabled).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('href'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('classes'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukButton.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukButton.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukButton.properties.api.properties.attributes.patternProperties['^\\w$']).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('preventDoubleClick'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.preventDoubleClick).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton.properties.api.properties).toHaveProperty('isStartButton'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukButton.properties.api.properties.isStartButton).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukButton).toHaveProperty('additionalProperties', false);
            });
            it('./src/inputs/govukInput.yaml', () => {
                const metaDataFile = '../meta/inputs/govukInput.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukInput');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/input/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukInput');
                expect(metaDataObject.GovukInput.properties.api.properties).toHaveProperty('type'); // <<---- defined on the metaDataObject
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
                expect(metaDataObject.GovukInput.properties.api.properties.hint.properties.attributes.patternProperties['^\\w$']).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukInput).toHaveProperty('additionalProperties', false);
            });
            it('./src/inputs/govukCheckboxes.yaml', () => {
                const metaDataFile = '../meta/inputs/govukCheckboxes.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukCheckboxes');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/checkboxes/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukCheckboxes');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('describedBy'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.describedBy).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('fieldset'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.fieldset).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.fieldset).toHaveProperty('extends', 'govukFieldset');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('hint'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.hint).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.hint).toHaveProperty('extends', 'Hint');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('errorMessage'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.errorMessage).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.errorMessage).toHaveProperty('extends', 'GovukErrorMessage');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('formGroup'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.formGroup).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('idPrefix'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.idPrefix).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties).toHaveProperty('items'); // <<---- defined on the metaDataObject
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items).toHaveProperty('item');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('text');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('id');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('name');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.name).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('value');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('label');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('text');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('for');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.for).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('isPageHeading');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.isPageHeading).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.label.properties.attributes.patternProperties['^.*$']).toHaveProperty("type", "string");
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('hint');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.hint).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.hint).toHaveProperty('extends', 'Hint');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('divider');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.divider).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('checked');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.checked).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('conditional');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.conditional).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.conditional).toHaveProperty('properties');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.conditional.properties).toHaveProperty('html');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.conditional.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('behaviour');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.behaviour).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('disabled');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.disabled).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukCheckboxes.properties.api.properties.items.item.properties.attributes.patternProperties['^.*$']).toHaveProperty("type", "string");
                expect(metaDataObject.GovukCheckboxes).toHaveProperty('additionalProperties', false);
            });
            it('./src/inputs/govukSelect.yaml', () => {
                const metaDataFile = '../meta/inputs/govukSelect.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukSelect');
                expect(metaDataObject).toHaveProperty('_extends', 'BaseFormElement');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/select/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukSelect');
                expect(metaDataObject.GovukSelect.properties.api.properties).toHaveProperty('label');
                expect(metaDataObject.GovukSelect.properties.api.properties.label).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.properties.label.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.label.text).toHaveProperty('default', 'What is the name of the event?');
                expect(metaDataObject.GovukSelect.properties.api.properties).toHaveProperty('hint');
                expect(metaDataObject.GovukSelect.properties.api.properties.hint).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.properties.hint.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties).toHaveProperty('items');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('item');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('item');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item).toHaveProperty('value');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item.value).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item).toHaveProperty('text');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item).toHaveProperty('selected');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.item.selected).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('datasource');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.datasource).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.datasource).toHaveProperty('enum');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.datasource.enum[0]).toEqual('rest');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.datasource.enum[1]).toEqual('template');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('url');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.url).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('method');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.method).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.method).toHaveProperty('default', 'GET');
                expect(metaDataObject.GovukSelect.properties.api.properties.items).toHaveProperty('jsonPath');
                expect(metaDataObject.GovukSelect.properties.api.properties.items.jsonPath).toHaveProperty('type', 'string');
            });
            it('./src/meta/content/govukHeader.yaml', () => {
                const metaDataFile = '../meta/content/govukHeader.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukHeader');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/header/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukHeader');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('homepageUri');
                expect(metaDataObject.GovukHeader.properties.api.properties.homepageUri).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties.homepageUri).toHaveProperty('default', '/');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('assetsPath');
                expect(metaDataObject.GovukHeader.properties.api.properties.assetsPath).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties.assetsPath).toHaveProperty('default', '/assets/images');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('productName');
                expect(metaDataObject.GovukHeader.properties.api.properties.productName).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('serviceName');
                expect(metaDataObject.GovukHeader.properties.api.properties.serviceName).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('serviceUri');
                expect(metaDataObject.GovukHeader.properties.api.properties.serviceUri).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('navigation');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation).toHaveProperty('item');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item).toHaveProperty('properties');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties).toHaveProperty('text');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties).toHaveProperty('html');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties).toHaveProperty('href');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties).toHaveProperty('active');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.active).toHaveProperty('type', 'boolean');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigation.item.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('navigationClasses');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigationClasses).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('navigationLabel');
                expect(metaDataObject.GovukHeader.properties.api.properties.navigationLabel).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('menuButtonLabel');
                expect(metaDataObject.GovukHeader.properties.api.properties.menuButtonLabel).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('containerClasses');
                expect(metaDataObject.GovukHeader.properties.api.properties.containerClasses).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukHeader.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukHeader.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukHeader.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukHeader.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukHeader.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
            });
            it('./src/meta/content/govukFooter.yaml', () => {
                const metaDataFile = '../meta/content/govukFooter.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukFooter');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/footer/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukFooter');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('meta');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties).toHaveProperty('visuallyHiddenTitle');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.visuallyHiddenTitle).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties).toHaveProperty('html');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties).toHaveProperty('text');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties).toHaveProperty('items');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items).toHaveProperty('item');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item).toHaveProperty('text');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item).toHaveProperty('href');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item).toHaveProperty('attributes');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukFooter.properties.api.properties.meta.properties.items.item.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('navigation');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties).toHaveProperty('title');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.title).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties).toHaveProperty('columns');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.columns).toHaveProperty('type', 'integer');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties).toHaveProperty('width');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.width).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties).toHaveProperty('items');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items).toHaveProperty('type', 'array');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items).toHaveProperty('item');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item).toHaveProperty('text');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item).toHaveProperty('href');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item).toHaveProperty('attributes');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukFooter.properties.api.properties.navigation.properties.items.item.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('contentLicence');
                expect(metaDataObject.GovukFooter.properties.api.properties.contentLicence).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.contentLicence.properties).toHaveProperty('text');
                expect(metaDataObject.GovukFooter.properties.api.properties.contentLicence.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties.contentLicence.properties).toHaveProperty('html');
                expect(metaDataObject.GovukFooter.properties.api.properties.contentLicence.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('containerClasses');
                expect(metaDataObject.GovukFooter.properties.api.properties.containerClasses).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukFooter.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFooter.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukFooter.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFooter.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukFooter.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                
            });
            it('./src/meta/content/govukBackLink.yaml', () => {

                const metaDataFile = '../meta/content/govukBackLink.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukBackLink');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/back-link/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukBackLink');
                expect(metaDataObject.GovukBackLink.properties.api.properties).toHaveProperty('text');
                expect(metaDataObject.GovukBackLink.properties.api.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukBackLink.properties.api.properties).toHaveProperty('html');
                expect(metaDataObject.GovukBackLink.properties.api.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukBackLink.properties.api.properties).toHaveProperty('href');
                expect(metaDataObject.GovukBackLink.properties.api.properties.href).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukBackLink.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukBackLink.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukBackLink.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukBackLink.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukBackLink.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukBackLink.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                
            });
            it('./src/meta/content/govukErrorMessage.yaml', () => {

                const metaDataFile = '../meta/content/govukErrorMessage.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukErrorMessage');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/error-message/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukErrorMessage');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('text');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('html');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');             
                expect(metaDataObject.GovukErrorMessage.properties.api.properties).toHaveProperty('visuallyHiddentext');
                expect(metaDataObject.GovukErrorMessage.properties.api.properties.visuallyHiddentext).toHaveProperty('type', 'string');
                
            });
            it('./src/meta/content/hint.yaml', () => {
                
                const metaDataFile = '../meta/content/hint.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'Hint');
                expect(metaDataObject.Hint.properties.api.properties).toHaveProperty('text');
                expect(metaDataObject.Hint.properties.api.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.Hint.properties.api.properties).toHaveProperty('html');
                expect(metaDataObject.Hint.properties.api.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.Hint.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.Hint.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.Hint.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.Hint.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.Hint.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.Hint.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.Hint.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.Hint.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');             
                             
            });
            it('./src/meta/content/legend.yaml', () => {
                
                const metaDataFile = '../meta/content/legend.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'Legend');
                expect(metaDataObject.Legend.properties.api.properties).toHaveProperty('text');
                expect(metaDataObject.Legend.properties.api.properties.text).toHaveProperty('type', 'string');
                expect(metaDataObject.Legend.properties.api.properties).toHaveProperty('html');
                expect(metaDataObject.Legend.properties.api.properties.html).toHaveProperty('type', 'string');
                expect(metaDataObject.Legend.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.Legend.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.Legend.properties.api.properties).toHaveProperty('isPageHeading');
                expect(metaDataObject.Legend.properties.api.properties.isPageHeading).toHaveProperty('type', 'boolean');
                             
            });
            it('./src/meta/containers/formGroup.yaml', () => {
                
                const metaDataFile = '../meta/containers/formGroup.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject.FormGroup.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.FormGroup.properties.api.properties.classes).toHaveProperty('type', 'string');
                             
            });
            it('./src/meta/containers/govukFieldset.yaml', () => {

                const metaDataFile = '../meta/containers/govukFieldset.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject).toHaveProperty('_name', 'GovukFieldset');
                expect(metaDataObject).toHaveProperty('_macro_file', 'govuk/components/fieldset/macro.njk');
                expect(metaDataObject).toHaveProperty('_import', 'govukFieldset');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('describedBy');
                expect(metaDataObject.GovukFieldset.properties.api.properties.describedBy).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('legend');
                expect(metaDataObject.GovukFieldset.properties.api.properties.legend).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFieldset.properties.api.properties.legend).toHaveProperty('extends');
                expect(metaDataObject.GovukFieldset.properties.api.properties.legend.extends).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFieldset.properties.api.properties.legend.extends).toHaveProperty('const', 'Legend');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('classes');
                expect(metaDataObject.GovukFieldset.properties.api.properties.classes).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('role');
                expect(metaDataObject.GovukFieldset.properties.api.properties.role).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('attributes');
                expect(metaDataObject.GovukFieldset.properties.api.properties.attributes).toHaveProperty('type', 'object');
                expect(metaDataObject.GovukFieldset.properties.api.properties.attributes).toHaveProperty('patternProperties');
                expect(metaDataObject.GovukFieldset.properties.api.properties.attributes.patternProperties["^.*$"]).toHaveProperty('type', 'string');
                expect(metaDataObject.GovukFieldset.properties.api.properties).toHaveProperty('html');
                expect(metaDataObject.GovukFieldset.properties.api.properties.html).toHaveProperty('type', 'string');
                             
            });
            it('./src/meta/containers/page.yaml', () => {

                const metaDataFile = '../meta/containers/page.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.Page.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.Page.properties.api.properties.id).toHaveProperty('format', 'uuid');
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('section');
                expect(metaDataObject.Page.properties.api.properties.section).toHaveProperty('type', 'string');
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('extends');
                expect(metaDataObject.Page.properties.api.properties.extends).toHaveProperty('type', 'string');
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('title');
                expect(metaDataObject.Page.properties.api.properties.title).toHaveProperty('type', 'string');
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('header');
                expect(metaDataObject.Page.properties.api.properties.header).toHaveProperty('type', 'object');
                expect(metaDataObject.Page.properties.api.properties.header).toHaveProperty('extends', 'GovukHeader');
                expect(metaDataObject.Page.properties.api.properties).toHaveProperty('footer');
                expect(metaDataObject.Page.properties.api.properties.footer).toHaveProperty('type', 'object');
                expect(metaDataObject.Page.properties.api.properties.footer).toHaveProperty('extends', 'GovukFooter');
                
            });
            it('./src/meta/containers/template.yaml', () => {

                const metaDataFile = '../meta/containers/template.yaml';
                const yaml = metaDataService.loadMetaData(metaDataFile);
                const metaDataFactory = new MetaDataFactory(yaml);
                const metaDataObject = metaDataFactory.build();
                expect(metaDataObject.Template.properties.api.properties).toHaveProperty('extends');
                expect(metaDataObject.Template.properties.api.properties.extends).toHaveProperty('type', 'string');
                expect(metaDataObject.Template.properties.api.properties).toHaveProperty('name');
                expect(metaDataObject.Template.properties.api.properties.name).toHaveProperty('type', 'string');
                expect(metaDataObject.Template.properties.api.properties).toHaveProperty('id');
                expect(metaDataObject.Template.properties.api.properties.id).toHaveProperty('type', 'string');
                expect(metaDataObject.Template.properties.api.properties.id).toHaveProperty('format', 'uuid');
                
            });
        });
    });
});