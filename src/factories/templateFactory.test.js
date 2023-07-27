const TemplateFactory = require("./templateFactory");

describe('./src/factories/templateFactory.js', () => {
    it('should create', () => {
        const templateFactory = new TemplateFactory();
        const template = [{
            Template: {
                HAS: {
                    name: "Householder Appeals Service",
                    id: "ee9ec28b-df53-4de7-ac63-9495968ac984"
                }
            }
        }];
        templateFactory.setRawObject(template);
        const templateObject = templateFactory.build();
        expect(templateObject.name).toEqual(template[0].Template.HAS.name);
        expect(templateObject.id).toEqual(template[0].Template.HAS.id);
        console.log(templateObject);
    });
});