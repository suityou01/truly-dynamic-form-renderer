const Engine = require("./engine");

describe('./src/engine', () => {
    describe('startup', () => {
        it('should load all metadata', () => {
            const e = new Engine();
            e.loadMetaData();
            expect(e._meta.length).toEqual(2);
        });
        it('should retrieve a metadata object by name', () => {
            const e = new Engine();
            e.loadMetaData();
            const bfe = e.getMetaData('BaseFormElement');
            const input = e.getMetaData('GovukInput');
            console.log(input);
        });
    });    
});