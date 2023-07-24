require("../services");
const YamlFileLoaderService = require("./yamlFileLoaderService");

const yamlFileLoaderService = new YamlFileLoaderService();

describe('./src/services/yamlFileLoaderService.js', () => {
    describe('Loading', () => {
        it('It should load a yaml file', () => {
            const testYamlFile = '../__tests__/fixtures/inputs/govukInput.yaml';
            const yaml = yamlFileLoaderService.load(testYamlFile);
            expect(typeof yaml).toEqual('object');
            expect(yaml.FormElement.extends).toEqual('GovukInput');
            console.log(yaml);
        }); 
    });
});