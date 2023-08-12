require("../services");
require("../factories");

describe('metadataService.js', () => {
    describe('Loading meta data', () => {
        beforeAll(() => {
            Services.metaDataService.loadAllMetaData();
        })
        it('should load govukInput meta data', () => {
            const metaDataFile = '../meta/inputs/govukInput.yaml';
            const yaml = Services.metaDataService.loadMetaData(metaDataFile);
            expect(yaml).toBeTruthy;
        });
        it('should retrieve a meta data object by name', () => {
            const metaDataObject = Services.metaDataService.getMetaData('GovukInput');
            expect(metaDataObject).toBeTruthy();
        });
    });
});