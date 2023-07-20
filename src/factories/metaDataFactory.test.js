const metaDataService = require("../services/metadataService");
const MetaDataFactory = require("../factories/metaDataFactory");

describe('./src/factories/metaDataFactory.js', () => {
    describe('build', () => {
        it('should build a metadata object', () => {
            const metaDataFile = '../meta/inputs/govukInput.yaml';
            const yaml = metaDataService.loadMetaData(metaDataFile);
            const metaDataFactory = new MetaDataFactory(yaml);
            const metaDataObject = metaDataFactory.build();
            expect(metaDataObject.name).toEqual('GovukInput');
            console.log(metaDataObject);
        });
    });
});