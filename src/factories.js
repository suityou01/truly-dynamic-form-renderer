const MetaDataFactory = require("./factories/metaDataFactory");
const TemplateFactory = require("./factories/templateFactory");

const metaDataFactory = new MetaDataFactory();
const templateFactory = new TemplateFactory();

global.Factories = {
    metaDataFactory: metaDataFactory,
    templateFactory: templateFactory
}

module.exports = {
    metaDataFactory,
    templateFactory
}