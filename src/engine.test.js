const Engine = require("./engine");

describe('./src/engine', () => {
    describe('startup', () => {
        it('should load all metadata', () => {
            const e = new Engine();
            expect(e).toBeTruthy();
        });
        it('should retrieve a metadata object by name', () => {
            const e = new Engine();
            e.loadMetaData();
            const bfe = e.getMetaData('BaseFormElement');
            console.log(bfe);
            const input = e.getMetaData('GovukInput');
            console.log(input);
        });
    });    
});