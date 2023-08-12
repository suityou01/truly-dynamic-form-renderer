const ValidateStream = require("../streams/validate");
const validateStream = new ValidateStream({ objectMode: true });
describe('../src/streams/validate.js', () => {
    it('should validate a string field', () => {
        const form = {
            fields: [{
                name: 'lpaEmail',
                type: 'field',
                value: 'Hello',
                part: {
                    id: "228eee93-db3e-42be-8c5b-9c24acdfde58",
                    extends: "Email",
                    page: "Page",
                    section: "Section1",
                    label: {
                      text: "Enter your email address",
                      isPageHeading: true
                    },
                    hint: "We'll send an access code to this address, if you have an account"
                }
            }]
        }
    });
});