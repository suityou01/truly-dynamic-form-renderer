const Engine = require("./engine");

describe('./src/engine', () => {
    describe('startup', () => {
        it('should load all metadata', () => {
            const e = new Engine();
            e.loadMetaData();
            expect(e).toBeTruthy();
            expect(e.getAllMetaData()).toBeTruthy();
        });
        it('should retrieve a metadata object by name', () => {
            const e = new Engine();
            e.loadMetaData();
            const bfe = e.getMetaData('BaseFormElement');
            expect(bfe.meta._name).toEqual("BaseFormElement");
            const input = e.getMetaData('GovukInput');
            expect(input.meta._name).toEqual('GovukInput');
            console.log(input.meta._api);
        });
    });    
});