const BaseValidator = require("./baseValidator");
const Ajv = require("ajv");
const ajv = new Ajv();

class TemplateValidator extends BaseValidator {
    static validate(template, metadata) {
        const validate = ajv.compile(metadata);
    }
}

module.exports = TemplateValidator;