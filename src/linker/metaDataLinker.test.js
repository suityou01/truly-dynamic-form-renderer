require("../services");
require("../factories");

const MetaDataLinker = require("./metaDataLinker");
describe('./src/linker/metaDataLinker', () => {
    beforeAll(()=>{
        Services.metaDataService.loadAllMetaData();
        Services.templateService.loadAllTemplates();
        Services.templateService.collateTemplateParts();
    });
    it('should get inheritance chain', () => {
        const metaData = Services.metaDataService.getMetaData('GovukInput');
        const metaDataLinker = new MetaDataLinker();
        metaDataLinker.setMetaData(metaData);
        const inheritanceChain = metaDataLinker.getIneritanceChain();
        expect(inheritanceChain.length).toEqual(2);
        expect(inheritanceChain[0].file).toEqual('base_form_element.yaml');
        expect(inheritanceChain[1].file).toEqual('govukInput.yaml');
    });
    it('should get extended properties', () => {
        const page = Services.metaDataService.getMetaData('Page');
        const metaDataLinker = new MetaDataLinker();
        const extendedProperties = metaDataLinker.getExtendedProperties(page);
        expect(extendedProperties).toEqual([ 'header', 'footer' ]);
    });
    it('should link extended properties', () => {
        const page = Services.metaDataService.getMetaData('Page');
        const metaDataLinker = new MetaDataLinker();
        const linked = metaDataLinker.linkExtendedProperties(page);
        expect(linked.meta.Page.properties.api.properties.header.homepageUri.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.homepageUri.default).toEqual('/');
        expect(linked.meta.Page.properties.api.properties.header.assetsPath.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.assetsPath.default).toEqual('/assets/images');
        expect(linked.meta.Page.properties.api.properties.header.productName.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.serviceName.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.serviceUri.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.navigation.type).toEqual('array');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.html.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.href.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.active.type).toEqual('boolean');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.attributes.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.header.navigation.item.properties.attributes.patternProperties['^\\w$'].type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.visuallyHiddenTitle.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.html.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.items.type).toEqual('array');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.items.item.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.items.item.href.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.items.item.attributes.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.meta.properties.items.item.attributes.patternProperties['^\\w$'].type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.title.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.columns.type).toEqual('integer');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.width.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.items.type).toEqual('array');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.items.item.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.items.item.href.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.items.item.attributes.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.navigation.properties.items.item.attributes.patternProperties['^\\w$'].type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.contentLicence.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.contentLicence.properties.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.contentLicence.properties.html.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.copyright.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.copyright.properties.text.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.copyright.properties.html.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.containerClasses.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.classes.type).toEqual('string');
        expect(linked.meta.Page.properties.api.properties.footer.attributes.type).toEqual('object');
        expect(linked.meta.Page.properties.api.properties.footer.attributes.patternProperties['^\\w$'].type).toEqual('string');
    });
    it('should link parent meta data to child meta', () => {
        const parent = Services.metaDataService.getMetaData('BaseFormElement');
        const child = Services.metaDataService.getMetaData('GovukInput');
        const metaDataLinker = new MetaDataLinker();
        const linked = metaDataLinker.linkMetaDataToMetaData(parent, child);
        expect(linked.meta.GovukInput.properties.api.properties.id.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.name.type).toEqual("string");
        expect(linked.meta._macro_file).toEqual('govuk/components/input/macro.njk');
        expect(linked.meta._import).toEqual('govukInput');
    });
    it('should link parent meta data to child template part', () => {
        const parent = Services.metaDataService.getMetaData('GovukInput');
        const child = Services.templateService.getOrphanTemplateById('a36b3b33-a94b-4c36-81ca-674cb6dc9565');
        const metaDataLinker = new MetaDataLinker();
        const linked = metaDataLinker.linkMetaDataToPart(parent, child);
        expect(linked.template._import).toEqual('govukInput');
        expect(linked.template._macro_file).toEqual('govuk/components/input/macro.njk');
        expect(linked.template._content.Email.properties.api.properties.disabled.type).toEqual('boolean');
        expect(linked.template._content.Email.properties.api.properties.describedBy.type).toEqual('string');
        expect(linked.template._content.Email.properties.api.properties.label.type).toEqual('object');
        expect(linked.template._content.Email.properties.api.properties.label.properties.text.type).toEqual('string');
        expect(linked.template._content.Email.properties.api.properties.label.properties.text.default).toEqual('What is the name of the event?');
        expect(linked.template._content.Email.properties.api.properties.label.properties.classes.type).toEqual('string');
        expect(linked.template._content.Email.properties.api.properties.label.properties.classes.default).toEqual('govuk-label--l');
        expect(linked.template._content.Email.properties.api.properties.label.properties.isPageHeading.type).toEqual('boolean');
        expect(linked.template._content.Email.properties.api.properties.label.properties.isPageHeading.default).toEqual(true);
        expect(linked.template._content.Email.properties.api.properties.hint.type).toEqual('object');
    });
    it('should link parent meta data to child template', () => {
        
        const parent = Services.metaDataService.getMetaData('Page');
        const child = Services.templateService.getTemplateByTemplateObjectName('HASPage');
        const metaDataLinker = new MetaDataLinker();
        const linked = metaDataLinker.linkMetaDataToTemplate(parent, child);
        expect(linked.template._content.HASPage.properties.api.properties.id.value).toEqual('70c3c98c-9e50-4585-9888-f06e295b1431');
        expect(linked.template._content.HASPage.properties.api.properties.id.type).toEqual('string');
        expect(linked.template._content.HASPage.properties.api.properties.id.format).toEqual('uuid');
        expect(linked.template._content.HASPage.properties.api.properties.section.type).toEqual('string');
        expect(linked.template._content.HASPage.properties.api.properties.extends.type).toEqual('string');
        expect(linked.template._content.HASPage.properties.api.properties.title.type).toEqual('string');
        expect(linked.template._content.HASPage.properties.api.properties.header.type).toEqual('object');
        expect(linked.template._content.HASPage.properties.api.properties.footer.type).toEqual('object');
        // NB More to do here with Linking Header and Footer
           
    });
    it('should link parent meta data to child meta data', () => {
        const metaData = Services.metaDataService.getMetaData('GovukInput');
        const metaDataLinker = new MetaDataLinker();
        metaDataLinker.setMetaData(metaData);
        const linked = metaDataLinker.link();
        expect(linked.meta.GovukInput.properties.api.properties.id.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.name.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.type.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.inputmode.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.inputmode.enum).toEqual([
            'none',    'text',
            'decimal', 'numeric',
            'tel',     'search',
            'email',   'url'
        ]);
        expect(linked.meta.GovukInput.properties.api.properties.value.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.disabled.type).toEqual("boolean");
        expect(linked.meta.GovukInput.properties.api.properties.describedBy.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.label.type).toEqual("object");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.text.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.text.default).toEqual("What is the name of the event?");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.classes.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.classes.default).toEqual("govuk-label--l");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.isPageHeading.type).toEqual("boolean");
        expect(linked.meta.GovukInput.properties.api.properties.label.properties.isPageHeading.default).toEqual(true);
        expect(linked.meta.GovukInput.properties.api.properties.hint.type).toEqual("object");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.text.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.html.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.id.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.classes.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.attributes.type).toEqual("object");
        expect(linked.meta.GovukInput.properties.api.properties.hint.properties.attributes.patternProperties['^\\w$'].type).toEqual("string");
        expect(linked.file).toEqual("govukInput.yaml");
        expect(linked.meta._name).toEqual("GovukInput");
        expect(linked.meta._extends).toEqual("BaseFormElement");
        expect(linked.meta._macro_file).toEqual("govuk/components/input/macro.njk");
        expect(linked.meta._import).toEqual("govukInput");
        expect(linked.meta.GovukInput.properties.api.properties.id.type).toEqual("string");
        expect(linked.meta.GovukInput.properties.api.properties.name.type).toEqual("string");

    });
});