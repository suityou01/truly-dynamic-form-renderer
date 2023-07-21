const MetaDataFactory = require("./factories/metaDataFactory");

const metaDataFactory = new MetaDataFactory();

global.Factories = {
    metaDataFactory: metaDataFactory
}

module.exports = {
    metaDataFactory
}